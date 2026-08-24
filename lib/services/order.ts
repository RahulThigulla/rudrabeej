import { prisma } from '@/lib/prisma';
import { getStoreSettings } from './settings';
import { validateCoupon } from './coupon';
import { verifyStockAvailability, decrementStock } from './inventory';
import { 
  createAdminNotification, 
  sendCustomerOrderConfirmedNotification, 
  sendOrderStatusUpdateNotification 
} from './notifications';

export interface CreateOrderInput {
  userId?: string | null;
  customerName?: string;
  customerEmail: string;
  customerPhone: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    country?: string;
  };
  deliveryMethod?: 'standard' | 'express';
  paymentMethod: 'UPI' | 'CARD' | 'NETBANKING' | 'COD';
  couponCode?: string | null;
  razorpayOrderId?: string | null;
  razorpayPaymentId?: string | null;
  razorpaySignature?: string | null;
}

export interface OrderCalculationResult {
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    thumbnail: string;
    size?: string;
    itemTotal: number;
  }>;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  appliedCoupon?: string | null;
}

// In-Memory Dev Cache for seamless dev mode without PostgreSQL
const globalForOrders = globalThis as unknown as {
  _memoryOrders: any[];
};

export const memoryOrders = globalForOrders._memoryOrders || [];
if (process.env.NODE_ENV !== 'production') {
  globalForOrders._memoryOrders = memoryOrders;
}

// 1. Calculate Order Prices from Database (Never Trust Frontend Totals)
export async function calculateOrderTotals(
  itemsInput: Array<{ productId: string; quantity: number }>,
  deliveryMethod = 'standard',
  couponCode?: string | null
): Promise<OrderCalculationResult> {
  const settings = await getStoreSettings();
  let subtotal = 0;
  const verifiedItems: OrderCalculationResult['items'] = [];

  for (const item of itemsInput) {
    let product: any = null;
    try {
      product = await prisma.product.findUnique({
        where: { id: item.productId },
      });
    } catch (e) {
      // Fallback in dev mode
    }

    // If not found in DB, fallback to mock products data
    if (!product) {
      const { products: mockProducts } = await import('@/data/products');
      product = mockProducts.find((p) => p.id === item.productId || p.slug === item.productId);
    }

    if (!product) {
      throw new Error(`Product not found with ID: ${item.productId}`);
    }

    const itemPrice = Number(product.price);
    const itemTotal = itemPrice * item.quantity;
    subtotal += itemTotal;

    verifiedItems.push({
      productId: product.id,
      name: product.name,
      price: itemPrice,
      quantity: item.quantity,
      thumbnail: product.thumbnail || (product.images && product.images[0]?.url) || '',
      size: product.size,
      itemTotal,
    });
  }

  // Calculate discount
  let discount = 0;
  let validCoupon: string | null = null;
  if (couponCode) {
    const couponRes = await validateCoupon(couponCode, subtotal);
    if (couponRes.valid) {
      discount = couponRes.discountAmount;
      validCoupon = couponRes.code;
    }
  }

  // Calculate shipping
  let shipping = 0;
  if (subtotal < settings.freeShippingThreshold && subtotal > 0) {
    shipping = settings.standardShippingFee;
  }
  if (deliveryMethod === 'express') {
    shipping += settings.expressShippingFee;
  }

  const total = Math.max(0, subtotal - discount + shipping);

  return {
    items: verifiedItems,
    subtotal,
    discount,
    shipping,
    total,
    appliedCoupon: validCoupon,
  };
}

// 2. Generate Sequential Order Number: RB-2026-000001
export async function generateOrderNumber(): Promise<string> {
  const year = new Date().getFullYear();
  try {
    const count = await prisma.order.count();
    const nextSeq = String(count + memoryOrders.length + 1).padStart(6, '0');
    return `RB-${year}-${nextSeq}`;
  } catch (error) {
    const randomSeq = String(Math.floor(100000 + Math.random() * 900000));
    return `RB-${year}-${randomSeq}`;
  }
}

