# .gitignore 설정 업데이트

## 변경 사항 요약

프로젝트의 .gitignore 설정을 업데이트하여 불필요한 파일들이 저장소에 포함되지 않도록 수정했습니다.

### 추가된 ignore 항목

1. 환경 변수 파일

   - `.env`
   - 이유: 보안상 민감한 정보 보호

2. Native Build Output

   - `/ios`
   - `/android`
   - 이유:
     - `bun android` 등 로컬 빌드 명령어를 통해 필요할 때마다 생성 가능
     - `app.json`을 통한 CNG(Continuous Native reGeneration)가 가능하므로 빌드 결과물을 저장소에 포함할 필요가 없음
     - 네이티브 코드 변경이 필요한 경우 `app.json`의 플러그인 설정을 통해 관리

3. Tamagui Build Output
   - `.tamagui/`
   - 이유: 빌드 시 자동 생성되는 파일들이므로 저장소에 포함할 필요가 없음

## 기대 효과

1. 저장소 크기 감소
2. 보안 강화
3. 빌드 결과물로 인한 충돌 방지
4. 클린한 저장소 관리
5. 네이티브 코드 변경사항의 중앙화된 관리 (`app.json`)

## 테스트 필요 사항

1. `bun android` 명령어로 안드로이드 빌드 정상 동작 확인
2. 환경 변수 설정 가이드 문서화 필요
3. Tamagui 빌드 프로세스 정상 동작 확인
4. `app.json` 플러그인 설정으로 네이티브 모듈 추가 테스트

## Breaking Changes

- 기존 빌드 결과물이 삭제되므로, 팀원들에게 관련 내용 공지 필요
- 환경 변수 파일 템플릿 제공 필요 (.env.example)
- 네이티브 코드 수정이 필요한 경우 `app.json`을 통해 관리하도록 가이드 필요

## 관련 이슈

- #저장소\_관리
- #빌드*시스템*개선
