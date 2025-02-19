# Query Provider 이름 개선

## 개요

`Providers` 컴포넌트의 이름을 `QueryProvider`로 변경하여 컴포넌트의 실제 역할을 더 명확하게 표현했습니다.

## 변경 사항

### 1. 컴포넌트 이름 변경

- `Providers` → `QueryProvider`로 변경
- 인터페이스 이름도 `QueryProviderProps`로 일관성 있게 변경
- 실제 기능 변경 없음

### 2. 임포트 업데이트

- `app/_layout.tsx`의 임포트 구문 업데이트
- JSX 내 컴포넌트 사용 부분 업데이트

## 변경 이유

- 컴포넌트가 실제로는 Query 관련 설정만 담당하고 있어서, 이름을 더 구체적으로 변경
- `TamaguiProvider`와 같은 다른 Provider 컴포넌트들의 네이밍 패턴과 일치
- 불필요한 'Client' 키워드 제거로 간결성 향상

## 테스트

- 기존 쿼리 기능이 정상적으로 동작하는지 확인
- 개발 환경에서 React Query DevTools가 정상적으로 표시되는지 확인

## 관련 커밋

- refactor: rename QueryClientProvider to QueryProvider
- refactor: update QueryProvider imports