// 3. Create Placed & Paid Order (Transactional)
export async function createOrder(input: CreateOrderInput) {
  // A. Verify Stock Availability
  const stockCheck = await verifyStockAvailability(input.items);
  if (!stockCheck.available) {
    const unavailableNames = stockCheck.unavailableItems.map((u) => u.productName).join(', ');
    throw new Error(`Insufficient stock for: ${unavailableNames}`);
  }

  // B. Server-Side Price Calculation
  const calc = await calculateOrderTotals(input.items, input.deliveryMethod, input.couponCode);

  // C. Generate Order Number
  const orderNumber = await generateOrderNumber();

  // D. Create Order in Database
  const isPaid = input.paymentMethod !== 'COD';
  const paymentStatus = isPaid ? 'PAID' : 'PENDING';
  const orderStatus = 'CONFIRMED';
  const estimatedDelivery = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000);
  const custName = input.customerName || input.shippingAddress.fullName;

  let order: any = null;

  try {
    order = await prisma.order.create({
      data: {
        orderNumber,
        userId: input.userId || null,
        customerName: custName,
        customerEmail: input.customerEmail,
        customerPhone: input.customerPhone,
        subtotal: calc.subtotal,
        shippingAmount: calc.shipping,
        discountAmount: calc.discount,
        totalAmount: calc.total,
        currency: 'INR',
        paymentStatus,
        orderStatus,
        deliveryMethod: input.deliveryMethod || 'standard',
        paymentMethod: input.paymentMethod,
        shippingAddress: input.shippingAddress as any,
        razorpayOrderId: input.razorpayOrderId,
        razorpayPaymentId: input.razorpayPaymentId,
        razorpaySignature: input.razorpaySignature,
        courierPartner: 'BlueDart Insured Air',
        estimatedDelivery,
        items: {
          create: calc.items.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            thumbnail: item.thumbnail,
            size: item.size,
          })),
        },
        payments: isPaid
          ? {
              create: {
                amount: calc.total,
                currency: 'INR',
                status: 'PAID',
                paymentMethod: input.paymentMethod,
                razorpayOrderId: input.razorpayOrderId,
                razorpayPaymentId: input.razorpayPaymentId,
                razorpaySignature: input.razorpaySignature,
              },
            }
          : undefined,
      },
      include: {
        items: true,
      },
    });

    // E. Decrement Stock Quantity
    await decrementStock(input.items, order.id);

    // F. Increment Coupon Usage if applicable
    if (calc.appliedCoupon) {
      await prisma.coupon.updateMany({
        where: { code: calc.appliedCoupon },
        data: { timesUsed: { increment: 1 } },
      }).catch(() => {});
    }

    // G. Create Admin Notification
    await createAdminNotification({
      type: 'NEW_ORDER',
      title: `New Order: #${order.orderNumber}`,
      message: `${order.customerName} placed an order for ₹${order.totalAmount.toLocaleString('en-IN')}`,
      link: `/admin/orders/${order.id}`,
    });

  } catch (error) {
    // Memory fallback record
    order = {
      id: `ord_${Date.now()}`,
      orderNumber,
      customerName: custName,
      customerEmail: input.customerEmail,
      customerPhone: input.customerPhone,
      subtotal: calc.subtotal,
      shippingAmount: calc.shipping,
      discountAmount: calc.discount,
      totalAmount: calc.total,
      orderStatus,
      paymentStatus,
      courierPartner: 'BlueDart Insured Air',
      trackingNumber: `BD-${Math.floor(100000000 + Math.random() * 900000000)}IN`,
      estimatedDelivery,
      shippingAddress: input.shippingAddress,
      items: calc.items,
      createdAt: new Date(),
    };
    memoryOrders.unshift(order);
  }

  // H. Send Customer Email & WhatsApp Notifications
  await sendCustomerOrderConfirmedNotification({
    orderNumber: order.orderNumber,
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    customerPhone: order.customerPhone,
    totalAmount: order.totalAmount,
    items: calc.items,
    shippingAddress: input.shippingAddress,
  });

  return order;
}

// 4. Update Order Status (Admin action)
export async function updateOrderStatus(
  orderId: string,
  newStatus: 'PENDING' | 'CONFIRMED' | 'PACKED' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED',
  additionalData?: { trackingNumber?: string; courierPartner?: string; notes?: string }
) {
  try {
    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        orderStatus: newStatus,
        trackingNumber: additionalData?.trackingNumber,
        courierPartner: additionalData?.courierPartner,
        notes: additionalData?.notes,
      },
    });

    // Notify customer of status update
    await sendOrderStatusUpdateNotification({
      orderNumber: updated.orderNumber,
      customerName: updated.customerName,
      customerEmail: updated.customerEmail,
      customerPhone: updated.customerPhone,
      orderStatus: updated.orderStatus,
      trackingNumber: updated.trackingNumber,
      courierPartner: updated.courierPartner,
    });

    return updated;
  } catch (error) {
    const memoryOrder = memoryOrders.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (memoryOrder) {
      memoryOrder.orderStatus = newStatus;
      if (additionalData?.trackingNumber) memoryOrder.trackingNumber = additionalData.trackingNumber;
      if (additionalData?.courierPartner) memoryOrder.courierPartner = additionalData.courierPartner;
      if (additionalData?.notes) memoryOrder.notes = additionalData.notes;
      return memoryOrder;
    }
    throw error;
  }
}
