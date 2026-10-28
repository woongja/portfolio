// Builds index.html from src/index.template.html with the theme chosen by the THEME env var.
//   THEME=clay   (default) -> 클레이모피즘
//   THEME=brutal           -> 뉴브루탈리즘
// Local:  node build.js            or  THEME=brutal node build.js
// Vercel: set Environment Variable THEME in Project Settings; vercel.json runs this on every deploy.
const fs = require('fs');
const path = require('path');

const THEMES = fs.readdirSync(path.join(__dirname, 'src', 'themes'))
  .filter(f => f.endsWith('.css')).map(f => f.replace(/\.css$/, ''));
const theme = (process.env.THEME || 'clay').trim().toLowerCase();
if (!THEMES.includes(theme)) {
  console.error(`Unknown THEME "${theme}". Available: ${THEMES.join(', ')}`);
  process.exit(1);
}

const template = fs.readFileSync(path.join(__dirname, 'src', 'index.template.html'), 'utf8');
let css = fs.readFileSync(path.join(__dirname, 'src', 'themes', `${theme}.css`), 'utf8');

// First line of each theme file: /* @fonts <google fonts css2 url> */
const m = css.match(/^\/\*\s*@fonts\s+(\S+)\s*\*\/\s*\n?/);
if (!m) { console.error(`themes/${theme}.css must start with "/* @fonts <url> */"`); process.exit(1); }
const fontLink = `<link rel="stylesheet" href="${m[1]}">`;
css = css.slice(m[0].length);

const out = template
  .replace('<!-- @@FONT_LINK@@ -->', fontLink)
  .replace('/* @@THEME_CSS@@ */', `/* theme: ${theme} */\n${css.trim()}`);

fs.writeFileSync(path.join(__dirname, 'index.html'), out);
console.log(`Built index.html with theme "${theme}" (${(out.length / 1024).toFixed(1)} KB)`);
