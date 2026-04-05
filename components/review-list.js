import Stars from './stars';

export default function ReviewList({ reviews }) {
  return (
    <section className="shell-card">
      <p className="eyebrow">Public reviews</p>
      <h2 className="section-title mt-2">What readers are saying</h2>
      <div className="mt-6 space-y-4">
        {reviews.length ? (
          reviews.map((review) => (
            <article key={review.id} className="rounded-[1.5rem] border border-bark/10 bg-white/65 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink">Reader #{review.user_id.slice(0, 8)}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.24em] text-bark/50">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Stars value={review.rating} size="sm" />
              </div>
              <p className="mt-4 text-sm leading-7 text-bark/90">{review.body}</p>
            </article>
          ))
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-bark/18 bg-white/40 p-6">
            <p className="text-lg font-semibold">No reviews yet.</p>
            <p className="mt-2 text-sm leading-7 text-bark/80">
              Sign in and write the first review for this book.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
