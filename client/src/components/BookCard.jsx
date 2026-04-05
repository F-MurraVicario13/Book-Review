import { Link } from 'react-router-dom';

const statusColors = {
  Reading: '#f1c40f',
  Completed: '#2ecc71',
  'Want to Read': '#3498db',
};

function BookCard({ book, status }) {
  return (
    <div className="card">
      {book.cover_url && <img src={book.cover_url} alt={book.title} className="cover" />}
      <div className="card-body">
        <Link to={`/books/${book.id}`} className="title">{book.title}</Link>
        <p className="muted">by {book.author}</p>
        {status && (
          <span className="pill" style={{ backgroundColor: statusColors[status] }}>
            {status}
          </span>
        )}
      </div>
    </div>
  );
}

export default BookCard;
