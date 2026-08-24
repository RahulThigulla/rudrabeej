import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface WhatsAppOptions {
  to: string;
  message: string;
}

export interface InAppNotificationOptions {
  userId?: string;
  type: 'NEW_ORDER' | 'PAYMENT_RECEIVED' | 'LOW_STOCK' | 'ORDER_STATUS' | 'REVIEW_SUBMITTED' | 'BULK_ENQUIRY' | 'SYSTEM';
  title: string;
  message: string;
  link?: string;
}

// 1. In-App Notification Creator
export async function createAdminNotification(options: InAppNotificationOptions) {
  try {
    return await prisma.notification.create({
      data: {
        userId: options.userId || null,
        type: options.type,
        title: options.title,
        message: options.message,
        link: options.link || null,
        isRead: false,
      },
    });
  } catch (error) {
    console.log(`[Notification Created (In-Memory)]: [${options.type}] ${options.title} - ${options.message}`);
    return null;
  }
}

// 2. Email Service Abstraction
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const isMock = process.env.NOTIFICATION_MODE === 'mock' || !process.env.EMAIL_SERVER;

  if (isMock) {
    console.log('====================================================');
    console.log('📧 [MOCK EMAIL DISPATCHED]');
    console.log(`To: ${options.to}`);
    console.log(`Subject: ${options.subject}`);
    console.log('====================================================');
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'RUDRABEEJ <care@rudrabeej.com>',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    return true;
  } catch (error) {
    console.error('Failed to send email via SMTP:', error);
    return false;
  }
}

// 3. WhatsApp Service Abstraction
export async function sendWhatsAppMessage(options: WhatsAppOptions): Promise<boolean> {
  const isMock = process.env.NOTIFICATION_MODE === 'mock' || !process.env.WHATSAPP_API_TOKEN;

  if (isMock) {
    console.log('====================================================');
    console.log('💬 [MOCK WHATSAPP NOTIFICATION]');
    console.log(`To: ${options.to}`);
    console.log(`Message:\n${options.message}`);
    console.log('====================================================');
    return true;
  }

  try {
    const cleanPhone = options.to.replace(/[^0-9]/g, '');
    const res = await fetch(process.env.WHATSAPP_API_URL!, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: cleanPhone,
        type: 'text',
        text: { body: options.message },
      }),
    });

    return res.ok;
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error);
    return false;
  }
}

// 4. Order Confirmation Templates
export async function sendCustomerOrderConfirmedNotification(order: {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalAmount: number;
  items: Array<{ name: string; quantity: number; price: number }>;
  shippingAddress: any;
}) {
  const itemsHtml = order.items
    .map(
      (item) =>
        `<tr>
          <td style="padding: 8px; border-bottom: 1px solid #EFEAE1; font-family: serif;">${item.name}</td>
          <td style="padding: 8px; border-bottom: 1px solid #EFEAE1; text-align: center;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #EFEAE1; text-align: right; font-family: monospace;">₹${item.price.toLocaleString('en-IN')}</td>
        </tr>`
    )
    .join('');

  const emailHtml = `
    <div style="background-color: #FAF8F5; padding: 40px 20px; font-family: sans-serif; color: #171614;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #EFEAE1; padding: 30px;">
        <div style="text-align: center; border-bottom: 1px solid #EFEAE1; padding-bottom: 20px;">
          <h1 style="font-family: serif; font-size: 28px; margin: 0; letter-spacing: 2px;">RUDRABEEJ</h1>
          <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #8C532E; margin-top: 4px;">The Seed of Rudra.</p>
        </div>
        <div style="padding: 24px 0;">
          <h2 style="font-family: serif; font-size: 22px; margin-top: 0;">Order Confirmed with Reverence</h2>
          <p style="font-size: 14px; color: #4A463F; line-height: 1.6;">
            Namaste ${order.customerName},<br />
            Thank you for choosing Rudrabeej. Your order <strong>#${order.orderNumber}</strong> has been confirmed and is now being conditioned and prepared for dispatch.
          </p>
          <table style="width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 13px;">
            <thead>
              <tr style="background-color: #FAF8F5; text-align: left;">
                <th style="padding: 8px;">Creation</th>
                <th style="padding: 8px; text-align: center;">Qty</th>
                <th style="padding: 8px; text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 12px 8px; font-weight: bold;">Total Paid</td>
                <td style="padding: 12px 8px; text-align: right; font-weight: bold; font-family: monospace; color: #8C532E;">₹${order.totalAmount.toLocaleString('en-IN')}</td>
              </tr>
            </tfoot>
          </table>
          <div style="background-color: #F5F0E7; padding: 16px; border-left: 3px solid #8C532E; font-size: 12px; color: #5A4634;">
            🌿 <strong>A Note on Second-Life Packaging:</strong><br />
            Your Rudraksha will arrive in an unbleached 450gsm kraft paper box engineered to transform into a desktop altar keepsake. Please do not discard it.
          </div>
        </div>
        <div style="text-align: center; border-top: 1px solid #EFEAE1; padding-top: 20px; font-size: 11px; color: #888;">
          <p>RUDRABEEJ HERITAGE CRAFTS • Haridwar & Varanasi Sanctums</p>
          <p>Questions? Write to care@rudrabeej.com or message +91 98765 43210</p>
        </div>
      </div>
    </div>
  `;

  // Send Email
  await sendEmail({
    to: order.customerEmail,
    subject: `Order Confirmed #${order.orderNumber} | RUDRABEEJ`,
    html: emailHtml,
  });

  // Send WhatsApp to Customer
  const waCustomerMsg = `*RUDRABEEJ • Order Confirmed*\n\nNamaste ${order.customerName},\nYour order *#${order.orderNumber}* for ₹${order.totalAmount.toLocaleString('en-IN')} has been confirmed.\n\nOur sanctum custodians are carefully preparing and packaging your sacred Rudraksha in our signature second-life kraft casing.\n\nTrack your order anytime: ${process.env.NEXT_PUBLIC_SITE_URL}/track-order`;
  await sendWhatsAppMessage({ to: order.customerPhone, message: waCustomerMsg });

  // Send WhatsApp Alert to Admin
  const adminNumber = process.env.WHATSAPP_ADMIN_NUMBER || '+919876543210';
  const waAdminMsg = `🔔 *NEW RUDRABEEJ ORDER*\n\nOrder: *#${order.orderNumber}*\nCustomer: ${order.customerName} (${order.customerPhone})\nAmount: ₹${order.totalAmount.toLocaleString('en-IN')}\nPayment: PAID\n\nOpen Admin: ${process.env.NEXT_PUBLIC_SITE_URL}/admin/orders`;
  await sendWhatsAppMessage({ to: adminNumber, message: waAdminMsg });
}

