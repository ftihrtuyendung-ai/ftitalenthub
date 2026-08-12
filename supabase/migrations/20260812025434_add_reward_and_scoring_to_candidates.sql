/*
# Add reward and scoring flags to candidates

1. Modified Tables
- `candidates`
  - `reward` (integer, default 0): Mức thưởng (VNĐ, tính bằng triệu) — 0, 2, 5, 10, 15, 20.
  - `score_individual` (boolean, default true): Có tính điểm cho bảng xếp hạng cá nhân hay không.
  - `score_unit` (boolean, default true): Có tính điểm cho bảng xếp hạng đơn vị hay không.

2. Notes
- These columns are additive and default-valued so existing rows remain valid.
- The frontend will use `reward` to display and sum total reward budget.
- `score_individual` / `score_unit` let the admin choose which leaderboard(s) a candidate contributes to. Both default to true to preserve current behavior for existing rows.
*/

ALTER TABLE candidates
  ADD COLUMN IF NOT EXISTS reward integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS score_individual boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS score_unit boolean NOT NULL DEFAULT true;
