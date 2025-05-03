## Summary

Expo DevTools의 불안정한 네트워크 탭 문제를 해결하기 위해, 개발 환경 전용 네트워크 Inspector로 Reactotron을 도입합니다.

- 관련 이슈: [Expo Issue #36531](https://github.com/expo/expo/issues/36531)

## PR 유형 및 세부 작업 내용

- [x] 새로운 기능 추가

- **세부 내용:**
  1.  **배경**: Expo DevTools의 네트워크 탭에서 Request Header에 Bearer Token 추가 시 Response Body 및 Header를 정상적으로 확인할 수 없는 문제가 발생했습니다 ([Expo Issue #36531](https://github.com/expo/expo/issues/36531)).
  2.  **원인 분석**: Axios 및 Ky 사용 시 Request Header 수정 로직에서 문제가 발생하는 것을 확인했으나, Expo의 Tooling System 및 Native 생태계 기여에는 어려움이 있어 대안을 모색했습니다.
  3.  **대안 탐색**: React Native 디버깅 관련 자료([React Native Docs](https://reactnative.dev/docs/debugging), [Reactotron in Flipper Blog Post](https://shift.infinite.red/better-react-native-debugging-with-reactotron-in-flipper-6b823af29220) 등)를 조사하여 네트워크 Inspector 기능을 제공하는 Reactotron을 발견했습니다.
  4.  **Reactotron 도입**: Reactotron을 적용한 결과, 네트워크 요청/응답 추적이 정상적으로 동작하는 것을 확인했습니다. Expo DevTools가 안정화될 때까지 개발 환경에서 네트워크 디버깅 용도로 Reactotron을 활용하고자 합니다.
  5.  **영향**: Reactotron은 `devDependencies`로만 추가되므로, 프로덕션 번들 사이즈에는 영향을 미치지 않습니다.
  6.  **구현**:
      - `reactotron-react-native` 패키지 설치 (`devDependencies`)
      - Reactotron 설정 파일 생성 (`ReactotronConfig.js`)
      - 앱 진입점(`app/_layout.tsx`)에 개발 환경 전용 초기화 로직 추가

## 변경된 파일

- `ReactotronConfig.js`
- `app/_layout.tsx`
- `package.json`
- `bun.lockb`

## 리뷰 요구사항 (선택)

- Reactotron 설정 및 초기화 로직이 적절한지 확인 부탁드립니다.
- 개발 환경에서만 Reactotron이 동작하고 프로덕션 빌드에 포함되지 않는지 확인이 필요합니다.
