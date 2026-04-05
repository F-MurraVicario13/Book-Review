import { notFound } from 'next/navigation';
import BookHero from '@/components/book-hero';
import ReviewForm from '@/components/review-form';
import ReviewList from '@/components/review-list';
import { getBookPageData } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function BookDetailPage({ params }) {
  const data = await getBookPageData(params.id);

  if (!data) {
    notFound();
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
      <BookHero
        book={data.book}
        averageRating={data.averageRating}
        totalReviews={data.totalReviews}
      />

      <div className="space-y-6">
        <ReviewForm bookId={data.book.id} />
        <ReviewList reviews={data.reviews} />
      </div>
    </div>
  );
}
