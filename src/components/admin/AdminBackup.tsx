import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Database, Download, Upload, RotateCcw, ShieldAlert, CheckCircle2, FileJson } from 'lucide-react';

export const AdminBackup: React.FC = () => {
  const { sermons, bulletins, news, gallery, prayers, churchInfo, restoreBackup, resetToDefault, showToast } = useChurch();

  const [importJson, setImportJson] = useState('');

  const handleExport = () => {
    const backupData = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      churchInfo,
      sermons,
      bulletins,
      news,
      gallery,
      prayers,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `woori-church-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast('교회 전체 데이터 백업 파일(JSON)이 다운로드되었습니다.');
  };

  const handleImport = () => {
    if (!importJson.trim()) {
      showToast('가져올 JSON 데이터를 입력해 주세요.', 'warning');
      return;
    }

    try {
      const parsed = JSON.parse(importJson);
      if (!parsed.churchInfo || !parsed.sermons) {
        throw new Error('유효한 교회 데이터 백업 형식이 아닙니다.');
      }
      restoreBackup(parsed);
      setImportJson('');
    } catch (err: any) {
      showToast(err.message || 'JSON 파싱 오류가 발생했습니다.', 'error');
    }
  };

  const handleReset = () => {
    if (window.confirm('정말 모든 데이터를 초기 기본 샘플 데이터로 복원하시겠습니까? 현재 입력된 수정사항은 모두 초기화됩니다.')) {
      resetToDefault();
    }
  };

  return (
    <div className="space-y-8 text-xs">
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Database className="w-5 h-5 text-indigo-950" />
          데이터 백업 및 복원 관리
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          교회 홈페이지의 모든 콘텐츠(설교, 주보, 공지, 앨범, 기도요청, 설정)를 백업하거나 복원합니다.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 1. Export Data */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Download className="w-4 h-4 text-emerald-600" />
              1. 전체 데이터 JSON 내보내기 (Backup)
            </h3>
            <p className="text-slate-600 leading-relaxed">
              현재 등록된 모든 설교({sermons.length}편), 주보({bulletins.length}회), 공지({news.length}건), 갤러리({gallery.length}개) 및 설정 데이터를 안전한 JSON 단일 파일로 다운로드합니다.
            </p>
          </div>

          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-all text-xs"
          >
            <Download className="w-4 h-4" />
            백업 파일 다운로드 (.json)
          </button>
        </div>

        {/* 2. Reset Default Data */}
        <div className="bg-white p-6 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-rose-900 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-rose-600" />
              2. 초기 기본 샘플 데이터로 복원
            </h3>
            <p className="text-rose-700/80 leading-relaxed">
              설정이나 데이터를 처음 상태로 되돌리고 싶을 때 사용합니다. 정갈하게 작성된 고품질 한글 샘플 콘텐츠로 즉시 채워집니다.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl shadow-md transition-all text-xs"
          >
            <RotateCcw className="w-4 h-4" />
            초기 샘플 데이터 복원
          </button>
        </div>
      </div>

      {/* 3. JSON Import / Restore */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Upload className="w-4 h-4 text-indigo-950" />
          3. 백업 데이터 붙여넣어 복원하기 (Restore)
        </h3>
        <p className="text-slate-600">
          기존에 다운로드했던 백업 JSON 파일의 텍스트 내용을 아래 상자에 붙여넣고 복원 버튼을 클릭하세요.
        </p>

        <textarea
          rows={6}
          placeholder='{"version": "1.0.0", "churchInfo": { ... } }'
          value={importJson}
          onChange={(e) => setImportJson(e.target.value)}
          className="w-full p-3 font-mono text-[11px] rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 bg-slate-50"
        />

        <div className="flex justify-end">
          <button
            onClick={handleImport}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-950 hover:bg-indigo-900 text-white font-bold rounded-xl shadow-md transition-all"
          >
            <Upload className="w-4 h-4" />
            데이터 복원 적용
          </button>
        </div>
      </div>
    </div>
  );
};
