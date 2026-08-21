import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { X, Copy, Check, Heart, ShieldCheck, FileText, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const OnlineGivingModal: React.FC = () => {
  const { isGivingModalOpen, setIsGivingModalOpen, churchInfo, showToast } = useChurch();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isGivingModalOpen) return null;

  const handleCopyAccount = (id: string, bank: string, number: string) => {
    navigator.clipboard.writeText(`${bank} ${number}`);
    setCopiedId(id);
    showToast(`${bank} 계좌번호가 복사되었습니다. (${number})`);
    setTimeout(() => setCopiedId(null), 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl my-8 text-slate-800"
          id="online-giving-modal"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 relative">
            <button
              onClick={() => setIsGivingModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-full transition-colors"
              title="닫기"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 bg-amber-500/20 text-amber-300 rounded-xl border border-amber-500/30">
                <Heart className="w-5 h-5" />
              </span>
              <span className="text-xs font-semibold tracking-wider text-amber-300 uppercase">
                Grace & Offering
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              온라인 헌금 및 후원 안내
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-lg">
              "각각 그 마음에 정한 대로 할 것이요 인색함으로나 억지로 하지 말지니 하나님은 즐겨 내는 자를 사랑하시느니라" (고후 9:7)
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Account List */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building className="w-4 h-4 text-indigo-950" />
                목적별 헌금 전용 계좌
              </h3>
              <div className="grid gap-3">
                {churchInfo.bankAccounts.map((acc) => {
                  const isCopied = copiedId === acc.id;
                  return (
                    <div
                      key={acc.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-900">
                            {acc.category}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            예금주: {acc.accountHolder}
                          </span>
                        </div>
                        <div className="text-base sm:text-lg font-bold text-slate-900 tracking-wide font-mono">
                          {acc.bankName} <span className="text-indigo-950">{acc.accountNumber}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopyAccount(acc.id, acc.bankName, acc.accountNumber)}
                        className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                          isCopied
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-indigo-950 hover:bg-indigo-900 text-white shadow-sm'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-4 h-4" />
                            복사 완료!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            계좌번호 복사
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Instruction Guide */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-amber-900 text-sm">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  입금자명 기재 방법
                </div>
                <p className="leading-relaxed text-amber-800">
                  교적 확인과 연말정산 기부금 영수증 발급을 위해 송금 시 <strong>[성명+헌금종류]</strong>를 입력해 주세요.
                </p>
                <div className="bg-white/80 p-2 rounded-lg border border-amber-200 font-mono text-[11px] text-slate-700">
                  예: 홍길동십일조, 김철수감사, 이영희선교
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-700 space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-slate-900 text-sm">
                  <FileText className="w-4 h-4 text-slate-700" />
                  기부금 영수증 발급 안내
                </div>
                <p className="leading-relaxed">
                  연말정산용 기부금영수증(소득공제)은 매년 1월 국세청 연말정산 간소화 서비스 또는 교회 사무실({churchInfo.phone})을 통해 발급받으실 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button
              onClick={() => setIsGivingModalOpen(false)}
              className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xl text-sm transition-colors"
            >
              닫기
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
