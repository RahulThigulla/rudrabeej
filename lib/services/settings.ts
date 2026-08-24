import { prisma } from '@/lib/prisma';

export interface StoreSettings {
  storeName: string;
  tagline: string;
  storeEmail: string;
  supportPhone: string;
  whatsappNumber: string;
  currency: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  expressShippingFee: number;
  codAvailable: boolean;
  returnWindowDays: number;
}

export const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'RUDRABEEJ',
  tagline: 'The Seed of Rudra.',
  storeEmail: process.env.EMAIL_FROM || 'care@rudrabeej.com',
  supportPhone: '+91 98765 43210',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919876543210',
  currency: 'INR',
  freeShippingThreshold: 999,
  standardShippingFee: 99,
  expressShippingFee: 150,
  codAvailable: true,
  returnWindowDays: 7,
};

export async function getStoreSettings(): Promise<StoreSettings> {
  try {
    const settings = await prisma.businessSettings.findFirst();
    if (!settings) {
      return DEFAULT_SETTINGS;
    }
    return {
      storeName: settings.storeName,
      tagline: settings.tagline,
      storeEmail: settings.storeEmail,
      supportPhone: settings.supportPhone,
      whatsappNumber: settings.whatsappNumber,
      currency: settings.currency,
      freeShippingThreshold: settings.freeShippingThreshold,
      standardShippingFee: settings.standardShippingFee,
      expressShippingFee: settings.expressShippingFee,
      codAvailable: settings.codAvailable,
      returnWindowDays: settings.returnWindowDays,
    };
  } catch (error) {
    // If DB is not yet connected or seeded, return defaults smoothly
    return DEFAULT_SETTINGS;
  }
}
