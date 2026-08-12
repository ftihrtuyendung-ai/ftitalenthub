import { Trophy, Crown, Medal, Building2 } from 'lucide-react';
import { Candidate, STAGES } from '../lib/supabase';

export type LeaderboardEntry = {
  name: string;
  points: number;
  details: { pv: number; trung_tuyen: number; thu_viec: number; chinh_thuc: number };
};

function extractShortName(name: string): string {
  const match = name.match(/\(([^)]+)\)/);
  return match ? match[1].trim() : name;
}

function buildLeaderboard(candidates: Candidate[], groupBy: 'referrer' | 'unit'): LeaderboardEntry[] {
  const board: Record<string, LeaderboardEntry> = {};
  candidates.forEach((item) => {
    const eligible = groupBy === 'unit' ? item.score_unit !== false : item.score_individual !== false;
    if (!eligible) return;
    const key = groupBy === 'unit' ? (item.unit || 'Chưa xác định') : item.referrer;
    if (!board[key]) {
      board[key] = { name: key, points: 0, details: { pv: 0, trung_tuyen: 0, thu_viec: 0, chinh_thuc: 0 } };
    }
    board[key].points += STAGES[item.stage].points;
    board[key].details[item.stage]++;
  });
  return Object.values(board).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.details.chinh_thuc !== a.details.chinh_thuc) return b.details.chinh_thuc - a.details.chinh_thuc;
    if (b.details.thu_viec !== a.details.thu_viec) return b.details.thu_viec - a.details.thu_viec;
    return b.details.pv - a.details.pv;
  });
}

/* ─── Shared pieces ─── */

function MedalBadge({ rank }: { rank: number }) {
  if (rank === 1) return (
    <span className="w-6 h-6 rounded-full bg-amber-400 text-indigo-950 font-bold text-xs flex items-center justify-center shadow-xs flex-shrink-0">
      <Crown className="w-3 h-3" />
    </span>
  );
  if (rank === 2) return (
    <span className="w-6 h-6 rounded-full bg-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center shadow-xs flex-shrink-0">2</span>
  );
  if (rank === 3) return (
    <span className="w-6 h-6 rounded-full bg-amber-700 text-white font-bold text-xs flex items-center justify-center shadow-xs flex-shrink-0">3</span>
  );
  return (
    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center flex-shrink-0">{rank}</span>
  );
}

function FoxAvatar({ size }: { size: number }) {
  return (
    <img
      src="/assets/images/1.png"
      alt="fox"
      style={{ width: size, height: size, objectFit: 'contain' }}
      className="drop-shadow-md"
    />
  );
}

/* ─── Shared Podium Slot (used by both leaderboards) ─── */

type PodiumSlotProps = {
  entry: LeaderboardEntry | undefined;
  rank: 1 | 2 | 3;
  displayName: (name: string) => string;
  foxCount?: number;
};

const PODIUM_CONFIGS = {
  1: { foxSize: 88, barH: 'h-16', barBg: 'bg-indigo-900', barText: 'text-amber-400', nameStyle: 'text-sm font-black text-indigo-950', scoreStyle: 'text-base font-black text-amber-600', order: 2 },
  2: { foxSize: 68, barH: 'h-10', barBg: 'bg-slate-200/80', barText: 'text-slate-400',  nameStyle: 'text-[11px] font-bold text-slate-600', scoreStyle: 'text-xs font-extrabold text-slate-500', order: 1 },
  3: { foxSize: 56, barH: 'h-7',  barBg: 'bg-amber-100/60', barText: 'text-amber-700/60', nameStyle: 'text-[11px] font-bold text-slate-600', scoreStyle: 'text-xs font-extrabold text-amber-800/80', order: 3 },
} as const;

function PodiumSlot({ entry, rank, displayName, foxCount = 1 }: PodiumSlotProps) {
  const c = PODIUM_CONFIGS[rank];
  const unitSize = Math.round(c.foxSize * 0.62);
  const gap = rank === 1 ? -10 : rank === 2 ? -8 : -6;

  return (
    <div className="flex flex-col items-center group" style={{ order: c.order }}>
      {entry ? (
        <>
          <div className="relative mb-1 flex flex-col items-center transition-transform duration-300 group-hover:scale-110">
            {rank === 1 && (
              <div className="text-amber-400 animate-pulse mb-1 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]">
                <Crown className="w-5 h-5" />
              </div>
            )}
            <div className="relative">
              {foxCount > 1 ? (
                <div className="flex items-end" style={{ gap }}>
                  {Array.from({ length: foxCount }).map((_, i) => (
                    <FoxAvatar key={i} size={unitSize} />
                  ))}
                </div>
              ) : (
                <FoxAvatar size={c.foxSize} />
              )}
              <span
                className={`absolute -top-1 -right-1 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-black shadow ${
                  rank === 1 ? 'bg-amber-500 text-white' : rank === 2 ? 'bg-slate-400 text-white' : 'bg-amber-700/70 text-white'
                }`}
              >
                {rank}
              </span>
            </div>
          </div>
          <p className={`truncate w-full text-center ${c.nameStyle}`}>
            {displayName(entry.name)}
          </p>
          <span className={c.scoreStyle}>{entry.points}đ</span>
        </>
      ) : (
        <div style={{ height: c.foxSize }} />
      )}
      <div className={`${c.barH} ${c.barBg} w-full rounded-t-lg mt-2 flex items-center justify-center ${c.barText} transition-all duration-300 group-hover:shadow-lg ${rank === 1 ? 'group-hover:shadow-amber-500/50' : 'group-hover:shadow-indigo-500/30'}`}>
        {rank === 1 ? <Trophy className="w-5 h-5 group-hover:rotate-6 transition-transform" /> : <Medal className="w-4 h-4" />}
      </div>
    </div>
  );
}

