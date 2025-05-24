## Summary

**공통 폰트 및 타이포그래피 개선, Storybook 스토리 추가, MSW 기반 API Mocking 환경 구축, CI 빌드 워크플로우 추가, 기타 인프라/리팩토링** 등 다양한 개선 및 기능 추가를 하였습니다.

- **Pretendard 폰트 통합**: Tamagui 설정에 Pretendard 폰트 패밀리와 각 웨이트별 폰트 파일을 추가하고, `createPretendardFont` 유틸리티로 일관된 폰트 스타일을 적용합니다.
- **타이포그래피 컴포넌트**: `Heading1~6`, `Paragraph` 등 베이스 타이포그래피 컴포넌트 신설 및 스토리북 스토리 추가.
- **Storybook 개선**: 베이스 컴포넌트(Heading, Paragraph, ListItem 등) 및 바운티 도메인 컴포넌트에 대한 스토리 추가/정비.
- **MSW 기반 Mock API 환경**: 개발/스토리북 환경에서 MSW(Mock Service Worker)로 API mocking이 가능하도록 인프라 및 예제 추가.
- **AppBackground Provider**: Tamagui 기반 공통 배경 컴포넌트 추가.
- **Reactotron Provider**: 개발 환경에서 네트워크 디버깅을 위한 Reactotron Provider 추가.
- **CI 빌드 워크플로우**: GitHub Actions 기반 빌드 자동화 워크플로우 추가.
- **기타 인프라/리팩토링**: 디렉토리 구조 개선, 빌드 스크립트/환경변수/앱 서명 관련 문서 및 설정 추가, 불필요 파일 정리 등.

---

## PR 유형 및 세부 작업 내용

- [x] 새로운 기능 추가
- [x] 코드 리팩토링
- [x] 문서 수정
- [x] 빌드 부분 혹은 패키지 매니저 수정
- [x] 파일 혹은 폴더명 수정/이동/삭제

### 주요 변경점

#### 1. 폰트 및 타이포그래피 개선

- Pretendard 폰트 파일(각 웨이트별 OTF) 추가 및 Tamagui 설정 반영
- `domains/base/lib/create-pretendard-font.ts` 유틸리티 신설
- `Heading1~6`, `Paragraph` 등 타이포그래피 컴포넌트 및 스토리 추가

#### 2. Storybook 스토리 추가/정비

- 베이스 컴포넌트(Heading, Paragraph, ListItem 등) 및 바운티 도메인 컴포넌트 스토리 추가/정비
- Storybook 관련 파일(ts → tsx 등) 리팩토링 및 경로/타이틀 정비

#### 3. MSW 기반 Mock API 환경 구축

- `mocks/` 디렉토리 및 MSW 핸들러/서버/Provider 추가
- Storybook에서 Mock API 예제 스토리(`mock-api-demo.stories.tsx`) 추가

#### 4. AppBackground Provider

- `domains/base/providers/app-background.tsx` 신설: Tamagui YStack 기반 공통 배경 컴포넌트

#### 5. Reactotron Provider

- `domains/base/providers/reactotron-provider.tsx` 신설: 개발 환경 네트워크 디버깅 지원

#### 6. CI 빌드 워크플로우

- `.github/workflows/build.yml` 추가: Bun, Expo, EAS 기반 빌드 자동화

#### 7. 기타 인프라/리팩토링

- 디렉토리 구조 개선(도메인별로 이동/정리)
- 빌드 스크립트, 환경변수, 앱 서명 관련 문서 및 설정 추가
- 불필요 파일/코드 삭제 및 네이밍/경로 일관성 개선

---

## test 완료 여부 (선택)

- [x] Storybook에서 신규/개선 컴포넌트 정상 렌더링 확인
- [x] MSW Mock API 동작 확인
- [x] Pretendard 폰트 적용 및 타이포그래피 스타일 확인
- [x] 빌드 워크플로우 정상 동작 확인

## 작동 스크린샷 (선택)

_필요시 추가 예정_

## 리뷰 요구사항 (선택)

- 폰트/타이포그래피/스토리북 구조가 가이드라인에 부합하는지 검토 부탁드립니다.
- MSW/Reactotron 등 개발 인프라 적용 방식에 대한 의견 환영합니다.
- 디렉토리 구조/네이밍/빌드 스크립트 등 전반적인 구조 개선에 대한 피드백 요청
