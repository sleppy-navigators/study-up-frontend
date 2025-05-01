## Summary

API 스펙 변경사항을 반영하였습니다. 기존 `swagger.json`에서 `swagger2.json`으로 변경되면서 발생한 API 엔드포인트, 파라미터, 응답, 스키마 등의 변경사항을 정리했습니다.

## PR 유형 및 세부 작업 내용

- [x] 코드 리팩토링

  - API 스펙 변경에 따른 타입 및 인터페이스 수정
  - API 응답 타입 변경에 따른 컴포넌트 수정
  - API 엔드포인트 변경에 따른 서비스 로직 수정

- [x] 문서 수정

  - API 변경점 비교 문서 추가 (`documents/requirements/api-diff-swagger2.md`)
  - 변경된 API 스펙 문서화

- [x] 빌드 부분 혹은 패키지 매니저 수정
  - `.gitignore` 파일 수정
    - Storybook 빌드 메타데이터 무시 설정 추가
    - Android/iOS 디렉토리 경로 수정

## 주요 변경사항

1. API 엔드포인트 변경

   - `/users/{userId}` (GET) 엔드포인트 추가
   - `/challenges/{challengeId}` (DELETE) 엔드포인트 추가

2. 응답 타입 변경

   - 그룹 초대 관련 응답 타입 변경 (GroupResponse → GroupInvitationResponse)
   - 채팅 메시지 관련 필드명 변경 (totalPages → pageCount, totalElements → chatMessageCount)
   - 사용자 태스크 목록에 isCompleted, currentlyJoined 필드 추가

3. 스키마 변경

   - GroupTaskListItem 구조 변경 (challenge → challengeDetail, challengerDetail 추가)
   - GroupChallengeListItem 구조 변경 (challengerId/challengerName → challengerDetail)
   - ChatMessageResponse 구조 변경 (senderType, createdAt 필드 추가)

4. 기타 변경
   - Storybook 빌드 메타데이터 무시 설정 추가
   - Android/iOS 디렉토리 경로 수정
