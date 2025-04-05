# API 구현 분석 및 요구사항 문서

## 1. 개요

이 문서는 Study Up 프론트엔드 애플리케이션에 이미 구현된 API 통신 구조를 분석하여 역으로 도출한 요구사항을 정리한 것입니다. 구현된 코드를 바탕으로 백엔드 API와의 통신 방식, React Query를 활용한 데이터 페칭 및 캐싱 전략, 그리고 `@lukemorales/query-key-factory` 라이브러리를 활용한 쿼리 키 관리 방식을 분석했습니다.

## 2. 구현된 기능 분석

### 2.1 API 기본 구조

구현된 코드에서는 다음과 같은 API 기본 구조가 발견되었습니다:

- **공통 응답 형식**: 모든 API 응답은 `SuccessResponse<T>` 형식을 따름
- **페이지네이션 지원**: `Pageable` 타입을 통해 페이지네이션 파라미터 관리
- **HTTP 클라이언트**: Ky 라이브러리를 사용하여 HTTP 요청 처리

### 2.2 도메인 기반 구조

코드는 다음과 같은 도메인 기반 구조로 구현되어 있습니다:

1. **Auth 도메인**: 인증 관련 기능
2. **User 도메인**: 사용자 관련 기능
3. **Group 도메인**: 그룹 관련 기능
4. **Challenge 도메인**: 챌린지 관련 기능
5. **Media 도메인**: 미디어 관련 기능

각 도메인은 다음과 같은 구조로 구현되어 있습니다:

- `types.ts`: 도메인 관련 타입 정의
- `index.ts`: API 함수, 쿼리 키 팩토리, 훅 구현

### 2.3 쿼리 키 관리 전략

초기에는 일반적인 배열 기반 쿼리 키 관리 방식을 사용했으나, 이후 `@lukemorales/query-key-factory` 라이브러리를 도입하여 다음과 같은 방식으로 마이그레이션되었습니다:

- **계층적 구조**: 도메인 간의 관계와 계층 구조를 코드에 명확하게 반영
- **contextQueries**: 중첩 쿼리를 구현하기 위해 `contextQueries` 활용
- **타입 안전성**: 타입 시스템을 통해 쿼리 키 관련 오류 감소

### 2.4 캐시 무효화 전략

구현된 코드에서는 다음과 같은 캐시 무효화 전략이 발견되었습니다:

- **선택적 무효화**: 데이터 변경 시 관련된 쿼리들만 선택적으로 무효화
- **도메인 간 의존성 고려**: 예를 들어, 태스크 완료 시 챌린지 태스크 목록과 사용자 태스크 목록 모두 무효화

## 3. 도메인별 구현 분석

### 3.1 Auth 도메인

**구현된 기능**:

- 로그인 (`signIn`)
- 토큰 갱신 (`refreshToken`)

**사용된 훅**:

- `useSignInMutation`
- `useRefreshToken`

**특이사항**:

- 쿼리 키를 사용하지 않고 mutation만 사용

### 3.2 User 도메인

**구현된 기능**:

- 사용자 태스크 목록 조회 (`getUserTasks`)
- 사용자 그룹 목록 조회 (`getUserGroups`)

**사용된 훅**:

- `useUserTasksQuery`
- `useUserGroupsQuery`

**쿼리 키 구조**:

- `userKeys.me._ctx.tasks`
- `userKeys.me._ctx.groups`

### 3.3 Group 도메인

**구현된 기능**:

- 그룹 생성 (`createGroup`)
- 그룹 탈퇴 (`leaveGroup`)
- 그룹 초대 (`inviteUser`)
- 그룹 초대 수락 (`acceptInvitation`)
- 그룹 챌린지 목록 조회 (`getGroupChallenges`)
- 그룹 태스크 목록 조회 (`getGroupTasks`)
- 그룹 메시지 목록 조회 (`getGroupMessages`)
- 그룹 초대 조회 (`getInvitation`)

**사용된 훅**:

- `useCreateGroup`
- `useLeaveGroup`
- `useInviteUser`
- `useAcceptInvitation`
- `useGroupChallengesQuery`
- `useGroupTasksQuery`
- `useGroupMessagesQuery`
- `useInvitationQuery`