// 5. Order Status Change Notification
export async function sendOrderStatusUpdateNotification(order: {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderStatus: string;
  trackingNumber?: string | null;
  courierPartner?: string | null;
}) {
  const statusLabels: Record<string, string> = {
    CONFIRMED: 'Order Confirmed & Allocated',
    PACKED: 'Packaged in Signature Kraft Keepsake Box',
    SHIPPED: 'Dispatched via Insured Air Courier',
    OUT_FOR_DELIVERY: 'Out for Doorstep Delivery Today',
    DELIVERED: 'Delivered to Your Sanctum',
    CANCELLED: 'Order Cancelled',
    REFUNDED: 'Refund Processed',
  };

  const statusText = statusLabels[order.orderStatus] || order.orderStatus;

  const emailHtml = `
    <div style="background-color: #FAF8F5; padding: 40px 20px; font-family: sans-serif; color: #171614;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #EFEAE1; padding: 30px;">
        <div style="text-align: center; border-bottom: 1px solid #EFEAE1; padding-bottom: 20px;">
          <h1 style="font-family: serif; font-size: 28px; margin: 0;">RUDRABEEJ</h1>
          <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #8C532E;">The Seed of Rudra.</p>
        </div>
        <div style="padding: 24px 0;">
          <h2 style="font-family: serif; font-size: 20px;">Order Status Update: #${order.orderNumber}</h2>
          <p style="font-size: 14px; color: #4A463F; line-height: 1.6;">
            Namaste ${order.customerName},<br />
            Your order status is now: <strong style="color: #8C532E;">${statusText}</strong>.
          </p>
          ${
            order.trackingNumber
              ? `<div style="background-color: #F5F0E7; padding: 16px; margin: 16px 0; border: 1px solid #EFEAE1;">
                  <p style="margin: 0; font-size: 13px;"><strong>Courier:</strong> ${order.courierPartner || 'BlueDart Air'}</p>
                  <p style="margin: 4px 0 0; font-size: 13px;"><strong>Tracking AWB:</strong> <span style="font-family: monospace;">${order.trackingNumber}</span></p>
                </div>`
              : ''
          }
          <div style="text-align: center; margin-top: 24px;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/track-order" style="display: inline-block; background-color: #171614; color: #FFFFFF; padding: 12px 28px; text-decoration: none; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Track Your Shipment</a>
          </div>
        </div>
      </div>
    </div>
  `;

  await sendEmail({
    to: order.customerEmail,
    subject: `Order Update #${order.orderNumber}: ${statusText} | RUDRABEEJ`,
    html: emailHtml,
  });

  const waMsg = `*RUDRABEEJ • Order Update*\n\nOrder *#${order.orderNumber}* is now: *${statusText}*.\n${
    order.trackingNumber ? `Courier: ${order.courierPartner || 'BlueDart'}\nAWB: ${order.trackingNumber}\n` : ''
  }\nTrack online: ${process.env.NEXT_PUBLIC_SITE_URL}/track-order`;
  await sendWhatsAppMessage({ to: order.customerPhone, message: waMsg });
}
