import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { calculateOrderTotals } from '@/lib/services/order';
import { verifyStockAvailability } from '@/lib/services/inventory';
import { createPaymentOrder } from '@/lib/services/payment';
import { getSessionUser } from '@/lib/auth';

const CreateOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().int().min(1),
    })
  ).min(1, 'At least one item is required in cart.'),
  shippingAddress: z.object({
    fullName: z.string().min(2, 'Recipient full name is required.'),
    email: z.string().email('Valid email address is required.'),
    phone: z.string().min(10, 'Valid 10-digit phone number is required.'),
    addressLine1: z.string().min(5, 'Address Line 1 is required.'),
    addressLine2: z.string().optional(),
    city: z.string().min(2, 'City is required.'),
    state: z.string().min(2, 'State is required.'),
    pincode: z.string().min(6, 'Valid 6-digit PIN code is required.'),
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
    const parsed = CreateOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'VALIDATION_ERROR', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { items, shippingAddress, deliveryMethod, paymentMethod, couponCode } = parsed.data;

    // 1. Stock check
    const stockCheck = await verifyStockAvailability(items);
    if (!stockCheck.available) {
      const names = stockCheck.unavailableItems.map((u) => u.productName).join(', ');
      return NextResponse.json(
        { success: false, error: 'STOCK_UNAVAILABLE', message: `Insufficient stock for: ${names}` },
        { status: 400 }
      );
    }

    // 2. Server-Side Price Calculation
    const calculation = await calculateOrderTotals(items, deliveryMethod, couponCode);

    // If COD, no online payment order needed
    if (paymentMethod === 'COD') {
      return NextResponse.json({
        success: true,
        mode: 'cod',
        amount: calculation.total * 100,
        currency: 'INR',
        calculation,
      });
    }

    // 3. Create Razorpay / Mock Order
    const amountInPaisa = calculation.total * 100;
    const paymentOrder = await createPaymentOrder({
      amountInPaisa,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
      notes: {
        customerEmail: shippingAddress.email,
        customerName: shippingAddress.fullName,
      },
    });

    return NextResponse.json({
      success: true,
      ...paymentOrder,
      calculation,
    });
  } catch (error: any) {
    console.error('Payment order creation error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to initialize payment.' },
      { status: 500 }
    );
  }
}
