<<<<<<< HEAD
# 랑이슈타인 (Rangistein)

과학 이론, 최신 동향, 논문 요약, 개인 학습 기록을 정리하는 개인 과학 웹 아카이브

## 프로젝트 소개

**랑이슈타인**은 수학, 물리, 화학, 생명과학, 지구과학, 천문학 등 기초 과학 분야를 중심으로  
이론 정리, 최신 동향 소개, 논문 요약, 개인 학습 노트를 기록하는 개인 웹 사이트입니다.

이 프로젝트는 단순한 정보 수집형 블로그가 아니라, 다음 목적을 함께 지향합니다.

- 과학 관련 지식을 체계적으로 정리하는 개인 아카이브
- 개인 학습 기록과 해설을 함께 제공하는 지식형 웹 사이트
- 기획, 개발, 운영 역량을 보여줄 수 있는 포트폴리오
- 무료 배포 환경을 활용한 지속 가능한 개인 프로젝트

## 프로젝트 목표

### 서비스 목표
- 과학 콘텐츠를 분야별로 체계적으로 정리할 수 있는 웹 아카이브 구축
- 이론 설명, 논문 요약, 최신 동향, 개인 공부 기록을 하나의 구조 안에서 제공
- 신뢰도 있는 출처 기반 콘텐츠 운영
- 개인 포트폴리오로 활용 가능한 구조와 운영 기록 확보

### 기술 목표
- 정적 사이트 기반 웹 페이지 구현
- Cloudflare Pages를 통한 무료 배포 환경 구성
- Decap CMS를 통한 관리자 전용 글 작성 및 관리 기능 구성
- 향후 검색, 태그, 시리즈, 서버리스 기능 확장이 가능한 구조 설계

## 주요 콘텐츠 범위

### 1차 핵심 범위
- 수학
- 물리
- 화학
- 생명과학
- 지구과학
- 천문학

### 2차 확장 범위
- 컴퓨터 과학
- 기계공학
- 로켓공학
- 생명공학
- 건축학
- 의학
- 기타 과학 및 공학 응용 분야

## 핵심 기능

### MVP 기준 기능
- 홈 페이지
- 소개 페이지
- 카테고리별 글 목록
- 게시글 상세 페이지
- 태그 분류
- 관리자 전용 글 업로드 환경
- 반응형 UI
- 기본 SEO 메타 정보 적용

### 확장 예정 기능
- 검색 기능
- 시리즈/연재 기능
- 관련 글 추천
- 최신 글/인기 글 섹션
- 논문/참고자료 정리 템플릿
- 서버리스 기반 부가 기능

## 콘텐츠 운영 원칙

- 모든 글은 출처를 명시합니다.
- 논문 및 기사 내용은 원문 복제가 아니라 요약과 해설 중심으로 작성합니다.
- 확인된 사실과 개인 의견 또는 해석을 구분하여 작성합니다.
- 학습 기록은 개인 공부 노트 성격임을 명확히 표시합니다.
- 최신 동향 콘텐츠에는 작성일 또는 업데이트일을 표시합니다.

## 테크 스택

### Frontend / Static Site
- **Astro**
  - 정적 사이트 생성(SSG) 중심의 프레임워크
  - 빠른 성능과 콘텐츠 중심 구조에 적합
  - 향후 확장성과 유지보수 측면에서 유리

### Styling
- **CSS / SCSS**
  - 초기에는 단순하고 유지보수 쉬운 스타일 구조 우선
- **Tailwind CSS**
  - 필요 시 빠른 UI 개발과 일관된 디자인 시스템 구성에 활용 가능

### Content Management
- **Decap CMS**
  - 관리자 전용 웹 UI에서 게시글 작성 및 수정 가능
  - Git 기반 콘텐츠 관리
  - Markdown 중심 운영에 적합

### Deployment / Hosting
- **Cloudflare Pages**
  - 정적 사이트 무료 배포
  - GitHub 연동 자동 배포
  - 빠른 글로벌 캐시 제공

