import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Plus, Edit2, Trash2, FileText, X, Eye, BookOpen } from 'lucide-react';
import { BulletinItem } from '../../types';

export const AdminBulletins: React.FC = () => {
  const { bulletins, addBulletin, updateBulletin, deleteBulletin, showToast } = useChurch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBulletin, setEditingBulletin] = useState<BulletinItem | null>(null);

  // Form states
  const [volume, setVolume] = useState('제 8권 34호');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [scriptureReading, setScriptureReading] = useState('');
  const [reciteVerse, setReciteVerse] = useState('');
  const [reciteRef, setReciteRef] = useState('');
  const [weeklyPrayer, setWeeklyPrayer] = useState('');
  const [announcementsText, setAnnouncementsText] = useState('');
  const [prayerLeader, setPrayerLeader] = useState('정성철 장로');
  const [bibleReader, setBibleReader] = useState('인도자');
  const [ushers, setUshers] = useState('제2남전도회');

  const handleOpenAdd = () => {
    setEditingBulletin(null);
    setVolume(`제 8권 ${bulletins.length + 34}호`);
    setTitle('2026년 주일 예배 주보');
    setDate(new Date().toISOString().slice(0, 10));
    setScriptureReading('로마서 8장 28절');
    setReciteVerse('우리가 알거니와 하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라');
    setReciteRef('로마서 8:28');
    setWeeklyPrayer('교회의 모든 지체들이 하나 되어 주님의 복음을 전하게 하옵소서.');
    setAnnouncementsText('1. 새가족 환영 및 등록 안내\n2. 다음 주 정기 당회 및 월례회\n3. 구제 및 봉사 사역 참여 안내');
    setPrayerLeader('정성철 장로');
    setBibleReader('인도자');
    setUshers('제1남전도회');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b: BulletinItem) => {
    setEditingBulletin(b);
    setVolume(b.volume);
    setTitle(b.title);
    setDate(b.date);
    setScriptureReading(b.scriptureReading);
    setReciteVerse(b.reciteVerse?.verse || '');
    setReciteRef(b.reciteVerse?.reference || '');
    setWeeklyPrayer(b.weeklyPrayer);
    setAnnouncementsText(b.announcements?.join('\n') || '');
    setPrayerLeader(b.nextWeekService?.prayer || '');
    setBibleReader(b.nextWeekService?.bibleReader || '');
    setUshers(b.nextWeekService?.ushers || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const announcements = announcementsText
      .split('\n')
      .map((a) => a.trim())
      .filter(Boolean);

    const defaultWorshipOrder = [
      { step: '예배의 부름', content: '시편 100편 1-5절', leader: '인도자' },
      { step: '경배 찬양', content: '찬송가 21장 (다 찬양하여라)', leader: '다같이' },
      { step: '신앙 고백', content: '사도신경', leader: '다같이' },
      { step: '대표 기도', content: '교회와 성도를 위한 기도', leader: prayerLeader },
      { step: '성경 봉독', content: scriptureReading, leader: bibleReader },
      { step: '찬양대 찬양', content: '시온 찬양대', leader: '찬양대' },
      { step: '말씀 선포', content: title, leader: '이재진 담임목사' },
      { step: '봉헌 및 기도', content: '찬송가 50장', leader: '다같이' },
      { step: '교회 소식', content: '새가족 환영 및 주간 알림', leader: '인도자' },
      { step: '축도', content: '축복기도', leader: '이재진 담임목사' },
    ];

    if (editingBulletin) {
      updateBulletin(editingBulletin.id, {
        volume,
        title,
        date,
        scriptureReading,
        reciteVerse: { verse: reciteVerse, reference: reciteRef },
        weeklyPrayer,
        announcements,
        worshipOrder: editingBulletin.worshipOrder || defaultWorshipOrder,
        nextWeekService: { prayer: prayerLeader, bibleReader, ushers },
      });
    } else {
      addBulletin({
        volume,
        title,
        date,
        coverImageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=800&auto=format&fit=crop',
        scriptureReading,
        worshipOrder: defaultWorshipOrder,
        weeklyPrayer,
        reciteVerse: { verse: reciteVerse, reference: reciteRef },
        announcements,
        nextWeekService: { prayer: prayerLeader, bibleReader, ushers },
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, bulletinTitle: string) => {
    if (window.confirm(`'${bulletinTitle}' 주보를 삭제하시겠습니까?`)) {
      deleteBulletin(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-950" />
            주일 주보 관리
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            주차별 주보 발행, 예배 순서, 암송구절, 공지사항을 등록하고 관리합니다.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-950 hover:bg-indigo-900 text-white rounded-xl font-bold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          신규 주보 발행
        </button>
      </div>

      <div className="grid gap-4">
        {bulletins.map((b) => (
          <div
            key={b.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-900 font-bold text-[11px]">
                  {b.volume}
                </span>
                <span className="text-xs text-slate-400 font-mono">{b.date}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{b.title}</h3>
              <div className="text-xs text-slate-600">
                <span className="font-semibold text-indigo-950">성경봉독:</span> {b.scriptureReading}
              </div>
              {b.reciteVerse && (
                <div className="text-xs text-slate-500 italic truncate max-w-xl">
                  "{b.reciteVerse.verse}" ({b.reciteVerse.reference})
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => handleOpenEdit(b)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-200 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                수정
              </button>
              <button
                onClick={() => handleDelete(b.id, b.title)}
                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                title="삭제"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl my-8 text-slate-800">
            <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {editingBulletin ? '주보 내용 수정' : '새 주보 발행'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">호수 (Volume)</label>
                  <input
                    type="text"
                    required
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">주보 제목</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">발행 일자</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">금주의 성경봉독 본문</label>
                  <input
                    type="text"
                    required
                    value={scriptureReading}
                    onChange={(e) => setScriptureReading(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">금주의 암송구절 내용</label>
                  <input
                    type="text"
                    value={reciteVerse}
                    onChange={(e) => setReciteVerse(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">암송구절 장절 (출처)</label>
                  <input
                    type="text"
                    value={reciteRef}
                    onChange={(e) => setReciteRef(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">주간 공동체 기도제목</label>
                <textarea
                  rows={2}
                  value={weeklyPrayer}
                  onChange={(e) => setWeeklyPrayer(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-100 resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  교회 소식 및 알림 (줄바꿈으로 구분)
                </label>
                <textarea
                  rows={3}
                  value={announcementsText}
                  onChange={(e) => setAnnouncementsText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-100 resize-none"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">다음 주 대표기도</label>
                  <input
                    type="text"
                    value={prayerLeader}
                    onChange={(e) => setPrayerLeader(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">다음 주 성경봉독</label>
                  <input
                    type="text"
                    value={bibleReader}
                    onChange={(e) => setBibleReader(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">다음 주 안내위원</label>
                  <input
                    type="text"
                    value={ushers}
                    onChange={(e) => setUshers(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-950 hover:bg-indigo-900 text-white font-bold rounded-xl shadow-md"
                >
                  {editingBulletin ? '주보 수정 완료' : '주보 발행하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
