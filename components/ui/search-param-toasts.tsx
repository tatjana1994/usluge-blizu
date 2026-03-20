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

    if (success) {
      toast.success(success);
    }

    if (error) {
      toast.error(error);
    }

    if (success || error) {
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
