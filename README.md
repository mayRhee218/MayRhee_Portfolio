# May Rhee — Portfolio

An interactive paper-stacking portfolio built with static HTML, CSS, and JavaScript.

**Copyright and AI use:** © 2026 May Rhee. Original code, text, images, illustrations, and other original assets are all rights reserved. No permission is granted to scrape, copy, or use May Rhee's original materials for AI training, fine-tuning, model evaluation, or AI datasets. See [AI Training and Content Use Policy](anti-ai-crawler/AI-USE-POLICY.md). Third-party works retain their respective rights.

## Local preview

1. Download or clone the GitHub repository.
2. Open the repository folder in Visual Studio Code.
3. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) if needed.
4. In the VS Code Explorer, right-click the root `index.html` and select **Open with Live Server**.
5. View the portfolio in the browser with an active internet connection. Project media are served directly from `assets/`, and external artwork, fonts, and links use the internet.

## Deployment

GitHub Pages automatically deploys from the GitHub Actions workflow at `.github/workflows/deploy.yml` on every push to `main`. The workflow publishes the tracked `assets/` directory, the canonical HTML files from `bio-pages/`, `project-pages/`, and `design-pages/`, the site's single `styles.css`, and the scripts in `javaScript/`. The crawler policy files live in `anti-ai-crawler/`; the deployment copies its `robots.txt` to the site's published root and inserts voluntary AI-use opt-out metadata into every HTML page. The root `index.html` redirects visitors to `bio-pages/index.html`.

Site: https://mayrhee218.github.io/MayRhee_Portfolio/

**Important limitation:** For the project-site URL above, standards-compliant crawlers read `https://mayrhee218.github.io/robots.txt`, **not** `/MayRhee_Portfolio/robots.txt`. To put crawler instructions into effect, matching directives must be deployed at that domain root (normally the separate `mayRhee218.github.io` repository). Public GitHub source code remains downloadable regardless of robots directives. Strong technical protection requires restricting public access.
