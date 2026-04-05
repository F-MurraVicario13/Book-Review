import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();
const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('Missing DATABASE_URL. Add your Supabase Postgres connection string to server/.env');
}

export const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }, // required for Supabase/managed Postgres
});

export const query = (text, params) => pool.query(text, params);
