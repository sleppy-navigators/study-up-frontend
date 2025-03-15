# 에러 복구 시 type-safe 네비게이션 구현

## 개요

에러 복구 시 네비게이션 처리에 expo-router의 Route 타입을 적용하여 타입 안전성을 개선했습니다.

## 주요 변경사항

### 1. expo-router Route 타입 적용

- `ResetOptions`의 `navigationTarget` 타입을 string에서 expo-router의 Route 타입으로 변경
- 타입 안전성 확보로 잘못된 경로 지정 방지
- 자동 완성 지원으로 개발 편의성 향상

### 2. 타입 캐스팅 제거

- `useRecoverFromError` 훅에서 불필요한 타입 캐스팅 제거
- 타입 시스템을 통한 경로 유효성 검증

## 기대효과

- 잘못된 경로로의 네비게이션 시도를 컴파일 타임에 방지
- 리팩토링 시 경로 변경에 대한 안전성 확보
- 개발자 경험 개선 (자동 완성, 타입 체크)

## 커밋 히스토리

- a6630ed: feat: configure navigation targets for errors
- a7ae066: feat: add navigation target support to error recovery

## 테스트 방법

1. 타입 체크

   - 잘못된 경로를 `navigationTarget`으로 지정할 경우 타입 에러 발생 확인
   - 올바른 경로 지정 시 타입 에러 없음 확인

2. 기능 테스트
   - UnauthorizedError 발생 시 `/login` 페이지로 이동
   - ForbiddenError 발생 시 `/` 페이지로 이동
   - BadRequestError 발생 시 `/` 페이지로 이동
