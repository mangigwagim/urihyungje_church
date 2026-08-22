import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ChurchInfo,
  Sermon,
  BulletinItem,
  NewsPost,
  GalleryItem,
  PrayerRequest,
  ActiveTab,
  AdminTab,
  ThemePalette,
} from '../types';
import {
  INITIAL_CHURCH_INFO,
  INITIAL_SERMONS,
  INITIAL_BULLETINS,
  INITIAL_NEWS,
  INITIAL_GALLERY,
  INITIAL_PRAYERS,
} from '../data/defaultData';

export interface ToastInfo {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface ChurchContextType {
  // Navigation & View
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (auth: boolean) => void;

  // Data
  churchInfo: ChurchInfo;
  updateChurchInfo: (info: Partial<ChurchInfo>) => void;
  updateTheme: (theme: Partial<ChurchInfo['theme']>) => void;
  updateSeo: (seo: Partial<ChurchInfo['seo']>) => void;

  sermons: Sermon[];
  addSermon: (sermon: Omit<Sermon, 'id' | 'views'>) => void;
  updateSermon: (id: string, sermon: Partial<Sermon>) => void;
  deleteSermon: (id: string) => void;
  incrementSermonViews: (id: string) => void;

  bulletins: BulletinItem[];
  addBulletin: (bulletin: Omit<BulletinItem, 'id'>) => void;
  updateBulletin: (id: string, bulletin: Partial<BulletinItem>) => void;
  deleteBulletin: (id: string) => void;

  news: NewsPost[];
  addNews: (newsItem: Omit<NewsPost, 'id' | 'views'>) => void;
  updateNews: (id: string, newsItem: Partial<NewsPost>) => void;
  deleteNews: (id: string) => void;
  incrementNewsViews: (id: string) => void;

  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;

  prayers: PrayerRequest[];
  submitPrayerRequest: (req: Omit<PrayerRequest, 'id' | 'status' | 'createdAt'>) => void;
  updatePrayerStatus: (id: string, status: PrayerRequest['status'], adminNote?: string) => void;
  deletePrayerRequest: (id: string) => void;

  // Video modal / Lightbox
  activeVideoId: string | null;
  openVideoModal: (youtubeId: string) => void;
  closeVideoModal: () => void;

  // Online Giving Modal & Prayer Modal
  isGivingModalOpen: boolean;
  setIsGivingModalOpen: (open: boolean) => void;
  isPrayerModalOpen: boolean;
  setIsPrayerModalOpen: (open: boolean) => void;

  // Selected Item details modals
  selectedSermon: Sermon | null;
  setSelectedSermon: (sermon: Sermon | null) => void;
  selectedBulletin: BulletinItem | null;
  setSelectedBulletin: (bulletin: BulletinItem | null) => void;
  selectedNews: NewsPost | null;
  setSelectedNews: (news: NewsPost | null) => void;
  selectedGallery: GalleryItem | null;
  setSelectedGallery: (gallery: GalleryItem | null) => void;

  // Search & Global quick actions
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Toast
  toasts: ToastInfo[];
  showToast: (message: string, type?: ToastInfo['type']) => void;
  removeToast: (id: string) => void;

  // Backup & Reset
  exportDataAsJSON: () => void;
  importDataFromJSON: (jsonString: string) => boolean;
  resetToDefaultData: () => void;
}

const ChurchContext = createContext<ChurchContextType | undefined>(undefined);

const STORAGE_KEYS = {
  INFO: 'woori_church_info_v3',
  SERMONS: 'woori_church_sermons_v3',
  BULLETINS: 'woori_church_bulletins_v3',
  NEWS: 'woori_church_news_v3',
  GALLERY: 'woori_church_gallery_v3',
  PRAYERS: 'woori_church_prayers_v3',
  AUTH: 'woori_church_admin_auth',
};

export const ChurchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [adminTab, setAdminTab] = useState<AdminTab>('overview');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(true); // Default accessible for demo preview