### Repository / Version Control
- **Git**
- **GitHub**
  - 소스 코드 및 콘텐츠 버전 관리
  - 개인 프로젝트 운영 및 포트폴리오 공개에 활용

### Content Format
- **Markdown / MDX**
  - 게시글 작성
  - 과학 개념 설명, 논문 요약, 학습 노트 작성에 적합

### SEO / Metadata
- 메타 태그
- Open Graph
- sitemap
- robots.txt
- 카테고리/태그 기반 구조화

### Optional / Future
- **Cloudflare Functions / Workers**
  - 서버리스 기능 확장 시 활용
- **Search Integration**
  - 로컬 검색 또는 외부 검색 서비스 검토
- **Analytics**
  - Cloudflare Web Analytics 또는 대체 무료 분석 도구 검토

## 예상 디렉토리 구조

~~~text
rangistein/
├─ public/
│  ├─ images/
│  ├─ favicon/
│  └─ admin/
├─ src/
│  ├─ components/
│  ├─ layouts/
│  ├─ pages/
│  ├─ styles/
│  └─ content/
│     ├─ math/
│     ├─ physics/
│     ├─ chemistry/
│     ├─ biology/
│     ├─ earth-science/
│     ├─ astronomy/
│     └─ study-notes/
├─ content/
│  └─ posts/
├─ .github/
│  └─ workflows/
├─ docs/
├─ package.json
├─ astro.config.mjs
└─ README.md
~~~

## 개발 환경

### 요구 사항
- Node.js LTS
- npm 또는 pnpm
- Git
- GitHub 계정
- Cloudflare 계정

### 로컬 개발
~~~bash
npm install
npm run dev
~~~

### 빌드
~~~bash
npm run build
~~~

### 미리보기
~~~bash
npm run preview
~~~

## 배포 방식

이 프로젝트는 로컬 서버를 상시 실행하는 방식이 아니라,  
정적 파일을 빌드한 뒤 **Cloudflare Pages**에 배포하는 방식으로 운영합니다.

즉,

- 개발 중에는 로컬에서 실행
- 배포 후에는 별도 서버 실행 없이 공개 URL로 접속 가능
- 관리자 글 작성은 Decap CMS를 통해 Git 기반으로 반영
- 콘텐츠 수정 시 빌드 및 배포가 다시 실행되어 사이트에 반영

## 관리자 운영 방식

- 방문자 로그인 기능은 제공하지 않음
- 관리자 권한은 사이트 운영자 1인 기준으로 설계
- 게시글 작성 및 수정은 Decap CMS를 사용
- 콘텐츠는 Git 저장소에 기록되어 변경 이력 관리 가능

## 개발 로드맵

### Phase 1. 기획 및 구조 설계
#### 목표
프로젝트의 정체성, 정보 구조, 기술 스택, 콘텐츠 운영 원칙을 확정합니다.

#### 작업 항목
- 프로젝트명 및 브랜딩 확정
- 서비스 목적 및 핵심 사용자 경험 정의
- 사이트 메뉴 구조 설계
- 콘텐츠 카테고리 체계 확정
- 게시글 템플릿 정의
- 태그 및 분류 기준 설계
- 포트폴리오 반영 방식 정의
- 개발 스택 최종 선택
- 배포 및 운영 방식 검토

#### 산출물
- 프로젝트 기획서
- README 초안
- 정보 구조(IA) 문서
- MVP 기능 목록

---

### Phase 2. UI/UX 초안 설계
#### 목표
정적 사이트의 기본 화면 구조와 사용자 흐름을 정의합니다.

#### 작업 항목
- 홈 화면 와이어프레임 설계
- 소개 페이지 구조 설계
- 카테고리 목록 페이지 설계
- 게시글 상세 페이지 레이아웃 설계
- 태그 및 시리즈 구조 설계
- 헤더, 푸터, 네비게이션 설계
- 반응형 화면 정책 수립
- 다크 모드 적용 여부 검토
- 읽기 중심 UI 원칙 수립

