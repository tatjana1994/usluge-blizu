'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { slugify } from '@/lib/utils/slugify';

function getString(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function createListing(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/prijava');
  }

  const type = getString(formData.get('type'));
  const title = getString(formData.get('title'));
  const description = getString(formData.get('description'));
  const categoryId = getString(formData.get('categoryId'));
  const city = getString(formData.get('city'));
  const area = getString(formData.get('area'));
  const priceRaw = getString(formData.get('price'));
  const contactName = getString(formData.get('contactName'));
  const contactPhone = getString(formData.get('contactPhone'));
  const contactEmail = getString(formData.get('contactEmail'));

  if (
    !type ||
    !title ||
    !description ||
    !categoryId ||
    !city ||
    !contactName ||
    !contactPhone
  ) {
    redirect('/postavi?error=Nisu popunjena sva obavezna polja');
  }

  if (type !== 'trazim' && type !== 'nudim') {
    redirect('/postavi?error=Neispravan tip oglasa');
  }

  const baseSlug = slugify(title);
  const uniqueSlug = `${baseSlug}-${Date.now()}`;

  const price =
    priceRaw && !Number.isNaN(Number(priceRaw)) ? Number(priceRaw) : null;

  const { error } = await supabase.from('listings').insert({
    user_id: user.id,
    type,
    title,
    slug: uniqueSlug,
    description,
    category_id: categoryId,
    city,
    area: area || null,
    price,
    contact_name: contactName,
    contact_phone: contactPhone,
    contact_email: contactEmail || null,
    status: 'pending',
  });

  if (error) {
    redirect(`/postavi?error=${encodeURIComponent(error.message)}`);
  }

  redirect('/moji-oglasi?success=Oglas je uspesno poslat na pregled');
}

export async function updateListing(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/prijava');
  }

  const id = getString(formData.get('id'));
  const type = getString(formData.get('type'));
  const title = getString(formData.get('title'));
  const description = getString(formData.get('description'));
  const categoryId = getString(formData.get('categoryId'));
  const city = getString(formData.get('city'));
  const area = getString(formData.get('area'));
  const priceRaw = getString(formData.get('price'));
  const contactName = getString(formData.get('contactName'));
  const contactPhone = getString(formData.get('contactPhone'));
  const contactEmail = getString(formData.get('contactEmail'));

  if (
    !id ||
    !type ||
    !title ||
    !description ||
    !categoryId ||
    !city ||
    !contactName ||
    !contactPhone
  ) {
    redirect(
      `/moji-oglasi/${id}/izmeni?error=Nisu popunjena sva obavezna polja`,
    );
  }

  if (type !== 'trazim' && type !== 'nudim') {
    redirect(`/moji-oglasi/${id}/izmeni?error=Neispravan tip oglasa`);
  }

  const price =
    priceRaw && !Number.isNaN(Number(priceRaw)) ? Number(priceRaw) : null;

  const { error } = await supabase
    .from('listings')
    .update({
      type,
      title,
      description,
      category_id: categoryId,
      city,
      area: area || null,
      price,
      contact_name: contactName,
      contact_phone: contactPhone,
      contact_email: contactEmail || null,
      status: 'pending',
      rejection_reason: null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    redirect(
      `/moji-oglasi/${id}/izmeni?error=${encodeURIComponent(error.message)}`,
    );
  }

  redirect('/moji-oglasi?success=Oglas je izmenjen i ponovo poslat na pregled');
}

export async function deleteListing(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/prijava');
  }

  const id = getString(formData.get('id'));

  if (!id) {
    redirect('/moji-oglasi?error=Nedostaje ID oglasa');
  }

  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    redirect(`/moji-oglasi?error=${encodeURIComponent(error.message)}`);
  }

  redirect('/moji-oglasi?success=Oglas je obrisan');
}

export async function approveListing(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/prijava');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/');
  }

  const id = getString(formData.get('id'));

  if (!id) {
    redirect('/admin/oglasi?error=Nedostaje ID oglasa');
  }

  const { error } = await supabase
    .from('listings')
    .update({
      status: 'approved',
      rejection_reason: null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    redirect(`/admin/oglasi?error=${encodeURIComponent(error.message)}`);
  }

  redirect('/admin/oglasi?success=Oglas je odobren');
}

export async function rejectListing(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/prijava');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/');
  }

  const id = getString(formData.get('id'));
  const reason = getString(formData.get('reason'));

  if (!id) {
    redirect('/admin/oglasi?error=Nedostaje ID oglasa');
  }

  const { error } = await supabase
    .from('listings')
    .update({
      status: 'rejected',
      rejection_reason: reason || 'Oglas nije odobren.',
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    redirect(`/admin/oglasi?error=${encodeURIComponent(error.message)}`);
  }

  redirect('/admin/oglasi?success=Oglas je odbijen');
}
