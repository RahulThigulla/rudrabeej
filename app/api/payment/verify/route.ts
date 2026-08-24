import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyPaymentSignature } from '@/lib/services/payment';
import { createOrder } from '@/lib/services/order';
import { getSessionUser } from '@/lib/auth';

const VerifySchema = z.object({
  razorpayOrderId: z.string().optional().nullable(),
  razorpayPaymentId: z.string().optional().nullable(),
  razorpaySignature: z.string().optional().nullable(),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().min(1),
    })
  ),
  shippingAddress: z.object({
    fullName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    pincode: z.string(),
    country: z.string().default('India'),
  }),
  deliveryMethod: z.enum(['standard', 'express']).default('standard'),
  paymentMethod: z.enum(['UPI', 'CARD', 'NETBANKING', 'COD']).default('UPI'),
  couponCode: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    const body = await req.json();
    const parsed = VerifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'VALIDATION_ERROR', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // 1. Signature Verification for Online Payments (Non-COD)
    if (data.paymentMethod !== 'COD') {
      if (!data.razorpayOrderId || !data.razorpayPaymentId) {
        return NextResponse.json(
          { success: false, error: 'MISSING_PAYMENT_DETAILS', message: 'Payment transaction details are required.' },
          { status: 400 }
        );
      }

      const isValid = verifyPaymentSignature({
        razorpayOrderId: data.razorpayOrderId,
        razorpayPaymentId: data.razorpayPaymentId,
        razorpaySignature: data.razorpaySignature || '',
      });

      if (!isValid) {
        return NextResponse.json(
          { success: false, error: 'INVALID_SIGNATURE', message: 'Payment verification failed. Invalid signature.' },
          { status: 400 }
        );
      }
    }

    // 2. Execute Transactional Order Creation
    const order = await createOrder({
      userId: session?.userId || null,
      customerName: data.shippingAddress.fullName,
      customerEmail: data.shippingAddress.email,
      customerPhone: data.shippingAddress.phone,
      items: data.items,
      shippingAddress: data.shippingAddress,
      deliveryMethod: data.deliveryMethod,
      paymentMethod: data.paymentMethod,
      couponCode: data.couponCode,
      razorpayOrderId: data.razorpayOrderId,
      razorpayPaymentId: data.razorpayPaymentId,
      razorpaySignature: data.razorpaySignature,
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        createdAt: order.createdAt,
      },
    });
  } catch (error: any) {
    console.error('Payment verification & order creation error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to complete order.' },
      { status: 500 }
    );
  }
}
