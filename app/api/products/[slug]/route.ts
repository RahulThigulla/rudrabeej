import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { products as staticProducts } from '@/data/products';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    let product: any = null;
    try {
      product = await prisma.product.findUnique({
        where: { slug },
        include: {
          images: { orderBy: { order: 'asc' } },
          reviews: { where: { status: 'APPROVED' }, orderBy: { createdAt: 'desc' } },
        },
      });
    } catch (e) {}

    if (!product) {
      product = staticProducts.find((p) => p.slug === slug || p.id === slug);
    }

    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
