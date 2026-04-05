'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './auth-provider';
import Stars from './stars';

export default function ProfileReviews() {
  const router = useRouter();
  const { supabase, user, loading } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace('/auth');
      return;
    }

    supabase
      .from('reviews')
      .select('id, rating, body, created_at, books(id, title, author, cover_url)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error: reviewsError }) => {
        if (reviewsError) {
          setError(reviewsError.message);
          return;
        }

        setReviews(data ?? []);
      });
  }, [loading, router, supabase, user]);

  if (loading) {
    return <div className="shell-card">Checking your reading session...</div>;
  }

  return (
    <div className="space-y-6">
      <section className="shell-card">
        <p className="eyebrow">Profile</p>
        <h1 className="section-title mt-2">Your review shelf</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-bark/85">
          Everything you publish is collected here, with direct links back to the original book
          page for edits or rereads.
        </p>
      </section>

      {error ? <div className="shell-card text-red-700">{error}</div> : null}

      <section className="grid gap-4">
        {reviews.length ? (
          reviews.map((review) => (
            <article key={review.id} className="shell-card">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">Your review</p>
                  <Link href={`/books/${review.books.id}`} className="mt-2 block text-3xl leading-tight hover:text-bark">
                    {review.books.title}
                  </Link>
                  <p className="mt-2 text-sm text-bark/75">{review.books.author}</p>
                </div>
                <Stars value={review.rating} />
              </div>
              <p className="mt-4 text-sm leading-7 text-bark/90">{review.body}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.25em] text-bark/50">
                {new Date(review.created_at).toLocaleDateString()}
              </p>
            </article>
          ))
        ) : (
          <div className="shell-card">
            <p className="text-lg font-semibold">No reviews yet.</p>
            <p className="mt-2 text-sm leading-7 text-bark/80">
              Search for a book, open the detail page, and publish your first review.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
