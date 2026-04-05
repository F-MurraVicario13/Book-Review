import Link from 'next/link';
import SearchBar from '@/components/search-bar';
import BookSpotlightCard from '@/components/book-spotlight-card';
import ReviewFeed from '@/components/review-feed';
import { getHomepageData } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { trendingBooks, recentReviews } = await getHomepageData();

  return (
    <>
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="shell-card relative overflow-hidden bg-[linear-gradient(135deg,rgba(255,251,244,0.96),rgba(233,223,204,0.92))] px-6 py-8 sm:px-10 sm:py-12">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-amber/10 blur-3xl" />
          <p className="eyebrow">For the after-hours reader</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[0.95] text-ink sm:text-6xl lg:text-7xl">
            Keep the books that marked you, and the reviews that linger.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-bark/85 sm:text-lg">
            Search by title or author, save books into your reading world, and leave sharp,
            thoughtful reviews with a tactile five-star editor.
          </p>
          <div className="mt-8 max-w-2xl">
            <SearchBar />
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-bark/80">
            <span className="rounded-full border border-bark/10 bg-white/60 px-4 py-2">
              Google Books search
            </span>
            <span className="rounded-full border border-bark/10 bg-white/60 px-4 py-2">
              Supabase Auth
            </span>
            <span className="rounded-full border border-bark/10 bg-white/60 px-4 py-2">
              Editorial reading log
            </span>
          </div>
        </div>

        <aside className="shell-card flex flex-col justify-between bg-[linear-gradient(180deg,rgba(63,45,29,0.95),rgba(111,79,58,0.92))] text-paper">
          <div>
            <p className="eyebrow text-paper/60">Recent activity</p>
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">
              Review what deserves a margin note.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-paper/78">
              Every book page calculates its average rating, holds the full review archive,
              and lets signed-in readers add a considered take in seconds.
            </p>
          </div>
          <div className="mt-10 grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
            <div>
              <p className="text-4xl font-semibold">{trendingBooks.length}</p>
              <p className="mt-1 text-sm text-paper/70">Books drawing attention right now</p>
            </div>
            <div>
              <p className="text-4xl font-semibold">{recentReviews.length}</p>
              <p className="mt-1 text-sm text-paper/70">Fresh reviews in the public feed</p>
            </div>
            <Link href="/profile" className="button-secondary mt-2 border-white/15 bg-white/10 text-paper hover:bg-white/15">
              Visit your review shelf
            </Link>
          </div>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Trending books</p>
              <h2 className="section-title mt-2">Well-worn spines, active conversations</h2>
            </div>
            <Link href="/search" className="text-sm font-semibold text-bark underline-offset-4 hover:underline">
              Search the catalog
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {trendingBooks.map((book) => (
              <BookSpotlightCard key={book.id} book={book} />
            ))}
            {!trendingBooks.length && (
              <div className="shell-card sm:col-span-2 xl:col-span-3">
                <p className="text-lg font-semibold">No trending books yet.</p>
                <p className="mt-2 max-w-xl text-sm leading-7 text-bark/80">
                  Search for a title, open its detail page, and it will be added to the shared
                  reading shelf with room for the first review.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <p className="eyebrow">Recent reviews</p>
            <h2 className="section-title mt-2">Fresh reactions from the reading room</h2>
          </div>
          <ReviewFeed reviews={recentReviews} />
        </div>
      </section>
    </>
  );
}
