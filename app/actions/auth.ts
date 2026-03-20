'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

function getString(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function signUp(formData: FormData) {
  const email = getString(formData.get('email'));
  const password = getString(formData.get('password'));
  const fullName = getString(formData.get('fullName'));
  const phone = getString(formData.get('phone'));
  const city = getString(formData.get('city'));

  if (!email || !password) {
    redirect('/registracija?error=Nedostaje email ili lozinka');
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone,
        city,
      },
    },
  });

  if (error) {
    redirect(`/registracija?error=${encodeURIComponent(error.message)}`);
  }

  const user = data.user;

  if (user) {
    const { error: profileError } = await supabase.from('profiles').upsert({
      id: user.id,
      full_name: fullName || null,
      phone: phone || null,
      city: city || null,
      role: 'user',
    });

    if (profileError) {
      redirect(
        `/registracija?error=${encodeURIComponent(profileError.message)}`,
      );
    }
  }

  redirect('/profil');
}

export async function signIn(formData: FormData) {
  const email = getString(formData.get('email'));
  const password = getString(formData.get('password'));

  if (!email || !password) {
    redirect('/prijava?error=Nedostaje email ili lozinka');
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`/prijava?error=${encodeURIComponent(error.message)}`);
  }

  redirect('/profil');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/prijava');
}
