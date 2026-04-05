import express from 'express';
import { query } from '../db.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

router.get('/books/:bookId/discussions', async (req, res) => {
  try {
    const threads = await query(
      `SELECT d.id, d.title, d.body, d.created_at, u.id as user_id, u.name, u.avatar
       FROM discussions d
       JOIN users u ON u.id = d.user_id
       WHERE d.book_id=$1
       ORDER BY d.created_at DESC`,
      [req.params.bookId]
    );
    const replies = await query(
      `SELECT dr.id, dr.body, dr.created_at, dr.discussion_id, u.id as user_id, u.name, u.avatar
       FROM discussion_replies dr
       JOIN users u ON u.id = dr.user_id
       WHERE dr.discussion_id = ANY($1::int[])`,
      [threads.rows.map((t) => t.id)]
    );
    const grouped = threads.rows.map((t) => ({
      ...t,
      replies: replies.rows.filter((r) => r.discussion_id === t.id),
    }));
    return res.json(grouped);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/books/:bookId/discussions', authRequired, async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) return res.status(400).json({ message: 'Missing fields' });
  try {
    const insert = await query(
      'INSERT INTO discussions (book_id, user_id, title, body) VALUES ($1,$2,$3,$4) RETURNING *',
      [req.params.bookId, req.user.id, title, body]
    );
    return res.status(201).json(insert.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/discussions/:id/replies', authRequired, async (req, res) => {
  const { body } = req.body;
  if (!body) return res.status(400).json({ message: 'Body required' });
  try {
    const insert = await query(
      'INSERT INTO discussion_replies (discussion_id, user_id, body) VALUES ($1,$2,$3) RETURNING *',
      [req.params.id, req.user.id, body]
    );
    return res.status(201).json(insert.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
