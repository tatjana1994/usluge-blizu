'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { slugify } from '@/lib/utils/slugify';

function getString(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value.trim() : '';
}

function getValidPrice(value: string) {
  if (!value) return null;

  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}

function getValidPriceCurrency(value: string) {
  return value === 'EUR' ? 'EUR' : 'RSD';
}

function getValidPriceType(value: string) {
  return value === 'hourly' ? 'hourly' : 'fixed';
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
  const priceCurrencyRaw = getString(formData.get('priceCurrency'));
  const priceTypeRaw = getString(formData.get('priceType'));
  const contactName = getString(formData.get('contactName'));
  const contactPhone = getString(formData.get('contactPhone'));
  const contactEmail = getString(formData.get('contactEmail'));

  if (!type) {
    redirect(`/postavi?error=${encodeURIComponent('Izaberi tip oglasa')}`);
  }

  if (type !== 'trazim' && type !== 'nudim') {
    redirect(`/postavi?error=${encodeURIComponent('Neispravan tip oglasa')}`);
  }

  if (!title) {
    redirect(`/postavi?error=${encodeURIComponent('Unesi naslov oglasa')}`);
  }

  if (!description) {
    redirect(`/postavi?error=${encodeURIComponent('Unesi opis oglasa')}`);
  }

  if (!categoryId) {
    redirect(`/postavi?error=${encodeURIComponent('Izaberi kategoriju')}`);
  }

  if (!city) {
    redirect(`/postavi?error=${encodeURIComponent('Unesi grad')}`);
  }

  if (!contactName) {
    redirect(`/postavi?error=${encodeURIComponent('Unesi kontakt ime')}`);
  }

  if (!contactPhone) {
    redirect(`/postavi?error=${encodeURIComponent('Unesi kontakt telefon')}`);
  }

  const baseSlug = slugify(title);
  const uniqueSlug = `${baseSlug}-${Date.now()}`;

  const price = getValidPrice(priceRaw);
  const priceCurrency = getValidPriceCurrency(priceCurrencyRaw);
  const priceType = getValidPriceType(priceTypeRaw);

  const { error } = await supabase.from('listings').insert({
    user_id: user.id,
    type,
    title,
    slug: uniqueSlug,
    description,
    category_id: categoryId,
    city,
    area: area || null,
    municipality_name: city,
    settlement_name: area || null,
    price,
    price_currency: price !== null ? priceCurrency : null,
    price_type: price !== null ? priceType : null,
    contact_name: contactName,
    contact_phone: contactPhone,
    contact_email: contactEmail || null,
    status: 'pending',
  });

  if (error) {
    redirect(`/postavi?error=${encodeURIComponent(error.message)}`);
  }

  redirect(
    `/moji-oglasi?success=${encodeURIComponent(
      'Oglas je uspešno poslat na pregled',
    )}`,
  );
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
  const priceCurrencyRaw = getString(formData.get('priceCurrency'));
  const priceTypeRaw = getString(formData.get('priceType'));
  const contactName = getString(formData.get('contactName'));
  const contactPhone = getString(formData.get('contactPhone'));
  const contactEmail = getString(formData.get('contactEmail'));

  if (!id) {
    redirect(`/moji-oglasi?error=${encodeURIComponent('Nedostaje ID oglasa')}`);
  }

  if (!type) {
    redirect(
      `/moji-oglasi/${id}/izmeni?error=${encodeURIComponent(
        'Izaberi tip oglasa',
      )}`,
    );
  }

  if (type !== 'trazim' && type !== 'nudim') {
    redirect(
      `/moji-oglasi/${id}/izmeni?error=${encodeURIComponent(
        'Neispravan tip oglasa',
      )}`,
    );
  }

  if (!title) {
    redirect(
      `/moji-oglasi/${id}/izmeni?error=${encodeURIComponent(
        'Unesi naslov oglasa',
      )}`,
    );
  }

  if (!description) {
    redirect(
      `/moji-oglasi/${id}/izmeni?error=${encodeURIComponent(
        'Unesi opis oglasa',
      )}`,
    );
  }

  if (!categoryId) {
    redirect(
      `/moji-oglasi/${id}/izmeni?error=${encodeURIComponent(
        'Izaberi kategoriju',
      )}`,
    );
  }

  if (!city) {
    redirect(
      `/moji-oglasi/${id}/izmeni?error=${encodeURIComponent('Unesi grad')}`,
    );
  }

  if (!contactName) {
    redirect(
      `/moji-oglasi/${id}/izmeni?error=${encodeURIComponent(
        'Unesi kontakt ime',
      )}`,
    );
  }

  if (!contactPhone) {
    redirect(
      `/moji-oglasi/${id}/izmeni?error=${encodeURIComponent(
        'Unesi kontakt telefon',
      )}`,
    );
  }

  const price = getValidPrice(priceRaw);
  const priceCurrency = getValidPriceCurrency(priceCurrencyRaw);
  const priceType = getValidPriceType(priceTypeRaw);

  const { error } = await supabase
    .from('listings')
    .update({
      type,
      title,
      description,
      category_id: categoryId,
      city,
      area: area || null,
      municipality_name: city,
      settlement_name: area || null,
      price,
      price_currency: price !== null ? priceCurrency : null,
      price_type: price !== null ? priceType : null,
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

  redirect(
    `/moji-oglasi?success=${encodeURIComponent(
      'Oglas je izmenjen i ponovo poslat na pregled',
    )}`,
  );
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
    redirect(`/moji-oglasi?error=${encodeURIComponent('Nedostaje ID oglasa')}`);
  }

  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    redirect(`/moji-oglasi?error=${encodeURIComponent(error.message)}`);
  }

  redirect(`/moji-oglasi?success=${encodeURIComponent('Oglas je obrisan')}`);
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
    redirect(
      `/admin/oglasi?error=${encodeURIComponent('Nedostaje ID oglasa')}`,
    );
  }

  const { data: listing } = await supabase
    .from('listings')
    .select('id, user_id, title')
    .eq('id', id)
    .single();

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

  if (listing?.user_id) {
    const { data: approvedListing } = await supabase
      .from('listings')
      .select('slug')
      .eq('id', listing.id)
      .single();

    await supabase.from('notifications').insert({
      user_id: listing.user_id,
      listing_id: listing.id,
      type: 'success',
      title: 'Oglas je odobren',
      message: `Tvoj oglas "${listing.title}" je odobren i sada je vidljiv na platformi.`,
      link: approvedListing?.slug
        ? `/oglasi/${approvedListing.slug}`
        : '/moji-oglasi',
    });
  }

  redirect(`/admin/oglasi?success=${encodeURIComponent('Oglas je odobren')}`);
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
    redirect(
      `/admin/oglasi?error=${encodeURIComponent('Nedostaje ID oglasa')}`,
    );
  }

  const { data: listing } = await supabase
    .from('listings')
    .select('id, user_id, title')
    .eq('id', id)
    .single();

  const finalReason = reason || 'Oglas nije odobren.';

  const { error } = await supabase
    .from('listings')
    .update({
      status: 'rejected',
      rejection_reason: finalReason,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    redirect(`/admin/oglasi?error=${encodeURIComponent(error.message)}`);
  }

  if (listing?.user_id) {
    await supabase.from('notifications').insert({
      user_id: listing.user_id,
      listing_id: listing.id,
      type: 'error',
      title: 'Oglas je odbijen',
      message: `Tvoj oglas "${listing.title}" je odbijen. Razlog: ${finalReason}`,
      link: '/moji-oglasi',
    });
  }

  redirect(`/admin/oglasi?success=${encodeURIComponent('Oglas je odbijen')}`);
}
