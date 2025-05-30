1. **나의 요청**

## 필요 기능

access token과 refresh token 자체는 상태로 관리할 필요성이 크게 없지만, '인증이 되었는지 아닌지'에 대한 상태는 관리할 필요성이 있습니다.
그 이유는 다음과 같습니다.

- 앱 시작시 인증 상태를 확인하여 적절한 화면으로 라우팅해줄 수 있어야 한다.
  - 로그인된 사용자의 경우 홈화면을 보여줄 수 있는 라우트로 이동
  - 로그인되지 않은 사용자의 경우 로그인 /discordlogin 라우트로 이동
- 로그인해야만 들어갈 수 있는 라우트를 보호할 수 있다.

전역 상태 또는 Context 로 관리되어야하만 하는 이유는 다음과 같습니다.

- 각각의 로그인이 필요한 route에서 인증 여부를 확인할 수 있도록 전역 상태로 만들어줘야 한다.

## 작업 상세 내용

- [ ] 인증 상태 관리 로직 구현
  - 초기값: null (로딩 상태 표현)
  - 토큰 확인 후: true/false 설정
  - refresh 요청 실패 시: false로 설정
- [ ] 앱 시작 시 인증 상태 로드 구현
  - localStroage에서 토큰 불러오기
  - 로딩 중 상태 처리 (스플래시 화면 또는 로딩 인디케이터)
- [ ] 인증 상태에 따른 라우팅 로직 구현
  - 인증 상태가 true면 "/" 경로로 이동
  - 인증 상태가 false면 "/discordlogin" 경로로 이동
- [ ] 기존 HTTP 클라이언트 토큰 갱신 로직과 통합
  - 토큰 갱신 실패 시 인증 상태 false로 변경
  - 로그인(인증) 성공 시: true로 설정
  - 로그아웃 시: false로 설정
  - 회원탈퇴시: false로 설정

## 참고할만한 자료

- Expo Router 인증 패턴: https://docs.expo.dev/router/reference/authentication/

@cursor-template.md

2. **백그라운드 사항**

3. **답변을 줄 때 고려해야 할 사항들**

- 적용 가능한 순서대로 구현 단계를 순차적으로 제안해줘.
- 제대로 이해한게 맞는지 검증하기 위해 이해도 및 문제점을 알려줘.
- 해당 레포지토리 이외에 있는 정보들을 모르기 때문에 궁금한 것이 있으면 질문을 해줘
- 내가 이상한 소리 하고 있으면 알려줘
- 내가 코드 작성을 허락하기 전까지 절대 코드를 작성하지 말 것
- 한 답변 당 한개의 커밋 단위 변경만 할 것
- plan each step, get my approval, change for one step per answer
