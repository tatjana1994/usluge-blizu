'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

function getString(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/prijava');
  }

  const fullName = getString(formData.get('fullName'));
  const phone = getString(formData.get('phone'));
  const city = getString(formData.get('city'));

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: fullName || null,
      phone: phone || null,
      city: city || null,
    })
    .eq('id', user.id);

  if (error) {
    redirect(`/profil?error=${encodeURIComponent(error.message)}`);
  }

  redirect('/profil?success=Profil je uspesno sacuvan');
}
