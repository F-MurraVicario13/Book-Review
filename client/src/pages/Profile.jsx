import { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import BookCard from '../components/BookCard';

function Profile() {
  const { user, setUser } = useAuth();
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name: user?.name || '', avatar: user?.avatar || '', bio: user?.bio || '' });

  useEffect(() => {
    api.get('/books/me/list').then((res) => setList(res.data));
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    const res = await api.put('/users/me', form);
    setUser(res.data);
  };

  return (
    <div className="page">
      <h2>Profile</h2>
      <form className="card form" onSubmit={updateProfile}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Avatar URL"
          value={form.avatar}
          onChange={(e) => setForm({ ...form, avatar: e.target.value })}
        />
        <textarea
          placeholder="Bio"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />
        <button type="submit">Save</button>
      </form>

      <h3>Your Books</h3>
      <div className="grid">
        {list.map((b) => (
          <BookCard key={b.id} book={b} status={b.status} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
