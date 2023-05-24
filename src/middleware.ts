import type { NextMiddleware } from "next/server";
import { NextResponse } from "next/server";

import { getMiddlewareSession } from "~lib/supabase/middleware";

const authRoutes: string[] = ["/login", "/register", "/forgot-password"];

const protectedRoutes: string[] = ["/reset-password", "/settings", "/prices", "/orders", "/new-order"];

const adminProtectedRoutes: string[] = [...protectedRoutes, "/customers", "/order-requests", "/orders-history"];

export const middleware: NextMiddleware = async (req) => {
  const res = NextResponse.next();

  const session = await getMiddlewareSession({ req, res });

  if (session) {
    if (!session.user.is_admin && adminProtectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (authRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/settings", req.url));
    }

    return res;
  } else {
    if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return res;
  }
};
