import React from 'react';
import { useChurch } from '../context/ChurchContext';
import { Flame, HeartHandshake, GraduationCap, Globe, User, Award, BookOpen, Clock, Mail, Phone, Users, Sparkles, Church } from 'lucide-react';
import { motion } from 'motion/react';

export const ChurchIntroSection: React.FC = () => {
  const { churchInfo } = useChurch();

  const getVisionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-6 h-6 text-amber-500" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-rose-500" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-sky-500" />;
      case 'Users':
        return <Users className="w-6 h-6 text-indigo-500" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-400" />;
      case 'Church':
        return <Church className="w-6 h-6 text-purple-500" />;
      case 'Globe':
      default:
        return <Globe className="w-6 h-6 text-emerald-500" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white text-slate-800" id="church-intro-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Top Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-900 font-bold text-xs tracking-wider uppercase">
            About Woori Brothers Church
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            교회 소개 & 목회 비전
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {churchInfo.name}는 예수 그리스도의 십자가 사랑으로 세상을 섬기고 제자를 삼는 선교적 공동체(Missional Church)입니다.
          </p>
        </div>

        {/* Core Vision Pillars */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{churchInfo.visionStatements.length}대 핵심 비전 (Core Visions)</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">우리형제교회가 품고 달려가는 믿음의 기둥입니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {churchInfo.visionStatements.map((vision, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center">
                    {getVisionIcon(vision.icon)}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {vision.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {vision.desc}
                  </p>
                </div>
                <div className="pt-2 text-[11px] font-bold text-indigo-950 uppercase tracking-wider">
                  Vision 0{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Senior Pastor Greeting */}
        <div className="bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
          <div className="grid lg:grid-cols-12 gap-8 p-8 sm:p-12 items-center">
            {/* Pastor Photo */}
            <div className="lg:col-span-5 space-y-4 text-center">
              <div className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64 rounded-2xl overflow-hidden shadow-xl border-2 border-slate-700">
                <img
                  src={churchInfo.pastor.imageUrl}
                  alt={churchInfo.pastor.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                  Senior Pastor
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {churchInfo.pastor.name}
                </h4>
              </div>
            </div>

            {/* Pastor Letter & Background */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
                  담임목사 인사말
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {churchInfo.pastor.greetingTitle}
                </h3>
              </div>

              <div className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-serif space-y-2">
                {churchInfo.pastor.greetingContent}
              </div>

              {/* Education & Career Accents */}
              <div className="pt-4 border-t border-slate-800 grid sm:grid-cols-2 gap-4 text-xs text-slate-400">
                <div>
                  <h5 className="font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    학력
                  </h5>
                  <ul className="space-y-1">
                    {churchInfo.pastor.education.map((edu, i) => (
                      <li key={i}>• {edu}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    주요 약력
                  </h5>
                  <ul className="space-y-1">
                    {churchInfo.pastor.career.map((car, i) => (
                      <li key={i}>• {car}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Serving Leaders */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">섬기는 사람들 (Serving Ministry)</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">우리형제교회를 기쁨과 헌신으로 섬기는 교역자 및 중직자입니다.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {churchInfo.servingLeaders.map((leader) => (
              <div
                key={leader.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all text-center p-6 space-y-4"
              >
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-slate-200 shadow-inner">
                  <img
                    src={leader.imageUrl}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-900 font-bold text-[11px]">
                    {leader.role}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-1.5">
                    {leader.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">{leader.department}</p>
                </div>
                {leader.email && (
                  <div className="text-[11px] text-slate-400 truncate pt-2 border-t border-slate-100">
                    {leader.email}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Church History Timeline */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">교회 연혁 (Church History)</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">하나님께서 우리형제교회와 함께 걸어오신 은혜의 발자취입니다.</p>
          </div>

          <div className="max-w-3xl mx-auto bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 space-y-6">
            {churchInfo.churchHistory.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 sm:gap-6 relative group">
                <div className="w-16 sm:w-20 shrink-0 font-extrabold text-sm sm:text-base text-indigo-950">
                  {item.year}년
                </div>
                <div className="relative pl-6 border-l-2 border-indigo-200 flex-1 pb-4">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-indigo-950 border-2 border-white shadow" />
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {item.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
