import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Church, User, MapPin, Phone, Building, Clock, Plus, Trash2, Save } from 'lucide-react';
import { WorshipScheduleItem, BankAccount } from '../../types';

export const AdminChurchInfo: React.FC = () => {
  const { churchInfo, updateChurchInfo, showToast } = useChurch();

  // Basic Info Form State
  const [name, setName] = useState(churchInfo.name);
  const [denomination, setDenomination] = useState(churchInfo.denomination);
  const [slogan, setSlogan] = useState(churchInfo.slogan);
  const [sloganVerse, setSloganVerse] = useState(churchInfo.sloganVerse);
  const [sloganVerseReference, setSloganVerseReference] = useState(churchInfo.sloganVerseReference);

  // Address & Contact
  const [address, setAddress] = useState(churchInfo.address);
  const [addressDetail, setAddressDetail] = useState(churchInfo.addressDetail);
  const [zipCode, setZipCode] = useState(churchInfo.zipCode);
  const [phone, setPhone] = useState(churchInfo.phone);
  const [fax, setFax] = useState(churchInfo.fax);
  const [email, setEmail] = useState(churchInfo.email);

  // Pastor
  const [pastorName, setPastorName] = useState(churchInfo.pastor.name);
  const [greetingTitle, setGreetingTitle] = useState(churchInfo.pastor.greetingTitle);
  const [greetingContent, setGreetingContent] = useState(churchInfo.pastor.greetingContent);
  const [pastorImageUrl, setPastorImageUrl] = useState(churchInfo.pastor.imageUrl);

  // Bank Accounts State
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(churchInfo.bankAccounts);

  // Worship Schedule State
  const [worshipSchedule, setWorshipSchedule] = useState<WorshipScheduleItem[]>(
    churchInfo.worshipSchedule
  );

  const handleSaveBasic = (e: React.FormEvent) => {
    e.preventDefault();
    updateChurchInfo({
      name,
      denomination,
      slogan,
      sloganVerse,
      sloganVerseReference,
      address,
      addressDetail,
      zipCode,
      phone,
      fax,
      email,
      pastor: {
        ...churchInfo.pastor,
        name: pastorName,
        greetingTitle,
        greetingContent,
        imageUrl: pastorImageUrl,
      },
      bankAccounts,
      worshipSchedule,
    });
  };

  const handleAddAccount = () => {
    const newAcc: BankAccount = {
      id: 'bank-' + Date.now(),
      category: '감사헌금',
      bankName: '국민은행',
      accountNumber: '000-000-000000',
      accountHolder: churchInfo.name,
    };
    setBankAccounts([...bankAccounts, newAcc]);
  };

  const handleRemoveAccount = (id: string) => {
    setBankAccounts(bankAccounts.filter((b) => b.id !== id));
  };

  const handleAddWorship = () => {
    const newWorship: WorshipScheduleItem = {
      id: 'w-' + Date.now(),
      name: '새 예배 모임',
      day: '주일',
      time: '오후 04:00',
      location: '본당 대예배실',
      target: '전교인',
      isLive: false,
    };
    setWorshipSchedule([...worshipSchedule, newWorship]);
  };

  const handleRemoveWorship = (id: string) => {
    setWorshipSchedule(worshipSchedule.filter((w) => w.id !== id));
  };

  return (
    <form onSubmit={handleSaveBasic} className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Church className="w-5 h-5 text-indigo-950" />
            교회 기본 정보 & 예배 시간표 관리
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            교회명, 연간 표어, 목회자 정보, 주소, 헌금 계좌 및 예배 시간표를 수정합니다.
          </p>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-950 hover:bg-indigo-900 text-white rounded-xl font-bold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          전체 설정 저장하기
        </button>
      </div>

      {/* 1. Basic Info & Slogan */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Church className="w-4 h-4 text-indigo-950" />
          1. 교회 명칭 및 올해의 표어
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">교회 명칭</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">소속 교단</label>
            <input
              type="text"
              value={denomination}
              onChange={(e) => setDenomination(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">올해의 교회 표어 (Slogan)</label>
          <input
            type="text"
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-100 font-bold"
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">표어 성경 구절 본문</label>
            <input
              type="text"
              value={sloganVerse}
              onChange={(e) => setSloganVerse(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">성경 출처 (장/절)</label>
            <input
              type="text"
              value={sloganVerseReference}
              onChange={(e) => setSloganVerseReference(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>
      </div>

      {/* 2. Pastor Info */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <User className="w-4 h-4 text-indigo-950" />
          2. 담임목사 정보 및 인사말
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">담임목사 성명</label>
            <input
              type="text"
              value={pastorName}
              onChange={(e) => setPastorName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">목사님 사진 이미지 URL</label>
            <input
              type="url"
              value={pastorImageUrl}
              onChange={(e) => setPastorImageUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-[11px]"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">인사말 대표 타이틀</label>
          <input
            type="text"
            value={greetingTitle}
            onChange={(e) => setGreetingTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">인사말 본문 내용</label>
          <textarea
            rows={5}
            value={greetingContent}
            onChange={(e) => setGreetingContent(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 leading-relaxed"
          />
        </div>
      </div>

      {/* 3. Address & Contact */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-indigo-950" />
          3. 위치 및 연락처
        </h3>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">도로명 기본 주소</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">우편번호</label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">상세 주소 및 교통 안내 문구</label>
          <input
            type="text"
            value={addressDetail}
            onChange={(e) => setAddressDetail(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300"
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">대표 전화</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">팩스 번호</label>
            <input
              type="text"
              value={fax}
              onChange={(e) => setFax(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">대표 이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>
        </div>
      </div>

      {/* 4. Bank Accounts Management */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Building className="w-4 h-4 text-indigo-950" />
            4. 온라인 헌금 계좌 목록
          </h3>
          <button
            type="button"
            onClick={handleAddAccount}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold text-xs border border-slate-200"
          >
            <Plus className="w-3.5 h-3.5" /> 계좌 추가
          </button>
        </div>

        <div className="space-y-3">
          {bankAccounts.map((acc, idx) => (
            <div
              key={acc.id}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 grid sm:grid-cols-12 gap-3 items-center"
            >
              <div className="sm:col-span-3">
                <input
                  type="text"
                  placeholder="헌금 종류 (십일조 등)"
                  value={acc.category}
                  onChange={(e) => {
                    const updated = [...bankAccounts];
                    updated[idx].category = e.target.value;
                    setBankAccounts(updated);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold"
                />
              </div>
              <div className="sm:col-span-2">
                <input
                  type="text"
                  placeholder="은행명"
                  value={acc.bankName}
                  onChange={(e) => {
                    const updated = [...bankAccounts];
                    updated[idx].bankName = e.target.value;
                    setBankAccounts(updated);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                />
              </div>
              <div className="sm:col-span-4">
                <input
                  type="text"
                  placeholder="계좌번호"
                  value={acc.accountNumber}
                  onChange={(e) => {
                    const updated = [...bankAccounts];
                    updated[idx].accountNumber = e.target.value;
                    setBankAccounts(updated);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-mono font-bold"
                />
              </div>
              <div className="sm:col-span-2">
                <input
                  type="text"
                  placeholder="예금주"
                  value={acc.accountHolder}
                  onChange={(e) => {
                    const updated = [...bankAccounts];
                    updated[idx].accountHolder = e.target.value;
                    setBankAccounts(updated);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-[11px]"
                />
              </div>
              <div className="sm:col-span-1 text-right">
                <button
                  type="button"
                  onClick={() => handleRemoveAccount(acc.id)}
                  className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg"
                  title="삭제"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Worship Schedule Management */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-950" />
            5. 정기 예배 및 집회 시간표 편집
          </h3>
          <button
            type="button"
            onClick={handleAddWorship}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold text-xs border border-slate-200"
          >
            <Plus className="w-3.5 h-3.5" /> 예배 추가
          </button>
        </div>

        <div className="space-y-3">
          {worshipSchedule.map((item, idx) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid sm:grid-cols-12 gap-3 items-center"
            >
              <div className="sm:col-span-3">
                <input
                  type="text"
                  placeholder="예배명"
                  value={item.name}
                  onChange={(e) => {
                    const updated = [...worshipSchedule];
                    updated[idx].name = e.target.value;
                    setWorshipSchedule(updated);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-bold"
                />
              </div>
              <div className="sm:col-span-2">
                <input
                  type="text"
                  placeholder="요일 (주일 등)"
                  value={item.day}
                  onChange={(e) => {
                    const updated = [...worshipSchedule];
                    updated[idx].day = e.target.value;
                    setWorshipSchedule(updated);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                />
              </div>
              <div className="sm:col-span-2">
                <input
                  type="text"
                  placeholder="시간 (오전 11:00)"
                  value={item.time}
                  onChange={(e) => {
                    const updated = [...worshipSchedule];
                    updated[idx].time = e.target.value;
                    setWorshipSchedule(updated);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-mono font-bold"
                />
              </div>
              <div className="sm:col-span-2">
                <input
                  type="text"
                  placeholder="장소 (본당 3층 등)"
                  value={item.location}
                  onChange={(e) => {
                    const updated = [...worshipSchedule];
                    updated[idx].location = e.target.value;
                    setWorshipSchedule(updated);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                />
              </div>
              <div className="sm:col-span-2 flex items-center gap-2">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.isLive}
                    onChange={(e) => {
                      const updated = [...worshipSchedule];
                      updated[idx].isLive = e.target.checked;
                      setWorshipSchedule(updated);
                    }}
                    className="rounded text-red-600"
                  />
                  <span className="text-[11px] font-bold text-red-600">LIVE 생중계</span>
                </label>
              </div>
              <div className="sm:col-span-1 text-right">
                <button
                  type="button"
                  onClick={() => handleRemoveWorship(item.id)}
                  className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg"
                  title="삭제"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 bg-indigo-950 hover:bg-indigo-900 text-white rounded-xl font-bold text-sm shadow-xl transition-all"
        >
          <Save className="w-4 h-4" />
          모든 변경사항 저장 완료
        </button>
      </div>
    </form>
  );
};
