import { Target, CheckCircle2, Gift, RotateCcw, Info, AlertTriangle, Users, TrendingUp, HeartHandshake, FileCheck, UserCheck, Ligature as FileSignature, ShieldCheck } from 'lucide-react';

/* ──────────────────────────────────────────────── */
/* Data                                                */
/* ──────────────────────────────────────────────── */

const OBJECTIVES = [
  {
    icon: TrendingUp,
    title: 'Nâng cao chất lượng',
    text: 'Nâng cao chất lượng ứng viên và mở rộng kênh tuyển dụng của Công ty.',
    accent: 'indigo',
    grad: 'from-indigo-500 to-indigo-700',
    bg: 'from-indigo-50 to-white',
    ring: 'ring-indigo-200',
    iconBg: 'bg-indigo-100',
    iconText: 'text-indigo-600',
    chipBg: 'bg-indigo-600',
  },
  {
    icon: Users,
    title: 'Khuyến khích giới thiệu',
    text: 'Khuyến khích CBNV giới thiệu ứng viên cho các vị trí tuyển dụng của Công ty.',
    accent: 'emerald',
    grad: 'from-emerald-500 to-emerald-700',
    bg: 'from-emerald-50 to-white',
    ring: 'ring-emerald-200',
    iconBg: 'bg-emerald-100',
    iconText: 'text-emerald-600',
    chipBg: 'bg-emerald-600',
  },
  {
    icon: HeartHandshake,
    title: 'Gắn kết CBNV',
    text: 'Tăng cường độ gắn kết của CBNV với Công ty.',
    accent: 'amber',
    grad: 'from-amber-500 to-amber-600',
    bg: 'from-amber-50 to-white',
    ring: 'ring-amber-200',
    iconBg: 'bg-amber-100',
    iconText: 'text-amber-600',
    chipBg: 'bg-amber-500',
  },
];

const CONDITIONS = [
  {
    icon: FileCheck,
    title: 'Hồ sơ hợp lệ',
    text: 'Hồ sơ của ứng viên giới thiệu được CBNV gửi trực tiếp đến Ban Nhân sự hoặc gửi qua website ',
    linkLabel: 'FTI Careers',
    linkUrl: 'https://fticareer.vn/gioi-thieu-ung-vien',
    color: 'indigo',
    dot: 'bg-indigo-500',
    line: 'bg-indigo-200',
    iconBg: 'bg-indigo-100',
    iconText: 'text-indigo-600',
    chipBg: 'bg-indigo-600',
    subItems: [],
  },
  {
    icon: UserCheck,
    title: 'Ứng viên chưa từng làm việc tại FTI',
    text: 'Ứng viên được giới thiệu chưa từng làm việc tại FTI; chưa có trong danh sách ứng viên đang được Ban Nhân sự xem xét tuyển chọn (không nằm trong danh sách đang xem xét hồ sơ, thi tuyển, phỏng vấn hoặc đàm phán ký HĐLĐ; không nằm trong danh sách sinh viên thực tập) trong vòng 06 tháng gần nhất.',
    color: 'emerald',
    dot: 'bg-emerald-500',
    line: 'bg-emerald-200',
    iconBg: 'bg-emerald-100',
    iconText: 'text-emerald-600',
    chipBg: 'bg-emerald-600',
    linkLabel: '',
    linkUrl: '',
    subItems: [],
  },
  {
    icon: FileSignature,
    title: 'Hồ sơ trúng tuyển chuẩn đầy đủ',
    text: 'Ứng viên trúng tuyển phải chuẩn đầy đủ hồ sơ theo quy định để ký Hợp đồng lao động trước ngày nhận việc trên Thông báo trúng tuyển.',
    color: 'sky',
    dot: 'bg-sky-500',
    line: 'bg-sky-200',
    iconBg: 'bg-sky-100',
    iconText: 'text-sky-600',
    chipBg: 'bg-sky-600',
    linkLabel: '',
    linkUrl: '',
    subItems: [],
  },
  {
    icon: ShieldCheck,
    title: 'Thử việc / Bổ nhiệm thách thức',
    text: '',
    subItems: [
      { label: '4.1', text: 'Áp dụng với Ứng viên Cấp bậc Nhân viên: Phải trải qua thời gian thử việc và ký HĐLĐ Chính thức với Công ty.' },
      { label: '4.2', text: 'Áp dụng với Ứng viên Cấp bậc Quản lý: Phải trải qua thời gian bổ nhiệm thách thức 06 (sáu) tháng tại Công ty.' },
    ],
    color: 'amber',
    dot: 'bg-amber-500',
    line: 'bg-amber-200',
    iconBg: 'bg-amber-100',
    iconText: 'text-amber-600',
    chipBg: 'bg-amber-500',
    linkLabel: '',
    linkUrl: '',
  },
];

