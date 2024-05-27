import { NextRequest, NextResponse as res } from "next/server";
import schema from "./schema";
import prisma from "../../../../prisma/client";
import bcrypt from "bcrypt";
import generateAuthToken from "../../../core/libs/generateWebToken";

export const POST = async (req: NextRequest) => {
  const parsedBody = schema.safeParse(await req.json());

  if (!parsedBody.success)
    return res.json({ error: parsedBody.error }, { status: 400 });

  const user = await prisma.user.findUnique({
    where: {
      email: parsedBody.data.email,
    },
  });

  if (!user) return res.json({ error: "کاربر پیدا نشد" }, { status: 404 });

  const validPassword = await bcrypt.compare(
    parsedBody.data.password,
    user.password
  );

  if (!validPassword)
    return res.json({ error: "رمز عبور اشتباه است" }, { status: 400 });

  if (!user.isActive)
    return res.json({ error: "حساب کاربری شما غیرفعال شده است" }, { status: 403 });

  const token = generateAuthToken({
    id: user.id,
    name: user.name,
    email: user.email,
    roleId: user.roleId,
    isActive: user.isActive,
  });

  return res.json({ token }, { status: 200 });
};
