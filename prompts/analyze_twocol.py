import re

with open(r'C:\MyProject\crmp\jia-pro\src\data\proposal-data.ts', encoding='utf-8') as f:
    text = f.read()

# Get the actual twoColumn page numbers from the real count
pages_to_check = [8, 9, 20, 21, 22, 24, 29, 32, 40, 43, 47]

out = []
for p in pages_to_check:
    # Find the slide block
    pattern = rf"pageNumber:\s*{p},\s*\n\s*act:.*?type:\s*'twoColumn'(.*?)(?=\n\s*\{{\s*\n\s*id:|$)"
    m = re.search(rf"pageNumber:\s*{p},.*?type:\s*'twoColumn'", text, re.DOTALL)
    if not m:
        out.append(f"p.{p}: NOT twoColumn")
        continue
    
    # Count items in left and right
    # Find from this page to next slide
    start = m.start()
    next_slide = re.search(r"\n\s*\{\s*\n\s*id:\s*'slide-", text[start+50:])
    end = start + 50 + next_slide.start() if next_slide else len(text)
    block = text[start:end]
    
    # Count left items
    left_items = len(re.findall(r"left:.*?items:.*?\[.*?\{", block, re.DOTALL))
    # Count right items  
    right_items = len(re.findall(r"right:.*?items:.*?\{", block, re.DOTALL))
    
    # Get title
    title_m = re.search(r"title:\s*'([^']*)'", block)
    title = title_m.group(1) if title_m else '?'
    
    # Check bottomMessage content
    bm = re.search(r"bottomMessage:\s*'([^']*)'", block)
    bottom = bm.group(1)[:30] if bm else 'None'
    
    # Count total string literals as proxy for content density
    strings = re.findall(r"'([^']{5,})'", block)
    content_density = sum(len(s) for s in strings)
    
    out.append(f"p.{p:2d} | density:{content_density:4d}자 | bottom:{bottom:>30s} | {title}")

out.sort(key=lambda x: int(x.split('density:')[1].split('자')[0]), reverse=True)

with open(r'C:\MyProject\crmp\jia-pro\prompts\twocol_density.txt', 'w', encoding='utf-8') as f:
    f.write("콘텐츠 밀도순 정렬 (높을수록 복잡한 슬라이드)\n")
    f.write("="*90 + "\n")
    f.write('\n'.join(out))
