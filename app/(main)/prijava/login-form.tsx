'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { signIn, type SignInFormState } from '@/app/actions/auth';
import { inputClassName } from '@/lib/constants/ui';

const initialState: SignInFormState = {
  error: '',
  email: '',
};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

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

          <input
            name='password'
            type='password'
            required
            aria-invalid={!!error}
            placeholder='••••••••'
            className={`${inputClassName} h-12 rounded-xl bg-white placeholder:text-stone-400 focus:ring-4 ${inputErrorClass}`}
          />
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
