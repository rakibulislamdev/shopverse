import prisma from "@/lib/prisma";
import authAdmin from "@/middleware/authAdmin";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// get dashboard data for admin (total orders, total products, total stores, total revenue)

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    const isAdmin = await authAdmin(userId);
    if (!isAdmin) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
    }

    // get total orders
    const orders = await prisma.order.count();

    // get total stores on app
    const stores = await prisma.store.count();

    // get all orders include only createdAt & total & calculate total revenue
    const allOrders = await prisma.findMany({
      select: {
        createdAt: true,
        total: true,
      },
    });

    let totalRevenue = 0;
    allOrders.forEach((order) => {
      totalRevenue += order.total;
    });

    const revenue = totalRevenue.toFixed(2);

    // total products on app
    const products = await prisma.product.count();

    const dashboardData = {
      orders,
      stores,
      revenue,
      products,
      allOrders,
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
