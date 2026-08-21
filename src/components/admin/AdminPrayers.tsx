import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Heart, Lock, CheckCircle2, Clock, Trash2, MessageSquare, Phone, User, Search, Filter } from 'lucide-react';
import { PrayerRequest } from '../../types';

export const AdminPrayers: React.FC = () => {
  const { prayers, updatePrayerStatus, deletePrayerRequest, showToast } = useChurch();

  const [filterType, setFilterType] = useState('전체');
  const [filterStatus, setFilterStatus] = useState('전체');
  const [activeReq, setActiveReq] = useState<PrayerRequest | null>(null);
  const [memoInput, setMemoInput] = useState('');

  const filtered = prayers.filter((p) => {
    const matchType = filterType === '전체' || p.type === filterType;
    const matchStatus = filterStatus === '전체' || p.status === filterStatus;
    return matchType && matchStatus;
  });

  const handleOpenDetail = (p: PrayerRequest) => {
    setActiveReq(p);
    setMemoInput(p.adminNote || '');
  };

  const handleSaveNote = (status: PrayerRequest['status']) => {
    if (!activeReq) return;
    updatePrayerStatus(activeReq.id, status, memoInput);
    setActiveReq(null);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`'${name}' 님의 신청 내역을 삭제하시겠습니까?`)) {
      deletePrayerRequest(id);
      if (activeReq?.id === id) setActiveReq(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-600" />
          기도 요청 및 새가족 등록 관리
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          홈페이지를 통해 접수된 온라인 기도 요청, 새가족 등록 및 상담 신청 내역을 관리합니다.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-500">구분:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
          >
            <option value="전체">전체 구분</option>
            <option value="중보기도요청">중보기도요청</option>
            <option value="새가족등록신청">새가족등록신청</option>
            <option value="목회상담신청">목회상담신청</option>
            <option value="온라인심방요청">온라인심방요청</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-500">상태:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
          >
            <option value="전체">전체 상태</option>
            <option value="접수대기">접수대기</option>
            <option value="기도중">기도중</option>
            <option value="처리완료">처리완료</option>
          </select>
        </div>
      </div>

      {/* Request Cards */}
      <div className="grid gap-4">
        {filtered.map((req) => (
          <div
            key={req.id}
            onClick={() => handleOpenDetail(req)}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-900 font-bold text-[11px]">
                  {req.type}
                </span>
                <span className="font-bold text-slate-900 text-sm">{req.name}</span>
                <span className="text-slate-400 text-xs font-mono">{req.contact}</span>
                {req.isPrivate && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    <Lock className="w-3 h-3" /> 비공개
                  </span>
                )}
                <span className="text-slate-400 text-[11px] ml-auto md:ml-2 font-mono">
                  {req.createdAt}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-800">{req.title}</h4>
              <p className="text-xs text-slate-600 line-clamp-2">{req.content}</p>

              {req.adminNote && (
                <div className="text-[11px] text-indigo-900 bg-indigo-50/70 p-2 rounded-lg border border-indigo-100 font-medium">
                  📝 관리자 메모: {req.adminNote}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 self-end md:self-center shrink-0">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  req.status === '접수대기'
                    ? 'bg-rose-100 text-rose-800'
                    : req.status === '기도중'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {req.status}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(req.id, req.name);
                }}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title="삭제"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail / Note Edit Modal */}
      {activeReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl my-8 text-slate-800">
            <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-300 font-bold">{activeReq.type}</span>
                <h3 className="text-lg font-bold">{activeReq.name} 성도님 신청 상세</h3>
              </div>
              <button onClick={() => setActiveReq(null)} className="p-1 text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block">연락처</span>
                  <span className="font-bold text-slate-800 text-sm font-mono">{activeReq.contact}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">접수 일시</span>
                  <span className="font-bold text-slate-800">{activeReq.createdAt}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">제목</span>
                <div className="p-3 bg-slate-50 rounded-xl font-bold text-slate-900 border border-slate-200">
                  {activeReq.title}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">상세 내용</span>
                <div className="p-4 bg-slate-50 rounded-xl text-slate-700 leading-relaxed border border-slate-200 whitespace-pre-line">
                  {activeReq.content}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  목회 상담 및 처리 메모 (담당 교역자 기록용)
                </label>
                <textarea
                  rows={3}
                  placeholder="예: 8/17 새가족부 전화 안내 완료, 이번 주일 11시 예배 참석 예정"
                  value={memoInput}
                  onChange={(e) => setMemoInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-500">상태 변경:</span>
                  <button
                    onClick={() => handleSaveNote('접수대기')}
                    className={`px-2.5 py-1.5 rounded-lg font-bold ${
                      activeReq.status === '접수대기' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-800'
                    }`}
                  >
                    대기
                  </button>
                  <button
                    onClick={() => handleSaveNote('기도중')}
                    className={`px-2.5 py-1.5 rounded-lg font-bold ${
                      activeReq.status === '기도중' ? 'bg-amber-500 text-slate-950' : 'bg-amber-50 text-amber-900'
                    }`}
                  >
                    기도중
                  </button>
                  <button
                    onClick={() => handleSaveNote('처리완료')}
                    className={`px-2.5 py-1.5 rounded-lg font-bold ${
                      activeReq.status === '처리완료' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800'
                    }`}
                  >
                    완료
                  </button>
                </div>

                <button
                  onClick={() => setActiveReq(null)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 font-semibold rounded-xl"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
