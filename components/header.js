'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useAuth } from './auth-provider';

const links = [
  { href: '/', label: 'Home' },
  { href: '/search', label: 'Search' },
  { href: '/profile', label: 'Profile' }
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { supabase, user, loading } = useAuth();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.refresh();
    router.push('/');
  }

  return (
    <header className="relative border-b border-bark/10 bg-paper/70 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-bark/15 bg-white/70 text-lg text-bark">
              M
            </div>
            <div>
              <p className="text-xl font-semibold leading-none">Marginalia</p>
              <p className="mt-1 text-[0.68rem] uppercase tracking-[0.3em] text-bark/60">
                Book review salon
              </p>
            </div>
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'rounded-full px-4 py-2 text-sm font-semibold transition',
                  pathname === link.href
                    ? 'bg-white text-ink shadow-sm'
                    : 'text-bark/75 hover:bg-white/70 hover:text-ink'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {loading ? (
            <div className="rounded-full border border-bark/10 px-4 py-2 text-sm text-bark/60">
              Checking session
            </div>
          ) : user ? (
            <>
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold">{user.email}</p>
                <p className="text-xs text-bark/65">Signed in for reviewing</p>
              </div>
              <button type="button" onClick={handleSignOut} className="button-secondary">
                Sign out
              </button>
            </>
          ) : (
            <Link href="/auth" className="button-primary">
              Login / Sign up
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
