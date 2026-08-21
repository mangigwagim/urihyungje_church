import React from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Palette, Sparkles, Sliders, Type, Layout, CheckCircle, Bell } from 'lucide-react';
import { ThemePalette, FontFamily } from '../../types';
import { THEME_PALETTES } from '../../lib/theme';

export const AdminTheme: React.FC = () => {
  const { churchInfo, updateTheme } = useChurch();
  const currentTheme = churchInfo.theme;

  const palettes: { key: ThemePalette; name: string; desc: string; sampleColors: string[] }[] = [
    {
      key: 'navy-gold',
      name: '은혜의 로얄 네이비 & 골드',
      desc: '깊고 신뢰감 있는 딥 네이비와 고귀한 골드 액센트',
      sampleColors: ['#0f172a', '#1e1b4b', '#f59e0b', '#fbbf24'],
    },
    {
      key: 'sage-green',
      name: '평안의 세이지 & 올리브',
      desc: '따뜻하고 온유한 자연의 숲과 평안함을 주는 올리브 톤',
      sampleColors: ['#064e3b', '#065f46', '#10b981', '#a7f3d0'],
    },
    {
      key: 'classic-burgundy',
      name: '보혈의 클래식 버건디 & 웜베이지',
      desc: '경건하고 성스러운 전통 버건디와 차분한 베이지 톤',
      sampleColors: ['#4c0519', '#881337', '#f43f5e', '#fecdd3'],
    },
    {
      key: 'slate-warm',
      name: '현대적인 웜 슬레이트 & 엠버',
      desc: '절제된 모던 감각과 부드러운 웜 그레이의 조화',
      sampleColors: ['#0f172a', '#334155', '#d97706', '#fef3c7'],
    },
    {
      key: 'deep-forest',
      name: '생명나무 딥 포레스트 & 브라운',
      desc: '깊은 숲의 영성과 묵직한 안정감을 주는 우드 톤',
      sampleColors: ['#042f2e', '#134e4a', '#14b8a6', '#99f6e4'],
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Palette className="w-5 h-5 text-indigo-950" />
          테마 & 디자인 커스터마이징
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          교회 홈페이지의 메인 색상 테마, 타이포그래피 폰트, 헤더 배너 스타일을 자유롭게 변경합니다.
        </p>
      </div>

      {/* 1. Theme Palette Selector */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          1. 메인 브랜드 컬러 팔레트 선택
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {palettes.map((p) => {
            const isSelected = currentTheme.palette === p.key;
            return (
              <div
                key={p.key}
                onClick={() => updateTheme({ palette: p.key })}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'border-indigo-950 bg-indigo-50/40 shadow-md ring-2 ring-indigo-950/20'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{p.name}</span>
                    {isSelected && <CheckCircle className="w-5 h-5 text-indigo-950 shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                </div>

                {/* Color Swatch Circles */}
                <div className="flex items-center gap-1.5 pt-2 border-t border-slate-200/60">
                  {p.sampleColors.map((col, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border border-black/10 shadow-inner"
                      style={{ backgroundColor: col }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Typography & Fonts */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Type className="w-4 h-4 text-indigo-950" />
          2. 타이포그래피 서체 스타일
        </h3>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              key: 'pretendard' as FontFamily,
              title: '프리텐다드 (Pretendard)',
              desc: '가독성이 가장 뛰어난 현대적 고딕 서체 (기본 권장)',
              fontClass: 'font-sans',
            },
            {
              key: 'serif' as FontFamily,
              title: '나눔명조 / 세리프 (Serif)',
              desc: '성경 본문과 목회서신에 어울리는 클래식하고 은혜로운 명조체',
              fontClass: 'font-serif',
            },
            {
              key: 'modern' as FontFamily,
              title: '모던 산세리프 (Clean)',
              desc: '젊고 트렌디하며 정제된 깔끔한 스타일',
              fontClass: 'font-sans tracking-tight',
            },
          ].map((f) => {
            const isSelected = currentTheme.fontFamily === f.key;
            return (
              <div
                key={f.key}
                onClick={() => updateTheme({ fontFamily: f.key })}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'border-indigo-950 bg-indigo-50/40 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-bold text-sm text-slate-900 ${f.fontClass}`}>
                    {f.title}
                  </span>
                  {isSelected && <CheckCircle className="w-4 h-4 text-indigo-950" />}
                </div>
                <p className="text-xs text-slate-500">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Hero Visual & Announcement Banner Settings */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Layout className="w-4 h-4 text-indigo-950" />
          3. 메인 화면 및 상단 알림 배너 설정
        </h3>

        {/* Hero Darkness Slider */}
        <div className="space-y-2 max-w-md">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>메인 히어로 이미지 어둡기 (오버레이)</span>
            <span className="text-indigo-950 font-mono">{currentTheme.heroDarkness}%</span>
          </div>
          <input
            type="range"
            min={10}
            max={80}
            step={5}
            value={currentTheme.heroDarkness}
            onChange={(e) => updateTheme({ heroDarkness: Number(e.target.value) })}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-950"
          />
          <p className="text-[11px] text-slate-400">
            배경 이미지를 어둡게 할수록 흰색 성경구절과 타이틀이 선명하게 돋보입니다.
          </p>
        </div>

        {/* Top Announcement Banner Toggle & Text */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-bold text-slate-800">
                상단 헤더 긴급 공지 배너 표시
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={currentTheme.showAnnouncementsBanner}
                onChange={(e) => updateTheme({ showAnnouncementsBanner: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-950" />
            </label>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              상단 배너 문구 입력
            </label>
            <input
              type="text"
              value={currentTheme.announcementText}
              onChange={(e) => updateTheme({ announcementText: e.target.value })}
              placeholder="예: 📢 2026 가을 전교인 말씀 사경회: 9월 18일~20일"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
