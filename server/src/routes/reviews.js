import express from 'express';
import { query } from '../db.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

router.get('/books/:bookId/reviews', async (req, res) => {
  try {
    const result = await query(
      `SELECT r.id, r.rating, r.comment, r.created_at, u.id as user_id, u.name, u.avatar
       FROM reviews r
       JOIN users u ON u.id = r.user_id
       WHERE r.book_id=$1
       ORDER BY r.created_at DESC`,
      [req.params.bookId]
    );
    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/books/:bookId/reviews', authRequired, async (req, res) => {
  const { rating, comment } = req.body;
  if (!rating) return res.status(400).json({ message: 'Rating required' });
  if (rating < 1 || rating > 5) return res.status(400).json({ message: 'Rating must be 1-5' });
  try {
    const insert = await query(
      'INSERT INTO reviews (user_id, book_id, rating, comment) VALUES ($1,$2,$3,$4) RETURNING *',
      [req.user.id, req.params.bookId, rating, comment || null]
    );
    return res.status(201).json(insert.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