const BONUS_ROWS = [
  {
    position: 'Kỹ thuật vận hành & Hệ thống thông tin',
    lv2: '5.000.000',
    lv3: '10.000.000',
    lv4: '20.000.000',
    mergeL3L4: false,
    note: ['Toàn thể CBNV, ngoại trừ:', '- Ban Điều hành, Ban Giám đốc nghiệp vụ.', '- Ban Giám đốc trung tâm, Trưởng/Phó phòng giới thiệu cho chính đơn vị trực thuộc.', '- CBNV thuộc Ban Nhân sự.'],
    noteRowspan: 2,
    showNote: true,
  },
  {
    position: 'Nhân viên/Trưởng nhóm Kinh doanh',
    lv2: '2.000.000',
    lv3: '5.000.000',
    lv4: '—',
    mergeL3L4: false,
    note: [],
    noteRowspan: 1,
    showNote: false,
  },
  {
    position: 'Trưởng/Phó Phòng',
    lv2: '—',
    lv3: '15.000.000',
    lv4: '—',
    mergeL3L4: true,
    note: ['Toàn thể CBNV, ngoại trừ:', '- Ban Điều hành, Ban Giám đốc nghiệp vụ.', '- Ban Giám đốc trung tâm, Trưởng/Phó phòng giới thiệu cho chính đơn vị trực thuộc.'],
    noteRowspan: 3,
    showNote: true,
  },
  {
    position: 'Giám đốc/Phó Giám đốc',
    lv2: '—',
    lv3: '20.000.000',
    lv4: '—',
    mergeL3L4: true,
    note: [],
    noteRowspan: 1,
    showNote: false,
  },
  {
    position: 'Những vị trí CoE*',
    lv2: '—',
    lv3: '20.000.000',
    lv4: '—',
    mergeL3L4: true,
    note: [],
    noteRowspan: 1,
    showNote: false,
    highlight: true,
  },
];

/* ──────────────────────────────────────────────── */
/* Section Heading — large, visible                  */
/* ──────────────────────────────────────────────── */

type SectionHeadingProps = {
  number: string;
  title: string;
  subtitle?: string;
};

function SectionHeading({ number, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-900 text-amber-400 font-black text-sm shadow-md flex-shrink-0">
          {number}
        </div>
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 uppercase tracking-wide leading-tight">
            {title}
          </h2>
          {subtitle && <p className="text-base text-slate-500 mt-0.5 text-pretty">{subtitle}</p>}
        </div>
      </div>
      <div className="mt-3 h-px bg-gradient-to-r from-indigo-200 via-slate-200 to-transparent" />
    </div>
  );
}

/* ──────────────────────────────────────────────── */
/* Policy Header Banner                                */
/* ──────────────────────────────────────────────── */

