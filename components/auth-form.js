'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from './auth-provider';

const initialState = {
  email: '',
  password: ''
};

export default function AuthForm() {
  const router = useRouter();
  const { supabase } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(initialState);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setPending(true);
    setError('');
    setMessage('');

    const payload = { email: form.email, password: form.password };

    const result =
      mode === 'login'
        ? await supabase.auth.signInWithPassword(payload)
        : await supabase.auth.signUp(payload);

    if (result.error) {
      setError(result.error.message);
      setPending(false);
      return;
    }

    if (mode === 'signup' && !result.data.session) {
      setMessage('Account created. Check your email if confirmation is enabled.');
    } else {
      router.push('/profile');
      router.refresh();
    }

    setPending(false);
  }

  return (
    <section className="shell-card">
      <div className="flex gap-2 rounded-full border border-bark/10 bg-white/65 p-1">
        {['login', 'signup'].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setMode(value);
              setError('');
              setMessage('');
            }}
            className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition ${
              mode === value ? 'bg-ink text-paper' : 'text-bark/75'
            }`}
          >
            {value === 'login' ? 'Log in' : 'Sign up'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-bark/85">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            className="input"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-bark/85">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            className="input"
            minLength={6}
            required
          />
        </div>

        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        {message ? <p className="text-sm text-moss">{message}</p> : null}

        <button type="submit" className="button-primary w-full" disabled={pending}>
          {pending ? 'Working...' : mode === 'login' ? 'Continue to your shelf' : 'Create account'}
        </button>
      </form>
    </section>
  );
}
