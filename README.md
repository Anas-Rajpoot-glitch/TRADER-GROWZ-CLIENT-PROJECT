# TRADER-GROWZ-CLIENT-PROJECT
FOR VERCEL DEPLOYMENT

## Store CMS

Open `cms.html` or `/admin/` to manage products in a friendly catalog editor.

- Products are stored in `data/catalog.json`.
- Use **Add Product** to create a new item, or **Remove** to delete an old one.
- Use **Save File** in Chrome/Edge to save directly when file access is allowed.
- Use **Export** to download a fresh `catalog.json` if direct save is not available.
- Replace `data/catalog.json` with the exported file before redeploying.
- Public category pages also read `data/catalog.json` in the browser, so newly exported products can appear after redeploy even if a product page did not exist before.
- Run `node scripts/rebuild-site.mjs` after catalog changes when you want to regenerate static category pages, product pages, sitemap, and redirects.

For Vercel, set the build command to:

```bash
node scripts/rebuild-site.mjs
```
