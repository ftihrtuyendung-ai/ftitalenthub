import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Candidate = {
  id: string;
  referrer: string;
  candidate_name: string;
  email: string;
  job_position: string;
  unit: string;
  stage: 'pv' | 'trung_tuyen' | 'thu_viec' | 'chinh_thuc';
  pic: string;
  reward: number;
  score_individual: boolean;
  score_unit: boolean;
  period: '1H' | '2H';
  year: number;
  created_at: string;
  updated_at: string;
};

export const REWARD_OPTIONS = [0, 2, 5, 10, 15, 20] as const;

export type AuditLog = {
  id: string;
  candidate_id: string;
  changed_by: string;
  field: string;
  old_value: string;
  new_value: string;
  changed_at: string;
};

export const PIC_OPTIONS = [
  'ThinhNH28',
  'NguyetNTY',
  'HangTTL3',
  'VuHT25',
  'GiangDT36',
  'LinhVK19',
] as const;

export const UNIT_OPTIONS = [
  'AF',
  'PMCMB',
  'ODS',
  'RMD',
  'ISC',
  'PMCMN',
] as const;

export type StageConfig = {
  points: number;
  label: string;
  nextStage?: 'pv' | 'trung_tuyen' | 'thu_viec' | 'chinh_thuc';
  nextLabel: string;
};

export const STAGES: Record<string, StageConfig> = {
  pv: { points: 1, label: 'Tham gia PV', nextStage: 'trung_tuyen', nextLabel: 'Lên Trúng tuyển' },
  trung_tuyen: { points: 3, label: 'Trúng tuyển', nextStage: 'thu_viec', nextLabel: 'Lên Thử việc' },
  thu_viec: { points: 5, label: 'HĐ Thử việc', nextStage: 'chinh_thuc', nextLabel: 'Lên Chính thức' },
  chinh_thuc: { points: 7, label: 'HĐ Chính thức', nextLabel: '' },
};
