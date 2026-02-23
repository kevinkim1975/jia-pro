import re

with open(r'C:\MyProject\crmp\jia-pro\src\data\proposal-data.ts', encoding='utf-8') as f:
    text = f.read()

# Find all slide-level type declarations (indented exactly 6 spaces)
matches = re.findall(r"^\s{6}type:\s*'(\w+)'", text, re.MULTILINE)

counts = {}
for t in matches:
    counts[t] = counts.get(t, 0) + 1

total = sum(counts.values())
print("=" * 50)
print(f"{'장수':>4} | {'비율':>6} | {'누적':>6} | 타입")
print("-" * 50)

cumulative = 0
for k, v in sorted(counts.items(), key=lambda x: -x[1]):
    pct = v / total * 100
    cumulative += pct
    print(f"{v:4d} | {pct:5.1f}% | {cumulative:5.1f}% | {k}")

print("-" * 50)
print(f"{total:4d} | 100.0% |       | TOTAL")
