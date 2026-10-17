# DevStackBox website: review and production-readiness plan

Review date: 17 October 2026. Status: proposal for your review; no implementation changes approved or made.

## 1. Recommendation

Keep the existing Next.js, React, Tailwind, and Fumadocs foundation. Improve it in stages: reliable builds and accurate information first, shared navigation/footer and page design second, then production verification. A framework rewrite is unnecessary.

The intended result is a clear, trustworthy open-source product website: visitors understand the Windows PHP stack, see real product screens, download the correct installer, find practical documentation, and know how to contribute or get help.

## 2. Evidence and review limits

- Reviewed every marketing/policy page implementation, shared components, documentation renderer/navigation, all 25 MDX documents' structure and links, key user-facing documentation content, release helpers, metadata, and deployment configuration.
- `pnpm lint` passed.
- `pnpm exec next build` from the requested C: path failed with 25 MDX loader errors: `callback(): The callback was already called.` This used existing generated content; it did not run the prebuild synchronization script.
- Final verification: `node node_modules/next/dist/bin/next build` from `D:\Websites\devstackbox-website` passed compilation, TypeScript, and generation of all 46 build outputs without code changes. The initial failure is associated with the junction-based invocation; a framework/dependency defect has not been established. Clean checkout/prebuild and hosted deployment checks remain to be done.
- `C:\xampp\htdocs` is a junction to `D:\Websites`. Starting the development server through the C: path produced malformed paths containing both drive roots and HTTP 500 responses. Starting directly from `D:\Websites\devstackbox-website` with webpack restored successful page responses. Do not assume this local path problem also occurs on Linux hosting.
- Rendered HTML confirmed duplicate headings and unresolved relative links. A successful HTTP response alone does not mean the page works correctly.
- From the real path with webpack development serving, all 38 content routes returned HTTP 200; the unknown-page check returned 404. Sitemap, robots, and the installation search API query returned 200. These are development smoke checks, not production or browser-interaction certification.
- The in-app browser rejected the local preview with `net::ERR_BLOCKED_BY_CLIENT`. Pixel-level desktop/mobile review, keyboard interaction, contrast measurements, and performance scores remain unverified. Design recommendations below are based on source structure, not claimed screenshot inspection.
- No dependency upgrades, application changes, content synchronization, commits, or deployments were performed. Build caches were generated during checks.

## 3. Fix before launch

| Priority | Finding and evidence | Planned correction |
| --- | --- | --- |
| P1 | Junction-based build/development failed; direct-path production build passed without changes. | Document reliable commands from the real path and validate a clean Linux CI checkout, including prebuild content synchronization. Avoid unnecessary framework/dependency changes for a path-specific problem. |
| P1 | `/docs` renders `href="roadmap"` and `href="faq"`, which resolve to `/roadmap` and `/faq`. The ADR index renders `001-use-tauri`, which resolves outside the ADR directory. Legacy redirects cover some other links but not these. | Normalize documentation links to canonical `/docs/...` paths. Convert repository-file references, including release scripts, to GitHub links. Crawl links and anchors after rendering. |
| P1 | `app/docs/[[...slug]]/page.tsx` hides the only documentation sidebar below `lg`; there is no replacement or visible search trigger in the custom shell. | Add accessible mobile/tablet documentation navigation and a search button using the existing search API. Add a contents panel for long pages. |
| P1 | FAQ/privacy place projects in `C:\devstackbox\www`; upgrading/installer/roadmap place them in `%LOCALAPPDATA%\DevStackBox\www`. Environment docs say virtual hosts and SSL are unavailable while feature status marks capabilities shipped. | Check released application behavior, then correct the upstream documentation and policy sources consistently. Distinguish localhost SSL from per-virtual-host HTTPS, which feature status still marks planned. |
| P1 | `findWindowsInstaller` can fall back to the first release asset, even if it is JSON, a signature, or another non-installer file. Checksum extraction is not tied to the selected asset. | Select an explicit supported Windows installer and architecture. Show a release-page fallback when absent. Associate the checksum with that exact file. Add focused tests for missing/multiple assets. |
| P1 | Comparison copy uses simplified or inaccurate competitor claims. | Rewrite comparisons using official sources, a checked date, and precise free/paid feature distinctions. Remove unsupported site-limit claims. |
| P1 | Privacy content covers the desktop application while the website can enable Plausible through an environment variable. | Describe website data handling separately from desktop telemetry, based on the actual hosting and analytics configuration. This is a content/configuration alignment task, not a completed legal review. |

