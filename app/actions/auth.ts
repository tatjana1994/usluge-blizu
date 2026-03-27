'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
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

async function clearRecoveryModeCookie() {
  const cookieStore = await cookies();

  cookieStore.set('recovery_mode', '', {
    path: '/',
    expires: new Date(0),
  });
}

export type SignInFormState = {
  error: string;
  email: string;
};

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

  await clearRecoveryModeCookie();
  redirect('/profil');
}

export async function signIn(
  _prevState: SignInFormState,
  formData: FormData,
): Promise<SignInFormState> {
  const email = getString(formData.get('email'));
  const password = getString(formData.get('password'));

  if (!email || !password) {
    return {
      error: 'Nedostaje email ili lozinka',
      email,
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: getSignInErrorMessage(error.message),
      email,
    };
  }

  await clearRecoveryModeCookie();
  redirect('/profil');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  await clearRecoveryModeCookie();
  redirect('/prijava');
}
