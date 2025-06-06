## Summary

This PR merges changes from the `qa` branch that are not present in `main`. The updates include infrastructure improvements, enabling Firebase Crashlytics, and enabling all created components. Several files related to the chat feature were removed, and some configuration and provider files were updated. See below for details.

## PR 유형 및 세부 작업 내용

- [x] 빌드 부분 혹은 패키지 매니저 수정
- [x] 코드 리팩토링
- [x] 파일 혹은 폴더 삭제
- [x] 새로운 기능 추가
- [x] 주석 추가 및 수정
- [x] 문서 수정

### 주요 변경 파일 및 내용

- Removed chat-related files: `domains/chat/api/index.tsx`, `domains/chat/components/chat-message-item.tsx`, `domains/chat/components/chat-view.tsx`, `domains/chat/stories/chat-message-item.stories.tsx`, `domains/chat/stories/chat-view.stories.tsx`
- Added/updated providers: `domains/base/providers/crashlytics-provider.tsx`, `domains/base/providers/reactotron-provider.tsx`
- Updated configuration: `.storybook/preview.tsx`, `ReactotronConfig.js`, `app.config.js`, `app/(fallback)/_layout.tsx`, `app/(fallback)/index.tsx`, `app/_layout.tsx`, `lib/react-query.tsx`, `metro.config.js`, `mocks/mocking-provider.tsx`, `package.json`, `bun.lockb`
- Updated group detail page: `domains/group/pages/group-detail-page.tsx`

총 19 files changed, 93 insertions(+), 749 deletions(-)

### 커밋 메시지

- Merge pull request #42 from sleppy-navigators:infra/start-dev-server-on-tunneling-mode (Chan)
- infra: correct name of script to follow workflow name (Byeolchan Kim)
- infra: add start dev server script with tunneling mode (Byeolchan Kim)
- infra: enable firebase crashlytics (Byeolchan Kim)
- feat: enable all the created components (Byeolchan Kim)

<!--
추가로 필요한 항목이 있다면 아래 항목들 추가해주시면 됩니다~!

## test 완료 여부 (선택)

## 작동 스크린샷 (선택)

## 리뷰 요구사항 (선택)
-->
