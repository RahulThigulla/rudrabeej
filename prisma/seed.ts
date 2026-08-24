import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { products } from '../data/products';
import { mukhiData } from '../data/mukhi';
import { blogPosts } from '../data/blog';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting RUDRABEEJ database seed...');

  // 1. Seed Business Settings
  await prisma.businessSettings.upsert({
    where: { id: 'default-settings' },
    update: {},
    create: {
      id: 'default-settings',
      storeName: 'RUDRABEEJ',
      tagline: 'The Seed of Rudra.',
      storeEmail: 'care@rudrabeej.com',
      supportPhone: '+91 98765 43210',
      whatsappNumber: '+919876543210',
      currency: 'INR',
      freeShippingThreshold: 999,
      standardShippingFee: 99,
      expressShippingFee: 150,
      codAvailable: true,
      returnWindowDays: 7,
    },
  });
  console.log('✓ Business settings seeded');

  // 2. Seed Default Admin & Customer Accounts
  const adminPasswordHash = await bcrypt.hash('Admin@123', 10);
  const customerPasswordHash = await bcrypt.hash('Customer@123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@rudrabeej.com' },
    update: { passwordHash: adminPasswordHash, role: 'ADMIN' },
    create: {
      name: 'Rudrabeej Administrator',
      email: 'admin@rudrabeej.com',
      phone: '+919876543210',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: 'customer@rudrabeej.com' },
    update: { passwordHash: customerPasswordHash, role: 'CUSTOMER' },
    create: {
      name: 'Aditya Sharma',
      email: 'customer@rudrabeej.com',
      phone: '+919876500000',
      passwordHash: customerPasswordHash,
      role: 'CUSTOMER',
    },
  });
  console.log('✓ Admin (admin@rudrabeej.com / Admin@123) and Demo Customer created');

  // 3. Seed Mukhis (1 to 21)
  for (const m of mukhiData) {
    await prisma.mukhi.upsert({
      where: { number: m.mukhi },
      update: {
        name: m.name,
        sanskritTitle: m.sanskritTitle,
        summary: m.summary,
        rulingDeity: m.rulingDeity,
        traditionalAssociation: m.traditionalAssociation,
        planetaryAssociation: m.planetaryAssociation,
        mantra: m.mantra,
        description: m.description,
        whoShouldWear: m.whoShouldWear,
        image: m.image,
      },
      create: {
        number: m.mukhi,
        name: m.name,
        sanskritTitle: m.sanskritTitle,
        summary: m.summary,
        rulingDeity: m.rulingDeity,
        traditionalAssociation: m.traditionalAssociation,
        planetaryAssociation: m.planetaryAssociation,
        mantra: m.mantra,
        description: m.description,
        whoShouldWear: m.whoShouldWear,
        image: m.image,
      },
    });
  }
  console.log('✓ 1 to 21 Mukhis seeded');

  // 4. Seed Categories
  const categories = [
    { id: 'cat-single-beads', name: 'Single Sacred Beads', slug: 'single-beads', description: 'Individual authenticated Himalayan Rudraksha seeds (1 to 21 Mukhis)' },
    { id: 'cat-malas', name: 'Meditation Malas', slug: 'malas', description: 'Hand-knotted 108+1 Japa malas on unbleached Indian cotton' },
    { id: 'cat-copper-chains', name: 'Copper Cappings & Chains', slug: 'copper-chains', description: 'Hand-forged pure 99.9% solid copper cappings and linked chains' },
    { id: 'cat-gift-sets', name: 'Heritage Gift Sets', slug: 'gift-sets', description: 'Complete ritual presentation gift boxes with second-life altar cases' },
    { id: 'cat-rare-collector', name: 'Rare Collector Heirlooms', slug: 'rare-collector', description: 'Consecrated 15 to 21 Mukhi collector specimens with laboratory X-ray imaging' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description },
      create: { id: cat.id, name: cat.name, slug: cat.slug, description: cat.description },
    });
  }
  console.log('✓ Categories seeded');

  // 5. Seed Products (All 1 to 21 Mukhis, Malas, Copper Chains, Gift Sets)
  for (const p of products) {
    const createdProduct = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        sanskritName: p.sanskritName,
        shortDescription: p.shortDescription,
        description: p.description,
        story: p.story,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        sku: `RB-${p.slug.toUpperCase()}`,
        size: p.size,
        weight: p.weight,
        origin: p.origin,
        material: p.material,
        stockQuantity: p.stock,
        mukhi: p.mukhi,
        badges: p.badges || [],
        features: p.features || [],
        traditionalSignificance: p.traditionalSignificance || [],
        howToUse: p.howToUse || [],
        careInstructions: p.careInstructions || [],
        authenticityInformation: p.authenticityInformation || [],
        packagingDesc: p.packagingInformation?.description,
        secondLifeUse: p.packagingInformation?.secondLifeUse,
        thumbnail: p.thumbnail,
      },
      create: {
        id: p.id,
        slug: p.slug,
        name: p.name,
        sanskritName: p.sanskritName,
        shortDescription: p.shortDescription,
        description: p.description,
        story: p.story,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        sku: `RB-${p.slug.toUpperCase()}`,
        size: p.size,
        weight: p.weight,
        origin: p.origin,
        material: p.material,
        stockQuantity: p.stock,
        mukhi: p.mukhi,
        badges: p.badges || [],
        features: p.features || [],
        traditionalSignificance: p.traditionalSignificance || [],
        howToUse: p.howToUse || [],
        careInstructions: p.careInstructions || [],
        authenticityInformation: p.authenticityInformation || [],
        packagingDesc: p.packagingInformation?.description,
        secondLifeUse: p.packagingInformation?.secondLifeUse,
        thumbnail: p.thumbnail,
      },
    });

    // Seed product images
    if (p.images && p.images.length > 0) {
      await prisma.productImage.deleteMany({ where: { productId: createdProduct.id } });
      for (let i = 0; i < p.images.length; i++) {
        const img = p.images[i];
        await prisma.productImage.create({
          data: {
            productId: createdProduct.id,
            url: img.url,
            alt: img.alt,
            type: img.type,
            order: i,
          },
        });
      }
    }
  }
  console.log(`✓ ${products.length} Products & image galleries seeded`);

  // 6. Seed Coupons
  const coupons = [
    { code: 'ROOTED10', discountType: 'PERCENTAGE' as const, discountValue: 10, minOrderAmount: 500, isActive: true },
    { code: 'WELCOME10', discountType: 'PERCENTAGE' as const, discountValue: 10, minOrderAmount: 0, isActive: true },
    { code: 'SACRED500', discountType: 'FIXED' as const, discountValue: 500, minOrderAmount: 3000, isActive: true },
  ];

  for (const c of coupons) {
    await prisma.coupon.upsert({
      where: { code: c.code },
      update: c,
      create: c,
    });
  }
  console.log('✓ Coupons (ROOTED10, WELCOME10, SACRED500) seeded');

  // 7. Seed Sample Verified Review
  const panchmukhi = await prisma.product.findFirst({ where: { slug: 'panchmukhi-rudraksha' } });
  if (panchmukhi) {
    await prisma.review.create({
      data: {
        productId: panchmukhi.id,
        author: 'Dr. Raghuram S.',
        location: 'Varanasi, Uttar Pradesh',
        rating: 5,
        title: 'Authenticity you can trust completely',
        comment: 'As someone who has studied Vedic flora for decades, finding an unadulterated Panchmukhi with genuine laboratory verification and unbleached kraft casing is truly inspiring.',
        verifiedPurchase: true,
        status: 'APPROVED',
      },
    }).catch(() => {});
  }

  // 8. Seed Blog Posts
  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        subtitle: post.subtitle,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        authorName: post.author.name,
        authorRole: post.author.role,
        readTime: post.readTime,
        coverImage: post.coverImage,
        tags: post.tags,
      },
      create: {
        slug: post.slug,
        title: post.title,
        subtitle: post.subtitle,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        authorName: post.author.name,
        authorRole: post.author.role,
        readTime: post.readTime,
        coverImage: post.coverImage,
        tags: post.tags,
      },
    });
  }
  console.log('✓ Editorial Journal articles seeded');

  console.log('🎉 RUDRABEEJ database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