**쿼리 키 구조**:

- `groupKeys.challenges(id)`
- `groupKeys.invitation(id, invitationId)`
- `groupKeys.messages(id, pageable)`

### 3.4 Challenge 도메인

**구현된 기능**:

- 챌린지 생성 (`createChallenge`)
- 태스크 완료 (`completeTask`)
- 챌린지 태스크 목록 조회 (`getChallengeTasks`)

**사용된 훅**:

- `useCreateChallenge`
- `useCompleteTask`
- `useChallengeTasksQuery`

**쿼리 키 구조**:

- `challengeKeys.tasks(id)`

### 3.5 Media 도메인

**구현된 기능**:

- 업로드 URL 요청 (`getPreSignedUploadUrl`)

**사용된 훅**:

- `useGetPreSignedUploadUrl`

**특이사항**:

- 미디어는 캐싱이 필요 없어 쿼리 키 팩토리 마이그레이션에서 제외됨

## 4. 도출된 요구사항

### 4.1 기본 요구사항

1. **일관된 API 통신 구조**:

   - 모든 도메인에서 동일한 패턴으로 API 통신 구현
   - 공통 응답 형식 사용
   - 오류 처리 일관성 유지

2. **타입 안전성**:

   - 모든 API 요청 및 응답에 대한 타입 정의
   - 타입스크립트의 타입 시스템 활용

3. **도메인 기반 구조**:
   - 기능을 도메인별로 분리
   - 각 도메인은 자체 타입, API 함수, 훅을 가짐

### 4.2 React Query 관련 요구사항

1. **데이터 페칭 최적화**:

   - React Query를 사용하여 서버 상태 관리
   - 캐싱, 재시도, 백그라운드 업데이트 활용

2. **쿼리 키 관리**:

   - 계층적 데이터 구조를 반영한 쿼리 키 설계
   - `@lukemorales/query-key-factory` 라이브러리 활용

3. **캐시 무효화 전략**:
   - 데이터 변경 시 관련 쿼리 무효화
   - 도메인 간 의존성을 고려한 무효화 전략

### 4.3 도메인별 요구사항

1. **Auth 도메인**:

   - 로그인 및 토큰 갱신 기능 제공
   - 인증 상태 관리

2. **User 도메인**:

   - 사용자 태스크 및 그룹 조회 기능 제공
   - 사용자 컨텍스트 내에서의 데이터 관리

3. **Group 도메인**:

   - 그룹 생성, 탈퇴, 초대 기능 제공
   - 그룹 내 챌린지, 태스크, 메시지 관리
   - 복잡한 계층 구조 지원

4. **Challenge 도메인**:

   - 챌린지 생성 및 태스크 완료 기능 제공
   - 챌린지 태스크 관리

5. **Media 도메인**:
   - 파일 업로드를 위한 URL 요청 기능 제공

## 5. 개선 사항 및 권장 사항

1. **타입 오류 해결**:

   - `_ctx` 속성 접근 시 발생하는 타입 오류에 대한 더 나은 해결책 필요
   - `as any` 타입 단언 대신 타입 안전한 방법 모색

2. **도메인 간 의존성 관리**:

   - 도메인 간 의존성을 명확히 하고 순환 참조 방지
   - 공통 쿼리 키 관리 방안 고려

3. **테스트 강화**:

   - API 함수 및 훅에 대한 단위 테스트 추가
   - 캐시 무효화 전략에 대한 테스트 추가

4. **문서화**:
   - API 함수 및 훅에 대한 상세 문서화
   - 쿼리 키 구조 및 캐시 무효화 전략 문서화

## 6. 결론

구현된 코드를 분석한 결과, Study Up 프론트엔드 애플리케이션은 도메인 기반의 구조와 React Query를 활용한 효율적인 데이터 페칭 전략을 채택하고 있습니다. 특히 `@lukemorales/query-key-factory` 라이브러리를 도입하여 쿼리 키 관리를 개선한 점이 주목할 만합니다.

이 문서에서 도출된 요구사항은 향후 유사한 프로젝트에서 참고할 수 있는 가이드라인으로 활용될 수 있으며, 현재 프로젝트의 유지보수 및 확장에도 도움이 될 것입니다.
