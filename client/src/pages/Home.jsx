import { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import BookCard from '../components/BookCard';

function Home() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', cover_url: '' });

  useEffect(() => {
    api.get('/books').then((res) => setBooks(res.data));
  }, []);

  const addBook = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/books', form);
      setBooks([res.data, ...books]);
      setForm({ title: '', author: '', cover_url: '' });
    } catch (err) {
      alert('Could not add book.');
    }
  };

  return (
    <div className="page">
      <div className="hero">
        <h1>Book Club App</h1>
        <p>Track what you read, share reviews, and discuss with friends.</p>
      </div>

      {user && (
        <form className="card form" onSubmit={addBook}>
          <h3>Add a Book</h3>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            placeholder="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            required
          />
          <input
            placeholder="Cover URL"
            value={form.cover_url}
            onChange={(e) => setForm({ ...form, cover_url: e.target.value })}
          />
          <button type="submit">Add</button>
        </form>
      )}

      <h2>Latest Books</h2>
      <div className="grid">
        {books.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </div>
  );
}

export default Home;
