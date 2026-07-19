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
