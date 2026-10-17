# DevStackBox launch media

Generated assets use `scripts/generate-launch-media.py`. Run with Python 3 and Pillow/CairoSVG installed.

## Created

- `public/screenshots/app/dashboard-light-1536x912.png` — real dashboard with Apache and MySQL running.
- `public/screenshots/app/dashboard-dark-1202x831.png` — real dashboard in dark theme, services stopped.
- `public/screenshots/app/services-dark-1202x831.png` — real services page in dark theme.
- `public/screenshots/app/php-versions-dark-1202x831.png` — PHP 8.3 active, PHP 8.5 available, PHP 8.4 installed.
- `public/screenshots/app/php-85-download-1202x831.png` — PHP 8.5 download in progress.
- `public/screenshots/app/php-85-active-dark-1202x831.png` — PHP 8.5 switched active.
- `public/screenshots/app/php-ini-config-dark-1202x831.png` — php.ini editor with backup control visible.
- `public/screenshots/app/xampp-import-wizard-dark-1202x831.png` — import wizard with XAMPP folders detected.
- `public/screenshots/app/dashboard-hi-dark-1202x831.png` — Hindi dashboard.
- `public/screenshots/app/logs-apache-light-1202x831.png` and `terminal-light-1202x831.png` — log viewer and terminal.
- `public/og/` — six 1200×630 page preview images.
- `public/product-hunt/` — 240×240 thumbnail and five 1270×760 gallery compositions.
- `public/brand/devstackbox-logo-512.png` and `devstackbox-logo-1024.png` — transparent PNG logo exports.
- `public/brand/founder-400.png` — 400×400 crop of the current portrait published on the Nomad Programmer about page.
- `public/media/devstackbox-vs-xampp-vs-laragon-1200x630.png` — comparison graphic.
- `public/media/feature-tour.gif` — compact loop of real app screens, under 10 MB.
- `public/media/youtube-thumbnail-1280x720.png` — YouTube thumbnail.
- `../DevStackBox/.github/social-preview.png` — 1280×640 GitHub social preview.

The marketing compositions embed the current app capture. It shows Apache and MySQL running, Apache 2.4.65, MySQL 8.4.11, and PHP 8.3.31 ready. The current website stack metadata says PHP 8.3.31 is bundled, with PHP 8.1–8.5 supported.

## Release facts

- Fresh install: DevStackBox 0.1.11; Apache 2.4.65; MySQL 8.4.11 LTS; PHP 8.3.31; phpMyAdmin 5.2.2. PHP 8.1, 8.2, 8.4, and 8.5 can be added in the app.
- Local installer: `C:\xampp\htdocs\DevStackBox\src-tauri\target\release\bundle\nsis\DevStackBox_0.1.11_x64-setup.exe`
- Installer size: 183,289,048 bytes (174.8 MiB).
- SHA-256: `3BBA3B4AEB6FA727B99EDFFFC2882D2D7A416D8E30D23E6D74A2FA4A6761BEBF`
- Founder bio: **Shiv Singh (Nomad Programmer) builds practical software and open-source tools for developers, with a focus on PHP and Windows.**

## Still needs a fresh, real app capture

Still capture from the current release: XAMPP import success; virtual host and SSL; logged-in phpMyAdmin with the correct MySQL version; browser `phpinfo()`; installer. The app's import wizard shows `C:\xampp` and `C:\XAMPP` as separate entries even though Windows treats those paths as the same location, and each shows 91+ entries. I left the copy operation untouched. phpMyAdmin currently asks for a login, and no credentials were supplied. The feature-tour GIF is a sequence of screenshots rather than a recording of installation and localhost; a full demo video/GIF still needs a real screen recording.

The 60–90 second MP4 still needs a recording of the actual install and PHP switch workflow. The repository's existing `public/docs-images/demo.gif` is not overwritten. The GitHub preview is ready at `.github/social-preview.png`; the browser's upload chooser did not become available to the automation, so the repo setting was not changed.
