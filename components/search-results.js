import { ensureBookAndRedirect } from '@/lib/actions';
import BookCover from './book-cover';

export default function SearchResults({ books }) {
  if (!books.length) {
    return (
      <div className="shell-card">
        <p className="text-lg font-semibold">Nothing surfaced from Google Books.</p>
        <p className="mt-2 text-sm leading-7 text-bark/80">
          Try a broader phrase, a different spelling, or search by the author instead.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {books.map((book) => (
        <article key={`${book.googleId}-${book.isbn}`} className="book-card">
          <div className="grid gap-4 p-4">
            <BookCover src={book.coverUrl} alt={book.title} />
            <div className="space-y-3 px-1 pb-2">
              <div>
                <p className="eyebrow">Google Books</p>
                <h3 className="mt-2 text-2xl leading-tight">{book.title}</h3>
                <p className="mt-2 text-sm text-bark/80">{book.author}</p>
              </div>
              {book.description ? (
                <p className="line-clamp-4 text-sm leading-7 text-bark/85">{book.description}</p>
              ) : (
                <p className="text-sm italic text-bark/60">No description available for this edition.</p>
              )}
              <form action={ensureBookAndRedirect}>
                <input type="hidden" name="title" value={book.title} />
                <input type="hidden" name="author" value={book.author} />
                <input type="hidden" name="isbn" value={book.isbn} />
                <input type="hidden" name="cover_url" value={book.coverUrl} />
                <input type="hidden" name="description" value={book.description} />
                <button type="submit" className="button-primary mt-2 w-full">
                  Open review page
                </button>
              </form>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
