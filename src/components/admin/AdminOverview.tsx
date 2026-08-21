import React from 'react';
import { useChurch } from '../../context/ChurchContext';
import {
  Video,
  FileText,
  Bell,
  Image,
  Heart,
  Eye,
  PlusCircle,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { AdminTab } from '../../types';

export const AdminOverview: React.FC<{ onNavigate: (tab: AdminTab) => void }> = ({ onNavigate }) => {
  const { sermons, bulletins, news, gallery, prayers, churchInfo } = useChurch();

  const totalSermonViews = sermons.reduce((acc, curr) => acc + (curr.views || 0), 0);
  const pendingPrayers = prayers.filter((p) => p.status === '접수대기');

  const stats = [
    {
      label: '등록된 설교 영상',
      value: `${sermons.length}편`,
      icon: <Video className="w-5 h-5 text-indigo-600" />,
      bg: 'bg-indigo-50 border-indigo-200',
      tab: 'sermons' as AdminTab,
    },
    {
      label: '설교 누적 조회수',
      value: `${totalSermonViews.toLocaleString()}회`,
      icon: <TrendingUp className="w-5 h-5 text-amber-600" />,
      bg: 'bg-amber-50 border-amber-200',
      tab: 'sermons' as AdminTab,
    },
    {
      label: '발행된 주보',
      value: `${bulletins.length}회분`,
      icon: <FileText className="w-5 h-5 text-sky-600" />,
      bg: 'bg-sky-50 border-sky-200',
      tab: 'bulletin' as AdminTab,
    },
    {
      label: '기도 및 새가족 신청',
      value: `${prayers.length}건 (대기 ${pendingPrayers.length})`,
      icon: <Heart className="w-5 h-5 text-rose-600" />,
      bg: 'bg-rose-50 border-rose-200',
      tab: 'requests' as AdminTab,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              CMS 관리자 센터
            </span>
            <span className="text-xs text-slate-300">
              {churchInfo.name} 홈페이지 통합 관리
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            환영합니다, 관리자님
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
            설교 영상 업로드, 주보 발행, 공지사항 등록, 디자인 테마 및 검색엔진(SEO) 설정을 한 곳에서 직관적으로 관리할 수 있습니다.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onNavigate('sermons')}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            새 설교 등록
          </button>
          <button
            onClick={() => onNavigate('theme')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs transition-all border border-white/20"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            테마 디자인 변경
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            onClick={() => onNavigate(stat.tab)}
            className={`p-5 rounded-2xl border ${stat.bg} cursor-pointer hover:scale-[1.02] transition-transform shadow-sm flex items-center justify-between`}
          >
            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-500">{stat.label}</div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900">{stat.value}</div>
            </div>
            <div className="p-3 rounded-xl bg-white shadow-sm">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Quick Action Tables Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Sermons */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Video className="w-4 h-4 text-indigo-950" />
              최근 등록된 설교 목록
            </h3>
            <button
              onClick={() => onNavigate('sermons')}
              className="text-xs font-bold text-indigo-950 hover:underline flex items-center gap-1"
            >
              전체보기 <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {sermons.slice(0, 4).map((s) => (
              <div key={s.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">
                      {s.category}
                    </span>
                    <span className="text-slate-400 text-[11px]">{s.date}</span>
                  </div>
                  <div className="font-bold text-slate-800 truncate">{s.title}</div>
                  <div className="text-slate-500 text-[11px]">{s.preacher} • {s.scripture}</div>
                </div>
                <div className="text-right text-slate-400 text-[11px] shrink-0">
                  조회 {s.views}회
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Prayers & New Family Requests */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-600" />
              접수된 기도요청 & 새가족 신청
            </h3>
            <button
              onClick={() => onNavigate('requests')}
              className="text-xs font-bold text-indigo-950 hover:underline flex items-center gap-1"
            >
              관리하기 <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {prayers.slice(0, 4).map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 font-bold text-[10px]">
                      {p.type}
                    </span>
                    <span className="font-bold text-slate-900">{p.name}</span>
                    <span className="text-slate-400 text-[11px]">{p.createdAt}</span>
                  </div>
                  <div className="font-medium text-slate-700 truncate">{p.title}</div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                    p.status === '접수대기'
                      ? 'bg-rose-100 text-rose-800'
                      : p.status === '기도중'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
