import { getSupabaseServerClient } from './supabase-server';

export async function getHomepageData() {
  const supabase = getSupabaseServerClient();

  const [{ data: books, error: booksError }, { data: reviews, error: reviewsError }] =
    await Promise.all([
      supabase
        .from('books')
        .select('id, title, author, isbn, cover_url, description, created_at')
        .order('created_at', { ascending: false })
        .limit(24),
      supabase
        .from('reviews')
        .select('id, book_id, rating, body, created_at, books(id, title, author, cover_url)')
        .order('created_at', { ascending: false })
        .limit(12)
    ]);

  if (booksError) throw booksError;
  if (reviewsError) throw reviewsError;

  const counts = new Map();

  for (const review of reviews ?? []) {
    const current = counts.get(review.book_id) ?? { total: 0, count: 0 };
    current.total += review.rating;
    current.count += 1;
    counts.set(review.book_id, current);
  }

  const trendingBooks = (books ?? [])
    .map((book) => {
      const stats = counts.get(book.id) ?? { total: 0, count: 0 };
      return {
        ...book,
        reviewCount: stats.count,
        averageRating: stats.count ? stats.total / stats.count : 0
      };
    })
    .sort((a, b) => {
      if (b.reviewCount !== a.reviewCount) return b.reviewCount - a.reviewCount;
      return b.averageRating - a.averageRating;
    })
    .slice(0, 6);

  return {
    trendingBooks,
    recentReviews: reviews ?? []
  };
}

export async function getBookPageData(bookId) {
  const supabase = getSupabaseServerClient();

  const [{ data: book, error: bookError }, { data: reviews, error: reviewsError }] =
    await Promise.all([
      supabase
        .from('books')
        .select('id, title, author, isbn, cover_url, description, created_at')
        .eq('id', bookId)
        .maybeSingle(),
      supabase
        .from('reviews')
        .select('id, user_id, book_id, rating, body, created_at')
        .eq('book_id', bookId)
        .order('created_at', { ascending: false })
    ]);

  if (bookError) throw bookError;
  if (reviewsError) throw reviewsError;

  if (!book) return null;

  const totalReviews = reviews?.length ?? 0;
  const averageRating = totalReviews
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
    : 0;

  return {
    book,
    reviews: reviews ?? [],
    averageRating,
    totalReviews
  };
}
