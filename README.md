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

The scripts resolve the real checkout directory when launched through a Windows junction such as `C:\xampp\htdocs`.

Publish the matching app-repository documentation and `docs/images/services-current.png` before deploying this website. Hosted builds consume the app repository, not your local checkout. `DEVSTACKBOX_REF` can pin the Netlify docs clone to a branch or tag (default `main`); set the workflow checkout ref to the same revision for reproducible validation.

Optional `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` enables analytics only when configured; keep the website privacy notice aligned with the deployment. Never put GitHub tokens in public environment variables.

See [LAUNCH-MEDIA.md](LAUNCH-MEDIA.md) for the approved media and remaining optional captures. Unreviewed captures are held locally under ignored `media-review/held/` and are excluded from the public site.
