## Summary

- Fixed an issue where using `unstable_enablePackageExports` in Metro caused `zustand/middleware` to reference `import.meta.env` in ESM environments, leading to unexpected behavior or errors.
- The root cause was that `zustand/middleware`'s package exports include an "import" (ESM) condition, which triggers ESM-specific code (`import.meta.env`) in environments that do not support it.
- To resolve this, `metro.config.js` was updated to set `unstable_conditionNames` so that common modules are prioritized, avoiding the problematic ESM path.
- This ensures compatibility and prevents accidental ESM code execution in React Native/Metro environments.

## PR 유형 및 세부 작업 내용

- [x] 빌드 부분 혹은 패키지 매니저 수정
- [x] 코드 리팩토링

- Updated `metro.config.js`:
  - Set `unstable_conditionNames` to prioritize 'react-native', 'require', 'default' over 'import'.
  - This prevents Metro from resolving to ESM entry points that use `import.meta.env`.
- Added comments to clarify the reasoning in the config file.

## test 완료 여부 (선택)

- [x] 앱 실행 및 빌드 정상 동작 확인
- [x] Storybook 환경에서도 정상 동작 확인

## 작동 스크린샷 (선택)

N/A (config/build change only)

## 리뷰 요구사항 (선택)

- 리뷰 시, Metro config의 resolver 설정이 다른 패키지에 영향이 없는지 확인 부탁드립니다.
