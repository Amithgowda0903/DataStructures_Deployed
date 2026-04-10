# Static Site

This folder contains a static website prepared for GitHub Pages deployment.

## Local preview

Open `index.html` directly in a browser.

## Publish on GitHub Pages

1. Create a new repository on GitHub.
2. In terminal from the project root:

```bash
git add .
git commit -m "Add static site and GitHub Pages workflow"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

3. On GitHub, open Settings -> Pages and set Source to GitHub Actions.
4. After the workflow finishes, your site URL will be:

https://<your-username>.github.io/<your-repo>/
