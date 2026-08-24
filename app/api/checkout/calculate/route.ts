import { NextRequest, NextResponse } from 'next/server';
import { calculateOrderTotals } from '@/lib/services/order';

export async function POST(req: NextRequest) {
  try {
    const { items, deliveryMethod, couponCode } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cart items are required for price calculation.' },
        { status: 400 }
      );
    }

    const calculation = await calculateOrderTotals(items, deliveryMethod || 'standard', couponCode);
    return NextResponse.json({ success: true, ...calculation });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to calculate order totals.' },
      { status: 500 }
    );
  }
}
