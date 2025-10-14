import { inngest } from "@/inngest/client";
import prisma from "@/lib/prisma";
import authAdmin from "@/middleware/authAdmin";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// GET all coupons
export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    const isAdmin = await authAdmin(userId);
    if (!isAdmin)
      return NextResponse.json({ error: "Not Authorized" }, { status: 401 });

    const coupons = await prisma.coupon.findMany();
    return NextResponse.json({ coupons }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 400 }
    );
  }
}

// POST add new coupon
export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const isAdmin = await authAdmin(userId);
    if (!isAdmin)
      return NextResponse.json({ error: "Not Authorized" }, { status: 401 });

    const { coupon } = await request.json();
    coupon.code = coupon.code.toUpperCase();

    await prisma.coupon.create({ data: coupon }).then(async (coupon) => {
      // run inngest scheduler function to delete the coupon on expiration
      await inngest.send({
        name: "app/coupon.expired",
        data: {
          code: coupon.code,
          expires_at: coupon.expiresAt,
        },
      });
    });

    return NextResponse.json(
      { message: "Coupon added successfully" },
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

// DELETE coupon by code
export async function DELETE(request) {
  try {
    const { userId } = getAuth(request);
    const isAdmin = await authAdmin(userId);
    if (!isAdmin)
      return NextResponse.json({ error: "Not Authorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code)
      return NextResponse.json(
        { error: "Coupon code required" },
        { status: 400 }
      );

    await prisma.coupon.delete({ where: { code } });

    return NextResponse.json(
      { message: "Coupon deleted successfully" },
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