## 4. Shared design and navigation

Keep the current blue accent, readable typography, light/dark themes, and authentic screenshots. Use a consistent page width, heading scale, section spacing, button system, and restrained card treatment. Reserve large decorative panels for important entry points.

Proposed header: logo, Documentation, Releases, Community, GitHub, theme switch, and one prominent Download button. Remove the current duplicate Download navigation link. Add active-page indicators and a skip-to-content link. Verify menu close behavior, focus visibility, Escape/outside-click behavior, and touch targets.

### Footer redesign

Current source structure has a brand column plus Product, Resources, and Community. Resources contains both Documentation and Legal, producing an unnecessarily tall middle column. Several links repeat the header, while migration and comparisons are hard to discover.

Proposed desktop layout:

| Brand area | Product | Resources | Community |
| --- | --- | --- | --- |
| DevStackBox logo | Download for Windows | Documentation | GitHub repository |
| Local PHP development for Windows | What's new | Installation guide | Contributing |
| Free and open source | Releases | Troubleshooting | Discussions |
| Small GitHub link | Compare alternatives | FAQ | Report an issue |
| | Migrate from XAMPP | Roadmap | Code of Conduct |

Use the existing XAMPP comparison as the initial comparison entry point, with links to Laragon and Herd. Avoid inventing an empty comparison hub.

Bottom strip: copyright and project attribution on one side; MIT License, Privacy, and Security on the other. Put the Code of Conduct link directly on `/community#code-of-conduct`. No large repeated download banner inside the footer. Keep social links limited to maintained channels.

On phones: brand first, followed by readable link groups in one or two columns as space permits; legal links wrap below. On tablets: balanced columns without a single oversized Resources section. Verify both themes and keyboard focus before acceptance.

## 5. Plan for every public page

### UI/UX direction added after your feedback

UI/UX improvement is an explicit part of this project, including the existing application screenshots and GIF demo. Preserve an authentic open-source identity with clear product information, real screenshots, accessible controls, and easy access to source code. This remains a design proposal for review before implementation.

**Homepage composition:**

1. A compact header with one Download action and clear Documentation/GitHub access.
2. A spacious hero with a concise Windows PHP development message, Download and Documentation actions, release/platform details, and one large, legible application screenshot.
3. A compact included-stack section distinguishing bundled software from optional PHP downloads.
4. Three product workflows: manage services, choose PHP versions, and import XAMPP projects. Pair each with a relevant real screenshot and a short explanation of the user's task.
5. One optional demo with a descriptive poster and an explicit play control.
6. A short installation-to-first-project sequence, linked to practical documentation.
7. A concise, sourced comparison and an open-source/community section with contribution and support links.
8. One closing download invitation followed by the balanced footer specified above.

**Use the existing media deliberately:**

