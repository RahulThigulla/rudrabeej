import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { memoryOrders } from '@/lib/services/order';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search')?.toLowerCase();

    let orders: any[] = [];
    try {
      const where: any = {};
      if (status && status !== 'ALL') {
        where.orderStatus = status;
      }
      if (search) {
        where.OR = [
          { orderNumber: { contains: search, mode: 'insensitive' } },
          { customerName: { contains: search, mode: 'insensitive' } },
          { customerEmail: { contains: search, mode: 'insensitive' } },
          { customerPhone: { contains: search } },
        ];
      }

      orders = await prisma.order.findMany({
        where,
        include: { items: true, payments: true },
        orderBy: { createdAt: 'desc' },
      });
    } catch (e) {}

    // Merge memory orders
    if (memoryOrders.length > 0) {
      let filteredMem = [...memoryOrders];
      if (status && status !== 'ALL') {
        filteredMem = filteredMem.filter((o) => o.orderStatus === status);
      }
      if (search) {
        filteredMem = filteredMem.filter(
          (o) =>
            o.orderNumber.toLowerCase().includes(search) ||
            o.customerName.toLowerCase().includes(search) ||
            o.customerEmail.toLowerCase().includes(search)
        );
      }
      const existingIds = new Set(orders.map((o) => o.id || o.orderNumber));
      for (const mo of filteredMem) {
        if (!existingIds.has(mo.id) && !existingIds.has(mo.orderNumber)) {
          orders.push(mo);
        }
      }
    }

    return NextResponse.json({ success: true, count: orders.length, orders });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN_ADMIN_ONLY') {
      return NextResponse.json({ success: false, error: 'FORBIDDEN' }, { status: 403 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
