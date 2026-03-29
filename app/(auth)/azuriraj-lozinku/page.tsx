'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

function setRecoveryModeCookie() {
  document.cookie = 'recovery_mode=1; Path=/; SameSite=Lax';
}

function clearRecoveryModeCookie() {
  document.cookie =
    'recovery_mode=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
}

function hasRecoveryParams() {
  if (typeof window === 'undefined') return false;

  const hash = window.location.hash || '';
  const search = window.location.search || '';

  return (
    hash.includes('type=recovery') ||
    search.includes('type=recovery') ||
    hash.includes('access_token=') ||
    search.includes('access_token=')
  );
}

export default function AzurirajLozinkuPage() {
  const supabase = createClient();
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    let mounted = true;

    async function checkAccess() {
      const recoveryFlow = hasRecoveryParams();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) return;

      // Ako nije recovery flow:
      // - ulogovan user ide na profil
      // - neulogovan user ide na zaboravljena-lozinka
      if (!recoveryFlow) {
        clearRecoveryModeCookie();

        if (user) {
          router.replace('/profil');
        } else {
          router.replace('/zaboravljena-lozinka');
        }
        return;
      }

      // Ako jeste recovery flow, ostajemo na stranici
      setRecoveryModeCookie();
      setCheckingSession(false);
    }

    checkAccess();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setRecoveryModeCookie();
        setCheckingSession(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password.length < 8) {
      setError('Lozinka mora imati najmanje 8 karaktera.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Lozinke se ne poklapaju.');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError('Nismo uspeli da promenimo lozinku. Pokušaj ponovo.');
      setLoading(false);
      return;
    }

    clearRecoveryModeCookie();
    await supabase.auth.signOut();

    setSuccess('Lozinka je uspešno promenjena. Preusmeravamo te na prijavu...');

    setTimeout(() => {
      router.replace('/prijava');
    }, 1500);
  }

  if (checkingSession) {
    return (
      <main className='min-h-screen bg-[var(--background)]'>
        <section className='mx-auto flex min-h-screen max-w-[800px] items-center px-4 py-10 sm:px-6 lg:px-8'>
          <div className='mx-auto w-full rounded-[28px] border border-stone-200/80 bg-white p-4 shadow-[0_20px_60px_rgba(28,28,28,0.08)] sm:p-8'>
            <div className='rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600'>
              Proveravamo pristup...
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-[var(--background)]'>
      <section className='mx-auto flex max-w-[800px] min-h-none items-center px-4 pt-20 sm:px-6 lg:px-8 md:min-h-screen md:pt-0'>
        <div className='mx-auto w-full rounded-[28px] border border-stone-200/80 bg-white p-4 shadow-[0_20px_60px_rgba(28,28,28,0.08)] sm:p-8'>
          <p className='text-center text-sm font-bold uppercase tracking-[0.16em] text-rose-600'>
            Nova lozinka
          </p>

          <h1 className='mt-3 text-center text-3xl font-bold tracking-tight text-stone-900'>
            Postavi novu lozinku
          </h1>

          <p className='mt-3 text-center text-sm leading-6 text-stone-600'>
            Unesi novu lozinku za svoj nalog.
          </p>

          {checkingSession ? (
            <div className='mt-5 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600'>
              Proveravamo reset link...
            </div>
          ) : null}

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

          {!checkingSession && !success ? (
            <form onSubmit={handleSubmit} className='mt-7 space-y-4'>
              <div>
                <label className='mb-2 block text-sm font-medium text-stone-700'>
                  Nova lozinka
                </label>
                <input
                  type='password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Minimum 8 karaktera'
                  className='h-12 w-full rounded-xl border border-stone-200 bg-white px-4 outline-none placeholder:text-stone-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100'
                />
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium text-stone-700'>
                  Potvrdi novu lozinku
                </label>
                <input
                  type='password'
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder='Ponovi lozinku'
                  className='h-12 w-full rounded-xl border border-stone-200 bg-white px-4 outline-none placeholder:text-stone-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100'
                />
              </div>

              <button
                type='submit'
                disabled={loading}
                className='mx-auto flex w-full cursor-pointer justify-center rounded-xl bg-rose-500 px-4 py-3.5 text-lg font-bold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-70 md:w-[250px]'
              >
                {loading ? 'Čuvanje...' : 'Sačuvaj novu lozinku'}
              </button>
            </form>
          ) : null}
        </div>
      </section>
    </main>
  );
}