| Available asset | Proposed purpose |
| --- | --- |
| `public/screenshots/app/services-dark-1202x831.png` | Candidate hero or services workflow image; select after visual inspection. |
| `public/screenshots/app/dashboard-light-1536x912.png` and `dashboard-dark-1202x831.png` | Hold pending replacement or cleanup: user reports a personal path in dashboard captures and stray top-right overlay text in the light dashboard. |
| `public/screenshots/app/php-versions-dark-1202x831.png` | Explain available PHP versions and switching. |
| `public/screenshots/app/php-85-download-1202x831.png` and `php-85-active-dark-1202x831.png` | Optional supporting sequence for download and activation; keep out of the hero to reduce clutter. |
| `public/screenshots/app/xampp-import-wizard-dark-1202x831.png` | Hold pending correction: user reports duplicate `C:\xampp` and `C:\XAMPP` entries. Re-capture after the app issue is resolved. |
| Existing logs, terminal, PHP configuration, and Hindi dashboard images | Contextual documentation illustrations; show on the homepage only if they contribute a distinct useful story. |
| `public/docs-images/demo.gif` | Do not publish this current capture: user reports MySQL 8.0.35. Replace with a clean current-release GIF or omit the demo until available. |

These assignments are based on the asset inventory and filenames; inspect each image and the GIF before final selection. Keep the original assets and create optimized derivatives only where useful. Review captures for stale versions, confusing states, or private local details before publication.

**Screenshot and animation behavior:**

- Keep application text readable, preserve aspect ratios, and avoid decorative crops that hide the task being demonstrated.
- Allow screenshots to open at a larger size through an accessible dialog with a close button, Escape support, focus management, and useful captions.
- Supply descriptive alt text and reserve image dimensions to prevent layout shifts. Prioritize only the hero; defer lower-page media.
- On phones, use a single-column flow with images below their explanations. Do not shrink a complex desktop screen and expect every label to remain readable; provide enlargement and concise explanatory text.
- Use screenshots and GIFs only for this scope; there is no existing video and an MP4 is not a launch requirement. Avoid autoplaying an endless GIF in the hero. Use a static poster and an explicit “Show animation” action; “Stop animation” replaces the GIF with the poster rather than claiming frame-accurate pause/resume.
- Respect reduced-motion preferences, provide a static alternative, and keep all essential information available without playing animation.
- Use a curated asset list with explicit captions and ordering instead of automatically publishing every matching screenshot or GIF in a folder.

**Visual consistency across pages:** use a shared content grid, restrained blue accents, consistent borders and corner radii, readable line lengths, and deliberate spacing. Give Download, documentation, release history, and policy pages layouts suited to their tasks. Keep light and dark themes equally usable. Add purposeful hover/focus states without excessive animation, rotating carousels, or unnecessary visual effects.

**Footer acceptance:** the footer is a first-class design deliverable. Review its desktop balance, mobile grouping, typography, link density, theme contrast, and transition from page content. Keep Legal in the bottom strip, use direct destinations, and remove redundant promotional blocks. Apply the same approved footer to every page.

**Review order:** first review the shared header/footer and homepage composition; then the download and documentation experiences; then apply the approved design system to the remaining pages. Finish with real browser checks at approximately 360, 390, 768, 1024, and 1440 pixels, keyboard navigation, 200% zoom, both themes, and reduced motion. Do not mark UI/UX complete until these checks are performed.

