import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { products as staticProducts } from '@/data/products';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);

    let products: any[] = [];
    try {
      products = await prisma.product.findMany({
        orderBy: { mukhi: 'asc' },
        include: { images: true },
      });
    } catch (e) {}

    if (products.length === 0) {
      products = staticProducts as any[];
    }

    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN_ADMIN_ONLY') {
      return NextResponse.json({ success: false, error: 'FORBIDDEN' }, { status: 403 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireAdmin(req);
    const body = await req.json();
    const { id, price, stockQuantity, status, featured, bestSeller } = body;

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...(price !== undefined ? { price: Number(price) } : {}),
        ...(stockQuantity !== undefined ? { stockQuantity: Number(stockQuantity) } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(featured !== undefined ? { featured: Boolean(featured) } : {}),
        ...(bestSeller !== undefined ? { bestSeller: Boolean(bestSeller) } : {}),
      },
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN_ADMIN_ONLY') {
      return NextResponse.json({ success: false, error: 'FORBIDDEN' }, { status: 403 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
