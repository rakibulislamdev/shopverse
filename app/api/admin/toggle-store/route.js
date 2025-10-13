import prisma from "@/lib/prisma";
import authAdmin from "@/middleware/authAdmin";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// toggle store is active
export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const isAdmin = await authAdmin(userId);
    if (!isAdmin) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
    }

    const { storeId } = await request.json();

    if (!storeId) {
      return NextResponse.json({ error: "Missing Store ID" }, { status: 400 });
    }

    // find the store
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 400 });
    }

    // toggle store isActive
    await prisma.store.update({
      where: { id: storeId },
      data: { isActive: !store.isActive },
    });

    return NextResponse.json(
      { message: "Store updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 400 }
    );
  }
}