| Page | What to correct or improve |
| --- | --- |
| `/` | Reduce the current 13-section sequence to a focused story: product/CTA, included stack, three practical workflows with screenshots, getting started, concise comparison, open-source/community proof, final CTA. `FeatureShowcase` and `ScreenshotGallery` currently render the same image list; retain one curated presentation. Remove implementation-oriented copy about demos appearing “when available.” Consolidate repeated badges and version claims. |
| `/download` | Keep its useful installer details and installation link. Fix asset/checksum selection; show architecture, release date, file size, requirements, and verification instructions clearly. Explain unknown-publisher status accurately and put verification before bypass instructions. Never refer to a checksum “above” when it is absent. Keep release notes secondary. |
| `/releases` | Add stable/prerelease labels, digestible summaries, collapsible full notes, and pagination or a clear link for history older than the current 30-release limit. Keep older installers identifiable. Preserve graceful GitHub-unavailable behavior. |
| `/whats-new` | Make this the latest user-facing highlights page. The parser currently recognizes only selected headings and hyphen bullets; it can omit other sections and displays Markdown as plain text. Use a robust shared renderer and complete fallback, with links to full notes. |
| `/changelog` | Keep the complete chronological record, add version navigation and consistent heading structure, and handle repository-relative links. Avoid duplicating the purpose of Releases and What's New. |
| `/community` | Separate getting help, reporting bugs, contributing, and private security reporting. Explain that documentation, testing, and translations are welcome contributions. Keep the Code of Conduct reachable by anchor; demote its embedded H1. Retain the real maintainer identity without overstating project scale. |
| `/privacy` | Separate desktop behavior from website hosting/analytics and explain optional update/download requests accurately. Use one page heading and a maintained revision date. |
| `/security` | Clearly distinguish updater signatures from Windows Authenticode signing. Explain installer verification and the private reporting route; check supported versions and response commitments against actual maintenance practice. |
| `/license` | Preserve the exact MIT license. Explain its scope for DevStackBox and link to existing third-party notices for bundled software; do not imply every bundled component is MIT licensed. |
| `/xampp-alternative` | Expand the thin shared template into a useful Windows comparison: stack contents, PHP switching, migration, limitations, and when each tool fits. Correct the homepage's XAMPP database row. |
| `/migrate-from-xampp` | Turn the three-bullet landing page into a practical migration guide: back up, stop conflicting services, copy projects, export/import databases separately, check credentials/paths/PHP compatibility, test, and retain a rollback path. The current metadata implies database import through the wizard while the page describes manual import; reconcile this. |
| `/vs/laragon` | Add a balanced feature table, licensing context, tradeoffs, official references, and a checked date. Remove unsupported “Free tier limits” language unless specifically substantiated. |
| `/vs/herd` | Acknowledge Herd's free edition and distinguish Pro features. Compare Windows workflow, web server, database management, PHP switching, licensing, and intended audience fairly. |
| 404 | Keep Home/Docs/Download recovery links. Verify actual HTTP 404, theme consistency, focus behavior, and optional search. |

## 6. Documentation coverage

All documentation shares these changes: correct mobile navigation, visible search, one primary heading, stable anchors, readable code/tables, overflow containment, appropriate titles, and accurate previous/next/edit links. Add success/failure feedback for clipboard actions. Use document source metadata to identify `index.mdx`; the ADR index currently points its edit action at nonexistent `docs/development/adr.mdx` and misses its modification date.

| Existing document route(s), under `/docs` | Planned treatment |
| --- | --- |
| Overview (`/docs`) | Prioritize installing and running a first PHP page. Separate user guides from contributor references. Fix root-relative navigation. |
| `getting-started/installation` | Add clear first-run success checks, verified paths, requirements, and recovery links. |
| `getting-started/upgrading` | Reconcile preservation claims with released behavior; show backup and stop-services guidance, recovery, and shipped versus planned safeguards. |
| `advanced/environment` | Correct obsolete virtual-host/SSL sections; repair the malformed port-conflict table with an unescaped pipe. Check ports, credentials, paths, and networking guidance against the release. |
| `advanced/troubleshooting` | Split the combined error reference, internal issue inventory, and manual Apache replacement guide into navigable topics. Remove obsolete claims about signing and bundled versions after verification. |
| `reference/configuration` | Reconcile binary/data/project locations; provide task-based examples and restart expectations. |
| `reference/commands` | Keep as a contributor reference; provide a contents index and readable wide tables, and check commands against source. |
| `reference/installer` | Clarify actually distributed installer formats, signing, update behavior, preservation rules, and pending hardening. |
| `faq` | Correct project paths and distinguish no telemetry from optional network requests. Keep visible answers and structured FAQ data aligned. |
| `roadmap` | Lead with current, next, and later work; reconcile outdated unchecked updater tasks with feature status. Keep implementation history lower down. |
| `feature-status` | Keep the detailed source of truth, with release/date context and readable grouping. Avoid exposing internal editorial instructions as introductory user copy. |
| `development/building` | Make prerequisites and first successful build easy to follow; move broad product design rules into appropriate contributor references. |
| `development/architecture` | Keep technical depth, improve navigation and diagram readability, and validate described boundaries against the application. |
| `development/components` | Maintain as contributor inventory; avoid duplicating the architecture guide. |
| `development/coding-standards` | Consolidate the five top-level headings into a clear hierarchy and add a contents index. |
| `development/release-process` | Fix links to build scripts; align the checklist with the release runbook and actual workflow. |
| `development/release-runbook` | Keep executable release steps current and link back to the conceptual checklist. |
| `development/testing` | Reconcile “planned” tests with current repository reality; distinguish automated checks from manual installer verification. |
| `development/adr` | Fix all six relative ADR links, edit source path, and last-updated lookup. |
| `development/adr/001-use-tauri` | Improve title capitalization and heading hierarchy; retain historical decision context. |
| `development/adr/002-use-tailwind-shadcn` | Same presentation corrections; verify current/superseded status. |
| `development/adr/003-no-redux` | Same; preserve rationale rather than rewriting history as current marketing. |
| `development/adr/004-polling-over-events` | Clarify historical scope and relationship to any subsequently shipped event streaming. |
| `development/adr/005-php-first-scope` | Keep product-scope decision clear and dated. |
| `development/adr/006-app-data-separation` | Reconcile current path guidance while retaining the original decision and migration context. |

