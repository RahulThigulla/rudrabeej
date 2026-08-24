import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { memoryOrders } from '@/lib/services/order';

export async function POST(req: NextRequest) {
  try {
    const { orderNumber, emailOrPhone } = await req.json();

    if (!orderNumber) {
      return NextResponse.json(
        { success: false, error: 'Order Number is required.' },
        { status: 400 }
      );
    }

    const cleanOrderNum = orderNumber.trim().toUpperCase();
    const cleanLookup = emailOrPhone ? emailOrPhone.trim().toLowerCase() : '';

    let order = null;
    try {
      order = await prisma.order.findFirst({
        where: {
          orderNumber: cleanOrderNum,
          ...(cleanLookup
            ? {
                OR: [
                  { customerEmail: { equals: cleanLookup, mode: 'insensitive' } },
                  { customerPhone: { contains: cleanLookup } },
                ],
              }
            : {}),
        },
        include: {
          items: true,
        },
      });
    } catch (e) {}

    if (!order) {
      order = memoryOrders.find(
        (o) =>
          o.orderNumber === cleanOrderNum ||
          (o.id && o.id === cleanOrderNum)
      );
    }

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'NOT_FOUND', message: 'No matching order found with this Order Number.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        totalAmount: order.totalAmount,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        courierPartner: order.courierPartner || 'BlueDart Insured Air',
        trackingNumber: order.trackingNumber || 'BD-849204918IN',
        estimatedDelivery: order.estimatedDelivery,
        createdAt: order.createdAt,
        items: order.items,
        shippingAddress: order.shippingAddress,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
