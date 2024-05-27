import { NextRequest, NextResponse as res } from "next/server";
import prisma from "../../../../prisma/client";
import schema from "./schema";
import bcrypt from "bcrypt";
import generateAuthToken from "../../../core/libs/generateWebToken";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const searchQuery = searchParams.get("search")
    ? decodeURI(searchParams.get("search"))
    : null;

  const sort = {
    id: searchParams.get("sortBy"),
    order: searchParams.get("sortOrder"),
  };

  const getUsers = async () => {
    if (searchQuery) {
      const users = await prisma.user.findMany({
        where: {
          name: {
            contains: searchQuery,
          },
        },
        orderBy: {
          [sort.id ? sort.id : "name"]: sort.order ? sort.order : "asc",
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

      // if no user found by name, search by email
      if (users.length === 0) {
        const users = await prisma.user.findMany({
          where: {
            email: {
              contains: searchQuery,
            },
          },
          orderBy: {
            [sort.id ? sort.id : "email"]: sort.order ? sort.order : "asc",
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
        return users;
      }
      return users;
    } else {
      const users = await prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sort.id ? sort.id : "name"]: sort.order ? sort.order : "asc",
        },
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
      return users;
    }
  };

  const users = await getUsers();

  const totalUsers = await prisma.user.count();

  if (!users || totalUsers === 0)
    return res.json({ error: "کاربری موجود نیست" }, { status: 404 });

  return res.json(
    {
      page,
      limit,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      data: users,
    },
    { status: 200 }
  );
};

export const POST = async (req: NextRequest) => {
  const parsedBody = schema.safeParse(await req.json());

  if (!parsedBody.success)
    return res.json({ error: parsedBody.error }, { status: 400 });

  const user = await prisma.user.findUnique({
    where: {
      email: parsedBody.data.email,
    },
  });

  if (user)
    return res.json({ error: "کاربری با این نام وجود دارد" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(parsedBody.data.password, 10);
  const newUser = await prisma.user.create({
    data: {
      name: parsedBody.data.name,
      email: parsedBody.data.email,
      password: hashedPassword,
      role: {
        connect: {
          id: parsedBody.data.role ? parseInt(parsedBody.data.role) : 1,
        },
      },
      isActive: parsedBody.data.isActive,
    },
    select: {
      id: true,
      name: true,
      email: true,
      roleId: true,
      createdAt: true,
      lastLogin: true,
    },
  });

  const token = generateAuthToken(newUser);

  return res.json(
    { message: "کاربر با موفقیت ایجاد شد", user: newUser },
    { status: 201, headers: { "x-auth-token": token } }
  );
};