Documentation is copied from the sibling DevStackBox repository. Edit original MDX/policy/navigation sources there during implementation, then regenerate; editing ignored generated copies alone will lose changes. Website-specific navigation should not remain unnecessarily coupled to the app's documentation navigation.

## 7. Production engineering and SEO

- Normalize Markdown line endings before stripping a leading title. Rendered Changelog, Privacy, and Security currently each contain two H1 elements; the existing regex does not handle the observed CRLF content. Docs also add a wrapper H1 while retaining document H1s.
- Centralize release/version facts. Structured data hardcodes `softwareVersion: 0.1.11`, and multiple descriptions hardcode stack versions independently.
- Preserve complete homepage Open Graph metadata: `app/layout.tsx` replaces the helper's `openGraph` object and drops fields such as its description and URL.
- Deduplicate `/docs` in the sitemap and use genuine content modification dates rather than `new Date()` for every URL. Verify canonical URLs, redirects, social images, and favicon outputs.
- Validate that structured search actions correspond to a usable search experience. Avoid advertising `/docs?q=...` without confirming it opens results.
- Add bounded GitHub request timeouts and useful server-side error logging while retaining fallback links. Verify unavailable API, missing asset, empty body, and prerelease cases.
- Audit which generated files are available in the deployed server bundle, including root Markdown content. Currently explicit tracing includes docs only; do not assume this proves a deployed failure, but test it.
- Pin/document runtime and package-manager versions, use a locked dependency installation, and validate from a clean checkout. Local Node is 24 while deployment config specifies 20; select a currently supported runtime after compatibility verification.
- Make CI run on pull requests, with lint, type checks, production build, route/link checks, and a small set of critical browser tests. The workflow called “Deploy Website” currently builds but does not itself deploy; document the real Netlify deployment and docs/release webhook path.
- Make upstream documentation inputs reproducible by recording or pinning the app revision. Fail clearly when required navigation/policy files are missing instead of silently publishing “Content not found.”
- Review deployment headers, HTTPS/canonical-host redirects, cache behavior, preview indexing, and a CSP compatible with the actual scripts. Test any policy before enforcement.
- Measure images, fonts, JavaScript, and long-page rendering. Curate demos rather than discovering every GIF automatically; provide reduced-motion/static alternatives where needed. Do not claim a performance score before measurement.
- Document deployment ownership, preview verification, rollback, and meaningful error monitoring. Never log tokens or sensitive request data.

