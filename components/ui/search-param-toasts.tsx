'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { toast } from 'sonner';

export function SearchParamToasts() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const success = searchParams.get('success');
    const error = searchParams.get('error');

    const disabledRoutes = ['/prijava', '/registracija'];
    const disableToast = disabledRoutes.includes(pathname);

    if (success && !disableToast) {
      toast.success(success);
    }

    if (error && !disableToast) {
      toast.error(error);
    }

    if ((success || error) && !disableToast) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('success');
      params.delete('error');

      const next = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;

      router.replace(next);
    }
  }, [searchParams, router, pathname]);

  return null;
}
