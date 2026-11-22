import type { L10n } from '../i18n/ui';

export interface HeroMetric {
  value: number;
  suffix?: string;
  label: L10n;
}

/**
 * Identité & déclarations — source unique (Hero, Contact, JSON-LD).
 * Positionnement : Développeur Full-Stack Web & Mobile polyvalent, avec un point fort FinTech.
 */
export const profile = {
  firstName: 'Tiemoko',
  lastName: 'Sissoko',
  name: 'Tiemoko Sissoko',
  initials: 'TS',
  email: 'sissokotiemoko60@gmail.com',
  coords: "05°20'N · 04°01'W",
  route: 'Bamako → Abidjan',
  location: { fr: 'Abidjan, Côte d’Ivoire', en: 'Abidjan, Côte d’Ivoire' } satisfies L10n,
  jobTitle: { fr: 'Développeur Full-Stack Web & Mobile', en: 'Full-Stack Web & Mobile Developer' } satisfies L10n,
  cv: {
    fr: '/cv/CV-Tiemoko-Sissoko-FR.pdf',
    en: '/cv/CV-Tiemoko-Sissoko-FR.pdf',
  } satisfies L10n,
  socials: {
    github: 'https://github.com/alloocenter',
    linkedin: 'https://www.linkedin.com/in/tiemoko-sissoko-2b5ba9259/',
  },

  /** Phrase d'ouverture du Hero — polyvalence web/mobile + atout FinTech. */
  declaration: {
    fr: {
      before: 'Je conçois des applications web et mobiles ',
      italic: 'fiables et sur-mesure',
      after: ' — du métier à la FinTech.',
    },
    en: {
      before: 'I build web and mobile applications that are ',
      italic: 'reliable and tailored',
      after: ' — from business tools to FinTech.',
    },
  },

  subDeclaration: {
    fr: 'Applications métier, e-commerce, formation, secteur public & paiements — avec un point fort FinTech issu de ma double formation.',
    en: 'Business tools, e-commerce, e-learning, public portals & payments — with a strong FinTech edge from my dual degree.',
  } satisfies L10n,

  /** 3 chiffres-clés animés prouvant expérience et polyvalence sectorielle. */
  metrics: [
    { value: 3, suffix: '+', label: { fr: 'ans d’expérience', en: 'years of experience' } },
    { value: 7, suffix: '', label: { fr: 'applications livrées', en: 'applications shipped' } },
    { value: 5, suffix: '+', label: { fr: 'secteurs couverts', en: 'industries served' } },
  ] satisfies HeroMetric[],
};
