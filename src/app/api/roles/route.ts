import { NextRequest, NextResponse as res } from "next/server";
import prisma from "../../../../prisma/client";
import schema from "./schema";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const searchQuery = searchParams.get("search");
  const sort = {
    id: searchParams.get("sortBy"),
    order: searchParams.get("sortOrder"),
  };

  let roles;

  if (searchQuery) {
    roles = await prisma.role.findMany({
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
        slug: true,
        createdAt: true,
      },
    });

    // If no roles are found by name, search by slug
    if (roles.length === 0) {
      roles = await prisma.role.findMany({
        where: {
          slug: {
            contains: searchQuery,
          },
        },
        orderBy: {
          [sort.id ? sort.id : "slug"]: sort.order ? sort.order : "asc",
        },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          name: true,
          slug: true,
          createdAt: true,
        },
      });
    }
  } else {
    roles = await prisma.role.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sort.id ? sort.id : "name"]: sort.order ? sort.order : "asc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
        createdAt: true,
      },
    });
  }

  const totalRoles = await prisma.role.count();
  if (!roles || totalRoles === 0)
    return res.json({ error: "هیچ نقشی وجود ندارد" }, { status: 404 });

  return res.json(
    {
      page,
      limit,
      totalRoles,
      totalPages: Math.ceil(totalRoles / limit),
      data: roles,
    },
    { status: 200 }
  );
};

export const POST = async (req: Request) => {
  const parsedBody = schema.safeParse(await req.json());
  if (!parsedBody.success)
    return res.json({ error: parsedBody.error }, { status: 400 });

  const role = await prisma.role.create({
    data: {
      name: parsedBody.data.name,
      slug: parsedBody.data.slug,
    },
  });
  return res.json({ message: "نقش با موفقیت ایجاد شد", role }, { status: 200 });
};
