## 필요 기능

- [x] 인증 상태 기반 네비게이션 구현
  - 앱 시작 시 인증 상태를 확인하여 적절한 화면으로 라우팅
  - 로그인된 사용자: 루트 경로("/")로 이동
  - 로그인되지 않은 사용자: 로그인 페이지("/login")로 이동

## 작업 상세 내용

- [ ] 인증 상태 관리 로직 구현
  - 초기값: null (로딩 상태 표현)
  - 토큰 확인 후: true/false 설정
  - 인증 성공 시: true로 설정
  - refresh 요청 실패 시: false로 설정
- [ ] 앱 시작 시 인증 상태 로드 구현
  - SecureStore에서 토큰 불러오기
  - 로딩 중 상태 처리 (스플래시 화면 또는 로딩 인디케이터)
- [ ] 인증 상태에 따른 라우팅 로직 구현
  - 인증 상태가 true면 "/" 경로로 이동
  - 인증 상태가 false면 "/login" 경로로 이동
- [ ] 기존 HTTP 클라이언트 토큰 갱신 로직과 통합
  - 토큰 갱신 실패 시 인증 상태 false로 변경

## 참고할만한 자료

- Expo Router 인증 패턴: https://docs.expo.dev/router/reference/authentication/
- 기존 Ky HTTP 클라이언트 코드 (lib/api/client.ts)
- 기존 인증 저장소 코드 (lib/auth/storage.ts)
