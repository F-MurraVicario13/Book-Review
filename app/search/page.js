import SearchBar from '@/components/search-bar';
import SearchResults from '@/components/search-results';
import { searchGoogleBooks } from '@/lib/google-books';

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q?.trim() ?? '';
  const results = query ? await searchGoogleBooks(query) : [];

  return (
    <div className="space-y-8">
      <section className="shell-card">
        <p className="eyebrow">Search</p>
        <h1 className="section-title mt-3">Find a title by shelf instinct, author, or memory.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-bark/85">
          Results come from Google Books. When you open one, it gets saved into your Supabase
          catalog so the review page has a durable home.
        </p>
        <div className="mt-6 max-w-3xl">
          <SearchBar defaultValue={query} />
        </div>
      </section>

      <section className="space-y-4">
        {query ? (
          <>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Results</p>
                <h2 className="section-title mt-2">
                  {results.length ? `${results.length} books for “${query}”` : `No matches for “${query}”`}
                </h2>
              </div>
            </div>
            <SearchResults books={results} />
          </>
        ) : (
          <div className="shell-card">
            <p className="text-lg font-semibold">Start with a title or author.</p>
            <p className="mt-2 max-w-xl text-sm leading-7 text-bark/80">
              Try a precise search like “Toni Morrison” or something broad like “nature writing.”
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
