'use client';
import React from 'react';
import { ChevronRight, Check } from 'lucide-react';
import Link from 'next/link';

interface AgreementItem {
  id: string;
  label: string;
  required: boolean;
}

const agreementItems: AgreementItem[] = [
  { id: 'terms', label: '[필수] 이용약관 동의', required: true },
  { id: 'privacy', label: '[필수] 개인정보 수집 및 이용 동의', required: true },
  {
    id: 'thirdParty',
    label: '[필수] 개인정보의 제3자 제공 동의',
    required: true,
  },
  { id: 'marketing', label: '[선택] 마케팅 정보 수신 동의', required: false },
];

interface ProfileAgreeProps {
  agreements: Record<string, boolean>;
  onAgreementsChange: (agreements: Record<string, boolean>) => void;
}

export const ProfileAgree = ({
  agreements,
  onAgreementsChange,
}: ProfileAgreeProps) => {
  const allAgreed = agreementItems.every((item) => agreements[item.id]);

  const handleAllAgree = () => {
    const newValue = !allAgreed;
    const newAgreements = {
      terms: newValue,
      privacy: newValue,
      thirdParty: newValue,
      marketing: newValue,
    };
    onAgreementsChange(newAgreements);
  };

  const handleIndividualAgree = (id: string) => {
    const newAgreements = {
      ...agreements,
      [id]: !agreements[id],
    };
    onAgreementsChange(newAgreements);
  };

  return (
    <div className='flex flex-col items-start gap-4 w-full max-w-[430px] mx-auto px-1 mt-8'>
      <div className='flex py-4 px-2 w-full items-start gap-3 border-b border-divider-gray'>
        <button
          onClick={handleAllAgree}
          className='w-6 h-6'
          type='button'
          aria-label='전체 동의하기'
        >
          <div
            className={`w-6 h-6 rounded-full border ${allAgreed ? 'border-none bg-element-primary' : 'border-border-gray-light'} flex items-center justify-center`}
          >
            {allAgreed && <Check size={16} strokeWidth={2.5} color='#424349' />}
          </div>
        </button>
        <div className='text-body-lg-bold leading-6 text-text-subtle'>
          전체 동의하기
        </div>
      </div>

      <div className='flex flex-col items-start gap-4 self-stretch'>
        {agreementItems.map((item) => (
          <div
            key={item.id}
            className='flex w-full px-2 sm:px-1.5 xs:px-1 justify-between items-center'
          >
            <div className='flex items-center gap-2 xs:gap-1.5'>
              <button
                onClick={() => handleIndividualAgree(item.id)}
                className='flex-shrink-0'
                type='button'
                aria-label={item.label}
              >
                <Check
                  size={16}
                  strokeWidth={2.5}
                  color={agreements[item.id] ? '#996300' : '#c9cacf'}
                />
              </button>
              <span className='text-15-400 sm:text-14-400 xs:text-13-400 leading-6 xs:leading-5 text-text-subtler'>
                {item.label}
              </span>
            </div>
            <Link
              href={`/onboarding?term=${item.id}`}
              className='w-6 h-6 flex-shrink-0 relative flex items-center justify-center'
              aria-label={`${item.label} 상세보기`}
            >
              <ChevronRight size={14} strokeWidth={2} color='#94969E' />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
