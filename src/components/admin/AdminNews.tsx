import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Plus, Edit2, Trash2, Bell, Pin, Search, X, Eye } from 'lucide-react';
import { NewsPost } from '../../types';

export const AdminNews: React.FC = () => {
  const { news, addNews, updateNews, deleteNews, showToast } = useChurch();

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<NewsPost['category']>('공지사항');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [author, setAuthor] = useState('목회기획실');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPinned, setIsPinned] = useState(false);

  const filtered = news.filter((n) => {
    return (
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleOpenAdd = () => {
    setEditingPost(null);
    setTitle('');
    setCategory('공지사항');
    setDate(new Date().toISOString().slice(0, 10));
    setAuthor('목회기획실');
    setContent('');
    setImageUrl('');
    setIsPinned(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (n: NewsPost) => {
    setEditingPost(n);
    setTitle(n.title);
    setCategory(n.category);
    setDate(n.date);
    setAuthor(n.author);
    setContent(n.content);
    setImageUrl(n.imageUrl || '');
    setIsPinned(n.isPinned);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      showToast('제목과 내용은 필수입니다.', 'warning');
      return;
    }

    if (editingPost) {
      updateNews(editingPost.id, {
        title,
        category,
        date,
        author,
        content,
        imageUrl: imageUrl.trim() || undefined,
        isPinned,
      });
    } else {
      addNews({
        title,
        category,
        date,
        author,
        content,
        imageUrl: imageUrl.trim() || undefined,
        isPinned,
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, postTitle: string) => {
    if (window.confirm(`'${postTitle}' 소식을 삭제하시겠습니까?`)) {
      deleteNews(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-950" />
            교회 소식 및 공지사항 관리
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            사역 공지, 행사 소식, 교육부 모집 글을 등록 및 수정합니다.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-950 hover:bg-indigo-900 text-white rounded-xl font-bold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          신규 소식 작성
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="공지 제목 및 내용 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-white"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center">고정</th>
                <th className="py-3.5 px-4">분류</th>
                <th className="py-3.5 px-4">제목</th>
                <th className="py-3.5 px-4">작성자</th>
                <th className="py-3.5 px-4">등록일</th>
                <th className="py-3.5 px-4">조회수</th>
                <th className="py-3.5 px-4 text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 text-center">
                    {item.isPinned ? (
                      <Pin className="w-4 h-4 text-amber-500 fill-amber-500 inline" />
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-900 font-bold text-[10px]">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 max-w-sm truncate">
                    {item.title}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{item.author}</td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono">{item.date}</td>
                  <td className="py-3.5 px-4 text-slate-500">{item.views}회</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-100 rounded-lg"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl my-8 text-slate-800">
            <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {editingPost ? '소식 및 공지 수정' : '새 소식 작성'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">제목 <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">카테고리</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as NewsPost['category'])}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="공지사항">공지사항</option>
                    <option value="교회소식">교회소식</option>
                    <option value="모집및사역">모집및사역</option>
                    <option value="행사안내">행사안내</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">작성자 (부서)</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">등록 일자</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">첨부 대표 이미지 URL (선택)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-[11px]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">본문 내용 <span className="text-rose-500">*</span></label>
                <textarea
                  rows={6}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isPinned"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="rounded text-indigo-950"
                />
                <label htmlFor="isPinned" className="font-semibold text-slate-700 cursor-pointer">
                  상단 중요 공지로 고정하기
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
                  {editingPost ? '수정 완료' : '공지 등록'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
