# 레이아웃 스크롤 문제 완전 해결

## 목표
모든 슬라이드가 스크롤 없이 100vh 안에 표시

## 현재 문제
1. proposal-viewer.tsx: min-h-screen + min-h-[900px] → 스크롤 허용
2. SlideWrapper.tsx: min-h-[calc(100vh-244px)] → 부모 고정 없어서 무의미
3. 헤더 114px + 푸터 131px = 245px (너무 큼)

---

## 수정 1: src/components/proposal-viewer.tsx

라인 63 부근, return문 내부 수정:

```tsx
// 변경 전
<div className="min-h-screen flex flex-col bg-surface">
  <TopbarHeader ... />
  <main className="flex-1 px-4 py-8 md:px-6 lg:px-8">
    <div className="max-w-[1280px] mx-auto">
      <div>
        <div className="p-8 md:p-12 lg:p-16 min-h-[900px]">

// 변경 후
<div className="h-screen flex flex-col bg-surface overflow-hidden">
  <TopbarHeader ... />
  <main className="flex-1 overflow-hidden">
    <div className="h-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
      <div className="h-full">
        <div className="h-full">
```

핵심:
- min-h-screen → h-screen
- overflow-hidden 추가
- min-h-[900px] 삭제
- 모든 내부 div에 h-full

---

## 수정 2: src/components/SlideWrapper.tsx

```tsx
// 변경 전
<div className="flex flex-col justify-center items-center min-h-[calc(100vh-244px)] w-full px-6 md:px-8 lg:px-12 py-8 ...">

// 변경 후  
<div className="flex flex-col justify-center items-center h-full w-full px-4 md:px-6 lg:px-8 overflow-auto ...">
```

핵심:
- min-h-[calc(100vh-244px)] → h-full
- overflow-auto 추가
- 패딩 축소

---

## 수정 3: src/components/topbar-header.tsx

```tsx
// 변경 전
<header className="h-[114px] shrink-0 flex items-center px-6 gap-6 bg-primary">
  <div className="w-16 h-16 rounded-lg ...">
    <span className="text-3xl">정</span>
  </div>
  <h1 className="text-2xl md:text-3xl ...">

// 변경 후
<header className="h-14 shrink-0 flex items-center px-4 gap-4 bg-primary">
  <div className="w-9 h-9 rounded-lg ...">
    <span className="text-lg">정</span>
  </div>
  <h1 className="text-base md:text-lg ...">
```

우측 버튼/페이지번호도 축소:
- Button size="lg" → size="sm"
- 텍스트 text-xl → text-sm
- 페이지번호 px-5 py-2.5 → px-3 py-1.5

---

## 수정 4: src/components/progress-footer.tsx

```tsx
// 변경 전
<div className="h-[130px] flex items-center justify-between px-6 ...">
  <Button className="h-14 px-8 ...">
    <span className="text-lg">이전 페이지</span>
  </Button>
  <span className="text-4xl font-bold ...">  // 현재 페이지

// 변경 후
<div className="h-14 flex items-center justify-between px-4 ...">
  <Button className="h-9 px-4 ...">
    <span className="text-sm">이전 페이지</span>
  </Button>
  <span className="text-xl font-bold ...">  // 현재 페이지
```

아이콘도 축소: h-6 w-6 → h-4 w-4

---

## 수정 5: src/components/slide-renderers.tsx (DividerSlide만)

라인 140 부근 DividerSlide 함수:

```tsx
// 변경 전
<span className="text-[400px] ...">  // 워터마크
<span className="text-sm ...">ACT {act}</span>
<h1 className="text-7xl md:text-8xl lg:text-9xl ...">
<p className="text-2xl md:text-3xl ...">

// 변경 후
<span className="text-[180px] ...">  // 워터마크 축소
<span className="text-xs ...">ACT {act}</span>
<h1 className="text-4xl md:text-5xl ...">
<p className="text-base md:text-lg ...">
```

py-16 → py-4 또는 py-6으로 축소

---

## 최종 높이 계산
- 헤더: 56px (h-14)
- 푸터: 57px (h-14 + 1px progress)
- 콘텐츠: calc(100vh - 113px)
- 총: 정확히 100vh, 스크롤 없음!

## 수정 순서
1. proposal-viewer.tsx (핵심 구조)
2. SlideWrapper.tsx
3. topbar-header.tsx
4. progress-footer.tsx
5. slide-renderers.tsx (DividerSlide)
