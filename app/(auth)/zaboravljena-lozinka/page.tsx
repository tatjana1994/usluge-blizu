'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function ZaboravljenaLozinkaPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    let mounted = true;

    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) return;

      if (user) {
        router.replace('/profil');
        return;
      }

      setCheckingAuth(false);
    }

    checkUser();

    return () => {
      mounted = false;
    };
  }, [router, supabase]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const redirectTo =
      typeof window !== 'undefined'
        ? `${window.location.origin}/azuriraj-lozinku`
        : undefined;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      setError('Došlo je do greške. Pokušaj ponovo.');
      setLoading(false);
      return;
    }

    setSuccess(
      'Poslali smo ti email sa linkom za promenu lozinke. Proveri inbox i spam folder.',
    );
    setLoading(false);
  }

  if (checkingAuth) {
    return (
      <main className='min-h-screen bg-[var(--background)]'>
        <section className='mx-auto flex min-h-screen max-w-[800px] items-center px-4 py-10 sm:px-6 lg:px-8'>
          <div className='mx-auto w-full rounded-[28px] border border-stone-200/80 bg-white p-4 shadow-[0_20px_60px_rgba(28,28,28,0.08)] sm:p-8'>
            <div className='rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600'>
              Proveravamo nalog...
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-[var(--background)]'>
      <section className='mx-auto flex min-h-screen max-w-[800px] items-center px-4 py-10 sm:px-6 lg:px-8'>
        <div className='mx-auto w-full rounded-[28px] border border-stone-200/80 bg-white p-4 shadow-[0_20px_60px_rgba(28,28,28,0.08)] sm:p-8'>
          <p className='text-center text-sm font-bold uppercase tracking-[0.16em] text-rose-600'>
            Reset lozinke
          </p>

          <h1 className='mt-3 text-center text-3xl font-bold tracking-tight text-stone-900'>
            Zaboravljena lozinka
          </h1>

          <p className='mt-3 text-center text-sm leading-6 text-stone-600'>
            Unesi email adresu i poslaćemo ti link za postavljanje nove lozinke.
          </p>

          {error ? (
            <div className='mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
              {error}
            </div>
          ) : null}

          {success ? (
            <div className='mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700'>
              {success}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className='mt-7 space-y-4'>
            <div>
              <input
                type='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Unesite email adresu'
                className='h-12 w-full rounded-xl border border-stone-200 bg-white px-4 outline-none placeholder:text-stone-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100'
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='mx-auto flex w-[250px] justify-center rounded-xl bg-rose-500 px-4 py-3.5 text-lg font-bold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-70'
            >
              {loading ? 'Slanje...' : 'Pošalji link'}
            </button>
          </form>

          <p className='mt-6 text-center text-sm text-stone-600'>
            Sećaš se lozinke?{' '}
            <Link
              href='/prijava'
              className='font-bold text-rose-600 hover:text-rose-700 hover:underline'
            >
              Nazad na prijavu
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
