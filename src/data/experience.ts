import type { L10n } from '../i18n/ui';

export type CompanyLogoId = 'mediasoft' | 'alloocenter' | 'odc' | 'douane';

export interface Experience {
  id: CompanyLogoId;
  /** Dates en grand format visuel sur la timeline. */
  yearBig: string;
  start: L10n;
  end: L10n | null; // null = poste actuel
  role: L10n;
  company: string;
  place: L10n;
  /** 1 seule ligne claire visible par défaut sur la timeline. */
  summary: L10n;
  /** Détails optionnels dépliables à la demande pour les recruteurs curieux. */
  highlights: L10n[];
  stack: string[];
}

export const experiences: Experience[] = [
  {
    id: 'mediasoft',
    yearBig: '2026',
    start: { fr: 'Mai 2026', en: 'May 2026' },
    end: null,
    role: { fr: 'Développeur Full-Stack — FinTech', en: 'Full-Stack Developer — FinTech' },
    company: 'MediaSoft Lafayette',
    place: { fr: 'Abidjan, Côte d’Ivoire', en: 'Abidjan, Côte d’Ivoire' },
    summary: {
      fr: 'Conception de plateformes de paiements numériques et d’échanges sécurisés entre partenaires financiers.',
      en: 'Building digital payment platforms and secure exchanges between financial partners.',
    },
    highlights: [
      {
        fr: 'Portails web et applications mobiles pour le suivi en direct des opérations financières.',
        en: 'Web portals and mobile apps for live financial operations tracking.',
      },
      {
        fr: 'Échanges temps réel fiables entre systèmes partenaires et supervision des notifications.',
        en: 'Reliable real-time exchanges across partner systems and notification monitoring.',
      },
    ],
    stack: ['Java', 'Spring Boot', 'Kafka', 'Redis', 'PostgreSQL', 'Docker', 'Angular', 'React Native'],
  },
  {
    id: 'alloocenter',
    yearBig: '2024—26',
    start: { fr: 'Mai 2024', en: 'May 2024' },
    end: { fr: 'Mars 2026', en: 'Mar 2026' },
    role: { fr: 'Développeur Full-Stack', en: 'Full-Stack Developer' },
    company: 'AllooCenter',
    place: { fr: 'Bamako, Mali', en: 'Bamako, Mali' },
    summary: {
      fr: 'Développement d’un CRM interne, d’une app de livraison et d’une boutique e-commerce utilisés au quotidien.',
      en: 'Built an internal CRM, a delivery app and an e-commerce platform used daily by teams.',
    },
    highlights: [
      {
        fr: 'Outils complets de suivi client, livraison, stocks et paiements en ligne.',
        en: 'End-to-end tools covering customer care, deliveries, inventory and online payments.',
      },
      {
        fr: 'Sécurisation des accès et amélioration continue des performances en production.',
        en: 'Secured user access and continuously improved live production performance.',
      },
    ],
    stack: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'MySQL'],
  },
  {
    id: 'odc',
    yearBig: '2023—24',
    start: { fr: 'Nov. 2023', en: 'Nov 2023' },
    end: { fr: 'Mars 2024', en: 'Mar 2024' },
    role: { fr: 'Développeur Full-Stack — EdTech', en: 'Full-Stack Developer — EdTech' },
    company: 'Orange Digital Center',
    place: { fr: 'Bamako, Mali', en: 'Bamako, Mali' },
    summary: {
      fr: 'Plateforme de formation en ligne sécurisée, livrée en 5 mois au sein d’une équipe de 6.',
      en: 'Secured online learning platform delivered in 5 months within a team of 6.',
    },
    highlights: [
      {
        fr: 'Gestion dédiée des rôles (administrateurs, formateurs, apprenants) et alertes automatiques.',
        en: 'Tailored role management (admins, trainers, learners) and automated notifications.',
      },
      {
        fr: 'Tests complets de sécurité et d’hébergement cloud AWS avant mise en ligne.',
        en: 'End-to-end security testing and AWS cloud integration prior to launch.',
      },
    ],
    stack: ['Java', 'Spring Boot', 'JWT', 'AWS', 'Angular'],
  },
  {
    id: 'douane',
    yearBig: '2023',
    start: { fr: 'Janv. 2023', en: 'Jan 2023' },
    end: { fr: 'Mars 2023', en: 'Mar 2023' },
    role: { fr: 'Développeur Full-Stack (Stage)', en: 'Full-Stack Developer (Intern)' },
    company: 'Douane malienne (DSI)',
    place: { fr: 'Bamako, Mali', en: 'Bamako, Mali' },
    summary: {
      fr: 'Digitalisation de la gestion RH des agents pour remplacer les suivis manuels.',
      en: 'Digitised staff HR management to replace slow manual processes.',
    },
    highlights: [
      {
        fr: 'Portail de suivi des carrières, congés, mobilités et statistiques RH.',
        en: 'Portal covering careers, leave, transfers and HR analytics.',
      },
      {
        fr: 'Historique complet des actions pour simplifier les contrôles internes.',
        en: 'Full activity log streamlining internal audits.',
      },
    ],
    stack: ['Java', 'Spring Boot', 'Angular', 'Chart.js'],
  },
];
