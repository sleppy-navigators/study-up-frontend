# 전역 에러 처리 구현

## 개요

에러 발생 시 앱의 상태를 안전하게 복구하고 사용자에게 적절한 피드백을 제공하는 기능을 구현했습니다.

## 주요 변경사항

### 1. 에러 복구 로직 개선

- 에러 복구 훅 이름을 `useHandleReset`에서 `useRecoverFromError`로 변경하여 목적을 명확히 함
- 각 에러 타입별 복구 전략(캐시, 인증, 네비게이션)을 명확하게 정의
- 불필요한 코드와 import 정리

### 2. 에러 바운더리 구조 개선

- Expo Router의 기본 에러 바운더리를 활용하도록 변경
- 중복된 `ErrorBoundaryProvider` 제거
- 에러 복구 흐름을 단순화하고 명확하게 개선

### 3. 네비게이션 전략 구현

- 에러 상황별 적절한 네비게이션 처리 추가
  - 인증 에러: 로그인 페이지로 이동
  - 권한/잘못된 요청 에러: 홈 페이지로 이동

## 커밋 히스토리

- ec69a76: feat: navigate to home for error recovery
- 1eb124c: feat: navigate to home page on bad request error
- 8ea6d41: refactor: remove ErrorProvider and SuspenseProvider
- ef85dc4: refactor: replace constant with env
- caba411: refactor: improve error recovery flow
- 22f71ef: refactor: remove ErrorBoundaryProvider in favor of Expo Router's ErrorBoundary
- 94a096d: refactor: rename error recovery hook for clarity
- 0b04185: feat: customize query cache, auth, navigation based on error types

## 테스트 방법

1. 인증이 필요한 API 호출 시 401 에러 발생

   - 로그인 페이지로 이동하는지 확인
   - 캐시와 인증 정보가 초기화되는지 확인

2. 권한이 없는 API 호출 시 403 에러 발생

   - 홈 페이지로 이동하는지 확인
   - 캐시와 인증 정보가 초기화되는지 확인

3. 잘못된 요청 시 400 에러 발생
   - 홈 페이지로 이동하는지 확인
   - 적절한 에러 메시지가 표시되는지 확인

## 관련 이슈

- #xxx 전역 에러 처리 구현
- #xxx 에러 복구 전략 개선