#### 산출물
- 와이어프레임
- 공통 레이아웃 설계안
- 컬러 및 타이포그래피 방향 초안

---

### Phase 3. 프로젝트 초기 세팅
#### 목표
실제 개발 가능한 저장소 및 기본 개발 환경을 구성합니다.

#### 작업 항목
- GitHub 저장소 생성
- Astro 프로젝트 초기화
- 디렉토리 구조 정리
- 공통 레이아웃 파일 생성
- 글로벌 스타일 적용
- 기본 페이지 템플릿 생성
- 정적 자산 구조 정리
- 코드 스타일 도구 검토
- README 정리
- 초기 배포 연결 준비

#### 산출물
- 초기 프로젝트 저장소
- 실행 가능한 기본 사이트
- 공통 레이아웃 및 스타일 구조

---

### Phase 4. MVP 화면 구현
#### 목표
핵심 사용자 흐름이 가능한 최소 기능의 사이트를 구현합니다.

#### 작업 항목
- 홈 페이지 구현
- 소개 페이지 구현
- 카테고리별 목록 페이지 구현
- 게시글 상세 페이지 구현
- 태그 표시 구조 구현
- 공통 카드 UI 구현
- 반응형 네비게이션 구현
- SEO 기본 메타 태그 적용
- Open Graph 기본 설정
- 404 페이지 구성

#### 산출물
- 브라우저에서 탐색 가능한 정적 사이트 MVP
- 카테고리 및 게시글 이동이 가능한 기본 구조

---

### Phase 5. 콘텐츠 시스템 구축
#### 목표
실제 글을 작성하고 분류할 수 있는 콘텐츠 구조를 완성합니다.

#### 작업 항목
- Markdown 또는 MDX 기반 게시글 구조 확정
- frontmatter 스키마 정의
  - title
  - description
  - category
  - tags
  - publishedDate
  - updatedDate
  - draft
  - references
- 카테고리별 게시글 저장 규칙 정리
- 태그 및 시리즈 데이터 구조 설계
- 참고문헌 및 출처 표기 형식 정의
- 논문 요약 템플릿 설계
- 학습 노트 템플릿 설계
- 최신 동향 게시글 템플릿 설계

#### 산출물
- 게시글 템플릿
- 샘플 콘텐츠
- 콘텐츠 작성 규칙 문서

---

### Phase 6. Decap CMS 연동
#### 목표
운영자가 웹에서 글을 작성 및 수정할 수 있는 관리자 환경을 구성합니다.

#### 작업 항목
- Decap CMS 설정 파일 작성
- 컬렉션 구조 설계
- 관리자 경로 구성
- Git 연동 확인
- 게시글 생성, 수정, 삭제 테스트
- 이미지 업로드 정책 설정
- 드래프트 처리 방식 검토
- 콘텐츠 저장 위치 확정
- 필드 검증 구조 확인

#### 산출물
- 관리자용 CMS 페이지
- 실제 게시글 생성이 가능한 콘텐츠 관리 환경

---

### Phase 7. Cloudflare Pages 배포
#### 목표
무료 배포 환경에 사이트를 연결하고 실서비스 접근이 가능하도록 합니다.

#### 작업 항목
- GitHub 저장소와 Cloudflare Pages 연결
- 빌드 명령 및 출력 디렉토리 설정
- 자동 배포 확인
- 프리뷰 배포 확인
- 사용자 정의 도메인 적용 여부 검토
- 캐시 반영 확인
- 기본 robots.txt 및 sitemap 구성
- 환경 설정 문서화

#### 산출물
- 공개 배포 URL
- Git 기반 자동 배포 환경

---

### Phase 8. 기본 보안 및 운영 점검
#### 목표
개인 운영 사이트 기준의 최소 보안 및 운영 안정성을 확보합니다.

#### 작업 항목
- 관리자 접근 경로 점검
- GitHub 권한 점검
- CMS 설정 검토
- 공개 저장소 운영 범위 점검
- 민감 정보 노출 여부 점검
- 이미지 및 콘텐츠 업로드 정책 점검
- 배포 설정 검토
- 기본 SEO 상태 확인
- 링크 깨짐 및 메타 정보 점검

