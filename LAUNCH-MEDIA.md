# Reviewed launch media

## Required retake (v0.1.12 public build)

Replace these four homepage assets on **installed public v0.1.12** (sidebar About must show v0.1.12, not internal build numbers):

| File | Scene |
|------|--------|
| `public/screenshots/app/services-preview.jpg` | Services dashboard |
| `public/screenshots/app/projects-preview.jpg` | Projects list with **my-shop.test** |
| `public/screenshots/app/project-details-preview.jpg` | Project details: HTTP/HTTPS health, document root |
| `public/screenshots/app/project-php-preview.jpg` | Per-site PHP dropdown |

**Sample project:** folder `D:\work\my-shop`, hostname `my-shop.test` (outside `www`; do not use `www/a` or `a.test`).

Do not edit version labels, health badges, or status into captures. Exclude private paths from frame.

## Open Graph (social preview)

Static images live under `public/og/` and are wired per page via `ogImage` in `buildPageMetadata`.

## Gallery

Additional PNGs under `public/screenshots/app/` are listed by `listGalleryImages()` for the homepage gallery.
