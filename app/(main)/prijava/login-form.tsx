'use client';

import Link from 'next/link';
import { useActionState, useState } from 'react';
import { signIn, type SignInFormState } from '@/app/actions/auth';
import { inputClassName } from '@/lib/constants/ui';

const initialState: SignInFormState = {
  error: '',
  email: '',
};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, initialState);
  const [showPassword, setShowPassword] = useState(false);

  const error = state.error;

  const inputErrorClass = error
    ? 'border-red-300 focus:border-red-300 focus:ring-red-100'
    : 'border-stone-200 focus:border-rose-300 focus:ring-rose-100';

  return (
    <>
      {error ? (
        <div className='mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
          {error}
        </div>
      ) : null}

      <form key={state.email} action={formAction} className='mt-7 space-y-4'>
        <div>
          <label className='mb-2 block text-sm font-medium text-stone-700 sm:text-base'>
            Email
          </label>
          <input
            name='email'
            type='email'
            required
            defaultValue={state.email}
            aria-invalid={!!error}
            placeholder='Unesite email adresu'
            className={`${inputClassName} h-12 rounded-xl bg-white placeholder:text-stone-400 focus:ring-4 ${inputErrorClass}`}
          />
        </div>

        <div>
          <div className='mb-2 flex items-center justify-between gap-3'>
            <label className='block text-sm font-medium text-stone-700 sm:text-base'>
              Lozinka
            </label>

            <Link
              href='/zaboravljena-lozinka'
              className='text-sm font-medium text-rose-600 transition hover:text-rose-700 hover:underline'
            >
              Zaboravljena lozinka?
            </Link>
          </div>

          <div className='relative'>
            <input
              name='password'
              type={showPassword ? 'text' : 'password'}
              required
              aria-invalid={!!error}
              placeholder='••••••••'
              className={`${inputClassName} h-12 rounded-xl bg-white pr-12 placeholder:text-stone-400 focus:ring-4 ${inputErrorClass}`}
            />

            <button
              type='button'
              onClick={() => setShowPassword((prev) => !prev)}
              className='absolute inset-y-0 right-3 flex items-center text-stone-500 transition hover:text-stone-700'
              aria-label={showPassword ? 'Sakrij lozinku' : 'Prikaži lozinku'}
            >
              {showPassword ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.8}
                  stroke='currentColor'
                  className='h-5 w-5 cursor-pointer'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3 3l18 18'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M10.477 10.486a3 3 0 004.037 4.037'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9.88 5.09A10.45 10.45 0 0112 4.875c4.478 0 8.268 2.943 9.543 7.003a10.722 10.722 0 01-4.13 5.411M6.228 6.228A10.723 10.723 0 002.457 11.878a10.723 10.723 0 005.086 6.18A10.45 10.45 0 0012 19.125c1.628 0 3.168-.371 4.543-1.03'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.8}
                  stroke='currentColor'
                  className='h-5 w-5 cursor-pointer'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 4.875 12 4.875c4.638 0 8.573 2.633 9.963 6.803.07.207.07.431 0 .638C20.577 16.49 16.64 19.125 12 19.125c-4.638 0-8.573-2.633-9.964-6.803z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          type='submit'
          disabled={pending}
          className='w-full cursor-pointer rounded-xl bg-rose-500 px-4 py-3.5 text-lg font-bold text-white transition duration-200 hover:bg-rose-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70'
        >
          {pending ? 'Prijavljivanje...' : 'Prijavi se'}
        </button>
      </form>
    </>
  );
}
