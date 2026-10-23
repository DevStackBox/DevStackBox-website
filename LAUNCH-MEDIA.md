# Reviewed website media

## Current capture

public/screenshots/app/services-v0.1.17-hd.jpg shows the installed public v0.1.17 Services page, captured on 2026-10-23 at native **1920 × 1032**. The capture tool supplied JPEG; the original bytes are retained without resizing or recompression. It replaces the older Services image in the hero and gallery. A matching copy in the app repository's docs/images/ is used on the documentation index.

This capture represents the released app. The pending UI wording changes will appear only in a future app build; do not label this image as showing those changes.

## Older captures and remaining retakes

| Existing file | Scene | Status |
| --- | --- | --- |
| projects-preview.jpg | Connected projects | Earlier release, 1202 × 831; native HD retake pending |
| project-details-preview.jpg | Project health and document root | Earlier release, 1202 × 831; native HD retake pending |
| project-php-preview.jpg | Per-site PHP selector | Earlier release, 1202 × 831; native HD retake pending |
| services-preview.jpg | Services | Superseded by the v0.1.17 HD capture; retained for older references |
| php-85-download-1202x831.png | PHP download | Historical capture; not automatically included in the gallery |

Use a clean demonstration project outside www for future project captures. Do not publish private paths, credentials, logs or unrelated windows. Do not edit version labels or health results into a screenshot. Capture the final running build and record its actual version; do not manufacture a new release for documentation work.

## Quality and rendering

- Prefer native PNG captures at least 1920 pixels wide when available. Never upscale a smaller image or describe JPEG converted to PNG as lossless.
- Review original files at 100% and at their rendered size. ProductImage serves original files without Next.js lossy image optimization, preserves aspect ratio and caps the enlarged dialog at the source width.
- Every gallery image can be enlarged and opened as an original. Historical screenshots remain labeled. This improves access to the available detail but does not restore detail missing from old captures.
- Update native width and height alongside an asset when replacing it.

## Open Graph and gallery

Social preview assets live under public/og/ and are selected through ogImage in buildPageMetadata.

The screenshot gallery uses the reviewed entries in content/homepage.ts through listGalleryImages(). It does not automatically publish new files. Unreviewed captures belong in ignored media-review/held/.
