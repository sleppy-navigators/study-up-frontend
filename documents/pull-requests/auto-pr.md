# 풀 리퀘스트(PR)

## 요약

- `.github/workflows/build.yml` 파일을 bun 패키지 매니저 기반으로 리팩터링했습니다.
- `expo-cli`와 포크된 `eas-cli`(`sleppy-navigators/eas-cli`)를 bun으로 전역 설치하도록 변경했습니다.
- expo-github-action의 동작(ENOSPC 패치, EXPO_TOKEN 환경 변수, bun 캐시 등)을 최대한 동일하게 재현했습니다.

## 관련 이슈

- 해당 없음

## 주요 변경사항

- expo/expo-github-action 사용 제거
- bun 기반 글로벌 expo-cli, eas-cli 설치 단계 추가
- Ubuntu 환경에서 ENOSPC 패치 적용
- eas/expo 명령어에 EXPO_TOKEN 환경 변수 적용
- bun 글로벌 캐시 사용으로 캐싱 방식 변경

## 테스트 계획

- Ubuntu, MacOS 러너에서 워크플로우가 정상적으로 동작하는지 확인했습니다.
- expo, eas 명령어가 모두 인증된 상태로 사용 가능한지 검증했습니다.

## 체크리스트

- [x] 코드 빌드 및 CI 통과
- [x] 두 OS 환경에서 워크플로우 테스트 완료
- [x] 필요시 문서화 반영

## 추가 참고사항

- 이 PR은 워크플로우가 커스텀/포크된 EAS CLI 버전도 지원하도록 개선합니다.
- 앱 코드 변경 없이 CI/CD 워크플로우만 수정되었습니다.
