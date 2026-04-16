# Rangistein CMS 운영 흐름

## 게시물 작성

1. `/admin/index.html` 접속
2. GitHub 로그인
3. 게시물 컬렉션 선택
4. 새 글 작성 또는 기존 글 수정
5. 저장

## 저장 후 반영 흐름

1. Decap CMS가 GitHub `main` 브랜치에 반영
2. Cloudflare Pages가 변경 감지
3. 자동 배포 진행
4. 공개 사이트에 반영

## 게시 전 권장 사항

- 초안은 `draft: true`
- 대표 글은 `featured: true`
- 수정 시 `updatedAt` 갱신
- 참고 자료가 있으면 `references` 추가

## 운영 중 점검 항목

- 홈 노출 여부
- 카테고리 페이지 노출 여부
- 태그 페이지 연결 여부
- 게시물 상세 렌더링 여부
- 배포 성공 여부