  // Core Data with localStorage persistence
  const [churchInfo, setChurchInfo] = useState<ChurchInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INFO);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.pastor && (parsed.pastor.name.includes('이진우') || parsed.pastor.name === '이진우 담임목사')) {
          parsed.pastor.name = '이재진 담임목사';
        }
        if (parsed.slogan && parsed.slogan.includes('In Christ Alone')) {
          parsed.slogan = 'Way Maker - 길을 만드시는 주';
        }
        return parsed;
      }
      return INITIAL_CHURCH_INFO;
    } catch {
      return INITIAL_CHURCH_INFO;
    }
  });

  const [sermons, setSermons] = useState<Sermon[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERMONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((s: Sermon) => ({
          ...s,
          preacher: s.preacher ? s.preacher.replace('이진우', '이재진') : s.preacher,
        }));
      }
      return INITIAL_SERMONS;
    } catch {
      return INITIAL_SERMONS;
    }
  });

  const [bulletins, setBulletins] = useState<BulletinItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BULLETINS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((b: BulletinItem) => ({
          ...b,
          worshipOrder: b.worshipOrder?.map((w: { step: string; content: string; leader: string }) => ({
            ...w,
            leader: w.leader ? w.leader.replace('이진우', '이재진') : w.leader,
          })),
        }));
      }
      return INITIAL_BULLETINS;
    } catch {
      return INITIAL_BULLETINS;
    }
  });

  const [news, setNews] = useState<NewsPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NEWS);
      return saved ? JSON.parse(saved) : INITIAL_NEWS;
    } catch {
      return INITIAL_NEWS;
    }
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
      return saved ? JSON.parse(saved) : INITIAL_GALLERY;
    } catch {
      return INITIAL_GALLERY;
    }
  });

  const [prayers, setPrayers] = useState<PrayerRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRAYERS);
      return saved ? JSON.parse(saved) : INITIAL_PRAYERS;
    } catch {
      return INITIAL_PRAYERS;
    }
  });

  // Modals & Active View Details
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [isGivingModalOpen, setIsGivingModalOpen] = useState(false);
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);

  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);
  const [selectedBulletin, setSelectedBulletin] = useState<BulletinItem | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsPost | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<GalleryItem | null>(null);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Toast System
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const showToast = (message: string, type: ToastInfo['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(churchInfo));
    } catch (e) {
      console.error(e);
    }
  }, [churchInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SERMONS, JSON.stringify(sermons));
    } catch (e) {
      console.error(e);
    }
  }, [sermons]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BULLETINS, JSON.stringify(bulletins));
    } catch (e) {
      console.error(e);
    }
  }, [bulletins]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
    } catch (e) {
      console.error(e);
    }
  }, [news]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
    } catch (e) {
      console.error(e);
    }
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRAYERS, JSON.stringify(prayers));
    } catch (e) {
      console.error(e);
    }
  }, [prayers]);

  // Update Dynamic Document Meta Title for SEO
  useEffect(() => {
    if (churchInfo.seo?.siteTitle) {
      document.title = churchInfo.seo.siteTitle;
    }
  }, [churchInfo.seo?.siteTitle]);

  // Actions
  const updateChurchInfo = (info: Partial<ChurchInfo>) => {
    setChurchInfo((prev) => ({ ...prev, ...info }));
    showToast('교회 기본 정보가 성공적으로 저장되었습니다.');
  };

  const updateTheme = (themeUpdates: Partial<ChurchInfo['theme']>) => {
    setChurchInfo((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...themeUpdates },
    }));
    showToast('테마 및 디자인 설정이 적용되었습니다.');
  };

  const updateSeo = (seoUpdates: Partial<ChurchInfo['seo']>) => {
    setChurchInfo((prev) => ({
      ...prev,
      seo: { ...prev.seo, ...seoUpdates },
    }));
    showToast('SEO 검색엔진 최적화 설정이 저장되었습니다.');
  };

  const addSermon = (sermonData: Omit<Sermon, 'id' | 'views'>) => {
    const newSermon: Sermon = {
      ...sermonData,
      id: 'sermon-' + Date.now(),
      views: 0,
    };
    setSermons((prev) => [newSermon, ...prev]);
    showToast('새 설교 말씀이 등록되었습니다.');
  };

  const updateSermon = (id: string, updates: Partial<Sermon>) => {
    setSermons((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    showToast('설교 정보가 수정되었습니다.');
  };

  const deleteSermon = (id: string) => {
    setSermons((prev) => prev.filter((s) => s.id !== id));
    showToast('설교가 삭제되었습니다.', 'info');
  };

  const incrementSermonViews = (id: string) => {
    setSermons((prev) =>
      prev.map((s) => (s.id === id ? { ...s, views: s.views + 1 } : s))
    );
  };

  const addBulletin = (bulletinData: Omit<BulletinItem, 'id'>) => {
    const newBulletin: BulletinItem = {
      ...bulletinData,
      id: 'bulletin-' + Date.now(),
    };
    setBulletins((prev) => [newBulletin, ...prev]);
    showToast('새 주보가 발행되었습니다.');
  };

  const updateBulletin = (id: string, updates: Partial<BulletinItem>) => {
    setBulletins((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
    showToast('주보가 수정되었습니다.');
  };

  const deleteBulletin = (id: string) => {
    setBulletins((prev) => prev.filter((b) => b.id !== id));
    showToast('주보가 삭제되었습니다.', 'info');
  };

  const addNews = (newsData: Omit<NewsPost, 'id' | 'views'>) => {
    const newPost: NewsPost = {
      ...newsData,
      id: 'news-' + Date.now(),
      views: 0,
    };
    setNews((prev) => [newPost, ...prev]);
    showToast('새 소식 및 공지사항이 등록되었습니다.');
  };

  const updateNews = (id: string, updates: Partial<NewsPost>) => {
    setNews((prev) => prev.map((n) => (n.id === id ? { ...n, ...updates } : n)));
    showToast('소식이 수정되었습니다.');
  };

  const deleteNews = (id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
    showToast('소식이 삭제되었습니다.', 'info');
  };

  const incrementNewsViews = (id: string) => {
    setNews((prev) =>
      prev.map((n) => (n.id === id ? { ...n, views: n.views + 1 } : n))
    );
  };

  const addGalleryItem = (itemData: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...itemData,
      id: 'gal-' + Date.now(),
    };
    setGallery((prev) => [newItem, ...prev]);
    showToast('갤러리 앨범이 등록되었습니다.');
  };

  const updateGalleryItem = (id: string, updates: Partial<GalleryItem>) => {
    setGallery((prev) => prev.map((g) => (g.id === id ? { ...g, ...updates } : g)));
    showToast('갤러리 앨범이 수정되었습니다.');
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
    showToast('갤러리가 삭제되었습니다.', 'info');
  };

  const submitPrayerRequest = (reqData: Omit<PrayerRequest, 'id' | 'status' | 'createdAt'>) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newReq: PrayerRequest = {
      ...reqData,
      id: 'req-' + Date.now(),
      status: '접수대기',
      createdAt: formattedDate,
    };
    setPrayers((prev) => [newReq, ...prev]);
    showToast('신청이 은혜롭게 접수되었습니다. 담당 교역자가 함께 기도하며 연락드리겠습니다.');
  };

  const updatePrayerStatus = (id: string, status: PrayerRequest['status'], adminNote?: string) => {
    setPrayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status, ...(adminNote !== undefined ? { adminNote } : {}) } : p))
    );
    showToast('신청 처리 상태가 갱신되었습니다.');
  };

  const deletePrayerRequest = (id: string) => {
    setPrayers((prev) => prev.filter((p) => p.id !== id));
    showToast('신청 내역이 삭제되었습니다.', 'info');
  };

  const openVideoModal = (youtubeId: string) => {
    // Extract clean youtube id if full url is passed
    let cleanId = youtubeId;
    if (youtubeId.includes('v=')) {
      cleanId = youtubeId.split('v=')[1]?.split('&')[0] || youtubeId;
    } else if (youtubeId.includes('youtu.be/')) {
      cleanId = youtubeId.split('youtu.be/')[1]?.split('?')[0] || youtubeId;
    }
    setActiveVideoId(cleanId);
  };

  const closeVideoModal = () => {
    setActiveVideoId(null);
  };

  // Backup & Import
  const exportDataAsJSON = () => {
    const fullBackup = {
      exportDate: new Date().toISOString(),
      churchInfo,
      sermons,
      bulletins,
      news,
      gallery,
      prayers,
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `woori_church_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('전체 웹사이트 및 CMS 데이터가 JSON 파일로 백업 다운로드되었습니다.');
  };

  const importDataFromJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.churchInfo) setChurchInfo(parsed.churchInfo);
      if (Array.isArray(parsed.sermons)) setSermons(parsed.sermons);
      if (Array.isArray(parsed.bulletins)) setBulletins(parsed.bulletins);
      if (Array.isArray(parsed.news)) setNews(parsed.news);
      if (Array.isArray(parsed.gallery)) setGallery(parsed.gallery);
      if (Array.isArray(parsed.prayers)) setPrayers(parsed.prayers);
      showToast('백업 데이터가 성공적으로 복원되었습니다.');
      return true;
    } catch {
      showToast('올바르지 않은 JSON 데이터 파일입니다.', 'error');
      return false;
    }
  };

  const resetToDefaultData = () => {
    setChurchInfo(INITIAL_CHURCH_INFO);
    setSermons(INITIAL_SERMONS);
    setBulletins(INITIAL_BULLETINS);
    setNews(INITIAL_NEWS);
    setGallery(INITIAL_GALLERY);
    setPrayers(INITIAL_PRAYERS);
    showToast('모든 콘텐츠가 초기 한글 기본 샘플 데이터로 복원되었습니다.', 'info');
  };

  return (
    <ChurchContext.Provider
      value={{
        activeTab,
        setActiveTab,
        adminTab,
        setAdminTab,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        churchInfo,
        updateChurchInfo,
        updateTheme,
        updateSeo,
        sermons,
        addSermon,
        updateSermon,
        deleteSermon,
        incrementSermonViews,
        bulletins,
        addBulletin,
        updateBulletin,
        deleteBulletin,
        news,
        addNews,
        updateNews,
        deleteNews,
        incrementNewsViews,
        gallery,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        prayers,
        submitPrayerRequest,
        updatePrayerStatus,
        deletePrayerRequest,
        activeVideoId,
        openVideoModal,
        closeVideoModal,
        isGivingModalOpen,
        setIsGivingModalOpen,
        isPrayerModalOpen,
        setIsPrayerModalOpen,
        selectedSermon,
        setSelectedSermon,
        selectedBulletin,
        setSelectedBulletin,
        selectedNews,
        setSelectedNews,
        selectedGallery,
        setSelectedGallery,
        searchQuery,
        setSearchQuery,
        toasts,
        showToast,
        removeToast,
        exportDataAsJSON,
        importDataFromJSON,
        resetToDefaultData,
      }}
    >
      {children}
    </ChurchContext.Provider>
  );
};

export const useChurch = () => {
  const context = useContext(ChurchContext);
  if (!context) {
    throw new Error('useChurch must be used within a ChurchProvider');
  }
  return context;
};
