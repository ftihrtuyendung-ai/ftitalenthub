import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase, AuditLog, Candidate, PIC_OPTIONS, REWARD_OPTIONS, STAGES, UNIT_OPTIONS } from './lib/supabase';
import { useAuth } from './lib/auth.tsx';
import { AuthForm } from './components/AuthForm';
import { AwardCriteria } from './components/AwardCriteria';
import { PolicySection } from './components/PolicySection';
import { Leaderboard, UnitLeaderboard } from './components/Leaderboard';
import { Award, BookUser, Building2, CheckCircle2, Clock, Download, Filter, History, LogIn, LogOut, Menu, Pencil, Search, Star, Trash2, UserCog, UserPlus, Users, X } from 'lucide-react';
import * as XLSX from 'xlsx';

const STAGE_PIPELINE: { key: Candidate['stage']; label: string; shortLabel: string; dot: string }[] = [
  { key: 'pv', label: 'Phỏng vấn', shortLabel: 'PV', dot: 'bg-blue-500' },
  { key: 'trung_tuyen', label: 'Trúng tuyển', shortLabel: 'Trúng', dot: 'bg-cyan-500' },
  { key: 'thu_viec', label: 'Thử việc', shortLabel: 'Thử', dot: 'bg-amber-500' },
  { key: 'chinh_thuc', label: 'Chính thức', shortLabel: 'Chính', dot: 'bg-emerald-500' },
];

function formatDate(iso: string, withTime = false): string {
  const d = new Date(iso);
  const date = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  return withTime ? `${date} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}` : date;
}

function StagePipeline({ stage }: { stage: Candidate['stage'] }) {
  const active = STAGE_PIPELINE.findIndex((item) => item.key === stage);
  return <div className="flex items-center gap-1">{STAGE_PIPELINE.map((item, index) => <div key={item.key} className="flex items-center gap-1"><div className="flex flex-col items-center"><span className={`h-2 w-2 rounded-full ${index <= active ? item.dot : 'bg-slate-200'}`} /><span className={`text-[9px] font-bold ${index === active ? 'text-indigo-700' : index < active ? 'text-slate-500' : 'text-slate-300'}`}>{item.shortLabel}</span></div>{index < 3 && <span className={`mb-3 h-px w-3 ${index < active ? 'bg-slate-400' : 'bg-slate-200'}`} />}</div>)}</div>;
}

function StatCard({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: number; accent: string }) {
  return <div className="min-w-[190px] flex-1 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-2 text-2xl font-black text-slate-800">{value}</p></div><span className={`rounded-xl p-3 ${accent}`}>{icon}</span></div></div>;
}

