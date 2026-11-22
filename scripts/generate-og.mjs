/**
 * Génère les favicons PNG et les cartes Open Graph éditoriales (1200×630) FR / EN
 * dans la palette Corail (#F08080 / #B53D3D), ivoire doux (#FBF7F6) et encre (#141311).
 */
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const pub = (p) => resolve(process.cwd(), 'public', p);

const ogSvg = ({ kickerLeft, kickerRight, line1, line2, sub }) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" fill="none">
  <rect width="1200" height="630" fill="#fbf7f6"/>
  <rect width="1200" height="10" fill="#f08080"/>

  <!-- Bandeau supérieur -->
  <text x="76" y="74" font-family="Consolas, monospace" font-size="16" letter-spacing="2" fill="#5a5150">${kickerLeft}</text>
  <text x="1124" y="74" text-anchor="end" font-family="Consolas, monospace" font-size="16" letter-spacing="2" fill="#5a5150">${kickerRight}</text>
  <line x1="76" y1="96" x2="1124" y2="96" stroke="#141311" stroke-opacity="0.2" stroke-width="1"/>

  <!-- Nom monumental décalé -->
  <text x="76" y="242" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="112" letter-spacing="-4" fill="#141311">TIEMOKO</text>
  <text x="1124" y="346" text-anchor="end" font-family="Georgia, Times New Roman, serif" font-style="italic" font-size="122" fill="#b53d3d">Sissoko</text>
  <line x1="76" y1="386" x2="1124" y2="386" stroke="#141311" stroke-opacity="0.2" stroke-width="1"/>

  <!-- Déclaration & polyvalence -->
  <text x="76" y="452" font-family="Segoe UI, Arial, sans-serif" font-weight="600" font-size="31" fill="#141311">${line1} <tspan font-family="Georgia, serif" font-style="italic" fill="#b53d3d">${line2}</tspan></text>
  <text x="76" y="498" font-family="Segoe UI, Arial, sans-serif" font-size="21" fill="#5a5150">${sub}</text>

  <!-- Colophon -->
  <line x1="76" y1="546" x2="1124" y2="546" stroke="#141311" stroke-opacity="0.16" stroke-width="1"/>
  <text x="76" y="584" font-family="Consolas, monospace" font-size="16" fill="#5a5150">BAMAKO → ABIDJAN · WEB &amp; MOBILE</text>
  <text x="1124" y="584" text-anchor="end" font-family="Consolas, monospace" font-size="16" fill="#141311">MÉTIER · E-COMMERCE · MOBILE · FINTECH</text>
</svg>`;

const faviconSvg = readFileSync(pub('favicon.svg'));

await Promise.all([
  sharp(faviconSvg).resize(32, 32).png().toFile(pub('favicon-32.png')),
  sharp(faviconSvg).resize(180, 180).png().toFile(pub('apple-touch-icon.png')),
  sharp(
    Buffer.from(
      ogSvg({
        kickerLeft: 'DÉVELOPPEUR FULL-STACK · WEB &amp; MOBILE',
        kickerRight: 'ABIDJAN · MULTI-SECTEURS',
        line1: 'Des applications web &amp; mobiles',
        line2: 'fiables et sur-mesure.',
        sub: 'Outils métier, e-commerce, secteur public &amp; atout FinTech (Double diplôme)',
      })
    )
  )
    .png({ compressionLevel: 9 })
    .toFile(pub('og-fr.png')),
  sharp(
    Buffer.from(
      ogSvg({
        kickerLeft: 'FULL-STACK DEVELOPER · WEB &amp; MOBILE',
        kickerRight: 'ABIDJAN · CROSS-INDUSTRY',
        line1: 'Web &amp; mobile applications,',
        line2: 'reliable and tailored.',
        sub: 'Business tools, e-commerce, public portals &amp; FinTech edge (Dual degree)',
      })
    )
  )
    .png({ compressionLevel: 9 })
    .toFile(pub('og-en.png')),
]);

console.log('Generated coral #F08080 favicons & OG cards');
