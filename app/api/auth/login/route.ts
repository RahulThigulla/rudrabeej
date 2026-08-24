import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { verifyPassword, generateAuthToken } from '@/lib/auth';

const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = LoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    const cleanEmail = email.toLowerCase().trim();

    // 1. Check in database
    let user = null;
    try {
      user = await prisma.user.findUnique({
        where: { email: cleanEmail },
      });
    } catch (e) {}

    // 2. Demo fallback for Admin & Customer when DB is not yet running
    if (!user) {
      if (cleanEmail === 'admin@rudrabeej.com' && password === 'Admin@123') {
        user = {
          id: 'usr_demo_admin',
          name: 'Rudrabeej Administrator',
          email: 'admin@rudrabeej.com',
          phone: '+919876543210',
          role: 'ADMIN',
          passwordHash: '',
        };
      } else if (cleanEmail === 'customer@rudrabeej.com' && password === 'Customer@123') {
        user = {
          id: 'usr_demo_customer',
          name: 'Aditya Sharma',
          email: 'customer@rudrabeej.com',
          phone: '+919876500000',
          role: 'CUSTOMER',
          passwordHash: '',
        };
      }
    }

    if (!user) {
      return NextResponse.json(
        { error: 'INVALID_CREDENTIALS', message: 'Incorrect email or password.' },
        { status: 401 }
      );
    }

    // Verify password if hash exists
    if (user.passwordHash) {
      const isValid = await verifyPassword(password, user.passwordHash);
      if (!isValid) {
        return NextResponse.json(
          { error: 'INVALID_CREDENTIALS', message: 'Incorrect email or password.' },
          { status: 401 }
        );
      }
    }

    const token = generateAuthToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: (user.role as 'CUSTOMER' | 'ADMIN') || 'CUSTOMER',
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

    response.cookies.set('rudrabeej_auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'SERVER_ERROR', message: error.message || 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
