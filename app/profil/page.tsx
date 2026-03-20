import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { LogoutButton } from '@/components/auth/logout-button';
import { updateProfile } from '@/app/actions/profile';
import { Container } from '@/components/layout/container';
import { SectionCard } from '@/components/ui/section-card';
import { inputClassName } from '@/lib/constants/ui';

export default async function ProfilPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const params = await searchParams;
  const success = params.success;
  const errorMessage = params.error;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/prijava');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <main className='min-h-screen bg-white py-16'>
      <Container className='max-w-5xl'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
            <div>
              <p className='text-sm font-medium text-blue-600'>Moj profil</p>
              <h1 className='mt-2 text-4xl font-semibold tracking-tight text-gray-900'>
                Zdravo, {profile?.full_name || user.email}
              </h1>
              <p className='mt-3 max-w-2xl text-base leading-7 text-gray-600'>
                Upravljaj svojim osnovnim podacima i nalogom na platformi
                UslugeBlizu.
              </p>
            </div>

            <div className='shrink-0'>
              <LogoutButton />
            </div>
          </div>

          {success ? (
            <div className='rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700'>
              {success}
            </div>
          ) : null}

          {errorMessage ? (
            <div className='rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
              {errorMessage}
            </div>
          ) : null}

          <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
            <SectionCard className='p-5'>
              <p className='text-xs font-medium uppercase tracking-wide text-gray-500'>
                Email
              </p>
              <p className='mt-2 break-all text-sm font-medium text-gray-900'>
                {user.email}
              </p>
            </SectionCard>

            <SectionCard className='p-5'>
              <p className='text-xs font-medium uppercase tracking-wide text-gray-500'>
                Telefon
              </p>
              <p className='mt-2 text-sm font-medium text-gray-900'>
                {profile?.phone || 'Nije unet'}
              </p>
            </SectionCard>

            <SectionCard className='p-5'>
              <p className='text-xs font-medium uppercase tracking-wide text-gray-500'>
                Grad
              </p>
              <p className='mt-2 text-sm font-medium text-gray-900'>
                {profile?.city || 'Nije unet'}
              </p>
            </SectionCard>

            <SectionCard className='p-5'>
              <p className='text-xs font-medium uppercase tracking-wide text-gray-500'>
                Uloga
              </p>
              <p className='mt-2 text-sm font-medium capitalize text-gray-900'>
                {profile?.role || 'user'}
              </p>
            </SectionCard>
          </div>

          <SectionCard className='p-8'>
            <div className='mb-6'>
              <h2 className='text-2xl font-semibold tracking-tight text-gray-900'>
                Osnovni podaci
              </h2>
              <p className='mt-2 text-sm leading-6 text-gray-600'>
                Ažuriraj informacije koje će biti povezane sa tvojim nalogom i
                oglasima.
              </p>
            </div>

            <form action={updateProfile} className='grid gap-5 sm:grid-cols-2'>
              <div className='sm:col-span-2'>
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Email
                </label>
                <input
                  value={user.email ?? ''}
                  disabled
                  className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none'
                />
              </div>

              <div>
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Ime i prezime
                </label>
                <input
                  name='fullName'
                  defaultValue={profile?.full_name ?? ''}
                  placeholder='Tatjana Devrnja'
                  className={inputClassName}
                />
              </div>

              <div>
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Telefon
                </label>
                <input
                  name='phone'
                  defaultValue={profile?.phone ?? ''}
                  placeholder='06x xxx xxxx'
                  className={inputClassName}
                />
              </div>

              <div>
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Grad
                </label>
                <input
                  name='city'
                  defaultValue={profile?.city ?? ''}
                  placeholder='Subotica'
                  className={inputClassName}
                />
              </div>

              <div className='sm:col-span-2'>
                <button
                  type='submit'
                  className='rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700'
                >
                  Sačuvaj izmene
                </button>
              </div>
            </form>
          </SectionCard>
        </div>
      </Container>
    </main>
  );
}
