import prisma from "@/lib/prisma";
import authSeller from "@/middleware/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
// get dashboard data for seller (total order, total earnings, total products)

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    const storeId = await authSeller(userId);

    // get all orders for the store
    const orders = await prisma.order.findMany({
      where: {
        storeId: storeId,
      },
    });

    // get all products with ratings for seller
    const products = await prisma.product.findMany({
      where: {
        storeId: storeId,
      },
    });

    const ratings = await prisma.rating.findMany({
      where: {
        productId: {
          in: products.map((product) => product.id),
        },
      },
      include: {
        user: true,
        product: true,
      },
    });

    const dashboardData = {
      ratings,
      totalOrders: orders.length,
      totalEarnings: Math.round(
        orders.reduce((acc, order) => acc + order.total, 0)
      ),
      totalProducts: products.length,
    };

    return NextResponse.json({ dashboardData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 400 }
    );
  }
}
