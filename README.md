# 🧀 치이이즈 : 딱 7일만 열리는 특별한 공유 앨범 서비스

> 🔗 서비스 링크: [https://say-cheese.me](https://say-cheese.me)

![웹 썸네일](https://github.com/user-attachments/assets/f5a6c97a-21b9-4dff-a7b7-8c12fe6e27db)

## 🧑‍🤝‍🧑 Frontend Members

|                                                     **김규태**                                                      |                                                     **김건우**                                                      |
| :-----------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: |
| <a href="https://github.com/dasosann"><img src="https://avatars.githubusercontent.com/u/183822817?v=4" width="150"> | <a href="https://github.com/caseBread"><img src="https://avatars.githubusercontent.com/u/92029332?v=4" width="150"> |
|                                                     `frontend`                                                      |                                                     `frontend`                                                      |

## 🏛️ System Architecture

<img width="3812" height="2232" alt="image" src="https://github.com/user-attachments/assets/2f90fde1-3a95-4ed9-8720-009bd289c829" />

## 🛠️ 기술 스택

- Language & Framework
  - Next.js 15
  - React
  - TypeScript

- State & Data Management
  - Zustand
  - TanStack Query

- UI Utilities
  - Tailwind CSS
  - shadcn/ui
  - Framer Motion
  - Lucide Icons

- Testing
  - Vitest

- CI/CD
  - GitHub Actions

## 📂 폴더 구조

```csharp
src
├── app                            # 🌐 Next.js App Router (페이지 엔트리)
│
├── components
│   └── ui                         # 🎨 공통 UI 컴포넌트 (shadcn 기반)
│
├── feature                        # 📦 도메인 단위 기능 모듈 (components, hooks, utils, svg, constants 폴더로 구성)
│   ├── album                      # 📸 앨범 도메인
│   │   ├── 4cut                   # 🎞️ 치즈네컷 생성 / 렌더링
│   │   ├── detail                 # 🖼️ 앨범 상세 화면
│   │   └── qrcode                 # 🔳 앨범 QR 코드 생성
│   ├── album-entry                # 🚪 앨범 입장 플로우
│   ├── album-select               # 📂 앨범 선택 화면
│   ├── create-album               # 📝 앨범 생성
│   ├── login                      # 🔐 로그인 / 인증 플로우
│   ├── main                       # 🏠 메인 화면
│   ├── mypage                     # 🙋‍♂️ 마이페이지
│   ├── onboarding                 # 🎉 온보딩
│   ├── photo-detail               # 🖼️ 사진 상세
│   ├── photo-entry                # 📥 사진 업로드 입장
│   ├── root                       # 🌳 랜딩페이지
│   ├── term                       # 📄 약관
│   └── upload                     # ⬆️ 사진 업로드
│
├── global                         # 🌍 전역 설정 / 공통 모듈
│   ├── api                        # 🔗 API 클라이언트 / 엔드포인트
│   ├── components                 # 🧩 글로벌 공통 컴포넌트
│   ├── constants                  # 🧱 상수
│   ├── context                    # ⚛️ 컨텍스트 프로바이더
│   ├── hooks                      # 🪝 공용 Hooks
│   ├── svg                        # 🖼️ SVG 에셋
│   ├── types                      # 🧾 타입 정의
│   └── utils                      # 🔧 공용 유틸리티 함수
│
└── store                          # 🗂️ Zustand 스토어

```

## 💬 Commit Convention

### {이슈Type} : 커밋내용

ex. feat : 앨범나가기 버튼추가

| Type       | 내용                                |
| ---------- | ----------------------------------- |
| `feat`     | 새로운 기능 구현                    |
| `chore`    | 부수적인 코드 수정 및 기타 변경사항 |
| `docs`     | 문서 추가 및 수정, 삭제             |
| `fix`      | 버그 수정                           |
| `test`     | 테스트 코드 추가 및 수정, 삭제      |
| `refactor` | 코드 리팩토링                       |
