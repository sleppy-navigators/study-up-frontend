# 인증 및 에러 처리 시스템 구현

## 변경 사항 요약

인증 시스템과 에러 처리 시스템의 기본 구조를 구현했습니다.

### 1. 기본 설정

- ✅ API 응답 타입 정의 (`lib/api/client.ts`)
- ✅ 에러 타입 정의 및 세분화 (`lib/errors/http.ts`)
- ✅ SecureStore 래퍼 구현 (`lib/auth/storage.ts`)
- ✅ Jotai atom 구현 (`lib/auth/store.ts`)

### 2. API 클라이언트 (`lib/api/client.ts`)

- ✅ ky 인스턴스 기본 설정
- ✅ 토큰 주입 인터셉터
- ✅ 에러 변환 인터셉터
- ✅ 재시도 로직 구현

### 3. 인증 로직

- ✅ 토큰 갱신 로직 (`lib/api/client.ts`)
- ✅ 로그아웃 처리 (`lib/firebase.ts`)
- ✅ Google 로그인 통합 (`hooks/useGoogleSignIn.ts`)

### 4. 에러 처리

- ✅ 에러 클래스 구현 (`lib/errors/http.ts`)
- ✅ ErrorFallback 컴포넌트 구현 (`components/ErrorFallback.tsx`)
- ✅ 글로벌 ErrorBoundary 설정 (`app/_layout.tsx`)

## 주요 변경 파일

```
lib/
├── api/
│   └── client.ts
├── auth/
│   ├── storage.ts
│   └── store.ts
├── errors/
│   └── http.ts
└── firebase.ts

components/
└── ErrorFallback.tsx

hooks/
└── useGoogleSignIn.ts

app/
└── _layout.tsx
```

## 테스트 필요 사항

1. Google 로그인 플로우

   - 로그인 성공 시 토큰 저장
   - 채팅 화면으로 리다이렉트

2. 토큰 갱신

   - 401 응답 시 자동 갱신
   - 갱신 실패 시 로그아웃

3. 에러 처리
   - 각 에러 타입별 UI 표시
   - 에러 복구 동작 확인

## 남은 작업

1. 테스트 코드 작성
2. 에러 로깅 시스템 연동
3. 토큰 만료 시간 관리

## Breaking Changes

없음

## 관련 이슈

- #인증*시스템*구현
- #에러*처리*구현