#### 산출물
- 운영 체크리스트
- 보안 점검 체크리스트

---

### Phase 9. 초기 콘텐츠 작성
#### 목표
사이트가 실제 포트폴리오 및 지식 아카이브로 보일 수 있도록 핵심 콘텐츠를 축적합니다.

#### 작업 항목
- 카테고리별 대표 글 작성
- 자기소개 및 사이트 소개 보강
- 공부 노트 샘플 작성
- 논문 요약 샘플 작성
- 최신 동향 소개 글 작성
- 출처 표기 일관성 검토
- 문체 및 페이지 구성 통일
- 카테고리별 최소 게시글 수 확보

#### 추천 초기 콘텐츠 예시
- 수학: 기초 개념 정리 1~2편
- 물리: 대표 개념 설명 1~2편
- 화학: 기본 이론 요약 1편
- 생명과학: 핵심 개념 정리 1편
- 천문학: 최근 흥미 주제 1편
- 공부 노트: 개인 학습 기록 2편
- 논문 요약: 1~2편

#### 산출물
- 실제 방문자가 읽을 수 있는 초기 콘텐츠 세트

---

### Phase 10. 고도화 1차
#### 목표
콘텐츠 탐색성과 완성도를 높입니다.

#### 작업 항목
- 검색 기능 도입 검토
- 관련 글 추천 구조 구현
- 시리즈 및 연재 구조 추가
- 최신 글 목록 개선
- 태그 페이지 고도화
- 목차 기능 추가
- 코드, 수식, 인용 스타일 개선
- 논문 및 참고자료 박스 UI 추가

#### 산출물
- 탐색성 개선
- 콘텐츠 연결성 강화

---

### Phase 11. 고도화 2차
#### 목표
포트폴리오와 운영 효율 측면을 강화합니다.

#### 작업 항목
- 프로젝트 소개 페이지 고도화
- 아키텍처 및 기술 선택 이유 문서화
- 작성 규칙 및 운영 정책 문서화
- 성능 최적화
- 접근성 점검
- 애널리틱스 연동 검토
- RSS 또는 뉴스레터 구조 검토
- 서버리스 기능 도입 여부 검토

#### 산출물
- 포트폴리오 완성도 향상
- 운영 문서 정리
- 장기 확장 기반 확보

## 향후 확장 아이디어

- 수식 렌더링 지원
- 논문 DOI 및 참고문헌 카드 자동화
- 카테고리별 추천 글 큐레이션
- 과학사 및 과학자 소개 섹션
- 이미지, 도표, 시각화 자료 확장
- 실험 기록 또는 프로젝트 로그 섹션
- 과학 뉴스 요약 아카이브
- 개인 연구 및 개발 포트폴리오 연동

## 프로젝트 지향점

랑이슈타인은 단순히 글을 모아두는 웹 사이트가 아니라,  
과학을 꾸준히 공부하고 정리하며 기록하는 과정 자체를 보여주는 개인 아카이브이자 포트폴리오를 지향합니다.

이 프로젝트를 통해 다음을 함께 달성하고자 합니다.

- 과학 콘텐츠의 구조적 정리
- 학습 기록의 축적
- 웹 개발 및 운영 경험의 축적
- 장기적으로 확장 가능한 개인 브랜드 구축

## License

이 저장소의 소스코드는 Apache License 2.0을 따릅니다.

단, 별도 명시가 없는 한 글 콘텐츠, 공부 노트, 논문 요약문, 문서, 이미지,
로고, 일러스트, 프로젝트명, 기타 브랜드 식별 요소는 Apache License 2.0의
적용 대상이 아닙니다.

비코드 콘텐츠 및 브랜드 자산의 권리는 별도 라이선스가 명시되지 않는 한
저작권자에게 있습니다.
=======
# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
>>>>>>> 9cb63dd ("Initial commit from Astro")
