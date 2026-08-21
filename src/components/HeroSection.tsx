import React from 'react';
import { useChurch } from '../context/ChurchContext';
import { Play, Sparkles, Heart, FileText, ChevronDown, Clock, Video, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { THEME_PALETTES } from '../lib/theme';

export const HeroSection: React.FC = () => {
  const { churchInfo, sermons, openVideoModal, setActiveTab, setIsGivingModalOpen, setIsPrayerModalOpen } = useChurch();

  const featuredSermon = sermons.find((s) => s.isFeatured) || sermons[0];
  const currentTheme = THEME_PALETTES[churchInfo.theme.palette] || THEME_PALETTES['navy-gold'];

  const bgImage = churchInfo.heroImages[0] || 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1920&auto=format&fit=crop';
  const overlayOpacity = Math.min(churchInfo.theme.heroDarkness / 100, 0.9);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center text-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Image with Dynamic Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt={churchInfo.name}
          className="w-full h-full object-cover object-center scale-105 animate-fade-in"
          referrerPolicy="no-referrer"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950/95`}
          style={{ opacity: overlayOpacity + 0.2 }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Denomination & Annual Theme Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs sm:text-sm font-semibold tracking-wider shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>2026년 우리형제교회 표어</span>
        </motion.div>

        {/* Main Big Slogan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
            {churchInfo.slogan}
          </h2>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-200 font-serif italic leading-relaxed">
            "{churchInfo.sloganVerse}"
            <span className="block not-italic font-sans text-xs sm:text-sm text-amber-300 mt-1 font-semibold">
              - {churchInfo.sloganVerseReference}
            </span>
          </p>
        </motion.div>

        {/* Action Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2"
        >
          {featuredSermon && (
            <button
              onClick={() => openVideoModal(featuredSermon.youtubeId)}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:scale-105 transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>최신 설교말씀 시청</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('worship-guide')}
            className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition-all hover:scale-105"
          >
            <Clock className="w-4 h-4 text-amber-300" />
            <span>예배시간 및 오시는길</span>
          </button>

          <button
            onClick={() => setActiveTab('bulletin')}
            className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white font-medium text-sm backdrop-blur-sm border border-white/10 transition-all"
          >
            <FileText className="w-4 h-4 text-sky-300" />
            <span>금주의 주보 보기</span>
          </button>
        </motion.div>

        {/* Featured Sermon Mini Card Floating */}
        {featuredSermon && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pt-6 max-w-2xl mx-auto"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-left shadow-2xl flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:w-44 h-28 rounded-xl overflow-hidden shrink-0 group cursor-pointer" onClick={() => openVideoModal(featuredSermon.youtubeId)}>
                <img
                  src={featuredSermon.thumbnailUrl}
                  alt={featuredSermon.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 text-[11px] font-bold">
                    {featuredSermon.category}
                  </span>
                  <span className="text-xs text-slate-400">{featuredSermon.date}</span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug line-clamp-1">
                  {featuredSermon.title}
                </h3>
                <p className="text-xs text-slate-300 flex items-center gap-2 font-medium">
                  <span>{featuredSermon.preacher}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-amber-200">{featuredSermon.scripture}</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Subtle bottom scroll cue */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 animate-bounce text-slate-400">
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
};
