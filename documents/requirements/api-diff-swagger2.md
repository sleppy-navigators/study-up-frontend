# API 변경점 비교 문서 (swagger.json → swagger2.json)

이 문서는 기존 `swagger.json`과 신규 `swagger2.json`의 변경점(엔드포인트, 파라미터, 응답, 스키마 등)을 비교/정리한 문서입니다.

---

## 1. 엔드포인트(경로) 레벨 변경점

- **추가된 엔드포인트**
  - `/users/{userId}` (GET): 유저 정보 조회
  - `/challenges/{challengeId}` (DELETE): 챌린지 취소
- **삭제된 엔드포인트**
  - 없음 (모든 기존 엔드포인트가 유지됨)
- **변경된 엔드포인트 (AS-IS/TO-BE 상세)**

### /groups/{groupId}/invitations/{invitationId}/accept (POST)

- **AS-IS**
  - 응답: SuccessResponseGroupResponse
  - 주요 필드: { message, data: { id, name, ... } }
- **TO-BE**
  - 응답: SuccessResponseGroupInvitationResponse
  - 주요 필드: { message, data: { id, invitationKey, inviterId, groupId } }
- **변경점 요약**
  - 응답 타입이 GroupResponse → GroupInvitationResponse로 변경
  - data 필드 구조가 그룹 정보 → 초대 정보로 변경

### /groups/{groupId}/invitations/{invitationId} (GET)

- **AS-IS**
  - 응답: SuccessResponseGroupResponse
  - 주요 필드: { message, data: { id, name, ... } }
- **TO-BE**
  - 응답: SuccessResponseGroupInvitationResponse
  - 주요 필드: { message, data: { id, invitationKey, inviterId, groupId } }
- **변경점 요약**
  - 응답 타입이 GroupResponse → GroupInvitationResponse로 변경
  - data 필드 구조가 그룹 정보 → 초대 정보로 변경

### /groups/{groupId}/tasks (GET)

- **AS-IS**
  - 응답: SuccessResponseGroupTaskListResponse
  - GroupTaskListItem: { id, title, deadline, certification, challenge }
- **TO-BE**
  - 응답: SuccessResponseGroupTaskListResponse
  - GroupTaskListItem: { id, title, deadline, challengeDetail, challengerDetail, certification }
- **변경점 요약**
  - GroupTaskListItem 구조 변경: challenge → challengeDetail, challengerDetail 추가

### /groups/{groupId}/challenges (GET/POST)

- **AS-IS**
  - GroupChallengeListItem: { id, title, deadline, description, challengerId, challengerName, recentCertification }
- **TO-BE**
  - GroupChallengeListItem: { id, title, deadline, description, isCompleted, challengerDetail, recentCertification }
- **변경점 요약**
  - challengerId/challengerName → challengerDetail(객체)로 변경, isCompleted 필드 추가

### /users/me/tasks (GET)

- **AS-IS**
  - UserTaskListItem: { id, title, deadline, certification, challengeDetail, groupDetail }
    - challengeDetail: { challengeId, challengeTitle }
    - groupDetail: { groupId, groupName }
- **TO-BE**
  - UserTaskListItem: { id, title, deadline, certification, challengeDetail, groupDetail }
    - challengeDetail: { challengeId, challengeTitle, isCompleted }
    - groupDetail: { groupId, groupName, currentlyJoined }
- **변경점 요약**
  - challengeDetail에 isCompleted 추가, groupDetail에 currentlyJoined 추가

### /users/me/groups (GET)

- **AS-IS**
  - GroupListItem: { id, name, thumbnailUrl, lastSystemMessage }
- **TO-BE**
  - GroupListItem: { id, name, thumbnailUrl, numOfMembers, lastChatMessage }
- **변경점 요약**
  - lastSystemMessage → lastChatMessage로 변경, numOfMembers 필드 추가

### /groups/{groupId} (GET)

- **AS-IS**
  - GroupResponse: { id, name, description, thumbnailUrl }
- **TO-BE**
  - GroupResponse: { id, name, description, thumbnailUrl }
- **변경점 요약**
  - required 필드가 일부 변경됨 (swagger2.json에서 description, name이 필수)

