import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../db.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

const tokenForUser = (user) =>
  jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

router.post('/signup', async (req, res) => {
  const { name, email, password, avatar, bio } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

  try {
    const existing = await query('SELECT id FROM users WHERE email=$1', [email]);
    if (existing.rowCount) return res.status(409).json({ message: 'Email already exists' });

    const hash = await bcrypt.hash(password, 10);
    const insert = await query(
      'INSERT INTO users (name, email, password_hash, avatar, bio) VALUES ($1,$2,$3,$4,$5) RETURNING id, name, email, avatar, bio',
      [name, email, hash, avatar || null, bio || null]
    );
    const user = insert.rows[0];
    const token = tokenForUser(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });

  try {
    const result = await query('SELECT * FROM users WHERE email=$1', [email]);
    if (!result.rowCount) return res.status(401).json({ message: 'Invalid credentials' });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = tokenForUser(user);
    const { password_hash, ...safeUser } = user;
    return res.json({ user: safeUser, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.get('/me', authRequired, async (req, res) => {
  try {
    const result = await query(
      'SELECT id, name, email, avatar, bio, created_at FROM users WHERE id=$1',
      [req.user.id]
    );
    if (!result.rowCount) return res.status(404).json({ message: 'Not found' });
    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
