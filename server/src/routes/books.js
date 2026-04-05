import express from 'express';
import { query } from '../db.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM books ORDER BY created_at DESC');
    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', authRequired, async (req, res) => {
  const { title, author, cover_url } = req.body;
  if (!title || !author) return res.status(400).json({ message: 'Missing fields' });
  try {
    const result = await query(
      'INSERT INTO books (title, author, cover_url, created_by) VALUES ($1,$2,$3,$4) RETURNING *',
      [title, author, cover_url || null, req.user.id]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.get('/me/list', authRequired, async (req, res) => {
  try {
    const result = await query(
      `SELECT b.*, ub.status
       FROM user_books ub
       JOIN books b ON b.id = ub.book_id
       WHERE ub.user_id=$1
       ORDER BY ub.updated_at DESC`,
      [req.user.id]
    );
    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const book = await query('SELECT * FROM books WHERE id=$1', [req.params.id]);
    if (!book.rowCount) return res.status(404).json({ message: 'Not found' });
    const avg = await query('SELECT AVG(rating)::numeric(10,2) as avg_rating, COUNT(*) as count FROM reviews WHERE book_id=$1', [req.params.id]);
    return res.json({ ...book.rows[0], stats: avg.rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/status', authRequired, async (req, res) => {
  const { status } = req.body;
  const allowed = ['Reading', 'Completed', 'Want to Read'];
  if (!allowed.includes(status)) return res.status(400).json({ message: 'Invalid status' });
  try {
    const upsert = await query(
      'INSERT INTO user_books (user_id, book_id, status) VALUES ($1,$2,$3) ON CONFLICT (user_id, book_id) DO UPDATE SET status=EXCLUDED.status, updated_at=NOW() RETURNING *',
      [req.user.id, req.params.id, status]
    );
    return res.json(upsert.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
