# Token Refresh Implementation

## Overview

토큰 갱신 로직과 401 에러 처리를 위한 HTTP 클라이언트 구현

## Changes

- `ky` 클라이언트에 토큰 갱신 로직 추가
- 토큰 갱신 중 발생하는 race condition 처리를 위한 큐 시스템 구현
- React 외부에서 토큰 상태 관리를 위한 Jotai store 구현

## Implementation Details

### Token Refresh Flow

1. `afterResponse` 훅에서 401 응답 감지
2. 토큰 갱신 중이 아닌 경우에만 갱신 시도
3. 갱신 중인 경우 요청을 큐에 추가
4. 갱신 성공 시 큐의 요청들 재시도
5. 갱신 실패 시 로그아웃 처리

### Queue System

- `refreshPromise`: 현재 진행 중인 토큰 갱신 요청 추적
- `requestQueue`: 토큰 갱신 중 발생한 요청들을 저장
- `addToQueue`: 새로운 요청을 큐에 추가
- `executeQueue`: 토큰 갱신 성공 후 큐의 요청들 실행
- `clearQueue`: 토큰 갱신 실패 시 큐 초기화

### Error Handling

- 토큰 갱신 실패 시 `UnauthorizedError` 발생
- 네트워크 오류 및 타임아웃 처리
- HTTP 상태 코드별 적절한 에러 클래스 매핑

## Testing

- [ ] 토큰 갱신 성공 케이스
- [ ] 토큰 갱신 실패 케이스
- [ ] 동시 요청 처리
- [ ] 네트워크 오류 처리

## Related Issues

## Breaking Changes

없음

## Notes

- `ky` 클라이언트의 `afterResponse` 훅을 사용하여 401 응답을 인터셉트
- Jotai의 `createStore`를 사용하여 React 외부에서 상태 관리
- 토큰 갱신 중 발생하는 요청들은 큐에서 대기 후 일괄 처리
