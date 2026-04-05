import BookCover from './book-cover';
import Stars from './stars';

export default function BookHero({ book, averageRating, totalReviews }) {
  return (
    <aside className="shell-card h-fit overflow-hidden bg-[linear-gradient(180deg,rgba(255,251,244,0.96),rgba(233,223,204,0.86))]">
      <div className="grid gap-6">
        <BookCover src={book.cover_url} alt={book.title} priority />
        <div>
          <p className="eyebrow">Book detail</p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">{book.title}</h1>
          <p className="mt-3 text-base text-bark/80 sm:text-lg">{book.author}</p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Stars value={averageRating} size="sm" />
            <span className="text-sm text-bark/75">
              {totalReviews} review{totalReviews === 1 ? '' : 's'}
            </span>
            <span className="rounded-full border border-bark/10 bg-white/65 px-4 py-2 text-sm text-bark/80">
              ISBN {book.isbn || 'Unknown'}
            </span>
          </div>
          <p className="mt-6 text-sm leading-8 text-bark/90">
            {book.description || 'No description has been saved for this book yet.'}
          </p>
        </div>
      </div>
    </aside>
  );
}
