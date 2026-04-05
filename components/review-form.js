'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from './auth-provider';
import StarRating from './star-rating';

export default function ReviewForm({ bookId }) {
  const router = useRouter();
  const { supabase, user, loading } = useAuth();
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!user) {
      setError('Sign in before posting a review.');
      return;
    }

    setSaving(true);
    setError('');

    const { error: reviewError } = await supabase.from('reviews').upsert(
      {
        user_id: user.id,
        book_id: bookId,
        rating,
        body
      },
      { onConflict: 'user_id,book_id' }
    );

    if (reviewError) {
      setError(reviewError.message);
      setSaving(false);
      return;
    }

    setBody('');
    setSaving(false);
    router.refresh();
  }

  return (
    <section className="shell-card">
      <p className="eyebrow">Write a review</p>
      <h2 className="section-title mt-2">Add your own margin note</h2>
      <p className="mt-3 text-sm leading-7 text-bark/80">
        Hover to preview stars, click to lock your rating, then add the response you want other
        readers to find.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="rounded-[1.5rem] border border-bark/10 bg-white/70 p-5">
          <p className="mb-3 text-sm font-semibold text-bark/85">Your rating</p>
          <StarRating value={rating} onChange={setRating} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-bark/85">Review</label>
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={6}
            className="textarea"
            placeholder="What held up, what failed, what stayed with you?"
            required
          />
        </div>

        {error ? <p className="text-sm text-red-700">{error}</p> : null}

        <button type="submit" disabled={saving || loading} className="button-primary">
          {saving ? 'Saving review...' : 'Publish review'}
        </button>
      </form>
    </section>
  );
}
