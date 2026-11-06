# May Rhee — Portfolio

An interactive paper-stacking portfolio built with static HTML, CSS, and JavaScript.

**Copyright and AI use:** © 2026 May Rhee. Original code, text, images, illustrations, and other original assets are all rights reserved. No permission is granted to scrape, copy, or use May Rhee's original materials for AI training, fine-tuning, model evaluation, or AI datasets. See [AI Training and Content Use Policy](AI-USE-POLICY.md). Third-party works retain their respective rights.

## Local preview

From the source directory, start a local static server:

```bash
python3 -m http.server 8000
```

## Deployment

GitHub Pages automatically deploys from the GitHub Actions workflow at `.github/workflows/deploy.yml` on every push to `main`. The workflow extracts `portfolio_site.zip`, overlays root HTML/CSS/JS files, publishes `robots.txt`, and inserts voluntary AI-use opt-out metadata into HTML files.

Site: https://mayrhee218.github.io/MayRhee_Portfolio/

**Important limitation:** For the project-site URL above, standards-compliant crawlers read `https://mayrhee218.github.io/robots.txt`, **not** `/MayRhee_Portfolio/robots.txt`. To put crawler instructions into effect, matching directives must be deployed at that domain root (normally the separate `mayRhee218.github.io` repository). Public GitHub source code remains downloadable regardless of robots directives. Strong technical protection requires restricting public access.
