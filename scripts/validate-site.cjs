const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const required = ['index.html','pricing-1/index.html','about-us/index.html','showcase-1/index.html','contact/index.html','shop/index.html','styles.css','site.js','robots.txt','sitemap.xml','llms.txt','_headers','_redirects'];
let errors=[];
for (const file of required) if (!fs.existsSync(path.join(process.cwd(), file))) errors.push(`missing ${file}`);
for (const file of required.filter(f=>f.endsWith('.html'))) {
  const txt = fs.readFileSync(path.join(process.cwd(), file), 'utf8');
  if (!/<title>[^<]{12,}<\/title>/.test(txt)) errors.push(`${file}: weak/missing title`);
  if (!/meta name="description" content="[^"]{50,}"/.test(txt)) errors.push(`${file}: weak/missing meta description`);
  if (!/application\/ld\+json/.test(txt)) errors.push(`${file}: missing JSON-LD`);
  const imgs = [...txt.matchAll(/<img\b[^>]*>/g)].map(m=>m[0]);
  for (const img of imgs) {
    if (!/alt="[^"]*"/.test(img)) errors.push(`${file}: img missing alt -> ${img.slice(0,80)}`);
    const src = img.match(/src="([^"]+)"/)?.[1];
    if (src && src.startsWith('/assets/')) {
      const assetPath = path.join(process.cwd(), src.replace(/^\//,''));
      if (!fs.existsSync(assetPath)) errors.push(`${file}: missing asset ${src}`);
    }
  }
}
const htmlFiles = required.filter(f=>f.endsWith('.html'));
const all = htmlFiles.map(f=>fs.readFileSync(path.join(process.cwd(),f),'utf8')).join('\n');
if (/static\.wixstatic\.com/.test(all)) errors.push('html still hotlinks Wix media');
try {
  execFileSync(process.execPath, ['--check', path.join(process.cwd(), 'site.js')], { stdio: 'pipe' });
} catch (err) {
  errors.push(`site.js syntax check failed: ${(err.stderr || err.stdout || err.message).toString().trim()}`);
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Validated ${required.length} files and ${htmlFiles.length} HTML pages.`);
