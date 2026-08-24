import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/services/payment';
import { prisma } from '@/lib/prisma';
import { createAdminNotification } from '@/lib/services/notifications';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    // 1. Verify Webhook Signature
    if (process.env.PAYMENT_MODE !== 'mock' && signature) {
      const isValid = verifyWebhookSignature(rawBody, signature);
      if (!isValid) {
        return NextResponse.json({ error: 'INVALID_SIGNATURE' }, { status: 400 });
      }
    }

    const eventData = JSON.parse(rawBody);
    const eventType = eventData.event;
    const paymentEntity = eventData.payload?.payment?.entity;

    if (!paymentEntity) {
      return NextResponse.json({ received: true });
    }

    const razorpayOrderId = paymentEntity.order_id;
    const razorpayPaymentId = paymentEntity.id;

    // 2. Idempotent processing
    try {
      const existingOrder = await prisma.order.findFirst({
        where: { razorpayOrderId },
      });

      if (existingOrder) {
        if (eventType === 'payment.captured') {
          await prisma.order.update({
            where: { id: existingOrder.id },
            data: {
              paymentStatus: 'PAID',
              orderStatus: existingOrder.orderStatus === 'PENDING' ? 'CONFIRMED' : existingOrder.orderStatus,
              razorpayPaymentId,
            },
          });

          await createAdminNotification({
            type: 'PAYMENT_RECEIVED',
            title: `Payment Captured: #${existingOrder.orderNumber}`,
            message: `Payment of ₹${(paymentEntity.amount / 100).toLocaleString('en-IN')} confirmed via webhook.`,
            link: `/admin/orders/${existingOrder.id}`,
          });
        } else if (eventType === 'payment.failed') {
          await prisma.order.update({
            where: { id: existingOrder.id },
            data: { paymentStatus: 'FAILED' },
          });
        }
      }
    } catch (dbError) {
      console.error('Webhook DB processing error:', dbError);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
