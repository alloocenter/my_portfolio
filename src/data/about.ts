import type { L10n } from '../i18n/ui';
import type { IconName } from '../components/ui/icons';

/** Citation d'accroche sans jargon. */
export const aboutQuote: L10n = {
  fr: '« Avant de créer des applications, j’apprenais à lire un bilan bancaire. »',
  en: '“Before building applications, I learned to read a bank balance sheet.”',
};

/** Bio courte visible immédiatement (2 phrases max) — polyvalent + atout FinTech. */
export const aboutSummary: L10n = {
  fr: 'Développeur Full-Stack polyvalent, j’interviens sur tout type d’applications web et mobiles : outils métier, e-commerce, plateformes collaboratives ou secteur public. Grâce à mon double diplôme en banque-finance et en génie logiciel, j’apporte en plus un point fort naturel sur les projets FinTech et à forts enjeux de fiabilité.',
  en: 'As a versatile Full-Stack developer, I build all kinds of web and mobile applications — from business tools and e-commerce to learning platforms and public portals. Backed by a dual degree in banking & finance and software engineering, I also bring a natural edge on FinTech and high-reliability projects.',
};

/** Mini-frise visuelle en 3 étapes affichée sous le portrait. */
export interface AboutMilestone {
  period: string;
  title: L10n;
  place: L10n;
  icon: IconName;
}

export const aboutMilestones: AboutMilestone[] = [
  {
    period: '2015 — 2021',
    title: { fr: 'Banque & Finance', en: 'Banking & Finance' },
    place: { fr: 'Atout métier · Bamako', en: 'Business edge · Bamako' },
    icon: 'landmark',
  },
  {
    period: '2021 — 2026',
    title: { fr: 'Génie Logiciel', en: 'Software Eng.' },
    place: { fr: 'Web, Mobile & Serveur', en: 'Web, Mobile & Backend' },
    icon: 'graduation',
  },
  {
    period: '2023 — 2026',
    title: { fr: 'Multi-secteurs', en: 'Cross-industry' },
    place: { fr: 'Atout FinTech · Abidjan', en: 'FinTech edge · Abidjan' },
    icon: 'layout',
  },
];

/** Récit complet placé dans le tiroir repliable « Lire mon parcours complet ». */
export const aboutStory: { tag: L10n; text: L10n }[] = [
  {
    tag: { fr: '01 · Une base métier solide', en: '01 · Business-first foundation' },
    text: {
      fr: 'Mon parcours a débuté en comptabilité, banque et assurance à Bamako. Cette formation m’a donné une compréhension directe des enjeux d’entreprise — et un vrai avantage sur les applications financières.',
      en: 'My journey started in accounting, banking and insurance in Bamako. That background gave me a direct grasp of business priorities — and a natural advantage on financial products.',
    },
  },
  {
    tag: { fr: '02 · Tout type d’applications livrées', en: '02 · Diverse real-world delivery' },
    text: {
      fr: 'Diplômé en génie logiciel (Licence puis Master 2 en cours), j’ai conçu des produits très variés : portail RH pour la Douane malienne, plateforme e-learning chez Orange Digital Center, CRM, livraison, e-commerce, gestion de stocks et messagerie temps réel.',
      en: 'Trained in software engineering (BSc and ongoing MSc), I have shipped a wide range of products: an HR portal for Malian Customs, an e-learning platform at Orange Digital Center, plus CRM, delivery, e-commerce, inventory and real-time chat apps.',
    },
  },
  {
    tag: { fr: '03 · Polyvalence & exigence', en: '03 · Versatility & reliability' },
    text: {
      fr: 'Aujourd’hui chez MediaSoft Lafayette à Abidjan, je mobilise cette polyvalence sur des plateformes web et mobiles critiques — toujours avec la même priorité : des outils clairs, rapides et fiables pour les utilisateurs.',
      en: 'Today at MediaSoft Lafayette in Abidjan, I bring that versatility to demanding web and mobile platforms — always focused on building clear, fast and dependable tools for real users.',
    },
  },
];
