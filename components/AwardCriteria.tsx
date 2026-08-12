import { Trophy, Users, CalendarDays, Target, AlertCircle, Building2, MapPin, Flame, Award } from 'lucide-react';

/* ──────────────────────────────────────────────── */
/* Data                                               */
/* ──────────────────────────────────────────────── */

const AWARDS = [
  {
    id: 'annual-individual',
    tag: 'CÁ NHÂN NĂM',
    title: 'ĐẠI SỨ TUYỂN DỤNG CỦA NĂM',
    subtitle: 'Recruitment Ambassador of the Year',
    badge: 'Toàn quốc',
    scope: 'Individual',
    prizeRaw: 10,
    prizeLabel: '10 TRIỆU',
    prizeUnit: '× 1 giải',
    count: '01 Giải toàn quốc',
    recipient: 'Cá nhân đạt giải trực tiếp nhận thưởng',
    deadline: 'Ban Nhân sự đối soát dữ liệu đến hết ngày 31/12',
    th: { from: 'bg-amber-500', to: 'to-amber-600' },
    cardGrad: 'from-amber-500 to-amber-700',
    accentBg: 'bg-amber-50',
    accentBorder: 'border-amber-200',
    accentText: 'text-amber-700',
    icon: '🥇',
    objective: 'Tôn vinh cá nhân có tổng điểm tích lũy xuất sắc nhất trong hoạt động giới thiệu ứng viên xuyên suốt năm tài chính.',
    eligibility: [
      'Toàn bộ cán bộ nhân viên, ngoại trừ:',
      '- Ban Điều hành, Ban Giám đốc nghiệp vụ.',
      '- Cán bộ quản lý từ cấp phòng trở lên.',
      '- Cán bộ nhân viên thuộc Ban Nhân sự.',
    ],
    criteria: [
      'Điều kiện bắt buộc: Có tối thiểu 03 ứng viên trở lên tham gia phỏng vấn.',
      'Tiêu chí xếp hạng: Căn cứ trên tổng điểm tích lũy cao nhất trong năm.',
    ],
    tiebreakerNote: 'Trường hợp từ hai (02) cá nhân trở lên có tổng điểm tích lũy bằng nhau, thứ tự ưu tiên được xác định như sau:',
    tiebreaker: ['Cá nhân có số lượng ứng viên ký Hợp đồng lao động chính thức nhiều hơn.', 'Cá nhân có số lượng ứng viên ký Hợp đồng thử việc nhiều hơn.', 'Cá nhân có số lượng ứng viên đạt phỏng vấn nhiều hơn.'],
  },
  {
    id: 'annual-unit',
    tag: 'ĐƠN VỊ NĂM',
    title: 'ĐẠI SỨ TUYỂN DỤNG NĂM',
    subtitle: 'Recruitment Ambassador of the Year (Team)',
    badge: 'Toàn quốc',
    scope: 'Team',
    prizeRaw: 20,
    prizeLabel: '20 TRIỆU',
    prizeUnit: '× 1 giải',
    count: '01 Giải toàn quốc',
    recipient: 'Trưởng đơn vị đại diện đơn vị nhận thưởng',
    deadline: 'Ban Nhân sự đối soát dữ liệu đến hết ngày 31/12',
    th: { from: 'bg-indigo-600', to: 'to-indigo-700' },
    cardGrad: 'from-indigo-500 to-indigo-800',
    accentBg: 'bg-indigo-50',
    accentBorder: 'border-indigo-200',
    accentText: 'text-indigo-700',
    icon: '🏆',
    objective: 'Tôn vinh tập thể đơn vị có đóng góp nổi bật nhất trong việc hỗ trợ và thúc đẩy hoạt động tuyển dụng của Công ty xuyên suốt năm tài chính.',
    eligibility: [
      'Toàn bộ đơn vị cấp Trung tâm/Ban theo cơ cấu tổ chức, ngoại trừ:',
      '- Ban Điều hành, Ban Giám đốc nghiệp vụ;',
      '- Ban Nhân sự.',
    ],
    criteria: [
      'Điều kiện bắt buộc: Có tối thiểu 05 ứng viên (tổng hợp từ toàn bộ cá nhân thuộc đơn vị) tham gia phỏng vấn.',
      'Tiêu chí xếp hạng: Đơn vị đạt tổng điểm tích lũy (tổng hợp từ toàn bộ cá nhân thuộc đơn vị) cao nhất năm.',
    ],
    tiebreakerNote: 'Trường hợp từ hai (02) đơn vị trở lên có tổng điểm tích lũy bằng nhau, thứ tự ưu tiên được xác định như sau:',
    tiebreaker: ['Đơn vị có tổng số lượng ứng viên ký Hợp đồng chính thức nhiều hơn.', 'Đơn vị có tổng số lượng ứng viên ký Hợp đồng thử việc nhiều hơn.', 'Đơn vị có tổng số lượng ứng viên đạt phỏng vấn nhiều hơn.'],
  },
  {
    id: 'first-half',
    tag: 'GIAI ĐOẠN 1H',
    title: 'ĐẠI SỨ TUYỂN DỤNG XUÂN HÈ',
    subtitle: 'Recruitment Ambassador – First Half',
    badge: 'Theo khu vực',
    scope: 'Miền Bắc + Miền Nam',
    prizeRaw: 5,
    prizeLabel: '5 TRIỆU',
    prizeUnit: '× 2 giải',
    count: '02 Giải (MB: 01, MN: 01)',
    recipient: 'Cá nhân đạt giải trực tiếp nhận thưởng',
    deadline: 'Ban Nhân sự đối soát dữ liệu đến hết ngày 30/06',
    th: { from: 'bg-emerald-500', to: 'to-emerald-600' },
    cardGrad: 'from-emerald-400 to-emerald-700',
    accentBg: 'bg-emerald-50',
    accentBorder: 'border-emerald-200',
    accentText: 'text-emerald-700',
    icon: '🌸',
    objective: 'Khen thưởng kịp thời cá nhân dẫn đầu phong trào giới thiệu ứng viên trong giai đoạn nửa đầu năm.',
    eligibility: [
      'Toàn bộ cán bộ nhân viên, ngoại trừ:',
      '- Ban Điều hành, Ban Giám đốc nghiệp vụ.',
      '- Cán bộ quản lý từ cấp phòng trở lên.',
      '- Cán bộ nhân viên thuộc Ban Nhân sự.',
    ],
    criteria: [
      'Điều kiện bắt buộc: Có tối thiểu 02 ứng viên trở lên tham gia phỏng vấn.',
      'Tiêu chí xếp hạng: Đạt tổng điểm tích lũy cao nhất trong kỳ 1H (01/01 – 30/06 của năm tài chính hiện tại).',
      'Xét duyệt riêng biệt theo Miền.',
    ],
    tiebreakerNote: 'Trường hợp từ hai (02) cá nhân trở lên có tổng điểm tích lũy bằng nhau, thứ tự ưu tiên được xác định như sau:',
    tiebreaker: ['Cá nhân có số lượng ứng viên ký Hợp đồng lao động chính thức nhiều hơn.', 'Cá nhân có số lượng ứng viên ký Hợp đồng thử việc nhiều hơn.', 'Cá nhân có số lượng ứng viên đạt phỏng vấn nhiều hơn.'],
  },
  {
    id: 'second-half',
    tag: 'GIAI ĐOẠN 2H',
    title: 'ĐẠI SỨ TUYỂN DỤNG THU ĐÔNG',
    subtitle: 'Recruitment Ambassador – Second Half',
    badge: 'Theo khu vực',
    scope: 'Miền Bắc + Miền Nam',
    prizeRaw: 5,
    prizeLabel: '5 TRIỆU',
    prizeUnit: '× 2 giải',
    count: '02 Giải (MB: 01, MN: 01)',
    recipient: 'Cá nhân đạt giải trực tiếp nhận thưởng',
    deadline: 'Ban Nhân sự đối soát dữ liệu đến hết ngày 31/12',
    th: { from: 'bg-sky-500', to: 'to-sky-600' },
    cardGrad: 'from-sky-400 to-sky-700',
    accentBg: 'bg-sky-50',
    accentBorder: 'border-sky-200',
    accentText: 'text-sky-700',
    icon: '🍂',
    objective: 'Khen thưởng kịp thời cá nhân dẫn đầu phong trào giới thiệu ứng viên trong giai đoạn nửa cuối năm.',
    eligibility: [
      'Toàn bộ cán bộ nhân viên, ngoại trừ:',
      '- Ban Điều hành, Ban Giám đốc nghiệp vụ.',
      '- Cán bộ quản lý từ cấp phòng trở lên.',
      '- Cán bộ nhân viên thuộc Ban Nhân sự.',
    ],
    criteria: [
      'Điều kiện bắt buộc: Có tối thiểu 02 ứng viên trở lên tham gia phỏng vấn.',
      'Tiêu chí xếp hạng: Đạt tổng điểm tích lũy cao nhất trong kỳ 2H (01/07 – 31/12 của năm tài chính hiện tại).',
      'Xét duyệt riêng biệt theo Miền.',
    ],
    tiebreakerNote: 'Trường hợp từ hai (02) cá nhân trở lên có tổng điểm tích lũy bằng nhau, thứ tự ưu tiên được xác định như sau:',
    tiebreaker: ['Cá nhân có số lượng ứng viên ký Hợp đồng lao động chính thức nhiều hơn.', 'Cá nhân có số lượng ứng viên ký Hợp đồng thử việc nhiều hơn.', 'Cá nhân có số lượng ứng viên đạt phỏng vấn nhiều hơn.'],
  },
];

