# Step 4-3: 배치 빌드 스크립트 작성

## 목표
pro-template/build.ts를 작성한다.
이 스크립트 하나로 layout.md → 완전한 Next.js 프로젝트 생성까지 자동화한다.

## 실행 흐름

```
1. input/layout.md 존재 확인 → 없으면 에러 메시지 출력 후 종료
2. output/ 폴더가 있으면 내부 전체 삭제 (폴더 자체는 유지)
3. template/ 전체를 output/에 복사 (node_modules 제외)
4. generate.ts 실행: input/layout.md → output/src/data/proposal-data.ts 생성
   (주의: 기존 generate.ts는 template/src/data/에 쓰지만, build.ts에서는 output/src/data/에 써야 함)
5. 완료 메시지 출력: 슬라이드 수, 총 페이지 수, output 경로
```

## 기술 요구사항

- TypeScript (tsx 또는 ts-node로 실행)
- 외부 의존성 없음 (fs, path, child_process만 사용)
- generate.ts의 파싱 로직을 import하거나, child_process.execSync로 generate.ts 실행
  → 어느 방식이든 output/src/data/proposal-data.ts에 최종 결과가 있어야 함
- 에러 발생 시 어느 단계에서 실패했는지 명확히 출력

## 파일 경로 (모두 절대경로 기준)

- 스크립트: C:\MyProject\crmp\pro-template\build.ts
- 입력: C:\MyProject\crmp\pro-template\input\layout.md
- 템플릿: C:\MyProject\crmp\pro-template\template\
- 출력: C:\MyProject\crmp\pro-template\output\
- 파서: C:\MyProject\crmp\pro-template\generate.ts

## output/ 결과물 요구사항

output/ 폴더는 독립된 Next.js 프로젝트여야 한다:
- output/에서 npm install → npm run build 성공
- output/을 별도 git 레포에 커밋 → Vercel 배포 가능
- jia-pro 또는 pro-template에 대한 의존성 없음

## 절대 원칙
- git 명령 실행 금지
- jia-pro 원본 파일 수정 금지
- template/ 폴더 내용 수정 금지 (읽기 + 복사만)
