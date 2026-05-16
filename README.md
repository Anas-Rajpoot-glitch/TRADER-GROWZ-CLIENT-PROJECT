# TRADER-GROWZ-CLIENT-PROJECT
FOR VERCEL DEPLOYMENT

## Store CMS

Open `cms.html` or `/admin/` to manage products in a friendly catalog editor.

- Products are stored in `data/catalog.json`.
- Use **Add Product** to create a new item, or **Remove** to delete an old one.
- Use **Save File** in Chrome/Edge to save directly when file access is allowed.
- Use **Export** to download a fresh `catalog.json` if direct save is not available.
- Run `node scripts/rebuild-site.mjs` after catalog changes to regenerate category pages, product pages, sitemap, and redirects.

For Vercel, set the build command to:

```bash
node scripts/rebuild-site.mjs
```
