import re

with open(r'C:\MyProject\crmp\jia-pro\src\data\proposal-data.ts', encoding='utf-8') as f:
    text = f.read()

# Find all slides and their page numbers + types
slides = re.findall(
    r"id:\s*'(slide-\d+)'.*?pageNumber:\s*(\d+).*?type:\s*'(\w+)'",
    text, re.DOTALL
)

# Get cards page numbers
cards_pages = [int(page) for sid, page, stype in slides if stype == 'cards']

out = []
for p in sorted(cards_pages):
    # Find block for this page
    m = re.search(rf"pageNumber:\s*{p},", text)
    if not m:
        continue
    start = m.start()
    # Find next slide
    next_m = re.search(r"\n\s*\{\s*\n\s*id:\s*'slide-", text[start+30:])
    end = start + 30 + next_m.start() if next_m else len(text)
    block = text[start:end]
    
    # Title
    title_m = re.search(r"title:\s*'([^']*)'", block)
    title = title_m.group(1) if title_m else '?'
    
    # Count cards items
    items = re.findall(r"title:\s*'[^']*'", block)
    item_count = len(items) - 1  # minus the main title
    
    # Check for specific fields
    has_subtitle = bool(re.search(r"subtitle:", block))
    has_description = bool(re.search(r"description:", block))
    has_icon = bool(re.search(r"icon:", block))
    has_highlight = bool(re.search(r"highlight:", block))
    has_bottomMessage = bool(re.search(r"bottomMessage:", block))
    has_badge = bool(re.search(r"badge:", block))
    has_items_nested = bool(re.search(r"items:\s*\[", block))
    
    # Count string content density
    strings = re.findall(r"'([^']{3,})'", block)
    density = sum(len(s) for s in strings)
    
    fields = []
    if has_subtitle: fields.append('subtitle')
    if has_description: fields.append('description')
    if has_icon: fields.append('icon')
    if has_highlight: fields.append('highlight')
    if has_bottomMessage: fields.append('bottomMessage')
    if has_badge: fields.append('badge')
    
    out.append(f"{'='*70}")
    out.append(f"  p.{p:2d} | {title}")
    out.append(f"{'='*70}")
    out.append(f"  카드 수: ~{item_count}개")
    out.append(f"  사용 필드: [{', '.join(fields)}]")
    out.append(f"  콘텐츠 밀도: {density}자")
    out.append("")

with open(r'C:\MyProject\crmp\jia-pro\prompts\cards_analysis.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))