function AppContent() {
  const { user, isAdmin, signOut } = useAuth();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [period, setPeriod] = useState<'1H' | '2H'>('1H');
  const [year, setYear] = useState(2026);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [historyCandidate, setHistoryCandidate] = useState<Candidate | null>(null);
  const [history, setHistory] = useState<AuditLog[]>([]);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [picFilter, setPicFilter] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [editError, setEditError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ referrer: '', candidate_name: '', email: '', job_position: '', unit: '', stage: 'pv' as Candidate['stage'], pic: '', reward: 0, score_individual: true, score_unit: true });
  const [editFormData, setEditFormData] = useState({ referrer: '', candidate_name: '', email: '', job_position: '', unit: '', stage: 'pv' as Candidate['stage'], pic: '', reward: 0, score_individual: true, score_unit: true });

  useEffect(() => {
    const handleScroll = () => { const current = window.scrollY; setIsAtTop(current < 16); setHeaderVisible(current < 16 || current < lastScrollY); setLastScrollY(current); };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const fetchCandidates = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('candidates').select('*').eq('period', period).eq('year', year).order('created_at', { ascending: false });
    if (error) console.error(error); else setCandidates((data || []) as Candidate[]);
    setLoading(false);
  }, [period, year]);
  useEffect(() => { fetchCandidates(); }, [fetchCandidates]);

  const scrollTo = (id: string) => { setMobileMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const openEdit = (candidate: Candidate) => { setEditingCandidate(candidate); setEditError(null); setEditFormData({ referrer: candidate.referrer, candidate_name: candidate.candidate_name, email: candidate.email || '', job_position: candidate.job_position, unit: candidate.unit || '', stage: candidate.stage, pic: candidate.pic || '', reward: candidate.reward ?? 0, score_individual: candidate.score_individual ?? true, score_unit: candidate.score_unit ?? true }); };
  const addAudit = async (candidateId: string, field: string, oldValue: string, newValue: string) => { if (oldValue === newValue) return; await supabase.from('audit_logs').insert({ candidate_id: candidateId, changed_by: user?.email || 'Admin', field, old_value: oldValue, new_value: newValue }); };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); setSubmitError(null);
    const email = formData.email.trim().toLowerCase();
    const { data: duplicate } = await supabase.from('candidates').select('referrer, created_at').ilike('email', email).maybeSingle();
    if (duplicate) { setSubmitError(`Ứng viên có email này đã được ${duplicate.referrer} giới thiệu vào ngày ${formatDate(duplicate.created_at)}`); return; }
    const { error } = await supabase.from('candidates').insert({ ...formData, email, referrer: formData.referrer.trim(), candidate_name: formData.candidate_name.trim(), job_position: formData.job_position.trim(), unit: formData.unit.trim(), pic: formData.pic || null, period, year });
    if (error) setSubmitError(error.message); else { setIsModalOpen(false); setFormData({ referrer: '', candidate_name: '', email: '', job_position: '', unit: '', stage: 'pv', pic: '', reward: 0, score_individual: true, score_unit: true }); fetchCandidates(); }
  };

  const handleEdit = async (event: React.FormEvent) => {
    event.preventDefault(); if (!editingCandidate) return; setEditError(null);
    const next = { ...editFormData, email: editFormData.email.trim().toLowerCase(), referrer: editFormData.referrer.trim(), candidate_name: editFormData.candidate_name.trim(), job_position: editFormData.job_position.trim(), unit: editFormData.unit.trim(), pic: editFormData.pic || null };
    if (next.email !== (editingCandidate.email || '').toLowerCase()) { const { data: duplicate } = await supabase.from('candidates').select('id').ilike('email', next.email).neq('id', editingCandidate.id).maybeSingle(); if (duplicate) { setEditError('Email này đã tồn tại trong danh sách.'); return; } }
    const { error } = await supabase.from('candidates').update({ ...next, updated_at: new Date().toISOString() }).eq('id', editingCandidate.id);
    if (error) setEditError(error.message); else { await addAudit(editingCandidate.id, 'stage', editingCandidate.stage, next.stage); setEditingCandidate(null); fetchCandidates(); }
  };

  const openHistory = async (candidate: Candidate) => { setHistoryCandidate(candidate); const { data } = await supabase.from('audit_logs').select('*').eq('candidate_id', candidate.id).order('changed_at', { ascending: false }); setHistory((data || []) as AuditLog[]); };
  const deleteCandidate = async (candidate: Candidate) => { if (!confirm(`Xóa hồ sơ của "${candidate.candidate_name}"? Hành động này không thể hoàn tác.`)) return; const { error } = await supabase.from('candidates').delete().eq('id', candidate.id); if (error) alert('Không thể xóa: ' + error.message); else fetchCandidates(); };
  const filteredCandidates = useMemo(() => candidates.filter((candidate) => { const haystack = `${candidate.candidate_name} ${candidate.referrer} ${candidate.email || ''}`.toLowerCase(); return (!search || haystack.includes(search.toLowerCase())) && (!stageFilter || candidate.stage === stageFilter) && (!picFilter || candidate.pic === picFilter); }), [candidates, search, stageFilter, picFilter]);
  const totalReward = candidates.reduce((sum, item) => sum + (item.reward || 0), 0);
  const exportExcel = () => { const rows = filteredCandidates.map((item) => ({ 'Đại sứ giới thiệu': item.referrer, 'Email': item.email || '', 'Đơn vị': item.unit || '', 'Ứng viên': item.candidate_name, 'Vị trí ứng tuyển': item.job_position, 'Trạng thái': STAGES[item.stage].label, 'Điểm': STAGES[item.stage].points, 'Mức thưởng': `${item.reward || 0}M`, 'PIC': item.pic || '', 'Thời gian': formatDate(item.created_at) })); const ws = XLSX.utils.json_to_sheet(rows); const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, `Tracking ${period} ${year}`); XLSX.writeFile(wb, `Tracking_UngVien_${period}_${year}.xlsx`); };

  const navLinks = [['section-policy', 'Chính sách'], ['section-awards', 'Đại sứ Tuyển dụng FTI'], ['section-leaderboard', 'Bảng xếp hạng']];
  return <div className="min-h-screen bg-slate-50 text-slate-800">
    <nav className={`fixed left-0 top-0 z-40 w-full bg-[#2B266D] text-white shadow-md transition-all duration-300 ${headerVisible ? 'translate-y-0' : '-translate-y-full'} ${isAtTop ? 'py-4' : 'py-2 shadow-[0_4px_12px_rgba(0,0,0,0.2)]'}`}>
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4 px-4 sm:px-8">
        <div className="flex min-w-0 items-center gap-3"><span className="rounded-lg bg-[#FFC107] p-2 text-[#2B266D]"><Star className="h-5 w-5" /></span><div className="min-w-0"><h1 className="truncate text-lg font-black tracking-wide sm:text-xl">FTI TALENT HUB</h1><p className={`hidden text-xs text-indigo-200 transition-all duration-300 sm:block ${isAtTop ? 'opacity-100' : 'opacity-0 h-0'}`}>Hệ thống ghi nhận và vinh danh Đại sứ Tuyển dụng</p></div></div>
        <div className="hidden items-center gap-6 lg:flex">{navLinks.map(([id, label]) => <button key={id} onClick={() => scrollTo(id)} className="text-sm font-semibold text-white/90 transition hover:text-[#FFC107]">{label}</button>)}</div>
        <div className="flex items-center gap-2"><div className="hidden rounded-xl border border-indigo-700/50 bg-indigo-950 p-1 sm:flex"><button onClick={() => setPeriod('1H')} className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${period === '1H' ? 'bg-[#FFC107] text-[#2B266D]' : 'text-indigo-300'}`}>Kỳ 1H</button><button onClick={() => setPeriod('2H')} className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${period === '2H' ? 'bg-[#FFC107] text-[#2B266D]' : 'text-indigo-300'}`}>Kỳ 2H</button></div><select value={year} onChange={(event) => setYear(Number(event.target.value))} className="hidden rounded-xl border border-indigo-700/50 bg-indigo-950 px-2 py-2 text-xs font-semibold text-indigo-200 sm:block"><option value={2026}>Năm 2026</option><option value={2027}>Năm 2027</option></select>{user ? <button onClick={signOut} className="flex items-center gap-1 rounded-lg bg-indigo-800 px-3 py-2 text-xs"><LogOut className="h-3.5 w-3.5" /><span className="hidden sm:inline">Đăng xuất</span></button> : <button onClick={() => setIsLoginOpen(true)} className="flex items-center gap-1 rounded-lg bg-indigo-800 px-3 py-2 text-xs"><LogIn className="h-3.5 w-3.5" /><span className="hidden sm:inline">Đăng nhập</span></button>}<button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-lg p-2 lg:hidden"><Menu className="h-5 w-5" /></button></div>
      </div>
      {mobileMenuOpen && <div className="mx-4 mt-3 space-y-1 rounded-xl bg-indigo-950 p-2 lg:hidden">{navLinks.map(([id, label]) => <button key={id} onClick={() => scrollTo(id)} className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold hover:bg-indigo-800">{label}</button>)}</div>}
    </nav>
    <main className="mx-auto max-w-screen-2xl px-4 pb-8 pt-28 sm:px-8 lg:px-16"><PolicySection /><AwardCriteria /><div id="section-leaderboard" className="scroll-mt-24"><div className="mb-8 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2"><Leaderboard candidates={candidates} /><UnitLeaderboard candidates={candidates} /></div></div>
      {isAdmin && <section className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm"><div className="flex flex-col justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50 p-5 sm:flex-row sm:items-center"><div><h2 className="flex items-center gap-2 text-lg font-bold"><BookUser className="h-5 w-5 text-indigo-600" />Danh Sách Tracking Ứng Viên</h2><p className="mt-1 text-sm text-slate-500">Theo dõi tiến độ ứng viên được giới thiệu — Kỳ <b className="text-indigo-600">{period}</b>.</p></div><div className="flex gap-2"><button onClick={() => { setSubmitError(null); setIsModalOpen(true); }} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"><UserPlus className="h-4 w-4" />Thêm ứng viên</button><button onClick={exportExcel} className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"><Download className="h-4 w-4" />Xuất Excel</button></div></div>
        <div className="flex gap-4 overflow-x-auto border-b border-slate-100 bg-slate-50 p-4"><StatCard icon={<Users className="h-5 w-5" />} label="Tổng ứng viên" value={candidates.length} accent="bg-indigo-100 text-indigo-700" /><StatCard icon={<Clock className="h-5 w-5" />} label="Đang tuyển dụng" value={candidates.filter((item) => item.stage === 'pv' || item.stage === 'trung_tuyen').length} accent="bg-amber-100 text-amber-700" /><StatCard icon={<CheckCircle2 className="h-5 w-5" />} label="Đã onboard" value={candidates.filter((item) => item.stage === 'thu_viec' || item.stage === 'chinh_thuc').length} accent="bg-emerald-100 text-emerald-700" /><StatCard icon={<Award className="h-5 w-5" />} label="Tổng thưởng" value={`${totalReward}M`} accent="bg-orange-100 text-orange-600" /></div>
        <div className="border-b border-slate-100 p-4"><div className="flex flex-wrap items-center gap-2"><div className="relative min-w-[220px] flex-1"><Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm tên ứng viên, đại sứ, email..." className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-500" /></div><button onClick={() => setFilterOpen(!filterOpen)} className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600"><Filter className="h-4 w-4" />Bộ lọc</button></div><div className={`${filterOpen ? 'grid' : 'hidden'} mt-3 grid-cols-1 gap-2 sm:grid-cols-2`}><select value={stageFilter} onChange={(event) => setStageFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"><option value="">Tất cả trạng thái</option>{STAGE_PIPELINE.map((stage) => <option key={stage.key} value={stage.key}>{stage.label}</option>)}</select><select value={picFilter} onChange={(event) => setPicFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"><option value="">Tất cả PIC</option>{PIC_OPTIONS.map((pic) => <option key={pic}>{pic}</option>)}</select></div></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[950px] text-left"><thead><tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500"><th className="px-4 py-3">Đại sứ</th><th className="px-4 py-3">Ứng viên / Email</th><th className="px-4 py-3">Đơn vị</th><th className="px-4 py-3">Trạng thái</th><th className="px-4 py-3 text-center">Điểm</th><th className="px-4 py-3 text-center">Mức thưởng</th><th className="px-4 py-3">PIC</th><th className="px-4 py-3">Ngày</th><th className="px-4 py-3 text-center">Thao tác</th></tr></thead><tbody className="divide-y divide-slate-100">{loading ? <tr><td colSpan={9} className="p-8 text-center text-sm text-slate-400">Đang tải dữ liệu...</td></tr> : filteredCandidates.length === 0 ? <tr><td colSpan={9} className="p-8 text-center text-sm text-slate-400">Không có hồ sơ phù hợp.</td></tr> : filteredCandidates.map((item) => <tr key={item.id} className="transition hover:bg-slate-50"><td className="px-4 py-3 text-sm font-semibold">{item.referrer}</td><td className="px-4 py-3"><p className="text-sm font-medium">{item.candidate_name}</p><p className="text-xs text-slate-400">{item.email || 'Chưa có email'} · {item.job_position}</p></td><td className="px-4 py-3 text-sm"><span className="flex items-center gap-1"><Building2 className="h-4 w-4 text-slate-400" />{item.unit || '—'}</span></td><td className="px-4 py-3"><StagePipeline stage={item.stage} /></td><td className="px-4 py-3 text-center font-bold text-indigo-700">+{STAGES[item.stage].points}</td><td className="px-4 py-3 text-center"><span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${(item.reward || 0) === 0 ? 'bg-slate-100 text-slate-500' : 'bg-amber-100 text-amber-700'}`}>{item.reward || 0}M</span></td><td className="px-4 py-3 text-sm"><span className="flex items-center gap-1"><UserCog className="h-3.5 w-3.5 text-slate-400" />{item.pic || '—'}</span></td><td className="px-4 py-3 text-xs text-slate-500">{formatDate(item.created_at)}</td><td className="px-4 py-3"><div className="flex justify-center gap-1"><button onClick={() => openHistory(item)} title="Lịch sử" className="rounded-lg p-2 text-slate-400 transition hover:bg-amber-100 hover:text-amber-700"><History className="h-4 w-4" /></button><button onClick={() => openEdit(item)} title="Chỉnh sửa" className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-100 hover:text-indigo-600"><Pencil className="h-4 w-4" /></button><button onClick={() => deleteCandidate(item)} title="Xóa" className="rounded-lg p-2 text-slate-400 transition hover:bg-red-100 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></div></td></tr>)}</tbody></table></div>
      </section>}
    </main>
    {isModalOpen && isAdmin && <CandidateModal title="Nhập Ứng Viên Mới" data={formData} setData={setFormData} error={submitError} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />}
    {editingCandidate && isAdmin && <CandidateModal title="Chỉnh Sửa Ứng Viên" data={editFormData} setData={setEditFormData} error={editError} onClose={() => setEditingCandidate(null)} onSubmit={handleEdit} editing />}
    {historyCandidate && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"><div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"><div className="flex items-center justify-between border-b p-5"><div><h3 className="font-bold">Lịch sử cập nhật</h3><p className="text-sm text-slate-500">{historyCandidate.candidate_name}</p></div><button onClick={() => setHistoryCandidate(null)}><X className="h-5 w-5" /></button></div><div className="max-h-80 space-y-3 overflow-y-auto p-5">{history.length ? history.map((log) => <div key={log.id} className="rounded-xl bg-slate-50 p-3 text-sm"><p className="font-semibold">{formatDate(log.changed_at, true)} · {log.changed_by}</p><p className="mt-1 text-slate-600">Đã cập nhật {log.field}: <b>{log.old_value || 'Trống'}</b> → <b>{log.new_value || 'Trống'}</b></p></div>) : <p className="py-6 text-center text-sm text-slate-400">Chưa có lịch sử thay đổi.</p>}</div></div></div>}
    {isLoginOpen && !user && <AuthForm onClose={() => setIsLoginOpen(false)} />}
  </div>;
}

type CandidateFormData = { referrer: string; candidate_name: string; email: string; job_position: string; unit: string; stage: Candidate['stage']; pic: string; reward: number; score_individual: boolean; score_unit: boolean };

function CandidateModal({ title, data, setData, error, onClose, onSubmit, editing = false }: { title: string; data: CandidateFormData; setData: React.Dispatch<React.SetStateAction<CandidateFormData>>; error: string | null; onClose: () => void; onSubmit: (event: React.FormEvent) => void; editing?: boolean }) {
  const field = (key: keyof CandidateFormData, label: string, hint?: string, type = 'text') => <div><label className="mb-1 block text-xs font-bold uppercase text-slate-500">{label}</label><input type={type} required={key !== 'pic'} value={data[key]} onChange={(event) => setData((current) => ({ ...current, [key]: event.target.value }))} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500" />{hint && <p className="mt-1 text-[11px] font-medium text-slate-400">{hint}</p>}</div>;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"><div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl"><div className="flex items-center justify-between bg-[#2B266D] p-5 text-white"><h3 className="flex items-center gap-2 font-bold"><UserPlus className="h-5 w-5" />{title}</h3><button onClick={onClose}><X className="h-5 w-5" /></button></div><form onSubmit={onSubmit} className="space-y-4 p-6">{error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">{error}</div>}{field('referrer', 'Tên người giới thiệu (Đại sứ)', 'Nhập đầy đủ họ tên và domain CBNV - Ví dụ: Trần Thị Hoài Trang (TrangTTH39)')}{field('candidate_name', 'Tên ứng viên', 'Nhập đầy đủ họ tên UV')}{field('email', 'Email ứng viên', undefined, 'email')}{field('job_position', 'Vị trí ứng tuyển', 'Nhập vị trí theo tên Tiếng Anh của Job Board')}{field('unit', 'Đơn vị của Đại sứ', 'Nhập tên viết tắt Tiếng Anh - Ví dụ: PMCMN')}<div><label className="mb-1 block text-xs font-bold uppercase text-slate-500">Mức thưởng</label><select value={data.reward} onChange={(event) => setData((current) => ({ ...current, reward: Number(event.target.value) }))} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm">{REWARD_OPTIONS.map((r) => <option key={r} value={r}>{r}M</option>)}</select></div><div><label className="mb-1 block text-xs font-bold uppercase text-slate-500">Trạng thái hiện tại</label><select value={data.stage} onChange={(event) => setData((current) => ({ ...current, stage: event.target.value as Candidate['stage'] }))} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm"><option value="pv">Phỏng vấn</option><option value="trung_tuyen">Trúng tuyển</option><option value="thu_viec">Thử việc</option><option value="chinh_thuc">Chính thức</option></select></div><div><label className="mb-1 block text-xs font-bold uppercase text-slate-500">PIC (Admin phụ trách)</label><select value={data.pic} onChange={(event) => setData((current) => ({ ...current, pic: event.target.value }))} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm"><option value="">Chưa phân công</option>{PIC_OPTIONS.map((pic) => <option key={pic}>{pic}</option>)}</select></div><div><label className="mb-1 block text-xs font-bold uppercase text-slate-500">Tính điểm cho bảng xếp hạng</label><div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"><label className="flex items-center gap-2 text-sm font-medium text-slate-700"><input type="checkbox" checked={data.score_individual} onChange={(event) => setData((current) => ({ ...current, score_individual: event.target.checked }))} className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />Bảng xếp hạng cá nhân</label><label className="flex items-center gap-2 text-sm font-medium text-slate-700"><input type="checkbox" checked={data.score_unit} onChange={(event) => setData((current) => ({ ...current, score_unit: event.target.checked }))} className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />Bảng xếp hạng đơn vị</label></div></div><div className="flex justify-end gap-3 pt-2"><button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold">Hủy</button><button type="submit" className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">{editing ? 'Lưu thay đổi' : 'Lưu thông tin'}</button></div></form></div></div>;
}

function App() { const { loading } = useAuth(); return loading ? <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-400">Đang tải...</div> : <AppContent />; }
export default App;
