## Summary

바운티 시스템 UI를 구현하고 베이스 UI 컴포넌트를 추가하였습니다. 또한 Tamagui 설정을 최적화하고 네비게이션 구조를 개선하였습니다.

연관된 이슈: #16

## PR 유형 및 세부 작업 내용

- [x] 새로운 기능 추가
- [x] CSS 등 사용자 UI 디자인 변경
- [x] 코드 리팩토링

### 세부 내용

#### 1. 바운티 시스템 UI 구현

- 바운티 헤더 컴포넌트 추가 (`bounty/components/bounty-header.tsx`)
- 바운티 아이템 및 태스크 컴포넌트 구현
  - 바운티 아이템 (`bounty/components/bounty-item.tsx`)
  - 태스크 아이템 (`bounty/components/task-item.tsx`)
  - 태스크 섹션 (`bounty/components/task-section.tsx`)
- 바운티 관련 상수 및 유틸리티 추가
  - 바운티 상수 정의 (`bounty/constants/bounty-constants.ts`)
  - 통화 포맷 유틸리티 (`bounty/utils/format-currency.ts`)
- 바운티 페이지 레이아웃 구성 (`bounty/pages/bounty-page.tsx`)
- 바운티 커스텀 훅 구현 (`bounty/hooks/use-bounty.ts`)

#### 2. 베이스 UI 컴포넌트 구현

- Bottom Navigation 컴포넌트 추가 (`base/components/bottom-navigation.tsx`)
- 헤더 컴포넌트 구현 (`base/components/header.tsx`)
- List 관련 컴포넌트 추가
  - List Item (`base/components/list-item.tsx`)
  - List Section (`base/components/list-section.tsx`)

#### 3. 네비게이션 및 레이아웃 개선

- Bounty 페이지 네비게이션 링크 추가
- Chat 컴포넌트 임시 비활성화 (추후 재구현 예정)
- 컬러 스킴 주입 방식 개선

#### 4. Tamagui 설정 최적화

- 누락된 설정 옵션 추가
- 버그 최소화를 위한 버전 업그레이드
- 설정 패키지 분리 및 구조화

## 테스트 완료 여부

- [x] 바운티 목록 UI 렌더링 테스트
- [x] 태스크 목록 UI 렌더링 테스트
- [x] 바운티 생성 플로우 테스트
- [x] 베이스 컴포넌트 재사용성 테스트
- [x] 네비게이션 동작 테스트
- [x] Tamagui 테마 적용 테스트

## 작동 스크린샷

[스크린샷 추가 예정]

## 리뷰 요구사항

1. 바운티 시스템 UI가 디자인 가이드라인을 잘 따르는지 검토 부탁드립니다.
2. 베이스 UI 컴포넌트의 재사용성과 확장성이 적절한지 확인 부탁드립니다.
3. Tamagui 설정 변경이 기존 컴포넌트에 영향을 주지 않는지 확인 부탁드립니다.
4. 네비게이션 구조가 앱의 전체적인 UX와 잘 어울리는지 검토 부탁드립니다.
