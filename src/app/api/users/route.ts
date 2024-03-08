import { NextRequest, NextResponse as res } from "next/server";
import prisma from "../../../../prisma/client";
import userSchema from "./schema";
import bcrypt from "bcrypt";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const searchQuery = searchParams.get("search");

  let users;

  if (searchQuery) {
    users = await prisma.users.findMany({
      where: {
        name: {
          contains: searchQuery,
        },
        email: {
          contains: searchQuery,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        lastLogin: true,
        isActive: true,
      },
    });
  } else {
    users = await prisma.users.findMany({
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        lastLogin: true,
        isActive: true,
      },
    });
  }

  const totalUsers = await prisma.users.count();

  if (!users || totalUsers === 0)
    return res.json({ error: "کاربری موجود نیست" }, { status: 404 });

  return res.json(
    {
      page,
      limit,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      users,
    },
    { status: 200 }
  );
};

export const POST = async (req: NextRequest) => {
  const parsedBody = userSchema.safeParse(await req.json());

  if (!parsedBody.success) return res.json(parsedBody.error, { status: 400 });

  const user = await prisma.users.findUnique({
    where: {
      email: parsedBody.data.email,
    },
  });

  if (user) return res.json({ error: "کاربری با این نام وجود دارد" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(parsedBody.data.password, 10);
  const newUser = await prisma.users.create({
    data: {
      name: parsedBody.data.name,
      email: parsedBody.data.email,
      password: hashedPassword,
      role: parsedBody.data.role,
      isActive: parsedBody.data.isActive,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      lastLogin: true,
    },
  });

  return res.json({ user: newUser }, { status: 201 });
};
