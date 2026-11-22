import type { L10n } from '../i18n/ui';

export interface Degree {
  period: string;
  title: L10n;
  school: string;
  current?: boolean;
  domain: 'software' | 'finance';
}

export const degrees: Degree[] = [
  {
    period: '2024', // affiché « 2024 — En cours » grâce à `current`
    current: true,
    domain: 'software',
    title: { fr: 'Master 2 — Génie Logiciel', en: 'Master’s — Software Engineering' },
    school: 'Institut Universitaire Lucas',
  },
  {
    period: '2021 — 2023',
    domain: 'software',
    title: { fr: 'Licence — Génie Logiciel', en: 'Bachelor’s — Software Engineering' },
    school: 'Institut Supérieur d’Informatique et de Management',
  },
  {
    period: '2018 — 2021',
    domain: 'finance',
    title: { fr: 'Licence — Assurance, Banque & Finance', en: 'Bachelor’s — Insurance, Banking & Finance' },
    school: 'Faculté des Sciences Économiques et de Gestion',
  },
  {
    period: '2015 — 2017',
    domain: 'finance',
    title: { fr: 'Baccalauréat — Comptabilité-Finance', en: 'High-school diploma — Accounting & Finance' },
    school: 'Lycée Technique de Bamako',
  },
];

export type CertBadgeId = 'aws' | 'ibm' | 'owasp';

export interface Certification {
  badge: CertBadgeId;
  title: L10n;
  issuer: L10n;
  url?: string;
}

export const certifications: Certification[] = [
  {
    badge: 'aws',
    title: { fr: 'AWS Certified Cloud Practitioner', en: 'AWS Certified Cloud Practitioner' },
    issuer: { fr: 'Amazon Web Services · Cloud', en: 'Amazon Web Services · Cloud' },
  },
  {
    badge: 'ibm',
    title: { fr: 'Python for Data Engineering', en: 'Python for Data Engineering' },
    issuer: { fr: 'IBM · Coursera', en: 'IBM · Coursera' },
  },
  {
    badge: 'owasp',
    title: { fr: 'Sécurité des applications web', en: 'Web Application Security' },
    issuer: { fr: 'Tests d’intrusion · OWASP ZAP', en: 'Security testing · OWASP ZAP' },
  },
];

export const spokenLanguages: { code: string; name: L10n; level: L10n }[] = [
  { code: 'FR', name: { fr: 'Français', en: 'French' }, level: { fr: 'Langue maternelle', en: 'Native' } },
  { code: 'EN', name: { fr: 'Anglais', en: 'English' }, level: { fr: 'Intermédiaire', en: 'Intermediate' } },
];
