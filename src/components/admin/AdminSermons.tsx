import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Plus, Edit2, Trash2, Video, Search, Check, X, Sparkles, Play, Star } from 'lucide-react';
import { Sermon } from '../../types';

export const AdminSermons: React.FC = () => {
  const { sermons, addSermon, updateSermon, deleteSermon, openVideoModal, showToast } = useChurch();

  const [search, setSearch] = useState('');
  const [editingSermon, setEditingSermon] = useState<Sermon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [preacher, setPreacher] = useState('이재진 담임목사');
  const [scripture, setScripture] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState<Sermon['category']>('주일대예배');
  const [youtubeInput, setYoutubeInput] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [keyPointsInput, setKeyPointsInput] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  const filteredSermons = sermons.filter((s) => {
    return (
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.scripture.toLowerCase().includes(search.toLowerCase()) ||
      s.preacher.toLowerCase().includes(search.toLowerCase())
    );
  });

  const extractYoutubeId = (url: string) => {
    if (!url) return '';
    if (url.includes('v=')) {
      return url.split('v=')[1]?.split('&')[0] || url;
    }
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0] || url;
    }
    return url.trim();
  };

  const handleOpenAdd = () => {
    setEditingSermon(null);
    setTitle('');
    setPreacher('이재진 담임목사');
    setScripture('');
    setDate(new Date().toISOString().slice(0, 10));
    setCategory('주일대예배');
    setYoutubeInput('kJQP7kiw5Fk');
    setThumbnailUrl('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800&auto=format&fit=crop');
    setSummary('');
    setKeyPointsInput('');
    setIsFeatured(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: Sermon) => {
    setEditingSermon(s);
    setTitle(s.title);
    setPreacher(s.preacher);
    setScripture(s.scripture);
    setDate(s.date);
    setCategory(s.category);
    setYoutubeInput(s.youtubeId);
    setThumbnailUrl(s.thumbnailUrl);
    setSummary(s.summary || '');
    setKeyPointsInput(s.keyPoints?.join('\n') || '');
    setIsFeatured(!!s.isFeatured);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanYoutubeId = extractYoutubeId(youtubeInput);
    const keyPoints = keyPointsInput
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);

    if (!title.trim() || !scripture.trim()) {
      showToast('설교 제목과 성경 본문은 필수 입력 사항입니다.', 'warning');
      return;
    }

    if (editingSermon) {
      updateSermon(editingSermon.id, {
        title,
        preacher,
        scripture,
        date,
        category,
        youtubeId: cleanYoutubeId || 'kJQP7kiw5Fk',
        thumbnailUrl:
          thumbnailUrl.trim() ||
          'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800&auto=format&fit=crop',
        summary,
        keyPoints,
        isFeatured,
      });
    } else {
      addSermon({
        title,
        preacher,
        scripture,
        date,
        category,
        youtubeId: cleanYoutubeId || 'kJQP7kiw5Fk',
        thumbnailUrl:
          thumbnailUrl.trim() ||
          'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800&auto=format&fit=crop',
        summary,
        keyPoints,
        isFeatured,
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, sermonTitle: string) => {
    if (window.confirm(`'${sermonTitle}' 설교를 정말 삭제하시겠습니까?`)) {
      deleteSermon(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Video className="w-5 h-5 text-indigo-950" />
            설교 및 예배 영상 관리
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            주일예배, 수요예배, 청년부 등 설교 영상을 등록하고 관리합니다.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-950 hover:bg-indigo-900 text-white rounded-xl font-bold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          신규 설교 등록
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="설교제목, 성경본문, 설교자 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* Sermons Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center">대표</th>
                <th className="py-3.5 px-4">구분</th>
                <th className="py-3.5 px-4">설교 제목</th>
                <th className="py-3.5 px-4">본문 / 설교자</th>
                <th className="py-3.5 px-4">설교 일자</th>
                <th className="py-3.5 px-4">조회수</th>
                <th className="py-3.5 px-4 text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSermons.map((sermon) => (
                <tr key={sermon.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 text-center">
                    {sermon.isFeatured ? (
                      <span title="홈 메인 대표 설교">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500 inline" />
                      </span>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-900 font-bold text-[10px]">
                      {sermon.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 max-w-xs truncate">
                    {sermon.title}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <div className="font-medium text-slate-800">{sermon.scripture}</div>
                    <div className="text-[11px] text-slate-400">{sermon.preacher}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono">{sermon.date}</td>
                  <td className="py-3.5 px-4 text-slate-600">{sermon.views.toLocaleString()}회</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openVideoModal(sermon.youtubeId)}
                        className="p-1.5 text-slate-500 hover:text-indigo-950 hover:bg-slate-100 rounded-lg"
                        title="미리보기"
                      >
                        <Play className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(sermon)}
                        className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-100 rounded-lg"
                        title="수정"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(sermon.id, sermon.title)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                        title="삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl my-8 text-slate-800">
            <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {editingSermon ? '설교 정보 수정' : '새 설교 영상 등록'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    설교 제목 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: 사랑으로 견고해지는 공동체의 비밀"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    예배 구분 (카테고리)
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Sermon['category'])}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 bg-white"
                  >
                    <option value="주일대예배">주일대예배</option>
                    <option value="수요예배">수요예배</option>
                    <option value="금요성령집회">금요성령집회</option>
                    <option value="청년예배">청년예배</option>
                    <option value="특별집회">특별집회</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    성경 본문 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: 요한복음 13:34-35"
                    value={scripture}
                    onChange={(e) => setScripture(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">설교자</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 이진우 담임목사"
                    value={preacher}
                    onChange={(e) => setPreacher(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">설교 일자</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  유튜브 영상 링크 또는 Video ID <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="예: https://www.youtube.com/watch?v=kJQP7kiw5Fk 또는 kJQP7kiw5Fk"
                  value={youtubeInput}
                  onChange={(e) => setYoutubeInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 font-mono text-[11px]"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  유튜브 전체 주소를 넣으면 Video ID를 자동으로 추출하여 재생합니다.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">썸네일 이미지 URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-[11px]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">설교 요약 (Summary)</label>
                <textarea
                  rows={2}
                  placeholder="설교의 핵심 메시지를 1~2문장으로 요약해 주세요."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  묵상 및 나눔 포인트 (줄바꿈으로 구분)
                </label>
                <textarea
                  rows={3}
                  placeholder="1. 첫 번째 나눔 질문&#10;2. 두 번째 실천 과제"
                  value={keyPointsInput}
                  onChange={(e) => setKeyPointsInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-indigo-950 focus:ring-indigo-900"
                />
                <label htmlFor="isFeatured" className="font-semibold text-slate-700 cursor-pointer">
                  홈 메인 화면 대표 설교로 지정하기
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-950 hover:bg-indigo-900 text-white font-bold rounded-xl shadow-md"
                >
                  {editingSermon ? '수정사항 저장' : '등록 완료'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
