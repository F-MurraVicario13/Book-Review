import Link from 'next/link';
import Stars from './stars';

export default function ReviewFeed({ reviews }) {
  if (!reviews.length) {
    return (
      <div className="shell-card">
        <p className="text-lg font-semibold">No reviews yet.</p>
        <p className="mt-2 text-sm leading-7 text-bark/80">
          Use search to add a title, then publish the first public note.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <article key={review.id} className="shell-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Reader review</p>
              <Link href={`/books/${review.books.id}`} className="mt-2 block text-2xl font-semibold leading-tight hover:text-bark">
                {review.books.title}
              </Link>
              <p className="mt-1 text-sm text-bark/75">{review.books.author}</p>
            </div>
            <Stars value={review.rating} />
          </div>
          <p className="mt-4 text-sm leading-7 text-bark/90">{review.body}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.25em] text-bark/50">
            {new Date(review.created_at).toLocaleDateString()}
          </p>
        </article>
      ))}
    </div>
  );
}
