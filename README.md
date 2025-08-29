# Your Personal Tech Support

Open-source, no-fluff launchpad for quick fixes and trusted tools. Search, filter, click. Copy common repair commands with one tap.

## Local dev

Any static server works. Two easy options:

**VS Code Live Server**: install the extension and click “Go Live” in the status bar.

**Python** (already on many systems):
```bash
python -m http.server 5173
# open http://localhost:5173
```

## Deploy to GitHub Pages

1. Commit + push this repo to GitHub.
2. In the repo settings → **Pages**, set **Branch: `main` / folder: `/ (root)`** or `/docs` if you move files.
3. Wait a minute; your site goes live at `https://<yourname>.github.io/<repo>`.

## Add items

Edit `data/resources.json`. Each item:
```json
{
  "title": "Speedtest",
  "url": "https://www.speedtest.net",
  "description": "Check internet speed",
  "category": "Networking",
  "tags": ["latency", "bandwidth"],
  "snippet": "optional command to copy"
}
```

Prefer reputable sources. Keep descriptions short and neutral. PRs welcome.
