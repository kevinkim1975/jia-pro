# Claude Code 작업 지시 — TocSlide 통합 검증

## 프로젝트
경로: C:\MyProject\crmp\jia-pro
파일: src/components/slides/TocSlide.tsx (v0.dev에서 생성한 새 코드로 교체 완료)

## 작업 목적
v0.dev에서 생성한 TocSlide(Editorial Sidebar 디자인)를 기존 프로젝트에 통합.
파일은 이미 저장됨. 빌드 호환성과 레이아웃 충돌만 확인/수정.

## 확인 및 수정 사항 (순서대로)

### 1. 빌드 확인
`npm run build` 실행하여 TypeScript/import 에러 확인.
에러 있으면 보고 후 수정안 제시 (무단 수정 금지).

### 2. 레이아웃 충돌 점검
proposal-viewer.tsx에서 toc 슬라이드의 부모 구조:
```
<div className="max-w-[1280px] px-4 md:px-6 lg:px-8">  ← 부모 패딩
  <div className="flex items-center">                     ← 수직 중앙
    <div className="w-full">
      <TocSlide ... />
    </div>
  </div>
</div>
```

TocSlide 내부에 `px-16 py-14`가 있음 → 부모 패딩과 이중 적용될 수 있음.
실제 렌더링에서 양쪽 여백이 과도한지 확인.

### 3. 높이 충돌 점검
TocSlide에 `min-h-[720px]`과 `h-full`이 있음.
부모가 `flex items-center`로 수직 중앙 정렬하는데, min-h가 뷰포트보다 클 경우
스크롤이 생기거나 푸터를 밀어낼 수 있음.
헤더(44px) + 푸터(44px) = 88px 제외한 가용 높이 내에서 동작하는지 확인.

### 4. 하단 "Proposal" 텍스트 충돌
TocSlide 내부 맨 아래에 "Proposal" 라벨이 있음.
progress-footer.tsx가 이미 존재하므로 중복/겹침 여부 확인.
겹치면 TocSlide 내부의 footer 영역 제거를 제안 (사용자 승인 후 수정).

### 5. sampleItems 기본값
`items = sampleItems` 기본값이 있음.
proposal-data.ts에서 실제 데이터가 항상 전달되므로 런타임 문제는 없지만,
타입 호환성 확인: `readonly TocItem[]` vs `TocItem[]`.

## 규칙
- 코드 수정이 필요한 경우 반드시 보고 후 사용자 승인을 받을 것
- 무단 수정 절대 금지 (Boris Cherny 방법론)
- 빌드 결과와 발견 사항을 항목별로 보고할 것
