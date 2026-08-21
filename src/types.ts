export type ThemePalette = 'navy-gold' | 'sage-green' | 'classic-burgundy' | 'slate-warm' | 'deep-forest';
export type FontFamily = 'pretendard' | 'serif' | 'modern';

export interface WorshipScheduleItem {
  id: string;
  name: string; // e.g. 주일 1부 예배, 주일 2부 예배, 청년부 예배, 수요기도회, 금요성령집회, 새벽기도회
  day: string; // 주일, 수요일, 금요일, 매일
  time: string; // 오전 9:00, 오전 11:00 등
  location: string; // 본당 (3층 글로리아홀), 비전홀 (2층) 등
  target: string; // 전교인, 청년/대학생, 유초등부 등
  isLive: boolean; // 온라인 생중계 여부
}

export interface BankAccount {
  id: string;
  category: string; // 십일조, 감사헌금, 선교헌금, 건축헌금, 일반헌금
  bankName: string; // 국민은행, 신한은행, 농협, 하나은행 등
  accountNumber: string;
  accountHolder: string;
}

export interface SocialLinks {
  youtubeChannelUrl: string;
  youtubeLiveUrl: string;
  naverBlogUrl: string;
  instagramUrl: string;
  kakaoChannelUrl: string;
  bandUrl: string;
}

export interface SeoSettings {
  siteTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImageUrl: string;
  naverVerificationCode: string;
  googleVerificationCode: string;
  author: string;
}

export interface ThemeSettings {
  palette: ThemePalette;
  fontFamily: FontFamily;
  heroDarkness: number; // 0 to 80%
  headerStyle: 'glass' | 'solid' | 'minimal';
  cardRadius: 'sm' | 'md' | 'lg' | 'full';
  showAnnouncementsBanner: boolean;
  announcementText: string;
}

export interface PastorProfile {
  name: string;
  role: string;
  greetingTitle: string;
  greetingContent: string;
  imageUrl: string;
  education: string[];
  career: string[];
}

export interface ServingLeader {
  id: string;
  name: string;
  role: string; // 부목사, 전도사, 협동목사, 시무장로, 찬양사역자 등
  department: string; // 청년부/교육부/찬양/행정
  imageUrl: string;
  phone?: string;
  email?: string;
}

export interface ChurchInfo {
  name: string;
  denomination: string; // 대한예수교장로회(통합)
  slogan: string; // 2026년 교회 표어
  sloganVerse: string; // 표어 성경 구절
  sloganVerseReference: string; // 요한복음 13:35
  visionStatements: { title: string; desc: string; icon: string }[];
  address: string;
  addressDetail: string;
  zipCode: string;
  phone: string;
  fax: string;
  email: string;
  pastor: PastorProfile;
  servingLeaders: ServingLeader[];
  worshipSchedule: WorshipScheduleItem[];
  bankAccounts: BankAccount[];
  socialLinks: SocialLinks;
  seo: SeoSettings;
  theme: ThemeSettings;
  heroImages: string[];
  churchHistory: { year: string; event: string }[];
}

export interface Sermon {
  id: string;
  title: string;
  preacher: string;
  scripture: string; // 성경본문 (예: 로마서 8:28~39)
  date: string; // YYYY-MM-DD
  category: '주일대예배' | '수요예배' | '금요성령집회' | '청년예배' | '특별집회';
  youtubeId: string; // YouTube Video ID or URL
  thumbnailUrl: string;
  audioUrl?: string;
  summary: string;
  keyPoints: string[];
  views: number;
  isFeatured?: boolean;
}

export interface BulletinItem {
  id: string;
  volume: string; // 제 24권 33호
  title: string; // 2026년 8월 16일 주보
  date: string; // 2026-08-16
  coverImageUrl: string;
  scriptureReading: string; // 금주의 성경봉독
  worshipOrder: { step: string; content: string; leader: string }[];
  weeklyPrayer: string;
  reciteVerse: { verse: string; reference: string };
  announcements: string[];
  nextWeekService: { prayer: string; bibleReader: string; ushers: string };
  pdfUrl?: string;
}

export interface NewsPost {
  id: string;
  title: string;
  category: '공지사항' | '교회소식' | '모집및사역' | '행사안내';
  date: string;
  author: string;
  content: string;
  isPinned: boolean;
  imageUrl?: string;
  views: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: '예배현장' | '교제및봉사' | '교회학교' | '선교현장' | '특별행사';
  date: string;
  coverImage: string;
  images: string[];
  description: string;
}

export interface PrayerRequest {
  id: string;
  name: string;
  contact: string;
  type: '중보기도요청' | '새가족등록신청' | '목회상담신청' | '온라인심방요청';
  title: string;
  content: string;
  isPrivate: boolean;
  status: '접수대기' | '기도중' | '처리완료';
  adminNote?: string;
  createdAt: string;
}

export type ActiveTab = 
  | 'home'
  | 'about'
  | 'sermons'
  | 'bulletin'
  | 'news'
  | 'gallery'
  | 'worship-guide'
  | 'giving'
  | 'prayer-request'
  | 'admin';

export type AdminTab =
  | 'overview'
  | 'sermons'
  | 'bulletin'
  | 'news'
  | 'gallery'
  | 'requests'
  | 'theme'
  | 'church-info'
  | 'seo'
  | 'backup';
