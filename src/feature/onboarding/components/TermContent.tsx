import { FC } from 'react'; // React 19+에서 타입 추론이 강력해졌지만, FC로 명시해서 타입 안전성 강화

// terms 섹션 컴포넌트 – 스크롤 영역 포함
const TermsComponent: FC = () => (
  <div className='scrollbar-hide max-h-[80vh] overflow-y-auto'>
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-1'>
        <div className='typo-body-sm-bold leading-5 text-[#424349]'>
          이용약관 동의
        </div>
        <div className='typo-caption-sm-medium leading-[18px] text-[#747681]'>
          본 약관은 치이이즈(이하 &quot;회사&quot;)가 제공하는 웹 기반 사진 공유
          서비스(이하 &quot;서비스&quot;)의 이용과 관련하여 회사와 이용자 간의
          권리, 의무 및 책임 사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <div className='text-sm leading-5 font-bold text-[#424349]'>
          제1조 (서비스의 내용)
        </div>
        <div className='text-xs leading-[18px] font-normal text-[#747681]'>
          이 서비스는 사용자가 QR코드 또는 URL을 통해 웹페이지에 접속하여 사진을
          업로드하고, 다른 사용자와 함께 공유하며, 7일이 경과한 후 자동으로
          삭제되는 단기형 공유 앨범을 제공합니다. 본 서비스는 별도의
          애플리케이션 설치 없이 웹 환경에서 이용할 수 있습니다.
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <div className='text-sm leading-5 font-bold text-[#424349]'>
          제2조 (이용자의 의무)
        </div>
        <div className='text-xs leading-[18px] font-normal text-[#747681]'>
          이용자는 서비스를 이용함에 있어 다음 각 호의 행위를 하여서는 아니
          됩니다.
          <p>
            &nbsp;&nbsp;·&nbsp;&nbsp;타인의 개인정보를 무단으로 수집하거나
            부정하게 사용하는 행위
          </p>
          <p>
            &nbsp;&nbsp;·&nbsp;&nbsp;불법적이거나 사회질서에 반하는 내용의 사진
            또는 글을 게시하는 행위
          </p>
          <p>
            &nbsp;&nbsp;·&nbsp;&nbsp;회사 및 제3자의 저작권, 초상권 등 타인의
            권리를 침해하는 행위
          </p>
          <p>
            &nbsp;&nbsp;·&nbsp;&nbsp;본 서비스를 영리 목적 또는 부정한 목적으로
            이용하는 행위
          </p>
          <br />
          이용자는 본 서비스의 취지에 맞게 타인에게 불쾌감을 주거나 불법적인
          콘텐츠를 업로드하지 않아야 하며, 위반 시 이용이 제한될 수 있습니다.
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <div className='text-sm leading-5 font-bold text-[#424349]'>
          제3조 (서비스의 변경 및 중단)
        </div>
        <div className='text-xs leading-[18px] font-normal text-[#747681]'>
          회사는 서비스의 개선을 위하여 제공 중인 서비스의 전부 또는 일부를
          변경하거나 중단할 수 있습니다.
          <br />
          회사는 서비스 중단으로 발생하는 데이터 손실에 대하여 별도의 보상을
          하지 않으며, 이용자는 7일의 유효기간 내에 필요한 데이터를 직접
          저장해야 합니다.
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <div className='text-sm leading-5 font-bold text-[#424349]'>
          제4조 (면책)
        </div>
        <div className='text-xs leading-[18px] font-normal text-[#747681]'>
          회사는 천재지변, 시스템 장애, 통신 두절 등 불가항력적인 사유로 인한
          서비스 중단 및 데이터 손실에 대하여 책임을 지지 않습니다. 이용자가
          업로드한 모든 콘텐츠의 저작권 및 책임은 전적으로 해당 이용자에게
          있으며, 회사는 그 내용에 대해 일체의 책임을 지지 않습니다.
        </div>
      </div>
    </div>
  </div>
);

// privacy 섹션 컴포넌트 – 스크롤 영역 포함
const PrivacyComponent: FC = () => (
  <div className='scrollbar-hide max-h-[80vh] overflow-y-auto'>
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-1'>
        <div className='text-sm leading-5 font-bold text-[#424349]'>
          개인정보 수집 및 이용 동의
        </div>
        <div className='text-xs leading-[18px] font-normal text-[#747681]'>
          회사는 서비스 제공을 위하여 다음과 같은 개인정보를 수집하고
          이용합니다.
          <p>① 수집 항목</p>
          <p>
            &nbsp;&nbsp;·&nbsp;&nbsp;필수항목: 닉네임, 로그인 계정(카카오 등
            간편 로그인 정보),
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;업로드된 사진 및 메타데이터, 접속
            로그, 쿠키 등
          </p>
          <p>
            &nbsp;&nbsp;·&nbsp;&nbsp;선택항목: 이메일 주소(이벤트 및 알림
            수신용), 프로필 이미지
          </p>
          <br />
          <p>② 수집 및 이용 목적</p>
          <p>1. 서비스 이용자 식별 및 참여 관리</p>
          <p>2. 사진 업로드, 다운로드 등 주요 기능 제공</p>
          <p>3. 불법·비정상 이용행위 방지 및 보안 관리</p>
          <p>4. 서비스 개선, 이용 통계 및 분석</p>
          <br />
          <p>③ 보유 및 이용 기간</p>
          <p>
            &nbsp;&nbsp;·&nbsp;&nbsp;업로드된 사진 및 관련 데이터는
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;앨범 생성 시점으로부터 7일간 보관 후
            자동 삭제됩니다.
          </p>
          <p>
            &nbsp;&nbsp;·&nbsp;&nbsp;로그인 계정 정보 등 식별정보는 <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;회원 탈퇴 시 또는 이용 목적이 달성된
            후 즉시 파기됩니다.
          </p>
          <br />④ 이용자는 개인정보의 열람, 정정, 삭제를 요청할 수 있으며,
          회사는 관련 법령에 따라 이에 성실히 응합니다.
        </div>
      </div>
    </div>
  </div>
);

