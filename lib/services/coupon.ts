import { prisma } from '@/lib/prisma';

export interface CouponValidationResult {
  valid: boolean;
  code: string;
  discountAmount: number;
  discountType?: 'PERCENTAGE' | 'FIXED';
  discountValue?: number;
  message?: string;
}

export async function validateCoupon(
  code: string,
  subtotal: number
): Promise<CouponValidationResult> {
  const cleanCode = code.trim().toUpperCase();

  // 1. Check in database
  try {
    const coupon = await prisma.coupon.findUnique({
      where: { code: cleanCode },
    });

    if (coupon && coupon.isActive) {
      const now = new Date();
      if (coupon.startDate && coupon.startDate > now) {
        return { valid: false, code: cleanCode, discountAmount: 0, message: 'Coupon is not yet active.' };
      }
      if (coupon.endDate && coupon.endDate < now) {
        return { valid: false, code: cleanCode, discountAmount: 0, message: 'Coupon has expired.' };
      }
      if (coupon.usageLimit && coupon.timesUsed >= coupon.usageLimit) {
        return { valid: false, code: cleanCode, discountAmount: 0, message: 'Coupon usage limit reached.' };
      }
      if (coupon.minOrderAmount && subtotal < coupon.minOrderAmount) {
        return {
          valid: false,
          code: cleanCode,
          discountAmount: 0,
          message: `Minimum order amount of ₹${coupon.minOrderAmount} required for this coupon.`,
        };
      }

      let discount = 0;
      if (coupon.discountType === 'PERCENTAGE') {
        discount = Math.round((subtotal * coupon.discountValue) / 100);
        if (coupon.maxDiscountAmount && discount > coupon.maxDiscountAmount) {
          discount = coupon.maxDiscountAmount;
        }
      } else {
        discount = Math.min(coupon.discountValue, subtotal);
      }

      return {
        valid: true,
        code: cleanCode,
        discountAmount: discount,
        discountType: coupon.discountType as 'PERCENTAGE' | 'FIXED',
        discountValue: coupon.discountValue,
        message: 'Coupon applied successfully!',
      };
    }
  } catch (error) {
    // Database fallback
  }

  // 2. Default fallback promo codes
  if (cleanCode === 'ROOTED10' || cleanCode === 'WELCOME10') {
    const discount = Math.round(subtotal * 0.1);
    return {
      valid: true,
      code: cleanCode,
      discountAmount: discount,
      discountType: 'PERCENTAGE',
      discountValue: 10,
      message: '10% promotional discount applied!',
    };
  }

  return {
    valid: false,
    code: cleanCode,
    discountAmount: 0,
    message: 'Invalid promo code.',
  };
}
