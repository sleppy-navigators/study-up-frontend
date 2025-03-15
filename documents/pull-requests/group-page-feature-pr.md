## Summary

그룹 생성 페이지를 구현하였습니다. 그리고 `<Text/>` component에 Pretnedard 가변 폰트를 적용하였고, 공통해더를 구현하였습니다. PR 및 이슈 템플릿 등 문서도 추가했습니다.

## PR 유형 및 세부 작업 내용

- [x] 새로운 기능 추가
- [x] CSS 등 사용자 UI 디자인 변경
- [x] 코드 리팩토링
- [x] 문서 수정
- [x] 빌드 부분 혹은 패키지 매니저 수정

### 세부 내용

#### 1. 그룹 페이지 기능 구현

- 그룹 생성 페이지 (`group/pages/create-group-page.tsx`) 구현
- 그룹 초대 플로우 구현
  - 초대 링크 생성 및 공유 모달 (`group/components/invitation-link-modal.tsx`)
  - 초대 조회 페이지 (`group/pages/invitation-view-page.tsx`)
  - 초대 성공 모달 (`group/components/invitation-success-modal.tsx`)
- 그룹 상세 페이지 확장 (`group/pages/group-detail-page.tsx`)

#### 2. 폰트 시스템 개선

- Pretendard 가변 폰트 추가 및 설정
- Tamagui 설정 업데이트로 폰트 적용
- 다양한 텍스트 크기에 대한 라인 높이 최적화

#### 3. 공통 헤더 구현

- 경로 기반 자동화 헤더 구현
- 불필요한 중복 헤더 제거 및 리팩토링
- SafeAreaView 적용으로 적절한 패딩 처리

#### 4. 문서 및 템플릿 추가

- PR 템플릿 추가 (`documents/samples/pull-request-template.md`)
- 이슈 템플릿 추가 (버그 리포트, 기능 요청)
- 그룹 초대 플로우 디자인 문서 작성

#### 5. 기타 개선 사항

- StatusBar를 색상 스키마에 반응하도록 개선
- 토스트 컴포넌트 추가
- SafeAreaProvider를 RootLayout에 추가

## 테스트 완료 여부

- [x] 그룹 생성 페이지 UI 테스트
- [x] 초대 링크 생성 및 공유 기능 테스트
- [x] 초대 조회 페이지 UI 테스트
- [x] Pretendard 폰트 적용 확인
- [x] 공통 헤더 구현 확인

## 리뷰 요구사항

- 그룹 초대 플로우의 UX가 사용자 친화적인지 검토 부탁드립니다.
- Pretendard 폰트 적용이 모든 디바이스에서 일관되게 작동하는지 확인 부탁드립니다.
- 공통 헤더 구현이 모든 페이지에서 올바르게 작동하는지 확인 부탁드립니다.