The verification approach follows the categories in the [official Next.js production checklist](https://nextjs.org/docs/app/guides/production-checklist).

## 8. Implementation sequence after your review

1. **Baseline reliability:** document the verified direct-path build, confirm a clean checkout/runtime setup, and fix document routing and source-path mapping.
2. **Shared shell:** agree the footer structure above; implement header, footer, shared typography, spacing, focus styles, and responsive docs navigation/search.
3. **Core visitor journey:** streamline Home, strengthen Download, and improve onboarding/migration content.
4. **Remaining pages and accuracy:** release pages, community/policies, comparisons, and all upstream documentation corrections.
5. **Launch verification:** production build, route/link crawl, accessibility and responsive inspection, metadata, deployed preview checks, fallback behavior, and rollback documentation.

Each stage should have a reviewable result before proceeding to the next. No deployment is part of this planning-only pass.

## 9. Acceptance criteria

- Clean supported-environment install, lint, type check, and production build pass.
- All 38 content routes (13 marketing/policy pages and 25 docs) return expected successful responses; unknown routes return 404.
- No broken internal links, anchors, missing screenshots, or incorrect edit links; search works through the UI.
- All pages reviewed at phone, tablet, and desktop sizes in both themes; no accidental horizontal page scrolling.
- Keyboard users can navigate menus, docs, search, links, and buttons with visible focus; headings and navigation landmarks are coherent.
- Footer has balanced groups and readable mobile layout; homepage no longer repeats its screenshot gallery.
- Download always targets the intended installer; checksum and fallback behavior are truthful.
- Versions, project paths, shipped features, comparison statements, and website privacy copy agree with verified sources.
- Metadata, canonical URLs, sitemap, social previews, deployed assets, and real hosting behavior are checked.
- Performance/accessibility measurements are recorded with issues resolved or explicitly documented; no invented scores.

## 10. Comparison sources checked

- [Laravel Herd for Windows](https://herd.laravel.com/windows): describes a free basic offering with additional paid Pro capabilities. Current website copy should reflect this distinction.
- [Laragon FAQ](https://laragon.org/docs/faq): describes free unlicensed non-commercial use and commercial licensing. Do not reduce this to unsupported free-tier site limits.
- [Apache Friends downloads](https://www.apachefriends.org/download.html): identifies MariaDB in Windows distributions. Replace the current “8.0 / MariaDB” database comparison with precise supported information.

Recheck these sources when implementing; competitor offerings can change.

## 11. User corrections: mandatory before publication

The following records the user's additional review findings and requested copy. Media defects are user-reported and require visual verification during implementation; they are not claimed as independently inspected in this planning pass. This section overrides earlier provisional media assignments.

### Exact content corrections

| Location | Required correction |
| --- | --- |
| Homepage comparison: XAMPP database | Use **MariaDB 10.4.32**. |
| Homepage comparison: Laragon price | Requested copy: **Free non-commercial (reminder popup), $49/yr or $149 lifetime commercial**. Verify the commercial amounts against the official pricing page at implementation/publication time and record the checked date. |
| Homepage comparison: Laragon site limits | Use **Unlimited**; remove “Free tier limits.” |
| `/vs/laragon` and related metadata/copy | Remove “Laragon Pro adds paid features” and other references to a Laragon Pro tier. Describe non-commercial and commercial licensing accurately. Herd Pro is a separate product distinction and should not be removed by a blanket replacement. |
| `/migrate-from-xampp` description | Suggested replacement: **Move projects from XAMPP to DevStackBox on Windows. Copy htdocs with the in-app importer, then export and import databases separately.** Ensure visible copy and social metadata say the same thing. |

### Media that must be replaced or repaired

- **`demo.gif` and `services-dashboard.jpg`:** current captures show MySQL 8.0.35. Replace homepage references with verified new screenshots showing the intended release stack. Do not merely change captions or edit the version number inside an old capture.
- **Dashboard, logs, and `feature-tour.gif`:** remove exposed `C:\Users\shivs\…` paths through a clean re-capture using a neutral demo account/path, or irreversible redaction where suitable. For GIFs, check every frame; a single-frame edit is insufficient. Inspect the main README media reference in the app repository as well as website references. Locate `feature-tour.gif` and all its uses before changing assets; it was not in the website inventory checked earlier.
- **Pop-ups and overlays:** re-capture with incidental notifications, tooltips, dialogs, and overlays dismissed. Keep a dialog only when it is the subject of the demonstration.
- **Logs screenshot:** exclude the capture showing “Apache stopped unexpectedly” from promotional imagery. Replace with a clean successful service-start sequence if logs are demonstrated.
- **Light dashboard:** replace the shot containing stray overlay text in the top-right corner.
- **Import screenshot:** do not publish the duplicate-path capture as the polished product example. Correct the underlying issue first, then capture both the clean import selection and success result.

### Related app correction, tracked separately

Investigate why XAMPP detection returns both `C:\xampp` and `C:\XAMPP`. On the intended ordinary Windows installation these represent the same folder. Normalize and deduplicate detected installation paths before displaying them; preserve the chosen display path and distinct real installations. Verify case variants and trailing separators with a focused regression check. This is an app-repository task, not a website-only visual edit, and must be kept explicit in the implementation scope.

### Additional media inventory

| Missing or inadequate capture | Intended use and launch decision |
| --- | --- |
| Import success screen | Capture after a successful test import; use in migration instructions. Required before illustrating a completed import. |
| Virtual hosts / SSL | Capture actual supported flows and clearly distinguish localhost SSL from per-vhost HTTPS support. Until ready, omit those illustrations rather than imply unavailable capabilities. |
| phpMyAdmin showing MySQL 8.4.11 | Capture against the intended release to substantiate bundled database information. |
| Localhost `phpinfo()` | Capture a neutral local test page; check for paths, environment values, and other machine details before publication. |
| Installer screens | Capture clean install steps for the installation guide; avoid personal folder names or irrelevant desktop content. |
| Terminal with real output | Capture a meaningful successful command such as `php --version`, using the release environment and neutral paths. Do not use an empty terminal as evidence of a workflow. |
| Fresh GIF demo | Optional on the homepage until a clean current-release animation exists. Static screenshots are an acceptable launch presentation. |
| Demo MP4 | **Not required and not included in the current scope.** Use existing/re-captured GIFs as requested. |
| 400 × 400 founder photo | Optional, only for an approved personal/maintainer section. Use an authentic supplied photo; do not invent a likeness or block launch on it. |

Publication gate: no old-stack screenshots, personal paths, accidental pop-ups, misleading import claims, or known-bad promotional captures. Check all actual rendered image references, including theme variants, social images, documentation, and the main README where relevant. Keep the footer redesign and full responsive UI/UX work in scope alongside these corrections.

## 12. Implementation status - October 17, 2026

Implemented locally across the website and its sibling app repository. See `IMPLEMENTATION-REPORT.md` for validation evidence and publication dependencies. The original sections above remain the audit record; this status supersedes provisional design and media assignments.

Completed: header/footer and homepage redesign; comparison and migration corrections; reviewed static screenshots with enlargement; docs search/mobile navigation/TOC, links and headings; path and installer documentation corrections; release selection/checksum handling; metadata, sitemap and social image; privacy disclosure; build/runtime and CI checks; XAMPP path deduplication and regression test.

Verified: production build, lint, four website regression tests, 38-route HTTP smoke check, 25-document source validation, Rust migration regression test, and 228 rendered page-width checks across phone/tablet/desktop and light/dark themes. Interactive checks covered mobile menu, docs navigation/search, and screenshot dialog dismissal. Desktop screenshots saved under ignored `artifacts/`.

Still external to local completion: publishing both repositories in the correct order, deployed-host verification, clean optional app captures listed in `LAUNCH-MEDIA.md`, and a formal accessibility/performance audit. No live deployment or measured Lighthouse score is claimed.
