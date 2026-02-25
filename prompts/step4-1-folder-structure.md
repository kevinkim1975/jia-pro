# Step 4-1: pro-template 폴더 구조 생성

## 목표
C:\MyProject\crmp\ 하위에 pro-template/ 디렉토리를 생성하고,
현재 jia-pro 프로젝트에서 템플릿으로 사용할 파일들을 복사한다.

## 폴더 구조 생성

```
C:\MyProject\crmp\pro-template\
├── input/
│   └── (빈 폴더 — 추후 layout.md가 여기 들어감)
├── output/
│   └── (빈 폴더 — 생성된 프로젝트가 여기 나옴)
├── template/
│   ├── src/
│   │   ├── components/
│   │   │   ├── slides/          ← jia-pro의 12개 슬라이드 + shared/ 전체 복사
│   │   │   └── proposal-viewer.tsx  ← 복사
│   │   ├── app/                 ← jia-pro의 app/ 전체 복사
│   │   └── lib/                 ← jia-pro의 lib/ 폴더 있으면 복사
│   ├── config/
│   │   ├── theme.ts             ← 복사
│   │   ├── structure.ts         ← 복사
│   │   ├── meta.ts              ← 복사
│   │   └── index.ts             ← 복사
│   ├── public/                  ← jia-pro의 public/ 복사
│   ├── package.json             ← 복사
│   ├── tsconfig.json            ← 복사
│   ├── next.config.ts           ← 복사 (또는 next.config.mjs 등 실제 파일)
│   ├── tailwind.config.ts       ← 복사 (존재하면)
│   └── postcss.config.mjs       ← 복사 (존재하면)
└── generate.ts                  ← 빈 파일 생성 (Step 4-2에서 작성)
```

## 실행 규칙

1. pro-template/ 폴더가 이미 존재하면 중단하고 보고할 것
2. jia-pro에서 복사할 때 node_modules/, .next/, .git/ 제외
3. proposal-data.ts는 복사하지 않음 (이것은 generate.ts가 생성할 파일)
4. slide-renderers.tsx가 있으면 함께 복사
5. 복사 완료 후 pro-template/template/ 하위 파일 목록을 tree 형태로 보고

## 소스 경로
jia-pro 프로젝트: C:\MyProject\crmp\jia-pro\

## 절대 원칙
- git 명령 실행 금지
- jia-pro 원본 파일 수정 금지 (읽기 + 복사만)
- 복사 누락 파일이 있으면 보고 후 사용자 확인
