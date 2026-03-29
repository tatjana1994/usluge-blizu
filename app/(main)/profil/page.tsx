import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { LogoutButton } from '@/components/auth/logout-button';
import { updateProfile } from '@/app/actions/profile';
import { Container } from '@/components/layout/container';
import { SectionCard } from '@/components/ui/section-card';
import { ProfileForm } from '@/components/profile/profile-form';

export const metadata = {
  title: 'Profil | UslugeBlizu',
  description: 'Pregled i podešavanja vašeg naloga na platformi UslugeBlizu.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProfilPage() {
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

  const displayRole =
    profile?.role === 'admin'
      ? 'Administrator'
      : profile?.role === 'user'
        ? 'Korisnik'
        : profile?.role || 'Korisnik';

  return (
    <main className='min-h-screen bg-[var(--background)]'>
      <section className='relative overflow-hidden border-b border-[var(--border)] bg-[#fff7f2]'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,110,121,0.16),transparent_28%)]' />
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(233,213,203,0.65),transparent_30%)]' />

        <Container className='relative max-w-5xl py-16 lg:py-20'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
              <div>
                <div className='inline-flex items-center rounded-full border border-rose-200 bg-white/90 px-3 py-1 text-sm font-medium text-rose-600 shadow-sm'>
                  Moj profil
                </div>

                <h1 className='mt-4 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl'>
                  Profil i osnovni podaci
                </h1>

                <p className='mt-4 max-w-2xl text-lg leading-8 text-stone-600'>
                  Pregled naloga, izmena podataka i upravljanje profilom na
                  platformi UslugeBlizu.
                </p>
                <div className='mt-6 flex items-center gap-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-600'>
                    {profile?.full_name?.charAt(0) || user.email?.charAt(0)}
                  </div>

                  <p className='text-2xl font-bold text-stone-900'>
                    {profile?.full_name || user.email}
                  </p>
                </div>
              </div>

              <div className='shrink-0'>
                <LogoutButton />
              </div>
            </div>

            <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
              <SectionCard className='border-stone-200 bg-white/95 p-5 shadow-sm'>
                <p className='text-xs font-medium uppercase tracking-wide text-stone-500'>
                  Email
                </p>
                <p className='mt-2 break-all text-sm font-medium text-stone-900'>
                  {user.email}
                </p>
              </SectionCard>

              <SectionCard className='border-stone-200 bg-white/95 p-5 shadow-sm'>
                <p className='text-xs font-medium uppercase tracking-wide text-stone-500'>
                  Telefon
                </p>
                <p className='mt-2 text-sm font-medium text-stone-900'>
                  {profile?.phone || 'Nema podatka'}
                </p>
              </SectionCard>

              <SectionCard className='border-stone-200 bg-white/95 p-5 shadow-sm'>
                <p className='text-xs font-medium uppercase tracking-wide text-stone-500'>
                  Grad
                </p>
                <p className='mt-2 text-sm font-medium text-stone-900'>
                  {profile?.city || 'Nema podatka'}
                </p>
              </SectionCard>

              <SectionCard className='border-stone-200 bg-white/95 p-5 shadow-sm'>
                <p className='text-xs font-medium uppercase tracking-wide text-stone-500'>
                  Uloga
                </p>
                <p className='mt-2 text-sm font-medium text-stone-900'>
                  {displayRole}
                </p>
              </SectionCard>
            </div>

            <SectionCard className='border-stone-200 bg-white/95 p-4 shadow-lg'>
              <div className='mb-6'>
                <p className='text-md font-medium text-rose-600'>
                  Podešavanja profila
                </p>
                <h2 className='mt-2 text-3xl font-bold tracking-tight text-stone-900'>
                  Osnovni podaci
                </h2>
                <p className='mt-2 text-md leading-6 text-stone-600'>
                  Ažuriranje informacija povezanih sa nalogom i oglasima.
                </p>
              </div>
              <ProfileForm
                user={user}
                profile={profile}
                action={updateProfile}
              />
            </SectionCard>
          </div>
        </Container>
      </section>
    </main>
  );
}
