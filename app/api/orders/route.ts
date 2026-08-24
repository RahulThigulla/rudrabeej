import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    if (!session) {
      return NextResponse.json({ success: false, error: 'UNAUTHORIZED' }, { status: 401 });
    }

    let orders: any[] = [];
    try {
      orders = await prisma.order.findMany({
        where: {
          OR: [
            { userId: session.userId },
            { customerEmail: session.email },
          ],
        },
        include: { items: true },
        orderBy: { createdAt: 'desc' },
      });
    } catch (e) {}

    return NextResponse.json({ success: true, count: orders.length, orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
