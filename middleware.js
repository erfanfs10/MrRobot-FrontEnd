// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  if (!req.auth) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
});

export const config = {
  matcher: [
    "/addresses/:path*",
    "/wishlist/:path*",
    "/checkout/:path*",
    "/orders/:path*",
  ],
};
