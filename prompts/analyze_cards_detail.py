import re

with open(r'C:\MyProject\crmp\jia-pro\src\data\proposal-data.ts', encoding='utf-8') as f:
    text = f.read()

pages = [5, 28, 30, 31, 33, 34, 36, 46]
out = []

for p in pages:
    idx = text.find(f"pageNumber: {p},")
    if idx == -1:
        out.append(f"\n=== p.{p}: NOT FOUND ===")
        continue
    block = text[idx:idx+1200]
    
    title_m = re.search(r"title:\s*'([^']*)'", block)
    title = title_m.group(1) if title_m else '?'
    
    card_items = re.findall(
        r"\{\s*title:\s*'([^']*)'\s*,\s*subtitle:\s*'([^']*)'\s*,\s*description:\s*'([^']*)'\s*\}",
        block
    )
    
    bm = re.search(r"bottomMessage:\s*'([^']*)'", block)
    tone = re.search(r"tone:\s*'([^']*)'", block)
    
    out.append(f"{'='*65}")
    out.append(f"  p.{p:2d} | {title}")
    out.append(f"{'='*65}")
    out.append(f"  카드 수: {len(card_items)}개")
    for i, (t, s, d) in enumerate(card_items):
        desc_flag = f"'{d}'" if d else "(빈값)"
        out.append(f"    [{i}] title='{t}' | sub='{s}' | desc={desc_flag}")
    out.append(f"  bottomMessage: '{bm.group(1)}'" if bm else "  bottomMessage: (없음)")
    out.append(f"  tone: '{tone.group(1)}'" if tone else "  tone: (default)")
    out.append("")

with open(r'C:\MyProject\crmp\jia-pro\prompts\cards_detail.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))

print("Done")