/* ──────────────────────────────────────────────── */
/* 4.1 — Scoring Table                                 */
/* ──────────────────────────────────────────────── */

function ScoringTable() {
  const stages = [
    { label: 'UV tham gia phỏng vấn', sublabel: '', pts: '+1', color: 'bg-blue-500', light: 'bg-blue-50 border-blue-200 text-blue-700' },
    { label: 'UV trúng tuyển', sublabel: '(được gửi thư mời)', pts: '+3', color: 'bg-violet-500', light: 'bg-violet-50 border-violet-200 text-violet-700' },
    { label: 'UV ký HĐ thử việc', sublabel: '', pts: '+5', color: 'bg-amber-500', light: 'bg-amber-50 border-amber-200 text-amber-700' },
    { label: 'UV ký HĐLĐ chính thức', sublabel: '', pts: '+7', color: 'bg-emerald-500', light: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-5 transition-all duration-300 hover:shadow-lg hover:border-indigo-200">
      {/* Header row */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="text-left p-4 text-sm font-bold uppercase tracking-wider w-36">Nội dung</th>
              {stages.map((s) => (
                <th key={s.label} className="p-4 text-center text-sm font-bold uppercase tracking-wider border-l border-white/10">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-white/90 leading-tight">{s.label}</span>
                    {s.sublabel && <span className="text-slate-400 text-xs font-normal">{s.sublabel}</span>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-100">
              <td className="bg-slate-50 p-4 text-sm font-bold text-slate-500 uppercase tracking-wide border-r border-slate-200">
                Số điểm
              </td>
              {stages.map((s) => (
                <td key={s.label} className="p-4 text-center border-l border-slate-100">
                  <span className={`inline-flex items-center justify-center text-white font-black text-lg w-12 h-12 rounded-xl shadow-sm ${s.color}`}>
                    {s.pts}
                  </span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Scoring mechanism */}
      <div className="border-t-2 border-amber-200 bg-amber-50 p-5">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-base font-bold text-amber-800 uppercase tracking-wider mb-3">Cơ chế ghi nhận điểm</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-base text-amber-900 leading-relaxed text-pretty">
                <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
                Điểm số của mỗi ứng viên không được cộng dồn lũy kế qua các chặng mà chỉ được tính <strong>một lần duy nhất</strong> tại <strong>cột mốc cao nhất</strong> mà ứng viên đạt được trong chu trình tuyển dụng.
              </li>
              <li className="flex items-start gap-2.5 text-base text-amber-900 leading-relaxed text-pretty">
                <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
                Đối với ứng viên tham gia quy trình trong giai đoạn chuyển giao giữa các kỳ (1H &amp; 2H) hoặc giữa các năm tài chính, điểm số chỉ được ghi nhận một lần duy nhất tại kỳ/năm hoàn tất chu trình tuyển dụng.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────── */
/* 4.2 — Prize Showcase banner                         */
/* ──────────────────────────────────────────────── */

function PrizeShowcase() {
  return (
    <div className="relative overflow-hidden rounded-2xl mb-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

      <div className="relative px-6 pt-8 pb-6">
        <div className="text-center mb-6">
          <h3 className="text-xl sm:text-2xl font-black text-white mb-1.5 tracking-wide">
            CƠ CẤU GIẢI THƯỞNG ĐẠI SỨ TUYỂN DỤNG
          </h3>
          <p className="text-base text-slate-400">Tổng giá trị giải thưởng lên đến</p>
          <div className="mt-3 inline-flex flex-col items-center">
            <span className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent drop-shadow-lg">
              50.000.000
            </span>
            <span className="text-sm font-bold text-amber-300/80 tracking-widest mt-0.5">VND / NĂM TÀI CHÍNH</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" style={{ paddingTop: '9rem' }}>
          {AWARDS.map((a) => {
            const mascotMap: Record<string, string> = {
              'annual-individual': '/assets/images/3.png',
              'annual-unit': '/assets/images/4.png',
              'first-half': '/assets/images/5.png',
              'second-half': '/assets/images/6.png',
            };
            return (
              <div key={a.id} className="relative flex flex-col" style={{ marginTop: '-6rem' }}>
                {/* Mascot sitting on top of card */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                  style={{ bottom: 'calc(100% - 3.5rem)', width: '160px', height: '160px' }}
                >
                  <img
                    src={mascotMap[a.id]}
                    alt={a.tag}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
                <div
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${a.cardGrad} pt-16 pb-6 px-4 flex flex-col items-center text-center shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-default`}
                >
                  <div className="absolute inset-0 bg-white/5 rounded-2xl" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-white/30 rounded-t-2xl" />
                  <p className="text-xs font-bold text-white/75 uppercase tracking-widest leading-tight relative z-10 flex items-center gap-1">
                    <span>{a.icon}</span> {a.tag}
                  </p>
                  <p className="text-3xl sm:text-4xl font-black text-white mt-2 leading-none relative z-10 drop-shadow-lg">
                    {a.prizeLabel}
                  </p>
                  <p className="text-sm text-white/75 font-semibold mt-1.5 relative z-10">{a.prizeUnit}</p>
                  {a.id === 'annual-unit' && (
                    <span className="absolute top-2.5 right-2.5 bg-amber-400 text-amber-950 text-xs font-black px-2 py-0.5 rounded-full z-10 shadow">
                      TOP
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>


      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────── */
/* Criteria Table                                      */
/* ──────────────────────────────────────────────── */

type RowLabelProps = { icon: React.ReactNode; label: string };
function RowLabel({ icon, label }: RowLabelProps) {
  return (
    <div className="flex items-center gap-2 py-4 px-4 min-w-[140px]">
      <span className="text-slate-400 flex-shrink-0">{icon}</span>
      <span className="text-sm font-bold text-slate-500 uppercase tracking-wide leading-tight">{label}</span>
    </div>
  );
}

function CriteriaTable() {
  const headerColors: Record<string, string> = {
    'annual-individual': 'bg-amber-500',
    'annual-unit': 'bg-indigo-600',
    'first-half': 'bg-emerald-500',
    'second-half': 'bg-sky-500',
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-4 transition-all duration-300 hover:shadow-lg hover:border-indigo-200">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[820px]">
          <thead>
            <tr>
              <th className="bg-slate-800 w-[148px] p-4 text-left align-bottom">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Tiêu chí</span>
              </th>
              {AWARDS.map((a) => (
                <th key={a.id} className={`${headerColors[a.id]} p-4 text-center align-top border-l border-white/20`} style={{ width: '22%' }}>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg">{a.icon}</span>
                    <span className="text-xs font-bold text-white/70 uppercase tracking-widest">{a.tag}</span>
                    <span className="text-sm font-black text-white leading-tight text-center">"{a.title}"</span>
                    <span className="text-xs text-white/60 leading-tight mt-0.5">{a.subtitle}</span>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-2.5 h-2.5 text-white/50" />
                      <span className="text-xs text-white/60">{a.badge}</span>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Mục tiêu cốt lõi */}
            <tr className="border-t border-slate-100">
              <td className="bg-slate-50 border-r border-slate-200">
                <RowLabel icon={<Target className="w-4 h-4" />} label="Mục tiêu cốt lõi" />
              </td>
              {AWARDS.map((a) => (
                <td key={a.id} className="p-4 align-top border-l border-slate-100 text-base text-slate-600 leading-relaxed">
                  {a.objective}
                </td>
              ))}
            </tr>

            {/* Đối tượng */}
            <tr className="border-t border-slate-100 bg-slate-50/40">
              <td className="bg-slate-50 border-r border-slate-200">
                <RowLabel icon={<Users className="w-4 h-4" />} label="Đối tượng áp dụng" />
              </td>
              {AWARDS.map((a) => (
                <td key={a.id} className="p-4 align-top border-l border-slate-100">
                  <ul className="space-y-1">
                    {a.eligibility.map((e, i) => (
                      <li key={i} className="text-sm leading-relaxed">
                        {i === 0
                          ? <span className="text-slate-700 font-semibold">{e}</span>
                          : <span className="text-rose-600">{e}</span>
                        }
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Nguyên tắc xét giải */}
            <tr className="border-t border-slate-100">
              <td className="bg-slate-50 border-r border-slate-200">
                <RowLabel icon={<Award className="w-4 h-4" />} label="Nguyên tắc xét giải & Tie-breaker" />
              </td>
              {AWARDS.map((a, ai) => {
                const colors = ['bg-amber-500', 'bg-indigo-600', 'bg-emerald-500', 'bg-sky-500'];
                const accentBgs = ['bg-amber-50', 'bg-indigo-50', 'bg-emerald-50', 'bg-sky-50'];
                const accentTexts = ['text-amber-700', 'text-indigo-700', 'text-emerald-700', 'text-sky-700'];
                return (
                  <td key={a.id} className={`p-4 align-top border-l border-slate-100 ${accentBgs[ai]}`}>
                    <ul className="space-y-2 mb-3">
                      {a.criteria.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700 leading-relaxed">
                          <span className={`mt-0.5 w-5 h-5 rounded-full ${colors[ai]} text-white flex items-center justify-center text-xs font-bold flex-shrink-0`}>
                            {i + 1}
                          </span>
                          {c}
                        </li>
                      ))}
                    </ul>
                    <div className={`rounded-lg p-2 border ${a.accentBorder}`}>
                      <p className={`text-sm font-bold ${accentTexts[ai]} mb-2`}>
                        Lưu ý: {(a as typeof a & { tiebreakerNote?: string }).tiebreakerNote}
                      </p>
                      {a.tiebreaker.map((t, i) => (
                        <div key={i} className="flex items-start gap-1.5 mb-0.5">
                          <span className={`text-xs font-black ${accentTexts[ai]} flex-shrink-0`}>- </span>
                          <span className="text-sm text-slate-600 leading-snug">{t}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* Số lượng & Hình thức */}
            <tr className="border-t border-slate-100 bg-slate-50/40">
              <td className="bg-slate-50 border-r border-slate-200">
                <RowLabel icon={<Trophy className="w-4 h-4" />} label="Số lượng & Hình thức nhận" />
              </td>
              {AWARDS.map((a, ai) => {
                const accentTexts = ['text-amber-700', 'text-indigo-700', 'text-emerald-700', 'text-sky-700'];
                const accentBgs = ['bg-amber-100', 'bg-indigo-100', 'bg-emerald-100', 'bg-sky-100'];
                return (
                  <td key={a.id} className="p-4 align-top border-l border-slate-100">
                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg ${accentBgs[ai]} mb-2`}>
                      <Flame className={`w-3 h-3 ${accentTexts[ai]}`} />
                      <span className={`text-sm font-bold ${accentTexts[ai]}`}>{a.count}</span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{a.recipient}</p>
                  </td>
                );
              })}
            </tr>

            {/* Thời hạn */}
            <tr className="border-t border-slate-100">
              <td className="bg-slate-50 border-r border-slate-200">
                <RowLabel icon={<CalendarDays className="w-4 h-4" />} label="Thời hạn chốt số liệu" />
              </td>
              {AWARDS.map((a) => (
                <td key={a.id} className="p-4 text-center border-l border-slate-100 align-middle">
                  <div className="flex items-center justify-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-sm text-slate-600 font-medium">{a.deadline}</span>
                  </div>
                </td>
              ))}
            </tr>


          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────── */
/* Main export                                         */
/* ──────────────────────────────────────────────── */

export function AwardCriteria() {
  return (
    <div id="section-awards" className="mb-12 scroll-mt-20">
      {/* Large section heading */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-900 text-amber-400 font-black text-sm shadow-md flex-shrink-0">
            4
          </div>
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 uppercase tracking-wide leading-tight">
              Chương trình vinh danh "Đại sứ tuyển dụng FTI"
            </h2>
            <p className="text-base text-slate-500 mt-1">
              Giải thưởng được xét duyệt độc lập dựa trên tổng điểm tích lũy từ hoạt động giới thiệu ứng viên
            </p>
          </div>
        </div>
        <div className="mt-3 h-px bg-gradient-to-r from-indigo-200 via-slate-200 to-transparent" />
      </div>

      {/* 4.1 Cách thức tính điểm */}
      <div className="mb-5">
        <p className="text-lg font-bold text-indigo-700 uppercase tracking-widest mb-3 pl-1">
          4.1 — Cách thức ghi nhận điểm theo mốc tuyển dụng
        </p>
        <ScoringTable />
      </div>

      {/* 4.2 Chi tiết giải thưởng */}
      <div className="mb-5">
        <p className="text-lg font-bold text-indigo-700 uppercase tracking-widest mb-3 pl-1">
          4.2 — Chi tiết các Hạng mục Giải thưởng
        </p>
        <PrizeShowcase />
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-indigo-600 rounded-full" />
            <h3 className="text-lg font-bold text-slate-700 uppercase tracking-wider">Tiêu chí xét duyệt chi tiết</h3>
          </div>
          <div className="flex-1 h-px bg-slate-200" />
          <Building2 className="w-4 h-4 text-slate-300" />
        </div>
        <CriteriaTable />
      </div>
    </div>
  );
}
