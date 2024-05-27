import { NextRequest, NextResponse as res } from "next/server";
import prisma from "../../../../prisma/client";
import { jwtDecode } from "jwt-decode";
import User from "../../../core/types/User";
import schema from "./schema";

export const GET = async (req: NextRequest) => {
  const token = req.headers.get("x-auth-token");

  if (!token)
    return res.json(
      { error: "لطفا وارد حساب کاربری خود شوید" },
      { status: 401 }
    );

  const user: User = jwtDecode(token);

  const notifications = await prisma.notification.findMany({
    where: {
      receiverId: user.id,
    },
    orderBy: {
      sentAt: "desc",
    },
  });

  if (!notifications || notifications.length === 0)
    return new Response(null, {
      status: 204,
    });

  return res.json({ message: "اعلان ها", notifications }, { status: 200 });
};

export const POST = async (req: NextRequest) => {
  const token = req.headers.get("x-auth-token");

  if (!token)
    return res.json(
      { error: "لطفا وارد حساب کاربری خود شوید" },
      { status: 401 }
    );

  const decodedToken: User = jwtDecode(token);
  const userId = decodedToken.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      role: true,
    },
  });

  if (!user)
    return res.json({ error: "حساب کاربری شما پیدا نشد" }, { status: 404 });

  if (user.role.slug !== "admin")
    return res.json(
      { error: "شما به این صفحه دسترسی ندارید" },
      { status: 403 }
    );

  const body = await req.json();
  const parsedBody = schema.safeParse(body);

  if (!parsedBody.success)
    return res.json({ error: parsedBody.error }, { status: 400 });

  if (parsedBody.data.allUsers) {
    const users = await prisma.user.findMany({
      select: {
        id: true,
      },
    });

    users.forEach(async (user) => {
      await prisma.notification.create({
        data: {
          body: parsedBody.data.body,
          receiverId: user.id,
        },
      });
    });
    return res.json({ message: "تمام اعلان ها ایجاد شدند" }, { status: 200 });
  }

  const notifications = await prisma.notification.createMany({
    data: parsedBody.data.receivers.map((receiver) => {
      return {
        body: parsedBody.data.body,
        receiverId: receiver.value,
      };
    }),
  });

  return res.json(
    { message: "اعلان ها ایجاد شدند", notifications },
    { status: 200 }
  );
};

export const PATCH = async (req: NextRequest) => {
  const token = req.headers.get("x-auth-token");

  if (!token)
    return res.json(
      { error: "لطفا وارد حساب کاربری خود شوید" },
      { status: 401 }
    );

  const user: User = jwtDecode(token);

  const notifications = await prisma.notification.findMany({
    where: {
      receiverId: user.id,
    },
  });

  if (!notifications)
    return res.json({ error: "اعلانی یافت نشد." }, { status: 404 });

  await prisma.notification.updateMany({
    where: {
      receiverId: user.id,
    },
    data: {
      isRead: true,
    },
  });

  return res.json({ message: "تمام اعلان ها خوانده شدند" }, { status: 200 });
};
