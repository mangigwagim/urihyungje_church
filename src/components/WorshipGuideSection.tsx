import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { Clock, MapPin, Bus, Car, Train, Copy, Check, Video, ExternalLink, Navigation } from 'lucide-react';

export const WorshipGuideSection: React.FC = () => {
  const { churchInfo, openVideoModal, showToast } = useChurch();
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    const fullAddr = `${churchInfo.address} ${churchInfo.addressDetail}`;
    navigator.clipboard.writeText(fullAddr);
    setCopiedAddress(true);
    showToast('교회 도로명 주소가 클립보드에 복사되었습니다.');
    setTimeout(() => setCopiedAddress(false), 3000);
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-50 min-h-screen text-slate-800" id="worship-guide-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-900 font-bold text-xs tracking-wider uppercase">
            Worship & Direction Guide
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            예배 시간 및 오시는 길 안내
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            우리형제교회는 모든 성도와 처음 오시는 이웃을 따뜻한 사랑으로 환영합니다.
          </p>
        </div>

        {/* Worship Timetable Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-950" />
              정기 예배 및 집회 시간표
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              * 생중계 표시된 예배는 유튜브 실시간 방송 진행
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {churchInfo.worshipSchedule.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-900 text-[11px] font-bold">
                      {item.day}
                    </span>
                    {item.isLive && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                        유튜브 LIVE
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {item.name}
                  </h4>
                  <div className="text-xl font-extrabold text-indigo-950 font-mono">
                    {item.time}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                  <div>📍 장소: {item.location}</div>
                  <div>👥 대상: {item.target}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location & Directions Grid */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-950" />
              교회 위치 및 교통편
            </h3>
            <button
              onClick={handleCopyAddress}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-950 hover:bg-indigo-900 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
            >
              {copiedAddress ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedAddress ? '주소 복사완료' : '교회 주소 복사하기'}
            </button>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Visual Location Map Card */}
            <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl flex flex-col justify-between min-h-[360px]">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold backdrop-blur-md">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>우리형제교회 선교비전센터</span>
                </div>
                <h4 className="text-2xl font-bold">{churchInfo.address}</h4>
                <p className="text-slate-300 text-sm">{churchInfo.addressDetail}</p>
                <div className="text-xs text-slate-400">대표전화: {churchInfo.phone} | 우편번호: {churchInfo.zipCode}</div>
              </div>

              {/* Map shortcut buttons */}
              <div className="relative z-10 pt-6 flex flex-wrap gap-2">
                <a
                  href={`https://map.kakao.com/link/search/${encodeURIComponent(churchInfo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  카카오맵 길찾기
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={`https://map.naver.com/v5/search/${encodeURIComponent(churchInfo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  네이버 지도 길찾기
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Transport details */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
                <div className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                  <Train className="w-4 h-4 text-amber-600" />
                  대중교통 / 공항철도 이용 시 (Transit)
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  • 공항철도 <strong>영종역</strong> 또는 <strong>운서역</strong> 하차 후 시내버스 환승<br />
                  • 영종하늘도시 중심상가 / 스카이메디컬프라자 방면
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
                <div className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                  <Bus className="w-4 h-4 text-sky-600" />
                  시내버스 이용 시 (Bus)
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  • 영종하늘도시 / 하늘달빛로 정류장 하차 (도보 1~3분)<br />
                  • 간선 202, 203, 205, 206, 223번, 좌석 307번 등
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
                <div className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                  <Car className="w-4 h-4 text-indigo-950" />
                  자가용 및 주차 안내 (Parking)
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  • <strong>스카이메디컬프라자 건물 지하주차장</strong> 무료 이용 가능<br />
                  • 인근 하늘도시 공영주차장 및 상가 주변 주차 공간 완비
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
