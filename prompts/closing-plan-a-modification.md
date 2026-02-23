# ClosingSlide — Modification Request

## CHANGE SUMMARY
The `subtitle` prop content has changed. It is no longer a short tagline — it is a **two-line philosophical quote** that serves as the emotional core of the slide.

---

## UPDATED SAMPLE DATA

```tsx
const sampleData = {
  title: "감사합니다",
  subtitle: "맞는 방향이 올바른 프로세스를 만날 때,\n성공하는 의료기관을 만듭니다.",
  contact: {
    email: "contact@howon.co.kr",
    person: "대표 컨설턴트",
  },
  company: "호원앤컴퍼니",
}
```

---

## REQUIRED CHANGES

### 1. Subtitle rendering
- The `\n` in `subtitle` must create a **visible line break**
- Use `style={{ whiteSpace: "pre-line" }}` on the subtitle element
- Font size: **22~28px** (larger than before — this is a quote, not a tagline)
- Line-height: **1.6~1.8** for breathing room between the two lines
- Color: **#475569** or **#64748B** (slightly darker than typical subtitle for gravitas)
- The subtitle is the **emotional anchor** of the slide — second only to the title in visual hierarchy

### 2. Spacing adjustment
- Increase margin between `title` and `subtitle` to **20~28px** (the quote needs room to breathe)
- The divider between subtitle and contact section may need slight downward shift to accommodate the longer subtitle

### 3. Everything else stays the same
- Title, contact block, company, PROPOSAL label — no changes
- All geometric elements, animations, positions — no changes
- Props interface — no changes

---

## DO NOT CHANGE
- Geometric decorative elements (positions, colors, animations)
- Title styling
- Contact block layout
- PROPOSAL label
- Component structure and export signature
