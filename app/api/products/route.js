import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// get all products lists
export async function GET(request) {
  try {
    let products = await prisma.product.findMany({
      where: {
        inStock: true,
      },
      include: {
        rating: {
          select: {
            createdAt: true,
            rating: true,
            review: true,
            user: { select: { name: true, image: true } },
          },
        },
        store: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // remove products if isActive is false
    products = products.filter((product) => product.store.isActive === true);
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An external error occurred" },
      { status: 500 }
    );
  }
}
