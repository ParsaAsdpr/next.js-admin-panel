import { NextRequest, NextResponse as res } from "next/server";
import prisma from "../../../../../prisma/client";
import schema from "./schema";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
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

  if (!user) return res.json({ error: "کاربر پیدا نشد" }, { status: 404 });

  return res.json({ user }, { status: 200 });
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!user) return res.json({ error: "کاربر پیدا نشد" }, { status: 404 });

  const body = await req.json();
  const parsedBody = schema.safeParse(body);

  if (!parsedBody.success)
    return res.json({ error: parsedBody.error }, { status: 400 });

  const updatedUser = await prisma.user.update({
    where: {
      id: params.id,
    },
    data: {
      name: parsedBody.data.name,
      email: parsedBody.data.email,
      password: parsedBody.data.password,
      role: { connect: { id: parseInt(parsedBody.data.role) } },
      isActive: parsedBody.data.isActive,
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
  return res.json(
    { message: "کاربر با موفقیت ویرایش شد", user: updatedUser },
    { status: 200 }
  );
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
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

  if (!user) return res.json({ error: "کاربر پیدا نشد" }, { status: 404 });

  await prisma.user.delete({
    where: {
      id: params.id,
    },
  });
  return res.json(
    { message: "کاربر با موفقیت حذف شد", user: user },
    { status: 200 }
  );
};
