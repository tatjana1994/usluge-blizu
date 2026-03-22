import { signOut } from '@/app/actions/auth';

export function LogoutButton() {
  return (
    <form action={signOut}>
      <button
        type='submit'
        className='rounded-xl cursor-pointer border border-rose-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-rose-50 hover:text-rose-600'
      >
        Odjava
      </button>
    </form>
  );
}
