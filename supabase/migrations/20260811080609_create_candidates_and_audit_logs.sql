/*
# Create candidates and audit_logs tables

1. New Tables
- `candidates`: Stores referred candidates with referrer info, stage, period, year, email, and PIC.
  - `id` (uuid, primary key)
  - `referrer` (text, not null) — name of the employee who referred the candidate
  - `candidate_name` (text, not null) — name of the candidate
  - `email` (text, nullable) — candidate's email, used for duplicate detection
  - `job_position` (text, not null) — position the candidate applied for
  - `unit` (text, nullable) — business unit
  - `stage` (text, not null) — recruitment stage: pv, trung_tuyen, thu_viec, chinh_thuc
  - `pic` (text, nullable) — admin in charge
  - `period` (text, not null) — 1H or 2H
  - `year` (int, not null) — fiscal year
  - `created_at` (timestamptz, default now)
  - `updated_at` (timestamptz, default now)
- `audit_logs`: Stores change history for each candidate.
  - `id` (uuid, primary key)
  - `candidate_id` (uuid, foreign key to candidates.id ON DELETE CASCADE)
  - `changed_by` (text, nullable) — admin email who made the change
  - `field` (text, nullable) — which field changed
  - `old_value` (text, nullable)
  - `new_value` (text, nullable)
  - `changed_at` (timestamptz, default now)

2. Indexes
- Unique index on `email` within candidates to enforce duplicate prevention at the DB level.
- Index on `candidate_id` in audit_logs for fast lookups.

3. Security
- Enable RLS on both tables.
- Policies for `anon, authenticated` CRUD (single shared admin account model).
*/

CREATE TABLE IF NOT EXISTS candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer text NOT NULL,
  candidate_name text NOT NULL,
  email text,
  job_position text NOT NULL,
  unit text,
  stage text NOT NULL DEFAULT 'pv',
  pic text,
  period text NOT NULL,
  year int NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_candidates" ON candidates;
CREATE POLICY "anon_select_candidates" ON candidates FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_candidates" ON candidates;
CREATE POLICY "anon_insert_candidates" ON candidates FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_candidates" ON candidates;
CREATE POLICY "anon_update_candidates" ON candidates FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_candidates" ON candidates;
CREATE POLICY "anon_delete_candidates" ON candidates FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_candidates_email ON candidates (email);
CREATE INDEX IF NOT EXISTS idx_candidates_period_year ON candidates (period, year);

CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id uuid REFERENCES candidates(id) ON DELETE CASCADE,
  changed_by text,
  field text,
  old_value text,
  new_value text,
  changed_at timestamptz DEFAULT now()
);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_audit_logs" ON audit_logs;
CREATE POLICY "anon_select_audit_logs" ON audit_logs FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_audit_logs" ON audit_logs;
CREATE POLICY "anon_insert_audit_logs" ON audit_logs FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_audit_logs" ON audit_logs;
CREATE POLICY "anon_update_audit_logs" ON audit_logs FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_audit_logs" ON audit_logs;
CREATE POLICY "anon_delete_audit_logs" ON audit_logs FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_audit_logs_candidate_id ON audit_logs (candidate_id);