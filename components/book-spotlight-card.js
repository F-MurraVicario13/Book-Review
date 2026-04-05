import Link from 'next/link';
import BookCover from './book-cover';
import Stars from './stars';

export default function BookSpotlightCard({ book }) {
  return (
    <Link href={`/books/${book.id}`} className="book-card group">
      <div className="p-4">
        <BookCover src={book.cover_url} alt={book.title} />
      </div>
      <div className="border-t border-bark/8 px-5 pb-5 pt-4">
        <p className="eyebrow">Trending pick</p>
        <h3 className="mt-2 text-2xl leading-tight text-ink transition group-hover:text-bark">
          {book.title}
        </h3>
        <p className="mt-2 text-sm text-bark/80">{book.author}</p>
        <div className="mt-4 flex items-center justify-between gap-4">
          <Stars value={book.averageRating} />
          <span className="text-sm text-bark/70">{book.reviewCount} reviews</span>
        </div>
      </div>
    </Link>
  );
}
