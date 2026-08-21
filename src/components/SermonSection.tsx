import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { Play, Search, Eye, Share2, BookOpen, User, Calendar, Tag, ExternalLink, X } from 'lucide-react';
import { Sermon } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const SermonSection: React.FC = () => {
  const {
    sermons,
    openVideoModal,
    incrementSermonViews,
    selectedSermon,
    setSelectedSermon,
    showToast,
    churchInfo,
  } = useChurch();

  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [search, setSearch] = useState<string>('');

  const categories = ['전체', '주일대예배', '수요예배', '금요성령집회', '청년예배', '특별집회'];

  const filteredSermons = sermons.filter((sermon) => {
    const matchesCategory = selectedCategory === '전체' || sermon.category === selectedCategory;
    const matchesSearch =
      sermon.title.toLowerCase().includes(search.toLowerCase()) ||
      sermon.scripture.toLowerCase().includes(search.toLowerCase()) ||
      sermon.preacher.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePlay = (sermon: Sermon) => {
    incrementSermonViews(sermon.id);
    openVideoModal(sermon.youtubeId);
  };

  const handleShare = (sermon: Sermon, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://www.youtube.com/watch?v=${sermon.youtubeId}`;
    if (navigator.share) {
      navigator.share({
        title: sermon.title,
        text: `[${churchInfo.name}] ${sermon.title} - ${sermon.preacher} (${sermon.scripture})`,
        url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      showToast('설교 영상 링크가 복사되었습니다.');
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-50 min-h-screen text-slate-800" id="sermon-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-900 font-bold text-xs tracking-wider uppercase">
            Sermon & Worship Media
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            생명의 말씀과 은혜로운 예배
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            살아 역사하시는 하나님의 말씀으로 매일의 삶에 위로와 영적 새 힘을 얻으시기 바랍니다.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          {/* Category Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-950 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="설교제목, 성경본문, 설교자 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none"
            />
          </div>
        </div>

        {/* Sermon Grid */}
        {filteredSermons.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-2">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <div className="font-bold text-slate-700">검색 조건에 맞는 설교 영상이 없습니다.</div>
            <p className="text-xs text-slate-400">다른 검색어나 카테고리를 선택해 보세요.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSermons.map((sermon) => (
              <div
                key={sermon.id}
                className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all flex flex-col"
              >
                {/* Thumbnail with Play Overlay */}
                <div
                  className="relative aspect-video w-full bg-slate-900 overflow-hidden cursor-pointer"
                  onClick={() => handlePlay(sermon)}
                >
                  <img
                    src={sermon.thumbnailUrl}
                    alt={sermon.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-amber-500 group-hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-amber-300 text-[11px] font-bold border border-slate-700">
                    {sermon.category}
                  </span>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {sermon.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        조회 {sermon.views.toLocaleString()}회
                      </span>
                    </div>

                    <h3
                      onClick={() => handlePlay(sermon)}
                      className="text-base font-bold text-slate-900 leading-snug line-clamp-2 hover:text-indigo-900 cursor-pointer transition-colors"
                    >
                      {sermon.title}
                    </h3>

                    <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                      <span className="flex items-center gap-1 font-semibold text-slate-800">
                        <User className="w-3.5 h-3.5 text-indigo-950" />
                        {sermon.preacher}
                      </span>
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-900 font-medium rounded-md border border-amber-200/60">
                        {sermon.scripture}
                      </span>
                    </div>

                    {sermon.summary && (
                      <p className="text-xs text-slate-500 line-clamp-2 pt-1 leading-relaxed">
                        {sermon.summary}
                      </p>
                    )}
                  </div>

                  {/* Actions Bottom Bar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedSermon(sermon)}
                      className="flex items-center gap-1 text-xs font-semibold text-indigo-950 hover:text-indigo-800"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      설교 요약·나눔 질문
                    </button>
                    <button
                      onClick={(e) => handleShare(sermon, e)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                      title="영상 공유"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sermon Notes / Detail Modal */}
      <AnimatePresence>
        {selectedSermon && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl my-8 text-slate-800"
              id="sermon-notes-modal"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 relative">
                <button
                  onClick={() => setSelectedSermon(null)}
                  className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-full transition-colors"
                  title="닫기"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                    {selectedSermon.category}
                  </span>
                  <span className="text-xs text-slate-300">{selectedSermon.date}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                  {selectedSermon.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                  <span className="font-semibold text-amber-300">{selectedSermon.preacher}</span>
                  <span>•</span>
                  <span>본문: {selectedSermon.scripture}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    말씀 요약 (Summary)
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    {selectedSermon.summary}
                  </p>
                </div>

                {selectedSermon.keyPoints && selectedSermon.keyPoints.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      묵상 및 나눔 포인트 (Key Notes)
                    </h4>
                    <div className="space-y-2">
                      {selectedSermon.keyPoints.map((point, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs sm:text-sm text-amber-950 font-medium"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => {
                    handlePlay(selectedSermon);
                    setSelectedSermon(null);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-colors shadow-sm"
                >
                  <Play className="w-4 h-4 fill-current" />
                  영상 시청하기
                </button>
                <button
                  onClick={() => setSelectedSermon(null)}
                  className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xl text-sm transition-colors"
                >
                  닫기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
