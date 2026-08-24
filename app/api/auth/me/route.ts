import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    if (!session) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
    }

    let dbUser = null;
    try {
      dbUser = await prisma.user.findUnique({
        where: { id: session.userId },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          addresses: true,
        },
      });
    } catch (e) {}

    return NextResponse.json({
      authenticated: true,
      user: dbUser || {
        id: session.userId,
        name: session.name,
        email: session.email,
        role: session.role,
        addresses: [],
      },
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
  }
}
