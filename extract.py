import json
from bs4 import BeautifulSoup

with open('index.html', 'r') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

# Partner images
partner_imgs = []
# Find a section that contains "Partner Kami" or similar
for div in soup.find_all(['section', 'div']):
    text = div.get_text()
    if 'Partner Kami' in text or 'Mitra Kami' in text or 'Dipercaya Oleh' in text:
        imgs = div.find_all('img')
        for img in imgs:
            src = img.get('src')
            if src and 'logo' not in src.lower() and 'icon' not in src.lower() and src not in partner_imgs:
                partner_imgs.append(src)

# Let's just find all images in case
all_imgs = [img.get('src') for img in soup.find_all('img')]

# FAQ
faqs = []
for button in soup.find_all('button'):
    # In Tailwind, FAQs usually use buttons for accordion
    q_span = button.find('span')
    if q_span:
        ans_div = button.find_next_sibling('div')
        if ans_div and ans_div.find('p'):
            faqs.append({
                'q': q_span.get_text(strip=True),
                'a': ans_div.get_text(strip=True)
            })

# CTA
cta_sections = []
for section in soup.find_all('section'):
    text = section.get_text(strip=True)
    if 'Hubungi' in text or 'Siap' in text or 'Sekarang' in text:
        if len(text) < 1000:
            cta_sections.append(text)

print(json.dumps({
    'all_imgs': list(set(all_imgs)),
    'faqs': faqs,
    'cta_sections': cta_sections[-2:] if len(cta_sections) > 0 else []
}, indent=2))
