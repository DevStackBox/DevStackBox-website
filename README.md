# DevStackBox Website

Marketing site and documentation for [DevStackBox](https://www.devstackbox.com), built with Next.js and Fumadocs.

**Repository:** [github.com/DevStackBox/DevStackBox-website](https://github.com/DevStackBox/DevStackBox-website)

Documentation content lives in the [DevStackBox](https://github.com/DevStackBox/DevStackBox) app repository and is consumed at build time.

## Local development

Clone both repositories side by side:

```text
Projects/
├── DevStackBox/
└── devstackbox-website/
```

```bash
cd devstackbox-website
pnpm install
pnpm dev
```

Set `DEVSTACKBOX_ROOT` if your app repo is elsewhere:

```bash
DEVSTACKBOX_ROOT=../DevStackBox pnpm dev
```

## Environment variables

| Variable | Description |
| -------- | ----------- |
| `DEVSTACKBOX_ROOT` | Path to DevStackBox app repo (default: `../DevStackBox`) |
| `GITHUB_REPO` | GitHub repo for releases API (default: `DevStackBox/DevStackBox`) |
| `GITHUB_TOKEN` | Optional - higher GitHub API rate limits |

## Deploy (Netlify)

Connect Netlify to **this repo** (`DevStackBox-website`), not the app repo.

| Setting | Value |
| ------- | ----- |
| Branch | `main` |
| Base directory | *(empty)* |
| Build command | *(empty - uses `netlify.toml`)* |
| Publish directory | *(empty - Next.js plugin)* |

Netlify clones [DevStackBox](https://github.com/DevStackBox/DevStackBox) during build for docs. See `netlify.toml`.

## Validation and publication

Use Node.js 24 and pnpm 9.15.9. Run `pnpm lint`, `pnpm test`, and `pnpm build`, then run `pnpm start` and `pnpm test:smoke` in a second terminal. The smoke check verifies all content routes, local links and anchors, public assets, search, sitemap uniqueness, and the 404 response. Set `SMOKE_BASE_URL` to check another deployment.

The scripts resolve the real checkout directory when the website folder is opened through a Windows directory junction.

Publish the matching app-repository documentation and approved `docs/images/` captures before deploying this website. Hosted builds consume the app repository, not your local checkout. `DEVSTACKBOX_REF` can pin the Netlify docs clone to a branch or tag (default `main`); set the workflow checkout ref to the same revision for reproducible validation.

Optional `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` enables analytics only when configured; keep the website privacy notice aligned with the deployment. Never put GitHub tokens in public environment variables.

See [LAUNCH-MEDIA.md](LAUNCH-MEDIA.md) for the approved media and remaining optional captures. Unreviewed captures are held locally under ignored `media-review/held/` and are excluded from the public site.

## Release content

Project, per-site PHP and HTTPS guidance syncs from the app docs. Public v0.1.17 includes the Apache parent `.htaccess` policy fix; earlier releases added verified PHP patch upgrades, exact version labels and project diagnostics. The current documentation explains external project folders, document roots, localhost URLs and the limits of full backups. Pending UI copy changes do not constitute a new app release. Screenshot capture history and remaining retakes are recorded in LAUNCH-MEDIA.md. Download URLs, dates, hashes and asset sizes remain sourced from published GitHub releases; never hard-code an unpublished asset as available.

See LAUNCH-MEDIA.md for capture provenance. Use `DEVSTACKBOX_ROOT` to point preparation at the app checkout. Run `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm test:smoke` against the production server before deployment.

Before each deploy after an app release, re-run `node scripts/prepare-content.mjs` so docs and changelog match the app repository revision pinned by `DEVSTACKBOX_REF` (Netlify) or your local clone.
