import imagekit from "@/configs/imagekit";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const formData = await request.formData();
    const name = formData.get("name");
    const username = formData
      .get("username")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");
    const description = formData.get("description");
    const email = formData.get("email");
    const contact = formData.get("contact");
    const address = formData.get("address");
    const image = formData.get("image");

    if (
      !name ||
      !username ||
      !description ||
      !email ||
      !contact ||
      !address ||
      !image
    ) {
      return NextResponse.json(
        {
          error: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    //check is user have already registered a store

    const store = await prisma.store.findFirst({
      where: {
        userId: userId,
      },
    });

    if (store) {
      return NextResponse.json({
        status: store.status,
      });
    }

    const isUserNameTaken = await prisma.store.findFirst({
      where: {
        username: username,
      },
    });

    if (isUserNameTaken) {
      return NextResponse.json(
        {
          error: "Username is already taken",
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const response = await imagekit.upload({
      file: buffer,
      fileName: image.name,
      folder: "logos",
    });

    const optimizedImage = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "512" },
      ],
    });

    const newStore = await prisma.store.create({
      data: {
        userId,
        name,
        username,
        description,
        email,
        contact,
        address,
        logo: optimizedImage,
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        store: { connect: { id: newStore.id } },
      },
    });

    return NextResponse.json({
      message: "Applied Successfully, Wait for approval",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 400 }
    );
  }
}

// check is user have already registered a store if yes then send of store

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    // check is user have already registered a store
    const store = await prisma.store.findFirst({
      where: {
        userId: userId,
      },
    });

    if (store) {
      return NextResponse.json({
        status: store.status,
      });
    }

    return NextResponse.json({
      status: "Not Registered",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 400 }
    );
  }
}