/* ─── Shared full-list row ─── */

type ListRowProps = {
  entry: LeaderboardEntry;
  rank: number;
};

function ListRow({ entry, rank }: ListRowProps) {
  const isTop3 = rank <= 3;
  return (
    <div className={`flex items-center justify-between py-3 px-2 rounded-xl transition-all duration-200 hover:bg-slate-50 hover:translate-x-1 ${isTop3 ? 'bg-gradient-to-r from-amber-50/50 to-transparent' : ''}`}>
      <div className="flex items-center gap-3 min-w-0">
        <MedalBadge rank={rank} />
        <div className="min-w-0">
          <h4 className="font-bold text-slate-800 text-base truncate">{entry.name}</h4>
          <p className="text-xs text-slate-400">
            PV: {entry.details.pv} | Đạt: {entry.details.trung_tuyen} |{' '}
            Thử: <span className="text-amber-600 font-bold">{entry.details.thu_viec}</span> |{' '}
            Chính: <span className="text-emerald-600 font-bold">{entry.details.chinh_thuc}</span>
          </p>
        </div>
      </div>
      <div className="text-right flex-shrink-0 ml-2">
        <span className="font-black text-indigo-950 text-base">{entry.points}</span>{' '}
        <span className="text-xs text-slate-400">điểm</span>
      </div>
    </div>
  );
}

/* ─── Individual Leaderboard ─── */

export function Leaderboard({ candidates }: { candidates: Candidate[] }) {
  const board = buildLeaderboard(candidates, 'referrer');

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200/60 overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:border-indigo-300 hover:-translate-y-1">
      <div className="p-5 bg-gradient-to-b from-indigo-950 to-indigo-900 text-white">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" /> Bảng Xếp Hạng Cá Nhân
        </h2>
        <p className="text-sm text-indigo-200 mt-0.5">Đại sứ cá nhân xuất sắc nhất kỳ này.</p>
      </div>

      <div className="px-4 pt-6 pb-0 bg-slate-50 border-b border-slate-100 grid grid-cols-3 gap-1 items-end text-center flex-shrink-0 h-[230px]">
        {board.length === 0 ? (
          <div className="col-span-3 text-xs text-slate-400 py-6">Chưa có dữ liệu</div>
        ) : (
          <>
            <PodiumSlot entry={board[1]} rank={2} displayName={extractShortName} />
            <PodiumSlot entry={board[0]} rank={1} displayName={extractShortName} />
            <PodiumSlot entry={board[2]} rank={3} displayName={extractShortName} />
          </>
        )}
      </div>

      <div className="divide-y divide-slate-100 flex-1 overflow-y-auto p-4">
        {board.length === 0 ? (
          <p className="text-slate-400 text-xs text-center py-4">Chưa có dữ liệu xếp hạng</p>
        ) : (
          board.map((entry, idx) => <ListRow key={entry.name} entry={entry} rank={idx + 1} />)
        )}
      </div>
    </div>
  );
}

/* ─── Unit Leaderboard ─── */

export function UnitLeaderboard({ candidates }: { candidates: Candidate[] }) {
  const board = buildLeaderboard(candidates, 'unit');

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200/60 overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:border-indigo-300 hover:-translate-y-1">
      <div className="p-5 bg-gradient-to-b from-indigo-950 to-indigo-900 text-white">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Building2 className="w-5 h-5 text-amber-400" /> Bảng Xếp Hạng Đơn Vị
        </h2>
        <p className="text-sm text-indigo-200 mt-0.5">Đơn vị có nhiều đóng góp xuất sắc trong công tác tuyển dụng</p>
      </div>

      <div className="px-4 pt-6 pb-0 bg-slate-50 border-b border-slate-100 grid grid-cols-3 gap-1 items-end text-center flex-shrink-0 h-[230px]">
        {board.length === 0 ? (
          <div className="col-span-3 text-xs text-slate-400 py-6">Chưa có dữ liệu</div>
        ) : (
          <>
            <PodiumSlot entry={board[1]} rank={2} displayName={(n) => n} />
            <PodiumSlot entry={board[0]} rank={1} displayName={(n) => n} />
            <PodiumSlot entry={board[2]} rank={3} displayName={(n) => n} />
          </>
        )}
      </div>

      <div className="divide-y divide-slate-100 flex-1 overflow-y-auto p-4">
        {board.length === 0 ? (
          <p className="text-slate-400 text-xs text-center py-4">Chưa có dữ liệu xếp hạng đơn vị.</p>
        ) : (
          board.map((entry, idx) => <ListRow key={entry.name} entry={entry} rank={idx + 1} />)
        )}
      </div>
    </div>
  );
}
