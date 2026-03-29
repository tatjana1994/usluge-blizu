'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { inputClassName } from '@/lib/constants/ui';

type SearchInputProps = {
  paramName?: string;
  placeholder?: string;
  debounceMs?: number;
  label?: string;
};

export function SearchInput({
  paramName = 'q',
  placeholder = 'Pretraži oglase...',
  debounceMs = 400,
  label,
}: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentValue = searchParams.get(paramName) ?? '';
  const [value, setValue] = useState(currentValue);

  const isFirstRender = useRef(true);

  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timeout = setTimeout(() => {
      const trimmedValue = value.trim();
      const currentParamValue = searchParams.get(paramName) ?? '';

      if (trimmedValue === currentParamValue) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());

      if (trimmedValue) {
        params.set(paramName, trimmedValue);
      } else {
        params.delete(paramName);
      }

      params.delete('page');

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    }, debounceMs);

    return () => clearTimeout(timeout);
  }, [value, debounceMs, pathname, router, searchParams, paramName]);

  return (
    <div>
      {label ? (
        <label className='mb-1.5 block text-sm font-medium text-stone-700'>
          {label}
        </label>
      ) : null}

      <div className='relative'>
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={`${inputClassName} pr-20`}
        />

        {value ? (
          <button
            type='button'
            onClick={() => setValue('')}
            className='absolute right-10 top-1/2 -translate-y-1/2 text-sm text-stone-400 transition hover:text-stone-700'
            aria-label='Obriši pretragu'
          >
            ✕
          </button>
        ) : null}

        <svg
          className='pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.8'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m21 21-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
      </div>
    </div>
  );
}
