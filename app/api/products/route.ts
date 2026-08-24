import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { products as staticProducts } from '@/data/products';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const mukhi = searchParams.get('mukhi');
    const search = searchParams.get('search')?.toLowerCase();
    const sort = searchParams.get('sort') || 'featured';

    let dbProducts: any[] = [];
    try {
      const whereClause: any = { status: 'ACTIVE' };
      if (mukhi) whereClause.mukhi = parseInt(mukhi, 10);
      if (search) {
        whereClause.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { sanskritName: { contains: search, mode: 'insensitive' } },
        ];
      }

      dbProducts = await prisma.product.findMany({
        where: whereClause,
        include: { images: true },
        orderBy:
          sort === 'price-low'
            ? { price: 'asc' }
            : sort === 'price-high'
            ? { price: 'desc' }
            : sort === 'newest'
            ? { createdAt: 'desc' }
            : { featured: 'desc' },
      });
    } catch (e) {
      // Fallback to static products
    }

    if (dbProducts.length === 0) {
      let filtered = [...staticProducts];
      if (category && category !== 'all') {
        filtered = filtered.filter((p) => p.category === category);
      }
      if (mukhi && mukhi !== 'all') {
        filtered = filtered.filter((p) => p.mukhi === parseInt(mukhi, 10));
      }
      if (search) {
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(search) ||
            p.description.toLowerCase().includes(search) ||
            (p.sanskritName && p.sanskritName.toLowerCase().includes(search))
        );
      }

      if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
      if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);

      return NextResponse.json({ success: true, count: filtered.length, products: filtered });
    }

    return NextResponse.json({ success: true, count: dbProducts.length, products: dbProducts });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
