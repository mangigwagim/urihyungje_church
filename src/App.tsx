import React from 'react';
import { ChurchProvider, useChurch } from './context/ChurchContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ChurchIntroSection } from './components/ChurchIntroSection';
import { SermonSection } from './components/SermonSection';
import { BulletinSection } from './components/BulletinSection';
import { NewsSection } from './components/NewsSection';
import { GallerySection } from './components/GallerySection';
import { WorshipGuideSection } from './components/WorshipGuideSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { OnlineGivingModal } from './components/OnlineGivingModal';
import { PrayerModal } from './components/PrayerModal';
import { Toast } from './components/Toast';
import { AdminLayout } from './components/admin/AdminLayout';

const MainAppContent: React.FC = () => {
  const { activeTab, isAdminOpen } = useChurch();

  // If Admin CMS is open or activeTab is admin, display the comprehensive CMS dashboard
  if (isAdminOpen || activeTab === 'admin') {
    return (
      <div className="min-h-screen bg-slate-100">
        <AdminLayout />
        <VideoModal />
        <Toast />
      </div>
    );
  }

  // Public Church Website Views
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950">
      <Header />

      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection />
            <ChurchIntroSection />
            <SermonSection />
            <BulletinSection />
            <NewsSection />
            <GallerySection />
            <WorshipGuideSection />
          </>
        )}

        {activeTab === 'about' && (
          <div className="py-6">
            <ChurchIntroSection />
          </div>
        )}

        {activeTab === 'sermons' && <SermonSection />}

        {activeTab === 'bulletin' && <BulletinSection />}

        {activeTab === 'news' && <NewsSection />}

        {activeTab === 'gallery' && <GallerySection />}

        {activeTab === 'worship-guide' && <WorshipGuideSection />}
      </main>

      <Footer />

      {/* Global Modals & Toast notifications */}
      <VideoModal />
      <OnlineGivingModal />
      <PrayerModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <ChurchProvider>
      <MainAppContent />
    </ChurchProvider>
  );
}
