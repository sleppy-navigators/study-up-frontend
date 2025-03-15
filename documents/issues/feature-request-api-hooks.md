## 필요 기능

- [x] HTTP 클라이언트(ky)를 활용한 API 함수 제작
  - 각 도메인별로 API 함수 구현 (auth, user, group, challenge, media)
- [x] React Query를 활용한 query 및 mutation hook 구현
  - Query hook: `use{ResourceName}Query` 네이밍 컨벤션 사용
  - Mutation hook: `use{ActionName}{ResourceName}` 네이밍 컨벤션 사용

## 작업 상세 내용

### API 함수 구현

- [ ] 도메인별 디렉토리 구조 생성

  - `auth/api/index.ts`
  - `user/api/index.ts`
  - `group/api/index.ts`
  - `challenge/api/index.ts`
  - `media/api/index.ts`

- [ ] Auth API 함수 구현

  - [ ] `signIn(provider: string, idToken: string): Promise<TokenResponse>`
  - [ ] `refreshToken(accessToken: string, refreshToken: string): Promise<TokenResponse>`

- [ ] User API 함수 구현

  - [ ] `getUserTasks(): Promise<UserTaskListResponse>`
  - [ ] `getUserGroups(): Promise<GroupListResponse>`

- [ ] Group API 함수 구현

  - [ ] `createGroup(data: GroupCreationRequest): Promise<GroupResponse>`
  - [ ] `leaveGroup(groupId: number): Promise<void>`
  - [ ] `inviteUser(groupId: number): Promise<GroupInvitationResponse>`
  - [ ] `acceptInvitation(groupId: number, invitationId: number, data: GroupInvitationAcceptRequest): Promise<GroupResponse>`
  - [ ] `getGroupChallenges(groupId: number): Promise<GroupChallengeListResponse>`
  - [ ] `getGroupTasks(groupId: number): Promise<GroupTaskListResponse>`
  - [ ] `getGroupMessages(groupId: number, pageable: Pageable): Promise<ChatMessageListResponse>`
  - [ ] `getInvitation(groupId: number, invitationId: number): Promise<GroupResponse>`

- [ ] Challenge API 함수 구현

  - [ ] `createChallenge(groupId: number, data: ChallengeCreationRequest): Promise<ChallengeResponse>`
  - [ ] `completeTask(challengeId: number, taskId: number, data: TaskCertificationRequest): Promise<TaskResponse>`
  - [ ] `getChallengeTasks(challengeId: number): Promise<TaskListResponse>`

- [ ] Media API 함수 구현
  - [ ] `getPreSignedUploadUrl(filename: string): Promise<UploadUrlResponse>`

### React Query Hooks 구현

- [ ] Auth Query/Mutation Hooks

  - [ ] `useSignInUser()`
  - [ ] `useRefreshToken()`

- [ ] User Query Hooks

  - [ ] `useUserTasksQuery()`
  - [ ] `useUserGroupsQuery()`

- [ ] Group Query/Mutation Hooks

  - [ ] `useCreateGroup()`
  - [ ] `useLeaveGroup()`
  - [ ] `useInviteUser()`
  - [ ] `useAcceptInvitation()`
  - [ ] `useGroupChallengesQuery()`
  - [ ] `useGroupTasksQuery()`
  - [ ] `useGroupMessagesQuery()`
  - [ ] `useInvitationQuery()`

- [ ] Challenge Query/Mutation Hooks

  - [ ] `useCreateChallenge()`
  - [ ] `useCompleteTask()`
  - [ ] `useChallengeTasksQuery()`

- [ ] Media Query/Mutation Hooks
  - [ ] `useGetPreSignedUploadUrl()`

## 참고할만한 자료

- Swagger API 문서: `documents/swagger.json`
- HTTP 클라이언트: `lib/api/client.ts`
- React Query 설정: `lib/react-query.tsx`
- HTTP 에러 처리: `lib/errors/http.ts`

## 구현 예시

### API 함수 예시 (auth/api/index.ts)

```typescript
import { client } from '../../lib/api/client';
import { TokenResponse } from '../../lib/api/types';

export const authApi = {
  signIn: (provider: string, idToken: string) =>
    client
      .post('auth/sign-in', {
        searchParams: { provider },
        json: { idToken },
      })
      .json<{ data: TokenResponse }>()
      .then((res) => res.data),

  refreshToken: (accessToken: string, refreshToken: string) =>
    client
      .post('auth/refresh', {
        json: { accessToken, refreshToken },
      })
      .json<{ data: TokenResponse }>()
      .then((res) => res.data),
};
```

### Query Hook 예시 (user/api/hooks.ts)

```typescript
import { useQuery } from '@tanstack/react-query';
import { userApi } from './index';

export function useUserTasksQuery() {
  return useQuery({
    queryKey: ['user', 'tasks'],
    queryFn: () => userApi.getUserTasks(),
  });
}

export function useUserGroupsQuery() {
  return useQuery({
    queryKey: ['user', 'groups'],
    queryFn: () => userApi.getUserGroups(),
  });
}
```

### Mutation Hook 예시 (group/api/hooks.ts)

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { groupApi } from './index';
import type { GroupCreationRequest } from '../../lib/api/types';

export function useCreateGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GroupCreationRequest) => groupApi.createGroup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'groups'] });
    },
  });
}

export function useLeaveGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (groupId: number) => groupApi.leaveGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'groups'] });
    },
  });
}
```
