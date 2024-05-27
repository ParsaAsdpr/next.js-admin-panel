import { NextRequest, NextResponse as res } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;

  if (!token) return res.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/admin/:path*"],
};
