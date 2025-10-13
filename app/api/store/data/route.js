import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// get store info & store products
export async function GET(request) {
  try {
    // get store username from query params
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username").toLowerCase();
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // get store info and inStock products with ratings
    const store = await prisma.store.findUnique({
      where: { username, isActive: true },
      include: {
        Product: {
          include: {
            rating: true,
          },
        },
      },
    });

    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 400 });
    }

    return NextResponse.json({ store }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 400 }
    );
  }
}
