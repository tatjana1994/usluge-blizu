'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

function getString(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value.trim() : '';
}

function getSignInErrorMessage(message: string) {
  const normalized = message.toLowerCase();

  if (
    normalized.includes('invalid login credentials') ||
    normalized.includes('invalid_credentials')
  ) {
    return 'Email ili lozinka nisu ispravni';
  }

  if (normalized.includes('email not confirmed')) {
    return 'Email adresa još nije potvrđena';
  }

  return 'Prijava nije uspela. Pokušaj ponovo';
}

export async function signUp(formData: FormData) {
  const email = getString(formData.get('email'));
  const password = getString(formData.get('password'));
  const fullName = getString(formData.get('fullName'));
  const phone = getString(formData.get('phone'));
  const city = getString(formData.get('city'));

  if (!email || !password) {
    redirect(
      `/registracija?error=${encodeURIComponent(
        'Nedostaje email ili lozinka',
      )}`,
    );
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
    redirect(
      `/prijava?error=${encodeURIComponent('Nedostaje email ili lozinka')}`,
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    const friendlyMessage = getSignInErrorMessage(error.message);
    redirect(`/prijava?error=${encodeURIComponent(friendlyMessage)}`);
  }

  redirect('/profil');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/prijava');
}
