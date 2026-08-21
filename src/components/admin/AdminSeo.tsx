import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Search, Globe, Share2, Youtube, Instagram, MessageCircle, Save, CheckCircle, Video } from 'lucide-react';

export const AdminSeo: React.FC = () => {
  const { churchInfo, updateChurchInfo, showToast } = useChurch();

  const [seoTitle, setSeoTitle] = useState(churchInfo.seo.siteTitle);
  const [seoDesc, setSeoDesc] = useState(churchInfo.seo.metaDescription);
  const [seoKeywords, setSeoKeywords] = useState(churchInfo.seo.metaKeywords);
  const [ogImage, setOgImage] = useState(churchInfo.seo.ogImageUrl);
  const [naverTag, setNaverTag] = useState(churchInfo.seo.naverVerificationCode || '');
  const [googleTag, setGoogleTag] = useState(churchInfo.seo.googleVerificationCode || '');

  const [naverBlogUrl, setNaverBlogUrl] = useState(churchInfo.socialLinks.naverBlogUrl || '');
  const [youtubeLink, setYoutubeLink] = useState(churchInfo.socialLinks.youtubeChannelUrl || '');
  const [youtubeLiveLink, setYoutubeLiveLink] = useState(churchInfo.socialLinks.youtubeLiveUrl || '');
  const [instagramLink, setInstagramLink] = useState(churchInfo.socialLinks.instagramUrl || '');
  const [kakaoLink, setKakaoLink] = useState(churchInfo.socialLinks.kakaoChannelUrl || '');
  const [bandLink, setBandLink] = useState(churchInfo.socialLinks.bandUrl || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateChurchInfo({
      seo: {
        ...churchInfo.seo,
        siteTitle: seoTitle,
        metaDescription: seoDesc,
        metaKeywords: seoKeywords,
        ogImageUrl: ogImage,
        naverVerificationCode: naverTag,
        googleVerificationCode: googleTag,
      },
      socialLinks: {
        ...churchInfo.socialLinks,
        naverBlogUrl,
        youtubeChannelUrl: youtubeLink,
        youtubeLiveUrl: youtubeLiveLink,
        instagramUrl: instagramLink,
        kakaoChannelUrl: kakaoLink,
        bandUrl: bandLink,
      },
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-indigo-950" />
            SEO(검색엔진 최적화) & SNS 연동 관리
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            네이버, 구글 검색 결과 및 카카오톡/SNS 공유 시 표시되는 정보와 채널 링크를 설정합니다.
          </p>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-950 hover:bg-indigo-900 text-white rounded-xl font-bold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          SEO 및 SNS 설정 저장
        </button>
      </div>

      {/* 1. Meta Tag Settings */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Globe className="w-4 h-4 text-indigo-950" />
          1. 네이버 & 구글 검색엔진 노출 메타태그
        </h3>

        <div>
          <label className="block font-bold text-slate-700 mb-1">
            홈페이지 메타 제목 (Title) <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-100 font-bold"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">
            검색엔진 설명 문구 (Meta Description) <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={2}
            required
            value={seoDesc}
            onChange={(e) => setSeoDesc(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">검색 키워드 (쉼표 구분)</label>
          <input
            type="text"
            value={seoKeywords}
            onChange={(e) => setSeoKeywords(e.target.value)}
            placeholder="우리형제교회, 영종도교회, 영종하늘도시교회, 이재진목사, InChristAlone"
            className="w-full px-3 py-2 rounded-xl border border-slate-300"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              네이버 서치어드바이저 인증 코드
            </label>
            <input
              type="text"
              placeholder="naver-site-verification 코드"
              value={naverTag}
              onChange={(e) => setNaverTag(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-[11px]"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              구글 서치 콘솔 인증 태그
            </label>
            <input
              type="text"
              placeholder="google-site-verification 코드"
              value={googleTag}
              onChange={(e) => setGoogleTag(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-[11px]"
            />
          </div>
        </div>
      </div>

      {/* 2. OpenGraph Card Preview */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Share2 className="w-4 h-4 text-indigo-950" />
          2. 카카오톡 및 SNS 공유 미리보기 (Open Graph)
        </h3>

        <div>
          <label className="block font-bold text-slate-700 mb-1">
            공유 썸네일 이미지 URL (1200x630 권장)
          </label>
          <input
            type="url"
            value={ogImage}
            onChange={(e) => setOgImage(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-[11px]"
          />
        </div>

        {/* Live Card Simulator */}
        <div className="pt-2">
          <div className="text-slate-500 font-medium mb-2">실제 카카오톡 공유 시 미리보기:</div>
          <div className="max-w-md bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-md">
            <div className="aspect-16/9 bg-slate-900 overflow-hidden">
              <img
                src={ogImage || 'https://mblogthumb-phinf.pstatic.net/MjAyNjAxMDNfMTM0/MDAxNzY3MzY2MDc2OTQy.iutbljvzMYsdkmQcesmhizaTu5kmCp1oo0S1MAOUvmog.8C1P-XxwUzLrWCbnHbM-8pZFf8YzzKtNJq9683spKQIg.PNG/croppedMobileTitleImage.png?type=w800'}
                alt="OG Preview"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 space-y-1 bg-white">
              <div className="text-[11px] text-slate-400 font-mono">wooribrother.org</div>
              <div className="font-bold text-slate-900 text-sm">{seoTitle}</div>
              <div className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{seoDesc}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Social Media Links */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Globe className="w-4 h-4 text-emerald-600" />
          3. 공식 소셜 미디어 및 네이버 블로그 연동
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5 text-emerald-700">
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">N</span> 네이버 공식 블로그 링크
            </label>
            <input
              type="url"
              placeholder="https://blog.naver.com/ljj617"
              value={naverBlogUrl}
              onChange={(e) => setNaverBlogUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-emerald-300 focus:ring-2 focus:ring-emerald-100 bg-emerald-50/20 font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Youtube className="w-3.5 h-3.5 text-red-600" /> 유튜브 공식 채널 링크
            </label>
            <input
              type="url"
              placeholder="https://youtube.com/@..."
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-red-500" /> 주일예배 실시간 라이브 링크
            </label>
            <input
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={youtubeLiveLink}
              onChange={(e) => setYoutubeLiveLink(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Instagram className="w-3.5 h-3.5 text-pink-600" /> 인스타그램 계정 링크
            </label>
            <input
              type="url"
              placeholder="https://instagram.com/..."
              value={instagramLink}
              onChange={(e) => setInstagramLink(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-amber-500" /> 카카오톡 플러스 채널
            </label>
            <input
              type="url"
              placeholder="http://pf.kakao.com/..."
              value={kakaoLink}
              onChange={(e) => setKakaoLink(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-600" /> 네이버 밴드 (성도 커뮤니티)
            </label>
            <input
              type="url"
              placeholder="https://band.us/..."
              value={bandLink}
              onChange={(e) => setBandLink(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 bg-indigo-950 hover:bg-indigo-900 text-white rounded-xl font-bold text-sm shadow-xl transition-all"
        >
          <Save className="w-4 h-4" />
          설정 저장 완료
        </button>
      </div>
    </form>
  );
};