// thirdParty 섹션 컴포넌트 – 스크롤 영역 포함
const ThirdPartyComponent: FC = () => (
  <div className='scrollbar-hide max-h-[80vh] overflow-y-auto'>
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-1'>
        <div className='text-sm leading-5 font-bold text-[#424349]'>
          개인정보의 제3자 제공 동의
        </div>
        <div className='text-xs leading-[18px] font-normal text-[#747681]'>
          회사는 서비스의 안정적 운영과 기능 제공을 위하여, 이용자의 개인정보를
          아래와 같이 제3자에게 제공합니다. 회사는 정보통신망 이용촉진 및
          정보보호 등에 관한 법률 및 개인정보보호법 등 관련 법령을 준수하며,
          이용자의 개인정보를 목적 외로 제공하지 않습니다.
          <br />
          <br />
          회사는 이용자가 업로드한 사진과 관련 데이터를 안전하게 저장하고
          관리하기 위하여, 클라우드 서비스 제공업체인 네이버클라우드플랫폼(Naver
          Cloud Platform)에 일부 정보를 제공합니다. 네이버클라우드플랫폼은 서버
          저장, 백업, 데이터 관리 등의 목적으로만 해당 정보를 이용하며, 회사의
          지침에 따라 엄격하게 관리합니다. 제공되는 항목은 업로드된 사진, 앨범
          식별 코드, 업로드 시각 등 서비스 운영에 필요한 최소한의 데이터이며,
          해당 정보는 앨범 생성 시점으로부터 7일간 보관된 후 자동으로
          삭제됩니다.
          <br />
          <br />
          또한, 간편 로그인 기능 제공을 위해 카카오(주)에 로그인 계정
          정보(이메일, 닉네임 등)가 제공됩니다. 제공된 정보는 간편 로그인 및
          사용자 인증을 위한 용도로만 이용되며, 이용자가 탈퇴하거나 계정 연동을
          해제할 경우 즉시 삭제됩니다.
          <br />
          <br />
          서비스 품질 개선과 이용 통계 분석을 위해 Google Analytics에 접속 로그
          및 이용 패턴 등 익명화된 정보가 제공될 수 있습니다. 이러한 정보는
          개인을 식별할 수 없는 형태로 수집되며, 통계적 분석 목적으로만 사용된
          뒤 익명화 후 6개월간 보관됩니다.
          <br />
          <br />
          회사는 위의 목적 외에는 이용자의 개인정보를 제3자에게 제공하지 않으며,
          새로운 제휴 또는 제공이 필요한 경우 이용자에게 사전 고지 후 별도의
          동의를 받습니다.
        </div>
      </div>
    </div>
  </div>
);

// marketing 섹션 컴포넌트 – 스크롤 영역 포함
const MarketingComponent: FC = () => (
  <div className='scrollbar-hide max-h-[80vh] overflow-y-auto'>
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-1'>
        <div className='text-sm leading-5 font-bold text-[#424349]'>
          마케팅 정보 수신 동의
        </div>
        <div className='text-xs leading-[18px] font-normal text-[#747681]'>
          회사는 이벤트, 신규 서비스, 프로모션 등 유용한 정보를 이메일,
          문자메시지, 카카오 알림톡 등의 방법으로 발송할 수 있습니다.
          <br /> 이용자는 마케팅 정보 수신에 동의하지 않아도 기본 서비스 이용에
          제한이 없습니다.
          <br /> 마케팅 정보의 수신 동의는 언제든 설정 메뉴 또는 수신 거부
          링크를 통해 철회할 수 있습니다.
        </div>
      </div>
    </div>
  </div>
);

// termContent 객체 – 모든 content가 컴포넌트로 변환됨
export const TermContent = {
  terms: {
    title: '이용약관 동의',
    content: TermsComponent,
  },
  privacy: {
    title: '개인정보 수집 및 이용 동의',
    content: PrivacyComponent,
  },
  thirdParty: {
    title: '개인정보의 제3자 제공 동의',
    content: ThirdPartyComponent,
  },
  marketing: {
    title: '마케팅 정보 수신 동의',
    content: MarketingComponent,
  },
};
