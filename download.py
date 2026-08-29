import urllib.request
import os

os.makedirs('apps/web-user/public/partners', exist_ok=True)
urls = [
    "http://putrasegantisetungguan.com/img/logo/KLPM.webp",
    "http://putrasegantisetungguan.com/img/logo/logo-takari.webp",
    "http://putrasegantisetungguan.com/img/logo/Mitsubishi_motors.webp",
    "http://putrasegantisetungguan.com/img/logo/orix.webp",
    "http://putrasegantisetungguan.com/img/logo/mnc.webp",
    "http://putrasegantisetungguan.com/img/logo/interbat.webp",
    "http://putrasegantisetungguan.com/img/logo/nestle.webp",
    "http://putrasegantisetungguan.com/img/logo/cakrawala.webp",
    "http://putrasegantisetungguan.com/img/logo/mobrent.webp",
    "http://putrasegantisetungguan.com/img/logo/moladin.webp",
    "http://putrasegantisetungguan.com/img/logo/hyundai.webp",
    "http://putrasegantisetungguan.com/img/logo/plaza_toyota.webp"
]

for url in urls:
    name = url.split('/')[-1]
    urllib.request.urlretrieve(url, f"apps/web-user/public/partners/{name}")

