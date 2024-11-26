// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";
// import createMiddleware from 'next-intl/middleware';

// const intlMiddleware = createMiddleware({
//   locales: ['pl', 'en'],
//   defaultLocale: 'pl'
// });

// export default withAuth(
//   async function middleware(req) {
//     // Internacjonalizacja
//     const intlResponse = intlMiddleware(req);
//     if (intlResponse) return intlResponse;

//     // Autoryzacja
//     const url = req.nextUrl.pathname;
//     const userRole = req?.nextauth?.token?.user?.role;

//     if (url.startsWith("/admin") && userRole !== "admin") {
//       return NextResponse.redirect(new URL("/", req.url));
//     }

//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token,
//     },
//   }
// );

// export const config = {
//   matcher: ['/', '/(pl|en)/:path*', '/admin/:path*', ],
// };


import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ['pl', 'en'],
  defaultLocale: 'pl',
  // localePrefix: 'as-needed',
  // localeDetection: false
});


export default async function middleware(req) {
  // Internacjonalizacja
  const intlResponse = intlMiddleware(req);
  if (intlResponse) return intlResponse;

  const url = req.nextUrl.pathname;
  if (url === "/" || url.startsWith("/admin")) {
    const authMiddleware = withAuth(
      async function (req) {
        const userRole = req?.nextauth?.token?.user?.role;

        if (url.startsWith("/admin") && userRole !== "admin") {
          return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.next();
      },
      {
        callbacks: {
          authorized: ({ token }) => !!token,
        },
      }
    );

    return authMiddleware(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/(pl|en)/:path*', '/admin/:path*'],
};