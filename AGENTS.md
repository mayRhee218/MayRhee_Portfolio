# AGENTS.md — MayRhee_Portfolio

## Purpose and source of truth
This repository is May Rhee's interactive portfolio for the ANU DESN6006 assignment. It is a static site built with semantic HTML, a single CSS stylesheet, and vanilla JavaScript. Preserve the owner's existing visual design, writing, media, and interaction choices.

Read `README.md`, inspect the actual working tree, and check `git status` before making changes. The repository's current files are the source of truth for implementation status; conversation summaries and prior reports are not proof that a change has been committed or works.

## Non-negotiable assignment requirements
1. **Exactly one CSS file:** Keep the project stylesheet at the repository root as `styles.css`. Do not create a second `.css` file or reintroduce `design-v4.css`. Update all HTML references when paths move.
2. **Static and portable:** The professor will download the repository and inspect it locally, not rely on GitHub Pages. The complete site, including all required media and fonts, must be available from the downloaded source tree **without extracting an additional ZIP archive**, downloading assets, installing dependencies, or relying on network resources.
3. **Local-first paths:** Use correct relative paths for HTML links, CSS, JavaScript, images, videos, and fonts across nested folders. Avoid root-absolute paths that work only at a deployed domain root. Aim for pages to work when opened directly from local files; also test via a simple static HTTP server where browser security rules make that necessary, and explicitly disclose any direct-file limitation.
4. **Preserve interactions:** Keep paper-stacking transitions and navigation working with touch swipes, trackpad gestures, and mouse wheel. The intended sequence is Profile/Bio (5 pages) → Projects (4 overview pages) → Design (17 overview pages) → Contact. Swiping/scrolling down progresses to the next sheet, with the current sheet leaving upward; reversing restores the preceding sheet. Preserve access to detail pages and their back/navigation links.
5. **No unrequested redesign:** Do not change page order, text, artwork, animations, or visual appearance merely as part of a file/path fix. Prefer minimal changes.

## Repository layout
- `index.html`: root entry point / redirect to the portfolio.
- `bio-pages/`: profile and biography HTML, including the main portfolio entry.
- `project-pages/`: four project overview pages and related details.
- `design-pages/`: design portfolio overviews and detail pages.
- `contact.html`: contact page.
- `styles.css`: the **only** CSS file.
- `javaScript/site.js` and `javaScript/page-flip.js`: existing scripts.
- `assets/`: all locally available images, video, fonts, and other media.
- `anti-ai-crawler/AI-USE-POLICY.md` and `anti-ai-crawler/robots.txt`: copyright/AI-use policy materials.
- `.github/workflows/`: optional GitHub Pages deployment; deployment must not be a prerequisite for grading.

Do not assume this layout is fully correct without inspecting references and actual assets.

## Current known issue to verify first
At the time these instructions were prepared, `README.md` still directed local users to extract `assets/*` from `portfolio_site.zip`. **This conflicts with the professor's requirement for a self-contained downloaded repository.** The `assets/` directory exists, but its presence alone does not prove that every required binary is committed. Before deleting or depending on `portfolio_site.zip`, audit the committed media, missing files, path resolution, and local playback. Once verified and fixed, update the README so its instructions match reality. Do not delete the ZIP until its contents are accounted for and removal is explicitly approved.

## Working procedure
1. Inspect the relevant files and `git status` first. Do not overwrite unrelated or uncommitted user work.
2. Make the smallest targeted changes, keeping directory names and filename casing exact (especially `javaScript/`).
3. When moving files, update every affected `href`, `src`, CSS `url(...)`, script-generated URL, navigation target, and deployment reference.
4. Confirm all required media files are present **inside the repository**, not just in a local ignored directory or a GitHub Actions extraction step. Do not substitute placeholder media or remote URLs without approval.
5. Validate: root entry, all section transitions and reverse navigation, detail-page links, images, videos, fonts, and responsive mobile/desktop behavior. Check both local-file use and a local static server where possible. Report exactly what was and was not tested.
6. Explain files changed, test results, and unresolved issues. Do not delete archives, restructure beyond scope, or push additional changes without the owner's request.

## Rights, privacy, and AI policy
Original portfolio materials are the owner's copyrighted work. Respect `anti-ai-crawler/AI-USE-POLICY.md`; do not repurpose or upload original content for unrelated AI training or third-party services. Avoid adding personal contact details, referee information, credentials, API keys, or private files to this public repository. `robots.txt` is only a voluntary crawler directive, not an access-control mechanism; the effective file must be served from the appropriate domain root. Never claim it prevents copying or model training.

## Collaboration and communication
When requirements conflict (for example, GitHub Pages convenience versus offline local grading), prioritize the explicit DESN6006 grading constraint and flag the tradeoff. Ask before destructive operations or substantive design changes. New Codex chats should read this file and the latest repository state before acting.