### /groups (POST)

- **AS-IS**
  - GroupResponse: { id, name, description, thumbnailUrl }
- **TO-BE**
  - GroupResponse: { id, name, description, thumbnailUrl }
- **변경점 요약**
  - required 필드가 일부 변경됨 (swagger2.json에서 description, name이 필수)

### /groups/{groupId}/leave (POST)

- **AS-IS**
  - SuccessResponseVoid: { message, data: {} }
- **TO-BE**
  - SuccessResponseVoid: { message, data: {} }
- **변경점 요약**
  - 구조상 큰 차이는 없으나, 내부 스키마가 일부 변경됨

### /groups/{groupId}/invitations (POST)

- **AS-IS**
  - SuccessResponseGroupInvitationResponse: { message, data: { invitationId, invitationKey } }
- **TO-BE**
  - SuccessResponseGroupInvitationResponse: { message, data: { id, invitationKey, inviterId, groupId } }
- **변경점 요약**
  - invitationId → id, inviterId/groupId 필드 추가

### /challenges/{challengeId}/tasks (GET)

- **AS-IS**
  - TaskListItem: { id, title, deadline, certification }
- **TO-BE**
  - TaskListItem: { id, title, deadline, certification }
- **변경점 요약**
  - 구조상 큰 차이는 없으나, 내부 스키마가 일부 변경됨

### /challenges/{challengeId}/tasks/{taskId}/certify (POST)

- **AS-IS**
  - TaskResponse: { id, title, deadline, certification }
- **TO-BE**
  - TaskResponse: { id, title, deadline, certification }
- **변경점 요약**
  - certification 구조가 일부 변경됨

### /auth/sign-in (POST)

- **AS-IS**
  - TokenResponse: { accessToken, refreshToken }
- **TO-BE**
  - TokenResponse: { accessToken, refreshToken }
- **변경점 요약**
  - 구조상 큰 차이는 없으나, 내부 스키마가 일부 변경됨

### /auth/refresh (POST)

- **AS-IS**
  - TokenResponse: { accessToken, refreshToken }
- **TO-BE**
  - TokenResponse: { accessToken, refreshToken }
- **변경점 요약**
  - 구조상 큰 차이는 없으나, 내부 스키마가 일부 변경됨

### /groups/{groupId}/messages (GET)

- **AS-IS**
  - ChatMessageListResponse: { messages, currentPage, totalPages, totalElements }
- **TO-BE**
  - ChatMessageListResponse: { messages, currentPage, pageCount, chatMessageCount }
- **변경점 요약**
  - totalPages → pageCount, totalElements → chatMessageCount로 필드명 변경

### /docs/chat/subscribe (GET)

- **AS-IS**
  - ChatMessageResponse: { id, groupId, senderId, content, timestamp }
- **TO-BE**
  - ChatMessageResponse: { id, groupId, senderId, senderType, content, createdAt }
- **변경점 요약**
  - senderType, createdAt 필드 추가, timestamp → createdAt으로 변경

### /docs/chat/send (GET)

- **AS-IS**
  - SuccessResponseVoid: { message, data: {} }
- **TO-BE**
  - SuccessResponseVoid: { message, data: {} }
- **변경점 요약**
  - 구조상 큰 차이는 없으나, 내부 스키마가 일부 변경됨

### /docs/chat/error (GET)

- **AS-IS**
  - ErrorResponse: { code, message, requestUrl, timestamp }
- **TO-BE**
  - ErrorResponse: { code, message, requestUrl, timestamp }
- **변경점 요약**
  - 구조상 큰 차이는 없으나, 내부 스키마가 일부 변경됨

### /docs/chat/connection (GET)

- **AS-IS**
  - SuccessResponseVoid: { message, data: {} }
- **TO-BE**
  - SuccessResponseVoid: { message, data: {} }
- **변경점 요약**
  - 구조상 큰 차이는 없으나, 내부 스키마가 일부 변경됨

---

> 각 항목은 실제 변경점 분석 후 채워집니다. (이 파일은 변경점 비교 작업의 산출물입니다.)
