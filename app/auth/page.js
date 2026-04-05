import AuthForm from '@/components/auth-form';

export const metadata = {
  title: 'Sign In | Marginalia'
};

export default function AuthPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <section className="shell-card bg-[linear-gradient(180deg,rgba(63,45,29,0.95),rgba(111,79,58,0.92))] text-paper">
        <p className="eyebrow text-paper/60">Reader access</p>
        <h1 className="mt-4 text-5xl leading-none sm:text-6xl">Step in and leave a sharper note.</h1>
        <p className="mt-5 max-w-md text-sm leading-7 text-paper/78">
          Create an account with email and password through Supabase Auth, then rate books,
          publish reviews, and build your own shelf of opinions.
        </p>
      </section>
      <AuthForm />
    </div>
  );
}
