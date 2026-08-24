import crypto from 'crypto';
import Razorpay from 'razorpay';

export interface CreatePaymentOrderOptions {
  amountInPaisa: number; // e.g. ₹999 = 99900
  currency?: string;
  receipt: string; // e.g. internal order id
  notes?: Record<string, string>;
}

export interface PaymentOrderResult {
  mode: 'mock' | 'razorpay';
  razorpayOrderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

export interface VerifySignatureOptions {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export function isPaymentMockMode(): boolean {
  return process.env.PAYMENT_MODE === 'mock' || !process.env.RAZORPAY_KEY_SECRET;
}

export async function createPaymentOrder(
  options: CreatePaymentOrderOptions
): Promise<PaymentOrderResult> {
  const isMock = isPaymentMockMode();

  if (isMock) {
    const mockOrderId = `order_mock_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
    return {
      mode: 'mock',
      razorpayOrderId: mockOrderId,
      amount: options.amountInPaisa,
      currency: options.currency || 'INR',
      keyId: 'rzp_test_mock_key',
    };
  }

  // Real Razorpay SDK Call
  const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!;
  const keySecret = process.env.RAZORPAY_KEY_SECRET!;

  const razorpay = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });

  const order = await razorpay.orders.create({
    amount: options.amountInPaisa,
    currency: options.currency || 'INR',
    receipt: options.receipt,
    notes: options.notes,
  });

  return {
    mode: 'razorpay',
    razorpayOrderId: order.id,
    amount: Number(order.amount),
    currency: order.currency,
    keyId,
  };
}

export function verifyPaymentSignature(options: VerifySignatureOptions): boolean {
  const isMock = isPaymentMockMode();

  // In Mock Mode, verify mock prefix or mock token
  if (isMock) {
    if (options.razorpayOrderId.startsWith('order_mock_') || options.razorpayPaymentId.startsWith('pay_mock_')) {
      return true;
    }
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) return false;

  const generatedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${options.razorpayOrderId}|${options.razorpayPaymentId}`)
    .digest('hex');

  return generatedSignature === options.razorpaySignature;
}

export function verifyWebhookSignature(body: string, signature: string): boolean {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) return false;

  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(body)
    .digest('hex');

  return expectedSignature === signature;
}
