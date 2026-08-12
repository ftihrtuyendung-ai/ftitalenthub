/*
# Create admins table

1. New Tables
- `admins`: Stores admin email addresses who can access the tracking management area.
  - `id` (uuid, primary key)
  - `email` (text, unique, not null) — admin email
  - `created_at` (timestamptz, default now)

2. Pre-populated data
- Insert ftihr.tuyendung@gmail.com as the first admin.

3. Security
- Enable RLS on `admins`.
- Allow anon + authenticated to SELECT (needed for client-side admin check).
- Only authenticated can INSERT/UPDATE/DELETE (manage admin list).
*/

CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_admins" ON admins;
CREATE POLICY "anon_select_admins" ON admins FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_admins" ON admins;
CREATE POLICY "auth_insert_admins" ON admins FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_admins" ON admins;
CREATE POLICY "auth_update_admins" ON admins FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_admins" ON admins;
CREATE POLICY "auth_delete_admins" ON admins FOR DELETE
  TO authenticated USING (true);

INSERT INTO admins (email) VALUES ('ftihr.tuyendung@gmail.com')
ON CONFLICT (email) DO NOTHING;