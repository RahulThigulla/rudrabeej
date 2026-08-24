import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createAdminNotification } from '@/lib/services/notifications';

const ReviewSchema = z.object({
  productId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(3),
  comment: z.string().min(10),
  author: z.string().min(2),
  location: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');

    const reviews = await prisma.review.findMany({
      where: {
        ...(productId ? { productId } : {}),
        status: 'APPROVED',
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, count: reviews.length, reviews });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    const body = await req.json();
    const parsed = ReviewSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'VALIDATION_ERROR', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { productId, rating, title, comment, author, location } = parsed.data;

    // Check if user has purchased this product
    let verifiedPurchase = false;
    if (session?.userId) {
      const orderWithProduct = await prisma.order.findFirst({
        where: {
          userId: session.userId,
          paymentStatus: 'PAID',
          items: { some: { productId } },
        },
      });
      if (orderWithProduct) {
        verifiedPurchase = true;
      }
    }

    const review = await prisma.review.create({
      data: {
        productId,
        userId: session?.userId || null,
        author,
        location: location || 'India',
        rating,
        title,
        comment,
        verifiedPurchase,
        status: 'PENDING', // requires admin approval
      },
    });

    await createAdminNotification({
      type: 'REVIEW_SUBMITTED',
      title: `New Review Submitted (${rating}★)`,
      message: `"${title}" by ${author} requires moderation.`,
      link: `/admin/reviews`,
    });

    return NextResponse.json({
      success: true,
      message: 'Review submitted for curation review.',
      review,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
