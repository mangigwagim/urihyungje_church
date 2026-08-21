import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { X, Send, Lock, UserPlus, Heart, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PrayerRequest } from '../types';

export const PrayerModal: React.FC = () => {
  const { isPrayerModalOpen, setIsPrayerModalOpen, submitPrayerRequest, churchInfo } = useChurch();

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [type, setType] = useState<PrayerRequest['type']>('중보기도요청');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);

  if (!isPrayerModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || !title.trim() || !content.trim()) {
      return;
    }

    submitPrayerRequest({
      name,
      contact,
      type,
      title,
      content,
      isPrivate,
    });

    // Reset & Close
    setName('');
    setContact('');
    setTitle('');
    setContent('');
    setIsPrayerModalOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl my-8 text-slate-800"
          id="prayer-request-modal"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 relative">
            <button
              onClick={() => setIsPrayerModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-full transition-colors"
              title="닫기"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 bg-amber-500/20 text-amber-300 rounded-xl border border-amber-500/30">
                <Heart className="w-5 h-5" />
              </span>
              <span className="text-xs font-semibold tracking-wider text-amber-300 uppercase">
                Prayer & Fellowship
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-1">
              기도 요청 & 새가족 등록 신청
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              성도님의 마음에 담긴 기도의 제목이나 새가족 등록 문의를 남겨주시면 교역자가 함께 마음을 모아 기도하고 연락드립니다.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Request Type Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                신청 구분
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['중보기도요청', '새가족등록신청', '목회상담신청', '온라인심방요청'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                      type === t
                        ? 'bg-indigo-950 text-white border-indigo-950 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Contact */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  성명 (이름) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 김은혜 성도"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  연락처 (휴대폰 번호) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="예: 010-1234-5678"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm outline-none"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                제목 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="제목을 간략히 입력해 주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm outline-none"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                상세 내용 / 기도제목 <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="기도해 주실 내용이나 문의 사항을 자세히 적어주세요. 교역자가 정성껏 확인합니다."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm outline-none resize-none"
              />
            </div>

            {/* Privacy Checkbox */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-indigo-950 shrink-0" />
                <span className="text-xs text-slate-700 font-medium">
                  비공개 보장 (목회자 및 담당 교역자만 열람)
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-950"></div>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsPrayerModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-950 hover:bg-indigo-900 text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-950/20 transition-all"
              >
                <Send className="w-4 h-4" />
                신청서 제출하기
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
