## Summary

- Changed the build workflow to be **manual-only** by removing the `push` trigger and keeping only `workflow_dispatch`.
- This prevents errors related to missing workflow inputs when triggered by a push event.
- Related to CI/CD reliability and workflow usability improvements.

## PR 유형 및 세부 작업 내용

- [x] 빌드 부분 혹은 패키지 매니저 수정
- [x] 문서 수정 (워크플로우 문서)

- `.github/workflows/build.yml` 파일에서 `push` 트리거를 제거하고, 오직 수동 실행(`workflow_dispatch`)만 가능하도록 변경했습니다.
- `runs-on` 필드가 입력값에만 의존하도록 하여, 자동 실행 시 발생하던 에러(`Unexpected value ''`)를 방지합니다.

<!--
## test 완료 여부 (선택)
- 워크플로우가 수동 실행에서 정상 동작함을 확인했습니다.

## 작동 스크린샷 (선택)

## 리뷰 요구사항 (선택)
- 워크플로우 트리거 방식 변경에 대한 추가 의견이 있으시면 코멘트 부탁드립니다.
-->
