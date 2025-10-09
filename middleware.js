export { auth as middleware } from "@/auth"

export const config = {
  matcher: ["/addresses/:path*", "/wishlist/:path*"],
}