function PolicyHeader() {
  return (
    <div className="relative rounded-2xl mb-8 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 overflow-visible">
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent rounded-t-2xl" />

      {/* NEW badge */}
      <span className="absolute top-5 right-5 z-10 inline-flex items-center px-3 py-1 rounded-md bg-amber-600 text-white text-xs font-black uppercase tracking-widest shadow-lg">
        NEW
      </span>

      <div className="relative flex items-stretch min-h-[140px]">
        {/* Text block */}
        <div className="flex-1 px-7 sm:px-10 py-8 flex flex-col justify-center min-w-0">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide leading-tight uppercase">
            Chính sách giới thiệu ứng viên
          </h1>
          <p className="text-base text-indigo-200 mt-2.5 leading-relaxed max-w-xl text-pretty">
            Chính sách thưởng dành cho CBNV khi giới thiệu ứng viên thành công tại <br /> Công ty TNHH Một thành viên Viễn thông Quốc tế FPT.
          </p>
          <p className="text-sm italic text-amber-300/80 mt-1.5 leading-relaxed max-w-xl">
            (Landing page chỉ sử dụng cho mục đích nội bộ, không chia sẻ ra bên ngoài)
          </p>
        </div>

        <div className="flex flex-shrink-0 items-center justify-center px-4 sm:px-6">
          <a
            href="https://fticareer.vn/gioi-thieu-ung-vien"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border-2 border-[#F26522] bg-white px-4 py-3 text-center text-xs font-bold text-[#F26522] shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-[#F26522] hover:text-white sm:px-6 sm:text-sm"
          >
            GIỚI THIỆU ỨNG VIÊN NGAY
          </a>
        </div>

        {/* Mascot — overflows top of banner */}
        <div className="hidden sm:flex flex-shrink-0 items-end self-end pointer-events-none select-none" style={{ marginBottom: 0 }}>
          <img
            src="/assets/images/2 copy.png"
            alt="Mascot đại sứ tuyển dụng FTI"
            className="w-auto object-contain drop-shadow-2xl"
            style={{ height: '210px', marginBottom: '-1px', marginRight: '80px', marginTop: '-40px' }}
          />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────── */
/* Section 1 — Mục đích (rich colorful cards)         */
/* ──────────────────────────────────────────────── */

function ObjectivesSection() {
  return (
    <section className="mb-10">
      <SectionHeading number="1" title="Mục đích" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {OBJECTIVES.map((obj, i) => {
          const Icon = obj.icon;
          return (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${obj.bg} border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-indigo-300 transition-all duration-300`}
            >
              {/* Top gradient bar */}
              <div className={`h-1.5 bg-gradient-to-r ${obj.grad}`} />

              {/* Decorative number watermark */}
              <span className="absolute -bottom-4 -right-2 text-7xl font-black text-slate-100 select-none leading-none">
                {i + 1}
              </span>

              <div className="relative p-5 pt-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-11 h-11 rounded-xl ${obj.iconBg} flex items-center justify-center shadow-sm`}>
                    <Icon className={`w-5 h-5 ${obj.iconText}`} />
                  </div>
                </div>
                <h3 className="text-base font-black text-slate-800 mb-2 leading-tight">
                  {obj.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed text-pretty">
                  {obj.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────── */
/* Section 2 — Điều kiện thưởng (vertical timeline)   */
/* ──────────────────────────────────────────────── */

function ConditionsSection() {
  return (
    <section className="mb-10">
      <SectionHeading
        number="2"
        title="Điều kiện thưởng"
        subtitle="Người giới thiệu được thưởng khi đáp ứng đồng thời các điều kiện sau:"
      />
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7">
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-indigo-200 via-emerald-200 via-sky-200 to-amber-200" />

          <div className="space-y-4">
            {CONDITIONS.map((cond, i) => {
              const Icon = cond.icon;
              return (
                <div key={i} className="relative flex items-start gap-4">
                  {/* Numbered icon circle */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full ${cond.iconBg} flex items-center justify-center ring-4 ring-white shadow-sm z-10 relative`}>
                      <Icon className={`w-4.5 h-4.5 ${cond.iconText}`} />
                    </div>
                    <span className={`absolute -top-1 -right-1 w-5 h-5 ${cond.chipBg} text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-white z-20`}>
                      {i + 1}
                    </span>
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 rounded-xl border border-slate-100 bg-gradient-to-r from-slate-50 to-white px-4 py-3 hover:shadow-sm transition-shadow`}>
                    {cond.subItems.length > 0 ? (
                      <div className="space-y-2.5">
                        {cond.subItems.map((sub, si) => (
                          <div key={si} className="flex items-start gap-2.5">
                            <span className="text-xs font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded flex-shrink-0 mt-0.5">{sub.label}</span>
                            <p className="text-base text-slate-600 leading-relaxed text-pretty">{sub.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-base text-slate-600 leading-relaxed text-pretty">
                        {cond.text}
                        {cond.linkUrl && (
                          <a href={cond.linkUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold underline hover:text-indigo-700">
                            {cond.linkLabel}
                          </a>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-5 flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <p className="text-sm text-emerald-700 font-semibold">
            Tất cả các điều kiện trên phải được đáp ứng <strong>đồng thời</strong> để đủ điều kiện nhận thưởng.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────── */
/* Section 3 — Hình thức thưởng (3.1 + 3.2)           */
/* ──────────────────────────────────────────────── */

function BonusTableSection() {
  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-200 shadow-lg bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-emerald-400">
      {/* Decorative corner glow */}
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-emerald-300/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div id="section-3-1" className="relative p-5 sm:p-6 pb-4 bg-gradient-to-r from-emerald-500 to-emerald-700 border-b border-emerald-200">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-400 text-emerald-950 font-black text-sm shadow flex-shrink-0">
            3.1
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-black text-white uppercase tracking-wide leading-tight">
              Mức thưởng giới thiệu ứng viên thành công
            </h3>
            <p className="text-sm text-emerald-200 mt-0.5">
              Đợt 1 — thưởng được chia trả ngay sau khi ứng viên hoàn thành thử việc/thách thức bổ nhiệm
            </p>
          </div>
          <span className="bg-emerald-400 text-emerald-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap shadow">
            Đợt 1
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 text-slate-700">
              <th className="text-left p-4 text-sm font-bold uppercase tracking-wider w-[260px]">
                Vị trí / Cấp bậc CBNV
                <br />
                <span className="text-slate-400 normal-case font-normal text-xs">theo quy định công ty</span>
              </th>
              <th className="p-4 text-center text-sm font-bold uppercase tracking-wider" colSpan={3}>
                Mức thưởng (VNĐ)
              </th>
              <th className="text-center p-4 text-sm font-bold uppercase tracking-wider">
                Đối tượng áp dụng
              </th>
            </tr>
            <tr className="bg-slate-50 text-slate-600 border-t border-slate-200">
              <th className="p-3"></th>
              <th className="p-3 text-center text-sm font-bold">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Level 2</span>
              </th>
              <th className="p-3 text-center text-sm font-bold">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">Level 3</span>
              </th>
              <th className="p-3 text-center text-sm font-bold">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Level 4</span>
              </th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {BONUS_ROWS.map((row, i) => (
              <tr
                key={i}
                className={`border-t border-slate-100 transition-colors ${
                  row.highlight
                    ? 'bg-gradient-to-r from-amber-50 to-amber-50/50'
                    : i % 2 === 0 ? 'bg-white hover:bg-slate-50/50' : 'bg-slate-50/30 hover:bg-slate-50/70'
                }`}
              >
                <td className="p-4 align-middle">
                  <p
                    className={`font-semibold text-sm leading-snug whitespace-nowrap ${row.highlight ? 'text-amber-700' : 'text-slate-800'}`}
                  >
                    {row.position}
                  </p>
                </td>
                {/* Level 2 */}
                <td className="p-4 text-center align-middle">
                  {row.lv2 === '—' ? (
                    <span className="text-slate-300 text-sm font-bold">—</span>
                  ) : (
                    <span className="inline-block font-black text-base px-4 py-2 rounded-lg border-2 whitespace-nowrap shadow-sm bg-blue-50 text-blue-700 border-blue-200">
                      {row.lv2}
                    </span>
                  )}
                </td>

                {/* Level 3 — may merge with Level 4 */}
                {row.mergeL3L4 ? (
                  <td colSpan={2} className="p-4 text-center align-middle">
                    <span className="inline-block font-black text-base px-4 py-2 rounded-lg border-2 whitespace-nowrap shadow-sm bg-gradient-to-r from-violet-50 to-amber-50 text-violet-800 border-violet-200">
                      {row.lv3}
                    </span>
                  </td>
                ) : (
                  <>
                    <td className="p-4 text-center align-middle">
                      {row.lv3 === '—' ? (
                        <span className="text-slate-300 text-sm font-bold">—</span>
                      ) : (
                        <span className="inline-block font-black text-base px-4 py-2 rounded-lg border-2 whitespace-nowrap shadow-sm bg-violet-50 text-violet-700 border-violet-200">
                          {row.lv3}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center align-middle">
                      {row.lv4 === '—' ? (
                        <span className="text-slate-300 text-sm font-bold">—</span>
                      ) : (
                        <span className="inline-block font-black text-base px-4 py-2 rounded-lg border-2 whitespace-nowrap shadow-sm bg-amber-50 text-amber-700 border-amber-200">
                          {row.lv4}
                        </span>
                      )}
                    </td>
                  </>
                )}
                {row.showNote && (
                  <td rowSpan={row.noteRowspan} className="p-4 align-middle text-sm text-slate-500 leading-relaxed max-w-[280px] border-l border-slate-100 text-left">
                    {row.note.map((line: string, li: number) => (
                      <p key={li} className={li === 0 ? 'font-semibold text-slate-600 mb-1 text-pretty' : 'leading-snug text-pretty'}>{line}</p>
                    ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* COE footnote */}
      <div className="p-4 bg-gradient-to-r from-amber-50 to-amber-100/50 border-t-2 border-amber-200">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-700 mb-1">
              *Định nghĩa ứng viên cấp cao (CoE – Center of Excellent)
            </p>
            <ul className="space-y-1 text-sm text-amber-800 leading-relaxed">
              <li className="text-sm">• Là các ứng viên thuộc vị trí chuyên môn cao, thuộc các dự án trọng điểm được Ban Điều hành trực tiếp chỉ định tuyển dụng theo định hướng phát triển của Công ty.</li>
              <li className="text-sm">• Ứng viên phải đạt mức Level từ 3.4 trở lên và áp dụng theo chính sách thu nhập do FPT Telecom quy định.</li>
              <li className="text-sm">• Lưu ý: đây là nhóm nhân sự tách biệt và không thuộc các nhóm chức danh đã liệt kê ở trên.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function RetentionBonusSection() {
  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-amber-300 shadow-lg bg-gradient-to-br from-amber-50 via-white to-amber-50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-amber-500">
      {/* Decorative glows */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-orange-300/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div id="section-3-2" className="relative p-5 sm:p-6 pb-4 border-b-2 border-amber-200 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white text-amber-600 font-black text-sm shadow flex-shrink-0">
            3.2
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-black text-white uppercase tracking-wide leading-tight">
              Cơ chế thưởng duy trì sau HĐLĐ 12 tháng
            </h3>
            <p className="text-sm text-amber-50 mt-0.5">
              Đợt 2 – Thưởng bổ sung sau khi nhân sự hoàn thành HĐLĐ xác định thời hạn 12 tháng đầu tiên và được Công ty ký tiếp HĐLĐ theo quy định
            </p>
          </div>
          <span className="bg-white text-amber-600 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap shadow">
            Đợt 2
          </span>
        </div>
      </div>

      <div className="relative p-5 sm:p-6">
        {/* Hero +20% banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 p-5 mb-5 shadow-md">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Gift className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-100 uppercase tracking-widest mb-0.5">Mức thưởng bổ sung</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">+20%</span>
                <span className="text-sm text-amber-100 font-semibold">trên Đợt 1</span>
              </div>
              <p className="text-sm text-amber-100/90 font-medium mt-1.5">Tính trên số tiền thực tế đã duyệt chi ở Đợt 1</p>
            </div>
          </div>
        </div>

        {/* Two info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div className="bg-white rounded-xl border border-amber-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Target className="w-3.5 h-3.5" />
              </div>
              <p className="text-sm font-bold text-amber-700 uppercase tracking-wide">Mục đích</p>
            </div>
            <p className="text-base text-slate-700 leading-relaxed">
              Gắn trách nhiệm của người giới thiệu với mức độ gắn bó của nhân sự mới và thúc đẩy hiệu quả giữ chân nhân tài.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-amber-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <p className="text-sm font-bold text-amber-700 uppercase tracking-wide">Giới hạn hiệu lực</p>
            </div>
            <p className="text-base text-slate-700 leading-relaxed">
              Chỉ xét duyệt <strong>01 lần duy nhất</strong> tại cột mốc sau khi ứng viên hoàn thành HĐLĐ xác định <strong>12 tháng lần đầu</strong> và được ký tiếp HĐLĐ theo lộ trình Công ty quy định.
            </p>
            <p className="text-sm text-amber-700 mt-2 font-semibold">
              Áp dụng cho tất cả các vị trí được nêu trong chính sách.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
          <p className="text-base font-bold text-slate-500 uppercase tracking-wider mb-6 text-center">
            Lộ trình chi thưởng
          </p>
          <div className="flex items-center justify-center gap-0">
            {[
              { label: 'Giới thiệu UV', sublabel: 'Gửi hồ sơ', color: 'bg-slate-200 text-slate-600', dot: 'bg-slate-400', line: 'bg-slate-300' },
              { label: 'Bắt đầu giai đoạn thử việc', sublabel: '', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500', line: 'bg-blue-300' },
              { label: 'Ký HĐLĐ chính thức/Hoàn thành bổ nhiệm thách thức', sublabel: 'Đợt 1 — nhận theo mức của từng vị trí bảng trên', color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500', line: 'bg-emerald-300', prize: true },
              { label: 'Giai đoạn HĐLĐ chính thức 12 tháng đầu tiên', sublabel: '', color: 'bg-slate-200 text-slate-600', dot: 'bg-slate-500', line: 'bg-slate-300' },
              { label: 'Ký tiếp HĐLĐ mới', sublabel: 'Đợt 2 - nhận thêm 20% x Đợt 1', color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500', line: 'bg-amber-300', prize: true },
            ].map((step, i, arr) => (
              <div key={i} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center w-36 sm:w-44 text-center">
                  <div className={`w-6 h-6 rounded-full ${step.dot} ring-4 ring-white shadow-md mb-2.5`} />
                  <div className={`text-sm font-bold px-3 py-1.5 rounded-full ${step.color} whitespace-normal text-center leading-tight shadow-sm`}>
                    {step.label}
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-tight">{step.sublabel}</p>
                  {step.prize && (
                    <span className="mt-2 inline-flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-black tracking-wider px-3 py-1 rounded-full shadow-md ring-2 ring-emerald-300/50 uppercase animate-pulse">
                      <Gift className="w-3.5 h-3.5" /> THƯỞNG
                    </span>
                  )}
                </div>
                {i < arr.length - 1 && (
                  <div className={`flex-1 h-1 rounded-full ${step.line} min-w-[32px] sm:min-w-[56px] mx-2`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BonusSection() {
  return (
    <section className="mb-10">
      <SectionHeading
        number="3"
        title="Cơ chế thưởng 2 đợt"
        subtitle="Cơ chế thưởng gồm 02 đợt: Đợt 1 khi ứng viên hoàn thành thử việc/thách thức bổ nhiệm; Đợt 2 khi ứng viên hoàn thành HĐLĐ XĐTH 12 tháng đầu tiên và tiếp tục ký HĐLĐ theo lộ trình nhân sự của Công ty."
      />

      {/* Two-phase summary banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <button
          onClick={() => document.getElementById('section-3-1')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-5 shadow-md w-full text-left cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] group"
        >
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-emerald-100 uppercase tracking-widest">Đợt 1</p>
              <p className="text-base font-black text-white leading-tight">Hoàn thành thử việc/thách thức bổ nhiệm</p>
              <p className="text-sm text-emerald-100 mt-0.5">Thưởng được chia trả ngay sau khi ứng viên hoàn thành thử việc/thách thức bổ nhiệm</p>
            </div>
            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg className="w-5 h-5 text-white/80 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </button>
        <button
          onClick={() => document.getElementById('section-3-2')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-5 shadow-md w-full text-left cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] group"
        >
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
              <RotateCcw className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-amber-100 uppercase tracking-widest">Đợt 2</p>
              <p className="text-base font-black text-white leading-tight">Duy trì sau 12 tháng</p>
              <p className="text-sm text-amber-100 mt-0.5">Thưởng bổ sung +20% sau khi hoàn thành HĐLĐ xác định thời hạn 12 tháng đầu tiên và được Công ty ký tiếp HĐLĐ theo quy định</p>
            </div>
            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg className="w-5 h-5 text-white/80 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </button>
      </div>

      <div className="space-y-5">
        <BonusTableSection />
        <RetentionBonusSection />
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────── */
/* Main export                                         */
/* ──────────────────────────────────────────────── */

export function PolicySection() {
  return (
    <div id="section-policy" className="mb-12 scroll-mt-20">
      <PolicyHeader />
      <ObjectivesSection />
      <ConditionsSection />
      <BonusSection />
    </div>
  );
}
