import { NextRequest, NextResponse as res } from "next/server";
import prisma from "../../../../../prisma/client";
import schema from "./schema";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const role = await prisma.role.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!role) return res.json({ error: "نقش پیدا نشد" }, { status: 404 });

  return res.json({ role }, { status: 200 });
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const role = await prisma.role.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!role) return res.json({ error: "نقش پیدا نشد" }, { status: 404 });

  const body = await req.json();
  const parsedBody = schema.safeParse(body);

  if (!parsedBody.success)
    return res.json({ error: parsedBody.error }, { status: 400 });

  const updatedRole = await prisma.role.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      name: parsedBody.data.name,
      slug: parsedBody.data.slug,
    },
  });
  return res.json(
    { message: "نقش با موفقیت ویرایش شد", role: updatedRole },
    { status: 200 }
  );
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const role = await prisma.role.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!role) return res.json({ error: "نقش پیدا نشد" }, { status: 404 });

  await prisma.role.delete({
    where: {
      id: parseInt(params.id),
    },
  });
  return res.json(
    { message: "نقش با موفقیت حذف شد", role: role },
    { status: 200 }
  );
};
