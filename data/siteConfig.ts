export const siteConfig = {
  name: 'RUDRABEEJ',
  tagline: 'The Seed of Rudra. Shaped for Modern Form.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://rudrabeej.com',
  
  contact: {
    // Phone & WhatsApp (Read from Vercel Environment Variables or defaults)
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91 98765 43210',
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+91 98765 43210',
    whatsappFormatted: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.replace(/[^0-9]/g, '') : '919876543210',
    
    // Support & Admin Emails
    supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'care@rudrabeej.com',
    ordersEmail: process.env.NEXT_PUBLIC_ORDERS_EMAIL || 'orders@rudrabeej.com',
    adminEmail: process.env.ADMIN_NOTIFICATION_EMAIL || 'admin@rudrabeej.com',
    
    // Address & Hours
    address: 'Sacred Valley Workshop, Rishikesh, Uttarakhand - 249201, India',
    hours: 'Mon – Sat: 9:00 AM – 7:00 PM IST',
    responsePromise: 'We respond to all queries within 4 business hours.'
  },

  socials: {
    instagram: 'https://instagram.com/rudrabeej',
    youtube: 'https://youtube.com/@rudrabeej',
    facebook: 'https://facebook.com/rudrabeej',
  }
};
