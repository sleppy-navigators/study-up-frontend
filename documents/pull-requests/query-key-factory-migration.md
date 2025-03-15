## Summary

React Query를 활용한 API 통신 구조를 구축하고, 쿼리 키 관리를 개선하기 위해 `@lukemorales/query-key-factory` 라이브러리를 도입했습니다. 이를 통해 계층적 데이터 구조를 더 명확하게 표현하고, 쿼리 키 관리를 간소화하며, 캐시 무효화를 최적화할 수 있게 되었습니다.

연관된 이슈: #15

## PR 유형 및 세부 작업 내용

- [x] 새로운 기능 추가
- [x] 코드 리팩토링
- [x] 빌드 부분 혹은 패키지 매니저 수정

### 세부 내용

#### 1. API 기본 구조 구축

1. 공통 API 응답 타입 정의 (`base/api/types.ts`)
   - `SuccessResponse<T>`: API 응답의 공통 형식 정의
   - `Pageable`: 페이지네이션 파라미터 타입 정의

#### 2. 도메인별 API 구현

1. Auth 도메인 구현 (`auth/api/`)

   - 인증 관련 타입 정의 (`types.ts`)
   - 로그인 및 토큰 갱신 API 함수 구현 (`index.ts`)
   - `useSignInUser`, `useRefreshToken` 훅 구현

2. User 도메인 구현 (`user/api/`)

   - 사용자 관련 타입 정의 (`types.ts`)
   - 사용자 태스크 및 그룹 조회 API 함수 구현 (`index.ts`)
   - Query Key Factory 패턴 적용
   - `useUserTasksQuery`, `useUserGroupsQuery` 훅 구현

3. Group 도메인 구현 (`group/api/`)

   - 그룹 관련 타입 정의 (`types.ts`)
   - 그룹 생성, 탈퇴, 초대, 챌린지/태스크/메시지 조회 API 함수 구현 (`index.ts`)
   - Query Key Factory 패턴 적용
   - 그룹 관련 훅 구현 (생성, 탈퇴, 초대, 조회 등)

4. Challenge 도메인 구현 (`challenge/api/`)

   - 챌린지 관련 타입 정의 (`types.ts`)
   - 챌린지 생성, 태스크 완료, 태스크 조회 API 함수 구현 (`index.ts`)
   - Query Key Factory 패턴 적용
   - `useCreateChallenge`, `useCompleteTask`, `useChallengeTasksQuery` 훅 구현

5. Media 도메인 구현 (`media/api/`)
   - 미디어 관련 타입 정의 (`types.ts`)
   - 업로드 URL 요청 API 함수 구현 (`index.ts`)
   - `useGetPreSignedUploadUrl` 훅 구현

#### 3. Query Key Factory 마이그레이션

1. `@lukemorales/query-key-factory` 라이브러리 추가

   - 패키지 설치 및 의존성 추가 (`package.json`, `bun.lockb`)

2. User 도메인 쿼리 키 팩토리 마이그레이션

   - `userKeys` 객체를 `createQueryKeys`를 사용하여 재정의
   - `me` 키 아래에 `tasks`와 `groups`를 `contextQueries`로 구성
   - 훅 함수들을 새로운 쿼리 키 구조에 맞게 업데이트

3. Group 도메인 쿼리 키 팩토리 마이그레이션

   - `groupKeys` 객체를 `createQueryKeys`를 사용하여 재정의
   - 계층 구조를 단순화하여 `challenges`, `invitation`, `messages` 키를 최상위에 배치
   - 훅 함수들을 새로운 쿼리 키 구조에 맞게 업데이트

4. Challenge 도메인 쿼리 키 팩토리 마이그레이션
   - `challengeKeys` 객체를 `createQueryKeys`를 사용하여 재정의
   - `tasks` 키를 최상위에 배치
   - 훅 함수들을 새로운 쿼리 키 구조에 맞게 업데이트

## 개선 효과

1. **계층적 데이터 구조의 명확한 표현**: 도메인 간의 관계와 계층 구조가 코드에 명확하게 반영되었습니다.
2. **쿼리 키 관리 간소화**: 복잡한 배열 대신 객체 구조를 통해 쿼리 키를 관리할 수 있게 되었습니다.
3. **캐시 무효화 최적화**: 특정 계층의 데이터가 변경되었을 때 관련된 쿼리들만 선택적으로 무효화할 수 있게 되었습니다.
4. **타입 안전성 향상**: `@lukemorales/query-key-factory` 라이브러리의 타입 시스템을 통해 쿼리 키 관련 오류를 줄일 수 있습니다.
5. **일관된 API 통신 구조**: 모든 도메인에서 일관된 방식으로 API 통신을 구현하여 코드의 일관성과 가독성이 향상되었습니다.

## 테스트 완료 여부

- [x] 각 도메인의 API 함수 동작 확인
- [x] 각 도메인의 훅 함수 동작 확인
- [x] 각 도메인의 쿼리 키 구조 확인
- [x] 캐시 무효화 동작 확인

## 리뷰 요구사항

- 각 도메인의 API 함수와 훅 구현이 적절한지 확인해주세요.
- 각 도메인의 쿼리 키 구조가 적절한지 확인해주세요.
- 특히 Group 도메인의 경우 계층 구조를 단순화했는데, 이 방식이 적절한지 검토해주세요.
- 타입 오류 해결을 위해 일부 `as any` 타입 단언을 사용했는데, 더 나은 방법이 있는지 조언해주세요.
- 도메인 간 의존성 관리가 적절한지 검토해주세요 (예: Challenge 도메인에서 User 및 Group 도메인의 쿼리 키 참조).
