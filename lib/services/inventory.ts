import { prisma } from '@/lib/prisma';
import { createAdminNotification } from './notifications';

export interface StockCheckItem {
  productId: string;
  quantity: number;
}

export interface StockCheckResult {
  available: boolean;
  unavailableItems: Array<{
    productId: string;
    productName: string;
    requested: number;
    available: number;
  }>;
}

export async function verifyStockAvailability(
  items: StockCheckItem[]
): Promise<StockCheckResult> {
  const unavailableItems: StockCheckResult['unavailableItems'] = [];

  for (const item of items) {
    try {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        select: { id: true, name: true, stockQuantity: true, status: true },
      });

      if (!product || product.status !== 'ACTIVE' || product.stockQuantity < item.quantity) {
        unavailableItems.push({
          productId: item.productId,
          productName: product?.name || 'Unknown Product',
          requested: item.quantity,
          available: product?.stockQuantity || 0,
        });
      }
    } catch (e) {
      // In dev fallback mode
    }
  }

  return {
    available: unavailableItems.length === 0,
    unavailableItems,
  };
}

export async function decrementStock(
  items: Array<{ productId: string; quantity: number }>,
  orderId: string
) {
  for (const item of items) {
    try {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        select: { id: true, name: true, stockQuantity: true },
      });

      if (product) {
        const newStock = Math.max(0, product.stockQuantity - item.quantity);

        await prisma.$transaction([
          prisma.product.update({
            where: { id: item.productId },
            data: { stockQuantity: newStock },
          }),
          prisma.inventoryLog.create({
            data: {
              productId: item.productId,
              changeQuantity: -item.quantity,
              previousStock: product.stockQuantity,
              newStock,
              reason: `Order ${orderId}`,
              orderId,
            },
          }),
        ]);

        // If stock is below 5 units, trigger a low stock alert
        if (newStock <= 4) {
          await createAdminNotification({
            type: 'LOW_STOCK',
            title: `Low Stock Alert: ${product.name}`,
            message: `Only ${newStock} units remaining for ${product.name}. Consider harvesting/restocking soon.`,
            link: `/admin/inventory`,
          });
        }
      }
    } catch (error) {
      console.error(`Failed to decrement stock for product ${item.productId}`, error);
    }
  }
}

export async function restockItem(
  productId: string,
  quantity: number,
  reason = 'Manual Restock'
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (product) {
      const newStock = product.stockQuantity + quantity;
      await prisma.$transaction([
        prisma.product.update({
          where: { id: productId },
          data: { stockQuantity: newStock },
        }),
        prisma.inventoryLog.create({
          data: {
            productId,
            changeQuantity: quantity,
            previousStock: product.stockQuantity,
            newStock,
            reason,
          },
        }),
      ]);
    }
  } catch (error) {
    console.error('Failed to restock item', error);
  }
}
