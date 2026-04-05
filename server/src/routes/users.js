import express from 'express';
import { query } from '../db.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const result = await query(
      'SELECT id, name, email, avatar, bio, created_at FROM users WHERE id=$1',
      [req.params.id]
    );
    if (!result.rowCount) return res.status(404).json({ message: 'Not found' });
    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.put('/me', authRequired, async (req, res) => {
  const { name, avatar, bio } = req.body;
  try {
    const result = await query(
      'UPDATE users SET name=COALESCE($1,name), avatar=$2, bio=$3 WHERE id=$4 RETURNING id, name, email, avatar, bio',
      [name, avatar || null, bio || null, req.user.id]
    );
    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
