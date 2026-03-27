import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const PROTECTED_ROUTE_PREFIXES = [
  '/profil',
  '/moji-oglasi',
  '/admin',
  '/obavestenja',
  '/odjava',
];

const CLEAR_RECOVERY_ON_ROUTES = ['/prijava', '/registracija'];

function startsWithAny(pathname: string, prefixes: string[]) {
  return prefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const recoveryMode = request.cookies.get('recovery_mode')?.value === '1';

  if (recoveryMode && !user) {
    response.cookies.set('recovery_mode', '', {
      path: '/',
      expires: new Date(0),
    });
    return response;
  }

  if (recoveryMode && CLEAR_RECOVERY_ON_ROUTES.includes(pathname)) {
    response.cookies.set('recovery_mode', '', {
      path: '/',
      expires: new Date(0),
    });
    return response;
  }

  const isProtectedRoute = startsWithAny(pathname, PROTECTED_ROUTE_PREFIXES);

  if (recoveryMode && user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/azuriraj-lozinku';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
