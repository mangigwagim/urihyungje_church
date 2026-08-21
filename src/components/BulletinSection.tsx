import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { FileText, Printer, Download, Share2, Copy, BookOpen, Calendar, Check, ChevronRight } from 'lucide-react';
import { BulletinItem } from '../types';

export const BulletinSection: React.FC = () => {
  const { bulletins, churchInfo, showToast } = useChurch();
  const [selectedBulletinId, setSelectedBulletinId] = useState<string>(bulletins[0]?.id || '');
  const [copiedVerse, setCopiedVerse] = useState(false);

  const currentBulletin: BulletinItem =
    bulletins.find((b) => b.id === selectedBulletinId) || bulletins[0] || {
      id: 'default',
      volume: '제 8권 33호',
      title: '주일예배 주보',
      date: '2026-08-16',
      coverImageUrl: '',
      scriptureReading: '요한복음 13:34-35',
      worshipOrder: [],
      weeklyPrayer: '주님의 사랑이 넘치는 교회가 되게 하옵소서.',
      reciteVerse: { verse: '너희가 서로 사랑하라', reference: '요 13:34' },
      announcements: [],
      nextWeekService: { prayer: '정성철 장로', bibleReader: '김은성 목사', ushers: '제1남전도회' },
    };

  const handleCopyReciteVerse = () => {
    if (!currentBulletin?.reciteVerse) return;
    const text = `[금주의 암송구절] "${currentBulletin.reciteVerse.verse}" - ${currentBulletin.reciteVerse.reference} (${churchInfo.name})`;
    navigator.clipboard.writeText(text);
    setCopiedVerse(true);
    showToast('금주의 암송구절이 복사되었습니다.');
    setTimeout(() => setCopiedVerse(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast('전자 주보가 브라우저 인쇄/PDF 저장 형식으로 준비되었습니다.');
    window.print();
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-100/70 min-h-screen text-slate-800" id="bulletin-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-900 font-bold text-xs tracking-wider uppercase">
            Weekly Bulletin
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            금주의 주보 (디지털 주보)
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            주일 예배 순서와 주간 소식, 성경 암송구절을 스마트폰과 PC에서 편리하게 확인하세요.
          </p>
        </div>

        {/* Date Selector & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">주보 선택:</span>
            <select
              value={selectedBulletinId}
              onChange={(e) => setSelectedBulletinId(e.target.value)}
              className="px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              {bulletins.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.title} ({b.volume})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200"
            >
              <Printer className="w-3.5 h-3.5" />
              인쇄하기
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-950 hover:bg-indigo-900 rounded-xl transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              주보 PDF 저장
            </button>
          </div>
        </div>

        {/* Main Bulletin Paper Display */}
        <div className="bg-white rounded-3xl border border-slate-300/80 shadow-xl overflow-hidden p-6 sm:p-10 space-y-10 print:shadow-none print:border-none print:p-0">
          {/* Bulletin Paper Header */}
          <div className="text-center border-b-2 border-slate-900 pb-8 space-y-2">
            <div className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              {churchInfo.denomination} • {churchInfo.name}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {currentBulletin.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-slate-500 font-medium">
              <span>{currentBulletin.volume}</span>
              <span>•</span>
              <span>발행일: {currentBulletin.date}</span>
              <span>•</span>
              <span>담임목사 {churchInfo.pastor.name}</span>
            </div>
          </div>

          {/* Scripture of the Week Banner */}
          <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-200/70 text-amber-900 font-bold text-[11px]">
                금주의 암송구절 (Recite Verse)
              </span>
              <button
                onClick={handleCopyReciteVerse}
                className="flex items-center gap-1 text-xs text-amber-900 hover:text-amber-700 font-semibold print:hidden"
              >
                {copiedVerse ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedVerse ? '복사완료' : '구절 복사'}
              </button>
            </div>
            <p className="text-base sm:text-lg font-serif italic text-slate-900 leading-relaxed font-semibold">
              "{currentBulletin.reciteVerse?.verse}"
            </p>
            <div className="text-xs font-bold text-amber-800 text-right">
              - {currentBulletin.reciteVerse?.reference}
            </div>
          </div>

          {/* Worship Order Table */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-950" />
                주일 예배 순서 (Order of Worship)
              </h3>
              <span className="text-xs font-semibold text-slate-500">
                본문: {currentBulletin.scriptureReading}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                    <th className="py-3 px-4 font-bold w-28">순서</th>
                    <th className="py-3 px-4 font-bold">내용</th>
                    <th className="py-3 px-4 font-bold text-right w-32">담당자</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentBulletin.worshipOrder?.map((order, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-800">{order.step}</td>
                      <td className="py-3 px-4 text-slate-700 font-medium">{order.content}</td>
                      <td className="py-3 px-4 text-right text-slate-500">{order.leader}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Weekly Prayer */}
          <div className="space-y-2 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
              공동체를 위한 주간 기도문 (Weekly Prayer)
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed font-serif">
              {currentBulletin.weeklyPrayer}
            </p>
          </div>

          {/* Church Announcements */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
              교회 알림 및 소식 (Announcements)
            </h3>
            <div className="space-y-2.5">
              {currentBulletin.announcements?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-950 mt-2 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Week Service Table */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="font-bold text-slate-700 block mb-1">다음 주 대표기도</span>
              <span className="text-slate-600">{currentBulletin.nextWeekService?.prayer || '정성철 장로'}</span>
            </div>
            <div>
              <span className="font-bold text-slate-700 block mb-1">성경 봉독</span>
              <span className="text-slate-600">{currentBulletin.nextWeekService?.bibleReader || '인도자'}</span>
            </div>
            <div>
              <span className="font-bold text-slate-700 block mb-1">안내 및 봉헌</span>
              <span className="text-slate-600">{currentBulletin.nextWeekService?.ushers || '제2남전도회'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
