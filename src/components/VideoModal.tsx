import React from 'react';
import { useChurch } from '../context/ChurchContext';
import { X, Play, Share2, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const VideoModal: React.FC = () => {
  const { activeVideoId, closeVideoModal, showToast, churchInfo } = useChurch();

  if (!activeVideoId) return null;

  const handleCopyLink = () => {
    const url = `https://www.youtube.com/watch?v=${activeVideoId}`;
    navigator.clipboard.writeText(url);
    showToast('설교 영상 링크가 클립보드에 복사되었습니다.');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl"
          id="video-player-modal"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-semibold text-slate-200">
                {churchInfo.name} 온라인 예배 & 설교 영상
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
              >
                <Share2 className="w-3.5 h-3.5" />
                영상 공유
              </button>
              <button
                onClick={closeVideoModal}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                title="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 16:9 Video Embed */}
          <div className="relative aspect-video w-full bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`}
              title="교회 설교 영상"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Footer note */}
          <div className="p-4 bg-slate-950 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Youtube className="w-4 h-4 text-red-500" />
              <span>유튜브 {churchInfo.name} 공식 채널을 구독하시면 실시간 예배 알림을 받으실 수 있습니다.</span>
            </div>
            <a
              href={churchInfo.socialLinks.youtubeChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-medium underline"
            >
              유튜브 채널 바로가기 →
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
