import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { Image, Calendar, Tag, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GalleryItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const GallerySection: React.FC = () => {
  const { gallery, selectedGallery, setSelectedGallery } = useChurch();
  const [selectedCat, setSelectedCat] = useState('전체');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const categories = ['전체', '예배현장', '교제및봉사', '교회학교', '선교현장', '특별행사'];

  const filteredGallery = gallery.filter((item) => {
    return selectedCat === '전체' || item.category === selectedCat;
  });

  const openLightbox = (item: GalleryItem) => {
    setSelectedGallery(item);
    setActiveImageIndex(0);
  };

  return (
    <section className="py-16 sm:py-24 bg-white min-h-screen text-slate-800" id="gallery-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-900 font-bold text-xs tracking-wider uppercase">
            Photo Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            교회 앨범 & 사역 갤러리
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            은혜로운 예배와 사랑의 교제, 섬김과 선교의 현장을 사진으로 함께 나눕니다.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCat === cat
                  ? 'bg-indigo-950 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all cursor-pointer flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="p-3 rounded-full bg-white/90 text-slate-950 shadow-lg">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-amber-300 text-[11px] font-bold border border-slate-700">
                  {item.category}
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/60 text-white text-[11px] font-medium backdrop-blur-sm">
                  사진 {item.images?.length || 1}장
                </span>
              </div>

              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-950 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedGallery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-white flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-bold">
                      {selectedGallery.category}
                    </span>
                    <span className="text-xs text-slate-400">{selectedGallery.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">{selectedGallery.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedGallery(null)}
                  className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Photo Viewer */}
              <div className="relative aspect-16/10 bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedGallery.images?.[activeImageIndex] || selectedGallery.coverImage}
                  alt={selectedGallery.title}
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />

                {/* Left/Right arrow if multiple images */}
                {selectedGallery.images && selectedGallery.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === 0 ? selectedGallery.images.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 shadow-xl transition-all"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === selectedGallery.images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 shadow-xl transition-all"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Description & Thumbnail strip */}
              <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-4">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedGallery.description}
                </p>

                {selectedGallery.images && selectedGallery.images.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {selectedGallery.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                          activeImageIndex === idx ? 'border-amber-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
