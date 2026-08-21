import React from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  Church,
  Phone,
  Printer,
  Mail,
  MapPin,
  Youtube,
  Instagram,
  MessageCircle,
  Share2,
  Lock,
  ArrowUp,
  Clock,
  Heart,
} from 'lucide-react';
import { THEME_PALETTES } from '../lib/theme';

export const Footer: React.FC = () => {
  const { churchInfo, setActiveTab, setIsGivingModalOpen, setIsPrayerModalOpen, showToast } = useChurch();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareKakao = () => {
    if (navigator.share) {
      navigator
        .share({
          title: churchInfo.name,
          text: `${churchInfo.name} - ${churchInfo.slogan}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('홈페이지 주소가 복사되었습니다. 카카오톡 등에 공유해 보세요!');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Church Brand & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 text-amber-400 flex items-center justify-center">
                <Church className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-amber-400 font-semibold tracking-wider block">
                  {churchInfo.denomination}
                </span>
                <span className="text-xl font-bold text-white tracking-tight">
                  {churchInfo.name}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-serif italic">
              "{churchInfo.sloganVerse}"
              <br />
              <span className="text-slate-500 font-sans not-italic text-[11px]">
                - {churchInfo.sloganVerseReference}
              </span>
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              담임목사 : {churchInfo.pastor.name}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2 flex-wrap">
              {churchInfo.socialLinks.naverBlogUrl && (
                <a
                  href={churchInfo.socialLinks.naverBlogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors border border-emerald-500 font-bold text-xs shadow-sm"
                  title="네이버 공식 블로그"
                >
                  <span className="font-extrabold text-xs">N</span>
                  <span>블로그</span>
                </a>
              )}
              <a
                href={churchInfo.socialLinks.youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                title="유튜브 채널"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={churchInfo.socialLinks.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                title="인스타그램"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={churchInfo.socialLinks.kakaoChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-colors border border-slate-800 font-bold text-xs"
                title="카카오톡 채널"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <button
                onClick={handleShareKakao}
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                title="홈페이지 주소 공유"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Col 2: Worship Times Summary */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              주요 예배 시간 안내
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {churchInfo.worshipSchedule.slice(0, 4).map((item) => (
                <li key={item.id} className="flex justify-between border-b border-slate-900 pb-1.5">
                  <span className="font-semibold text-slate-300">{item.name}</span>
                  <span>{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Location */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              교회 위치 및 연락처
            </h3>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>
                  {churchInfo.address} {churchInfo.addressDetail} (우: {churchInfo.zipCode})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span>대표전화 : {churchInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-slate-500 shrink-0" />
                <span>팩스 : {churchInfo.fax}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span>이메일 : {churchInfo.email}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Quick Links & Offering */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Heart className="w-4 h-4 text-amber-400" />
              성도 섬김 바로가기
            </h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setIsGivingModalOpen(true)}
                className="w-full text-left px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-colors flex items-center justify-between"
              >
                <span>온라인 헌금 계좌 안내</span>
                <span className="text-amber-400 text-[10px]">계좌복사 →</span>
              </button>
              <button
                onClick={() => setIsPrayerModalOpen(true)}
                className="w-full text-left px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-colors flex items-center justify-between"
              >
                <span>온라인 기도요청 & 새가족 등록</span>
                <span className="text-amber-400 text-[10px]">접수 →</span>
              </button>
              <button
                onClick={() => setActiveTab('worship-guide')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-colors flex items-center justify-between"
              >
                <span>오시는 길 및 주차안내</span>
                <span className="text-amber-400 text-[10px]">지도보기 →</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 {churchInfo.name}. All Rights Reserved. 대한예수교장로회(통합)
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('admin')}
              className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>관리자 CMS 로그인</span>
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>맨 위로</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
