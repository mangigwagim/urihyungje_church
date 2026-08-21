import React from 'react';
import { useChurch } from '../../context/ChurchContext';
import {
  LayoutDashboard,
  Video,
  FileText,
  Bell,
  Image,
  Heart,
  Palette,
  Church,
  Search,
  Database,
  ExternalLink,
  Shield,
  LogOut,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { AdminTab } from '../../types';
import { AdminOverview } from './AdminOverview';
import { AdminSermons } from './AdminSermons';
import { AdminBulletins } from './AdminBulletins';
import { AdminNews } from './AdminNews';
import { AdminGallery } from './AdminGallery';
import { AdminPrayers } from './AdminPrayers';
import { AdminTheme } from './AdminTheme';
import { AdminChurchInfo } from './AdminChurchInfo';
import { AdminSeo } from './AdminSeo';
import { AdminBackup } from './AdminBackup';

export const AdminLayout: React.FC = () => {
  const { currentAdminTab, setCurrentAdminTab, setIsAdminOpen, churchInfo, prayers } = useChurch();

  const pendingPrayers = prayers.filter((p) => p.status === '접수대기').length;

  const navItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: number; group?: string }[] = [
    { id: 'overview', label: '대시보드 홈', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'sermons', label: '설교 및 영상 관리', icon: <Video className="w-4 h-4" />, group: '콘텐츠 관리' },
    { id: 'bulletin', label: '주일 주보 관리', icon: <FileText className="w-4 h-4" />, group: '콘텐츠 관리' },
    { id: 'news', label: '교회 소식 & 공지', icon: <Bell className="w-4 h-4" />, group: '콘텐츠 관리' },
    { id: 'gallery', label: '앨범 & 갤러리', icon: <Image className="w-4 h-4" />, group: '콘텐츠 관리' },
    { id: 'requests', label: '기도 & 새가족 관리', icon: <Heart className="w-4 h-4" />, badge: pendingPrayers, group: '사역 관리' },
    { id: 'theme', label: '테마 & 디자인 설정', icon: <Palette className="w-4 h-4" />, group: '시스템 설정' },
    { id: 'church-info', label: '교회 정보 & 시간표', icon: <Church className="w-4 h-4" />, group: '시스템 설정' },
    { id: 'seo', label: 'SEO & SNS 연동', icon: <Search className="w-4 h-4" />, group: '시스템 설정' },
    { id: 'backup', label: '데이터 백업/복원', icon: <Database className="w-4 h-4" />, group: '시스템 설정' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* Top Admin Header Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-white">
                  {churchInfo.name} CMS
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold border border-amber-400/30">
                  통합 관리자 모드
                </span>
              </div>
              <div className="text-[11px] text-slate-400 hidden sm:block">
                교회 콘텐츠 및 디자인 실시간 제어판
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminOpen(false)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 transition-all shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
              <span>사용자 화면 보기 (나가기)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar Navigation */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-6 sticky top-24">
            <div className="space-y-1">
              <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                메뉴 목록
              </div>

              <div className="space-y-1 pt-1">
                {navItems.map((item) => {
                  const isActive = currentAdminTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentAdminTab(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-indigo-950 text-white shadow-md'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={isActive ? 'text-amber-300' : 'text-slate-400'}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      {typeof item.badge === 'number' && item.badge > 0 && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isActive ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Status Box in Sidebar */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                적용 중인 테마
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {churchInfo.theme.palette === 'navy-gold'
                  ? '로얄 네이비 & 골드'
                  : churchInfo.theme.palette === 'sage-green'
                  ? '세이지 그린 & 올리브'
                  : churchInfo.theme.palette === 'classic-burgundy'
                  ? '클래식 버건디'
                  : churchInfo.theme.palette === 'deep-forest'
                  ? '딥 포레스트'
                  : '모던 웜 슬레이트'}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Content View */}
        <main className="flex-1 min-w-0">
          {currentAdminTab === 'overview' && (
            <AdminOverview onNavigate={(t) => setCurrentAdminTab(t)} />
          )}
          {currentAdminTab === 'sermons' && <AdminSermons />}
          {currentAdminTab === 'bulletin' && <AdminBulletins />}
          {currentAdminTab === 'news' && <AdminNews />}
          {currentAdminTab === 'gallery' && <AdminGallery />}
          {currentAdminTab === 'requests' && <AdminPrayers />}
          {currentAdminTab === 'theme' && <AdminTheme />}
          {currentAdminTab === 'church-info' && <AdminChurchInfo />}
          {currentAdminTab === 'seo' && <AdminSeo />}
          {currentAdminTab === 'backup' && <AdminBackup />}
        </main>
      </div>
    </div>
  );
};
