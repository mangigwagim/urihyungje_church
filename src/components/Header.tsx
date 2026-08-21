import React, { useState, useEffect } from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  Church,
  Video,
  Heart,
  Menu,
  X,
  Settings,
  Flame,
  Phone,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { ActiveTab } from '../types';
import { THEME_PALETTES } from '../lib/theme';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    churchInfo,
    setIsGivingModalOpen,
    setIsPrayerModalOpen,
    openVideoModal,
  } = useChurch();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { tab: ActiveTab; label: string }[] = [
    { tab: 'home', label: '홈' },
    { tab: 'about', label: '교회소개' },
    { tab: 'sermons', label: '설교·예배영상' },
    { tab: 'bulletin', label: '주보' },
    { tab: 'news', label: '교회소식' },
    { tab: 'gallery', label: '교회갤러리' },
    { tab: 'worship-guide', label: '예배안내·오시는길' },
  ];

  const currentTheme = THEME_PALETTES[churchInfo.theme.palette] || THEME_PALETTES['navy-gold'];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      {churchInfo.theme.showAnnouncementsBanner && churchInfo.theme.announcementText && (
        <div className={`text-xs py-2 px-4 text-center font-medium ${currentTheme.colors.bannerBg} flex items-center justify-center gap-2 shadow-inner`}>
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold">
            알림
          </span>
          <span className="truncate max-w-4xl">{churchInfo.theme.announcementText}</span>
        </div>
      )}

      {/* Main Glass Navigation Bar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-3 text-slate-800'
            : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-4 text-slate-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Denomination */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            id="header-logo-button"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-950 text-amber-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Church className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-500 tracking-wider">
                  {churchInfo.denomination}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-none">
                {churchInfo.name}
              </h1>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleNavClick(item.tab)}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-xl transition-all ${
                    isActive
                      ? 'bg-indigo-950 text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/80'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Naver Blog Link */}
            {churchInfo.socialLinks.naverBlogUrl && (
              <a
                href={churchInfo.socialLinks.naverBlogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors border border-emerald-200 shadow-sm"
                title="네이버 공식 블로그"
              >
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-extrabold">N</span>
                <span>블로그</span>
              </a>
            )}

            {/* Live Stream Quick Action */}
            <button
              onClick={() => openVideoModal('iXu8HBPGygQ')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors border border-red-200 shadow-sm"
              title="실시간 주일예배 생중계"
            >
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <Video className="w-3.5 h-3.5" />
              라이브
            </button>

            {/* Online Giving */}
            <button
              onClick={() => setIsGivingModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              온라인 헌금
            </button>

            {/* Prayer & New Family */}
            <button
              onClick={() => setIsPrayerModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-indigo-950 hover:bg-indigo-900 rounded-xl transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              기도·새가족
            </button>

            {/* Admin CMS Button */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
                activeTab === 'admin'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-300'
              }`}
              title="관리자 통합 CMS 대시보드"
              id="admin-switch-header-btn"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>관리자 CMS</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('admin')}
              className="p-2 text-xs font-bold rounded-lg bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>CMS</span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="메뉴 열기"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-white border-b border-slate-200 shadow-2xl max-h-[85vh] overflow-y-auto z-50 p-6 space-y-6">
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleNavClick(item.tab)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-indigo-950 text-white'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setIsGivingModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 font-bold text-xs text-slate-800 border border-slate-200"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              온라인 헌금
            </button>

            <button
              onClick={() => {
                setIsPrayerModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-950 font-bold text-xs text-white"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              기도·새가족
            </button>

            {churchInfo.socialLinks.naverBlogUrl && (
              <a
                href={churchInfo.socialLinks.naverBlogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 font-bold text-xs text-white shadow-sm"
              >
                <span className="w-4 h-4 rounded-full bg-white text-emerald-600 flex items-center justify-center text-[10px] font-black">N</span>
                우리형제교회 네이버 블로그 바로가기
              </a>
            )}

            <button
              onClick={() => {
                openVideoModal('iXu8HBPGygQ');
                setIsMobileMenuOpen(false);
              }}
              className="col-span-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 font-bold text-xs text-white shadow-sm"
            >
              <Video className="w-4 h-4" />
              주일예배 라이브 스트리밍 시청
            </button>
          </div>

          <div className="text-xs text-slate-500 space-y-1 pt-2">
            <div>📞 문의: {churchInfo.phone}</div>
            <div>📍 {churchInfo.address} {churchInfo.addressDetail}</div>
          </div>
        </div>
      )}
    </header>
  );
};
