const GOOGLE_BOOKS_ENDPOINT = 'https://www.googleapis.com/books/v1/volumes';

function sanitizeBook(volume) {
  const info = volume.volumeInfo ?? {};
  const identifiers = info.industryIdentifiers ?? [];
  const isbn13 =
    identifiers.find((item) => item.type === 'ISBN_13')?.identifier ??
    identifiers.find((item) => item.type === 'ISBN_10')?.identifier ??
    '';

  const coverUrl = isbn13
    ? `https://covers.openlibrary.org/b/isbn/${isbn13}-L.jpg`
    : info.imageLinks?.thumbnail?.replace('http://', 'https://') ?? '';

  return {
    googleId: volume.id,
    title: info.title ?? 'Untitled',
    author: info.authors?.join(', ') ?? 'Unknown author',
    isbn: isbn13,
    coverUrl,
    description: info.description ?? '',
    publishedDate: info.publishedDate ?? '',
    categories: info.categories ?? []
  };
}

export async function searchGoogleBooks(query) {
  if (!query?.trim()) return [];

  const params = new URLSearchParams({
    q: query,
    maxResults: '18',
    orderBy: 'relevance',
    printType: 'books'
  });

  if (process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY) {
    params.set('key', process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY);
  }

  const response = await fetch(`${GOOGLE_BOOKS_ENDPOINT}?${params.toString()}`, {
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    throw new Error('Google Books search failed');
  }

  const data = await response.json();
  return (data.items ?? []).map(sanitizeBook);
}
