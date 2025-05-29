## Summary

GitHub Actions workflow를 개선하여 Android 빌드 및 배포 프로세스를 최적화했습니다. 주요 변경사항은 Fastlane 통합 방식 개선, JDK 및 Android SDK 설정 추가, 그리고 빌드 출력 형식 변경입니다.

## PR 유형 및 세부 작업 내용

- [x] 빌드 부분 혹은 패키지 매니저 수정

  - Fastlane action인 `maierj/fastlane-action@v3.1.0` 사용
  - JDK 17 및 Android SDK 설정 단계 추가
  - 빌드 출력을 `.aab` 형식으로 변경 -> `fastlane run supply ...` 단계에서 validation error 피함
  - Ruby 설치 및 캐싱 설정 개선

- [x] 문서 수정
  - npm vs GitHub 설치 가이드 문서 추가
  - `.gitignore` 업데이트

## 세부 변경사항

1. GitHub Actions Workflow 개선:

   - JDK 17 및 Android SDK 설정 추가
   - Fastlane 통합을 GitHub Action으로 변경
   - 빌드 출력을 `.aab` 형식으로 변경
   - Ruby 설치 및 캐싱 설정 최적화

2. 문서 및 설정:
   - npm vs GitHub 설치 가이드 문서 추가
   - `.gitignore`에 fastlane 관련 항목 추가
   - Gemfile 의존성 수정 (`obstruct` → `ostruct`)

## 테스트 완료 여부

- [x] GitHub Actions workflow 테스트 완료
- [x] Fastlane supply action 테스트 완료
