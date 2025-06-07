## Summary

메트로 번들러에서 zustand/middleware 사용 시 ESM 환경에서 발생하는 import.meta.env 관련 이슈를 해결했습니다.

## PR 유형 및 세부 작업 내용

- [x] 빌드 부분 혹은 패키지 매니저 수정
- [x] 코드 리팩토링

- 문제 원인:
  - Metro의 unstable_enablePackageExports 옵션을 사용하면서 zustand/middleware 패키지의 "import"(ESM) 조건이 활성화되어, import.meta.env 코드가 실행되는 문제가 있었습니다.
- 해결 방법:
  - metro.config.js의 resolver 설정에서 unstable_conditionNames를 'react-native', 'require', 'default' 순으로 우선 적용하도록 수정했습니다.
  - 이를 통해 Metro가 ESM 엔트리 포인트 대신 CSM 엔트리 포인트를 우선적으로 사용하게 하여, import.meta.env 코드가 실행되지 않도록 했습니다.

## test 완료 여부 (선택)

- [x] 앱 실행 및 빌드 정상 동작 확인
- [x] Storybook 환경에서도 정상 동작 확인

## 작동 스크린샷 (선택)

해당 없음 (config/build 변경 사항)

## 리뷰 요구사항 (선택)

- Metro config의 resolver 설정이 다른 패키지에 영향이 없는지 확인 부탁드립니다.
