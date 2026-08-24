import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { restockItem } from '@/lib/services/inventory';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);

    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        sku: true,
        mukhi: true,
        price: true,
        stockQuantity: true,
        status: true,
        thumbnail: true,
      },
      orderBy: { stockQuantity: 'asc' },
    });

    return NextResponse.json({ success: true, inventory: products });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN_ADMIN_ONLY') {
      return NextResponse.json({ success: false, error: 'FORBIDDEN' }, { status: 403 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req);
    const { productId, changeQuantity, reason } = await req.json();

    if (!productId || changeQuantity === undefined) {
      return NextResponse.json({ success: false, error: 'Product ID and change quantity required' }, { status: 400 });
    }

    await restockItem(productId, Number(changeQuantity), reason || 'Admin stock manual adjustment');

    const updated = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, name: true, stockQuantity: true },
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN_ADMIN_ONLY') {
      return NextResponse.json({ success: false, error: 'FORBIDDEN' }, { status: 403 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
