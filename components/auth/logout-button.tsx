import { signOut } from '@/app/actions/auth';

export function LogoutButton() {
  return (
    <form action={signOut}>
      <button
        type='submit'
        className='rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50'
      >
        Odjava
      </button>
    </form>
  );
}
