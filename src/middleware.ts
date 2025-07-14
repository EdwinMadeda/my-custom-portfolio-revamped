import { NextResponse } from "next/server";

export function middleware() /*request: NextRequest*/ {
  // const { pathname } = request.nextUrl;

  // if (pathname === "/")
  //   return NextResponse.redirect(new URL("/hire", request.url));
  return NextResponse.next();
}
