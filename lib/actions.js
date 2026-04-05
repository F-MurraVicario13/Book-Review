'use server';

import { redirect } from 'next/navigation';
import { getSupabaseServerClient } from './supabase-server';

export async function ensureBookAndRedirect(formData) {
  const title = `${formData.get('title') ?? ''}`.trim();
  const author = `${formData.get('author') ?? ''}`.trim();
  const isbn = `${formData.get('isbn') ?? ''}`.trim();
  const coverUrl = `${formData.get('cover_url') ?? ''}`.trim();
  const description = `${formData.get('description') ?? ''}`.trim();

  if (!title || !author) {
    redirect('/search');
  }

  const supabase = getSupabaseServerClient();

  let existingQuery = supabase
    .from('books')
    .select('id')
    .limit(1);

  if (isbn) {
    existingQuery = existingQuery.eq('isbn', isbn);
  } else {
    existingQuery = existingQuery.eq('title', title).eq('author', author);
  }

  const { data: existing, error: existingError } = await existingQuery.maybeSingle();

  if (existingError && existingError.code !== 'PGRST116') {
    throw existingError;
  }

  if (existing?.id) {
    redirect(`/books/${existing.id}`);
  }

  const { data: created, error: createError } = await supabase
    .from('books')
    .insert({
      title,
      author,
      isbn: isbn || null,
      cover_url: coverUrl || null,
      description: description || null
    })
    .select('id')
    .single();

  if (createError) throw createError;

  redirect(`/books/${created.id}`);
}
