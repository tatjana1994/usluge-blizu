import { Container } from '@/components/layout/container';
import { createClient } from '@/lib/supabase/server';

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className='min-h-screen bg-white'>
      <Container className='py-20'>
        <p className='mb-3 text-sm font-medium text-blue-600'>UslugeBlizu</p>
        <h1 className='text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl'>
          Lokalне usluge blizu tebe
        </h1>
        <p className='mt-5 text-lg leading-8 text-gray-600'>
          Supabase konekcija radi.
        </p>

        <div className='mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-700'>
          Trenutni user: {user ? user.email : 'nije prijavljen'}
        </div>
      </Container>
    </main>
  );
}
