import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Plus, Edit2, Trash2, Image, X, Calendar, Tag } from 'lucide-react';
import { GalleryItem } from '../../types';

export const AdminGallery: React.FC = () => {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem, showToast } = useChurch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GalleryItem['category']>('예배현장');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [coverImage, setCoverImage] = useState('');
  const [imagesInput, setImagesInput] = useState('');
  const [description, setDescription] = useState('');

  const handleOpenAdd = () => {
    setEditingItem(null);
    setTitle('');
    setCategory('예배현장');
    setDate(new Date().toISOString().slice(0, 10));
    setCoverImage('https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=800&auto=format&fit=crop');
    setImagesInput('https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1200&auto=format&fit=crop');
    setDescription('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setDate(item.date);
    setCoverImage(item.coverImage);
    setImagesInput(item.images?.join('\n') || item.coverImage);
    setDescription(item.description);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const images = imagesInput
      .split('\n')
      .map((img) => img.trim())
      .filter(Boolean);

    if (!title.trim() || !coverImage.trim()) {
      showToast('앨범 제목과 대표 이미지는 필수입니다.', 'warning');
      return;
    }

    if (editingItem) {
      updateGalleryItem(editingItem.id, {
        title,
        category,
        date,
        coverImage,
        images: images.length > 0 ? images : [coverImage],
        description,
      });
    } else {
      addGalleryItem({
        title,
        category,
        date,
        coverImage,
        images: images.length > 0 ? images : [coverImage],
        description,
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, albumTitle: string) => {
    if (window.confirm(`'${albumTitle}' 앨범을 삭제하시겠습니까?`)) {
      deleteGalleryItem(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Image className="w-5 h-5 text-indigo-950" />
            교회 앨범 및 갤러리 관리
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            예배, 친교, 봉사, 교회학교 및 특별 행사 사진 앨범을 관리합니다.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-950 hover:bg-indigo-900 text-white rounded-xl font-bold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          신규 앨범 등록
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 text-amber-300 font-bold text-[10px]">
                  {item.category}
                </span>
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-white text-[10px]">
                  {item.images?.length || 1}장
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-mono">{item.date}</span>
                <h3 className="text-sm font-bold text-slate-900 truncate">{item.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{item.description}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(item)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-200"
              >
                <Edit2 className="w-3.5 h-3.5" />
                수정
              </button>
              <button
                onClick={() => handleDelete(item.id, item.title)}
                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-xl"
                title="삭제"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl my-8 text-slate-800">
            <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {editingItem ? '앨범 수정' : '새 사진 앨범 등록'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">앨범 제목 <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">카테고리</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as GalleryItem['category'])}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="예배현장">예배현장</option>
                    <option value="교제및봉사">교제및봉사</option>
                    <option value="교회학교">교회학교</option>
                    <option value="선교현장">선교현장</option>
                    <option value="특별행사">특별행사</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">행사 일자</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">대표 썸네일 이미지 URL <span className="text-rose-500">*</span></label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  추가 사진 URL 목록 (줄바꿈으로 여러 장 입력)
                </label>
                <textarea
                  rows={3}
                  placeholder="https://...&#10;https://..."
                  value={imagesInput}
                  onChange={(e) => setImagesInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-[11px]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">앨범 설명 및 스토리</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
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
                  {editingItem ? '수정 저장' : '앨범 등록'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
