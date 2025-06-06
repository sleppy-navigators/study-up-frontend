## Summary

Android 빌드 워크플로우(`.eas/build/build.yml`)에 빌드 설정 및 버전 관리 단계를 명확히 추가하여, 빌드 프로세스의 신뢰성과 예측 가능성을 높였습니다. 앱 로직이나 UI에는 영향이 없으며, 오직 빌드 파이프라인 개선에만 집중된 변경입니다.

- 관련 이슈: 해당 없음

## PR 유형 및 세부 작업 내용

- [x] 빌드 부분 혹은 패키지 매니저 수정

### 세부 내용

- `storybook.requires.ts` 생성 전, `eas/resolve_build_config` 단계를 추가하여 빌드 설정이 올바르게 반영되도록 했습니다.
- Gradle 빌드 실행 전, `eas/configure_android_version` 단계를 추가하여 Android 버전 관리가 명확하게 이뤄지도록 개선했습니다.
- 위 변경을 통해 Android 프로덕션 빌드의 일관성과 관리 효율성을 높였습니다.

<!--
## test 완료 여부 (선택)

## 작동 스크린샷 (선택)

## 리뷰 요구사항 (선택)
-->
