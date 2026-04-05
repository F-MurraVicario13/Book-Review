import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const statuses = ['Reading', 'Completed', 'Want to Read'];

function BookDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [threads, setThreads] = useState([]);
  const [status, setStatus] = useState('');
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [threadForm, setThreadForm] = useState({ title: '', body: '' });

  const load = async () => {
    const b = await api.get(`/books/${id}`);
    setBook(b.data);
    const r = await api.get(`/books/${id}/reviews`);
    setReviews(r.data);
    const d = await api.get(`/books/${id}/discussions`);
    setThreads(d.data);
    if (user) {
      const mine = await api.get('/books/me/list');
      const match = mine.data.find((m) => m.id === Number(id));
      if (match) setStatus(match.status);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const updateStatus = async (newStatus) => {
    await api.post(`/books/${id}/status`, { status: newStatus });
    setStatus(newStatus);
  };

  const submitReview = async (e) => {
    e.preventDefault();
    await api.post(`/books/${id}/reviews`, reviewForm);
    setReviewForm({ rating: 5, comment: '' });
    load();
  };

  const submitThread = async (e) => {
    e.preventDefault();
    await api.post(`/books/${id}/discussions`, threadForm);
    setThreadForm({ title: '', body: '' });
    load();
  };

  const submitReply = async (discussionId, body) => {
    await api.post(`/discussions/${discussionId}/replies`, { body });
    load();
  };

  if (!book) return <div className="page">Loading...</div>;

  return (
    <div className="page">
      <div className="card">
        <h2>{book.title}</h2>
        <p className="muted">by {book.author}</p>
        {book.cover_url && <img src={book.cover_url} alt={book.title} className="cover" />}
        {book.stats && (
          <p className="muted">
            Average rating: {book.stats.avg_rating || 'N/A'} ({book.stats.count} reviews)
          </p>
        )}
        {user && (
          <div className="chip-row">
            {statuses.map((s) => (
              <button
                key={s}
                className={`pill ${status === s ? 'active' : ''}`}
                onClick={() => updateStatus(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <section>
        <h3>Reviews</h3>
        {user && (
          <form className="card form" onSubmit={submitReview}>
            <label>Rating</label>
            <input
              type="number"
              min="1"
              max="5"
              value={reviewForm.rating}
              onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
            />
            <textarea
              placeholder="Your thoughts"
              value={reviewForm.comment}
              onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
            />
            <button type="submit">Submit Review</button>
          </form>
        )}
        <div className="stack">
          {reviews.map((r) => (
            <div key={r.id} className="card">
              <div className="muted">{r.name} • {r.rating} ⭐</div>
              <p>{r.comment}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>Discussions</h3>
        {user && (
          <form className="card form" onSubmit={submitThread}>
            <input
              placeholder="Title"
              value={threadForm.title}
              onChange={(e) => setThreadForm({ ...threadForm, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Start a conversation"
              value={threadForm.body}
              onChange={(e) => setThreadForm({ ...threadForm, body: e.target.value })}
              required
            />
            <button type="submit">Post</button>
          </form>
        )}
        <div className="stack">
          {threads.map((t) => (
            <div key={t.id} className="card">
              <div className="muted">{t.name}</div>
              <h4>{t.title}</h4>
              <p>{t.body}</p>
              <div className="stack replies">
                {t.replies.map((r) => (
                  <div key={r.id} className="reply">
                    <span className="muted">{r.name}</span>
                    <p>{r.body}</p>
                  </div>
                ))}
              </div>
              {user && (
                <ReplyForm onSubmit={(body) => submitReply(t.id, body)} />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ReplyForm({ onSubmit }) {
  const [body, setBody] = useState('');
  return (
    <form
      className="reply-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (!body) return;
        onSubmit(body);
        setBody('');
      }}
    >
      <input
        placeholder="Reply"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default BookDetail;
