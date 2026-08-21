import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { Bell, Pin, Calendar, Eye, Search, ArrowRight, X, User } from 'lucide-react';
import { NewsPost } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const NewsSection: React.FC = () => {
  const { news, selectedNews, setSelectedNews, incrementNewsViews } = useChurch();
  const [selectedCat, setSelectedCat] = useState('전체');
  const [search, setSearch] = useState('');

  const categories = ['전체', '공지사항', '교회소식', '모집및사역', '행사안내'];

  const filteredNews = news.filter((item) => {
    const matchesCat = selectedCat === '전체' || item.category === selectedCat;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenNews = (item: NewsPost) => {
    incrementNewsViews(item.id);
    setSelectedNews(item);
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-50 min-h-screen text-slate-800" id="news-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-900 font-bold text-xs tracking-wider uppercase">
            Church News & Notices
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            교회 소식 및 주요 공지
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            우리형제교회의 은혜로운 사역 소식과 공동체 안내 사항을 전달합니다.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCat === cat
                    ? 'bg-indigo-950 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="소식 및 공지 내용 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none"
            />
          </div>
        </div>

        {/* News List */}
        <div className="space-y-3">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenNews(item)}
              className={`p-5 rounded-2xl bg-white border transition-all cursor-pointer hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                item.isPinned
                  ? 'border-amber-300 bg-amber-50/20 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-4 flex-1">
                {item.isPinned ? (
                  <span className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5" title="중요 공지">
                    <Pin className="w-4 h-4 fill-current" />
                  </span>
                ) : (
                  <span className="p-2 rounded-xl bg-slate-100 text-slate-600 shrink-0 mt-0.5">
                    <Bell className="w-4 h-4" />
                  </span>
                )}

                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                        item.category === '공지사항'
                          ? 'bg-rose-100 text-rose-800'
                          : item.category === '행사안내'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-indigo-100 text-indigo-900'
                      }`}
                    >
                      {item.category}
                    </span>
                    {item.isPinned && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-bold text-[10px]">
                        중요
                      </span>
                    )}
                    <span className="text-xs text-slate-400">{item.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug hover:text-indigo-950 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-1">
                    {item.content}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 text-xs text-slate-400 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  조회 {item.views}
                </span>
                <span className="font-semibold text-indigo-950 flex items-center gap-1">
                  자세히 보기 <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News Detail Modal */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl my-8 text-slate-800"
            >
              <div className="bg-slate-900 text-white p-6 sm:p-8 relative">
                <button
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 font-bold text-xs">
                    {selectedNews.category}
                  </span>
                  <span className="text-xs text-slate-400">{selectedNews.date}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">{selectedNews.title}</h3>
                <div className="text-xs text-slate-400 mt-2 flex items-center gap-2">
                  <User className="w-3.5 h-3.5" />
                  작성자: {selectedNews.author}
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                {selectedNews.imageUrl && (
                  <div className="rounded-2xl overflow-hidden border border-slate-200">
                    <img
                      src={selectedNews.imageUrl}
                      alt={selectedNews.title}
                      className="w-full max-h-72 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {selectedNews.content}
                </div>
              </div>

              <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setSelectedNews(null)}
                  className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xl text-sm transition-colors"
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
