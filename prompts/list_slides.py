import re

with open(r'C:\MyProject\crmp\jia-pro\src\data\proposal-data.ts', encoding='utf-8') as f:
    text = f.read()

slides = re.findall(
    r"id:\s*'(slide-\d+)'.*?pageNumber:\s*(\d+).*?type:\s*'(\w+)'",
    text, re.DOTALL
)

from collections import defaultdict
groups = defaultdict(list)
for sid, page, stype in slides:
    groups[stype].append(int(page))

out = []
for stype in ['twoColumn', 'cards']:
    pages = sorted(groups[stype])
    out.append(f"\n{'='*60}")
    out.append(f"  {stype}: {len(pages)}장 (모두 독립 슬라이드)")
    out.append(f"{'='*60}")
    for p in pages:
        pattern = rf"pageNumber:\s*{p},.*?type:\s*'{stype}'.*?title:\s*'([^']*?)'"
        m = re.search(pattern, text, re.DOTALL)
        title = m.group(1) if m else '(제목 없음)'
        out.append(f"  p.{p:2d} | {title}")

with open(r'C:\MyProject\crmp\jia-pro\prompts\slide_list_result.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))
