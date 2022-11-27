const fs = require('fs');

const globby = import('globby');
const prettier = require('prettier');

(async () => {
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pages = await (await globby).globby([
    'pages/**/*{.tsx,.mdx}',
    '!pages/_*.tsx',
    '!pages/api',
  ]);
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
    .map((page) => {
      const path = page
        .replace('pages', '')
        .replace('.tsx', '')
        .replace('.mdx', '');
      const route = path === '/index' ? '' : path;
      return `
                        <url>
                            <loc>${`https://tmrev.io${route}`}</loc>
                        </url>
                    `;
    })
    .join('')}
        <url>
            <loc>${'https://tmrev.io/sitemaps/movies'}</loc>
        </url>
        </urlset>
    `;

  // If you're not using Prettier, you can remove this.
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  fs.writeFileSync('public/sitemap.xml', formatted);
})();
