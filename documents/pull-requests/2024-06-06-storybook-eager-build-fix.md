## Summary

프로덕션 빌드 시 발생하는 Storybook 모듈 그래프 에러를 custom build step으로 해결했습니다.

(There are no new commits on this branch compared to main.)

## PR 유형 및 세부 작업 내용

- [x] 빌드 부분 혹은 패키지 매니저 수정
- [x] 문서 수정

- eas build에서 Storybook 관련 에러 해결
- custom build step 추가로 storybook.required.ts 생성 자동화

## 추가 내용

1. 빌드 타임에 withStorybook에 enabled: false 옵션을 사용하면, eas build 시 storybook.required.ts가 생성되지 않아 module graph를 그릴 때 @index.tsx에서 { view } 모듈을 찾을 수 없다는 에러가 발생하였습니다.
2. 이는 eas build에서 빌드 시 모든 파일을 포함하는 eager build 방식을 사용하기 때문이었습니다.
3. 해결 방법: custom build step을 eas.json에 정의하여, 빌드 과정에서 storybook.required.ts를 생성하는 step을 추가하였습니다.
