# Step 4-2.5: template 폴더 누락 파일 보충

## 목표
jia-pro에서 pro-template/template/로 빌드 필수 파일 7건을 복사한다.

## 소스 → 대상 매핑

모든 소스 루트: C:\MyProject\crmp\jia-pro\
모든 대상 루트: C:\MyProject\crmp\pro-template\template\

| # | 소스 (jia-pro 기준) | 대상 (template 기준) |
|---|---|---|
| 1 | src/types/proposal.ts | src/types/proposal.ts |
| 2 | src/components/SlideWrapper.tsx | src/components/SlideWrapper.tsx |
| 3 | src/components/progress-footer.tsx | src/components/progress-footer.tsx |
| 4 | src/components/proposal-nav.tsx | src/components/proposal-nav.tsx |
| 5 | src/components/topbar-header.tsx | src/components/topbar-header.tsx |
| 6 | src/components/chart-slide.tsx | src/components/chart-slide.tsx |
| 7 | src/components/ui/ (폴더 전체) | src/components/ui/ |

ui/ 폴더 내 파일: BackgroundPattern.tsx, button.tsx, card.tsx, sheet.tsx

## 실행 규칙

1. 대상 디렉토리가 없으면 생성 (src/types/, src/components/ui/)
2. 이미 존재하는 파일이 있으면 중단하고 보고
3. jia-pro 원본 파일 수정 금지 (읽기 + 복사만)
4. git 명령 실행 금지
5. 복사 완료 후 pro-template/template/ 전체 파일 목록을 tree로 보고
