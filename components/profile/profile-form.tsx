/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { inputClassName } from '@/lib/constants/ui';

export function ProfileForm({
  user,
  profile,
  action,
}: {
  user: any;
  profile: any;
  action: (formData: FormData) => void;
}) {
  const [formState, setFormState] = useState({
    fullName: profile?.full_name ?? '',
    phone: profile?.phone ?? '',
    city: profile?.city ?? '',
  });

  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => {
      const updated = { ...prev, [field]: value };

      const dirty =
        updated.fullName !== (profile?.full_name ?? '') ||
        updated.phone !== (profile?.phone ?? '') ||
        updated.city !== (profile?.city ?? '');

      setIsDirty(dirty);

      return updated;
    });
  };

  return (
    <form action={action} className='grid gap-5 sm:grid-cols-2'>
      <div className='sm:col-span-2'>
        <label className='mb-1.5 block text-md font-medium text-stone-700'>
          Email
        </label>
        <input
          value={user.email ?? ''}
          disabled
          className='w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-md text-stone-500 outline-none'
        />
      </div>

      <div>
        <label className='mb-1.5 block text-md font-medium text-stone-700'>
          Ime i prezime
        </label>
        <input
          name='fullName'
          value={formState.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          placeholder='Ime i Prezime'
          className={inputClassName}
        />
      </div>

      <div>
        <label className='mb-1.5 block text-md font-medium text-stone-700'>
          Telefon
        </label>
        <input
          name='phone'
          value={formState.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder='06x xxx xxxx'
          className={inputClassName}
        />
      </div>

      <div>
        <label className='mb-1.5 block text-md font-medium text-stone-700'>
          Grad
        </label>
        <input
          name='city'
          value={formState.city}
          onChange={(e) => handleChange('city', e.target.value)}
          placeholder='Grad'
          className={inputClassName}
        />
      </div>

      <div className='sm:col-span-2'>
        <button
          type='submit'
          disabled={!isDirty}
          className={`w-[200px] rounded-xl px-5 py-3 text-lg font-bold text-white transition
            ${
              isDirty
                ? 'cursor-pointer bg-rose-500 hover:bg-rose-600'
                : 'cursor-not-allowed bg-stone-300'
            }`}
        >
          Sačuvaj izmene
        </button>
      </div>
    </form>
  );
}
