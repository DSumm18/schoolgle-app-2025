import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => req.cookies.get(name)?.value,
        set: (name, value, options) => {
          res.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove: (name, options) => {
          res.cookies.delete({
            name,
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Define route types
  const isAuthRoute = req.nextUrl.pathname.startsWith("/auth")
  const isApiRoute = req.nextUrl.pathname.startsWith("/api")
  const isPublicRoute = req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/marketing"
  const isModuleRoute = [
    "/dashboard",
    "/teaching",
    "/send",
    "/finance",
    "/estates",
    "/hr",
    "/reports",
  ].some((path) => req.nextUrl.pathname.startsWith(path))
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")

  // Redirect if logged in and trying to access auth routes
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // Allow access to public routes and API routes
  if (isPublicRoute || isApiRoute) {
    return res
  }

  // Redirect to login if not logged in and trying to access protected routes
  if (!session && (isModuleRoute || isAdminRoute)) {
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }

  return res
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}