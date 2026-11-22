import type { L10n } from '../i18n/ui';

export type TechLogoId =
  | 'angular'
  | 'typescript'
  | 'react-native'
  | 'tailwind'
  | 'charts'
  | 'java'
  | 'spring'
  | 'kafka'
  | 'api'
  | 'websocket'
  | 'postgresql'
  | 'redis'
  | 'databases'
  | 'keycloak'
  | 'security'
  | 'docker'
  | 'aws'
  | 'git'
  | 'cicd'
  | 'agile';

export interface SkillItem {
  id: TechLogoId;
  name: string;
  /** Traduction bénéfice en 1 ligne compréhensible par un non-technique. */
  benefit: L10n;
}

export interface SkillGroup {
  id: string;
  title: L10n;
  subtitle: L10n;
  items: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: { fr: 'Frontend & Mobile', en: 'Frontend & Mobile' },
    subtitle: {
      fr: 'Des interfaces rapides, claires et agréables sur ordinateur comme sur téléphone.',
      en: 'Fast, clear interfaces built for both desktop and mobile users.',
    },
    items: [
      {
        id: 'angular',
        name: 'Angular',
        benefit: { fr: 'Interfaces web rapides, structurées et durables', en: 'Fast, structured and long-lasting web apps' },
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        benefit: { fr: 'Code plus fiable qui réduit les bugs avant la mise en ligne', en: 'Safer code that catches issues before launch' },
      },
      {
        id: 'react-native',
        name: 'React Native',
        benefit: { fr: 'Applications mobiles fluides sur iOS et Android', en: 'Smooth mobile apps for iOS and Android' },
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        benefit: { fr: 'Design moderne, cohérent et adapté à chaque écran', en: 'Modern, consistent design on every screen size' },
      },
      {
        id: 'charts',
        name: 'Dataviz',
        benefit: { fr: 'Tableaux de bord et graphiques lisibles pour décider vite', en: 'Clear dashboards and charts for faster decisions' },
      },
    ],
  },
  {
    id: 'backend',
    title: { fr: 'Backend & Logique métier', en: 'Backend & Architecture' },
    subtitle: {
      fr: 'Le moteur solide qui fait tourner vos applications et relie vos services.',
      en: 'The reliable engine powering your apps and connecting your services.',
    },
    items: [
      {
        id: 'java',
        name: 'Java',
        benefit: { fr: 'Langage robuste éprouvé sur les apps d’entreprise et bancaires', en: 'Robust foundation proven across enterprise and banking apps' },
      },
      {
        id: 'spring',
        name: 'Spring Boot',
        benefit: { fr: 'Serveurs fiables, évolutifs et rapides à maintenir', en: 'Reliable, scalable and maintainable back-end servers' },
      },
      {
        id: 'kafka',
        name: 'Apache Kafka',
        benefit: { fr: 'Échanges temps réel sans perte (commandes, alertes, paiements)', en: 'Loss-free real-time data flows (orders, alerts, payments)' },
      },
      {
        id: 'api',
        name: 'API REST',
        benefit: { fr: 'Connexion fluide entre partenaires, web et mobile', en: 'Seamless bridges between partners, web and mobile' },
      },
      {
        id: 'websocket',
        name: 'Temps réel',
        benefit: { fr: 'Messagerie et notifications instantanées sans rechargement', en: 'Instant chat and alerts without page reloads' },
      },
    ],
  },
  {
    id: 'data',
    title: { fr: 'Données & Sécurité', en: 'Data & Security' },
    subtitle: {
      fr: 'Protection des comptes, confidentialité et fiabilité des informations.',
      en: 'Account protection, privacy and trustworthy data storage.',
    },
    items: [
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        benefit: { fr: 'Base de données fiable pour tout projet métier ou financier', en: 'Rock-solid database for any business or financial product' },
      },
      {
        id: 'redis',
        name: 'Redis',
        benefit: { fr: 'Accélération immédiate des écrans les plus consultés', en: 'Instant speed boost for high-traffic screens' },
      },
      {
        id: 'databases',
        name: 'MySQL / Mongo',
        benefit: { fr: 'Stockage adapté aux boutiques, catalogues et suivis', en: 'Flexible storage for stores, catalogues and logs' },
      },
      {
        id: 'keycloak',
        name: 'Keycloak',
        benefit: { fr: 'Connexion centralisée et contrôle strict des accès', en: 'Centralised login and strict access control' },
      },
      {
        id: 'security',
        name: 'Sécurité Web',
        benefit: { fr: 'Protection contre les failles courantes (OAuth2, OWASP)', en: 'Protection against common threats (OAuth2, OWASP)' },
      },
    ],
  },
  {
    id: 'tools',
    title: { fr: 'Cloud & Livraison', en: 'Cloud & Delivery' },
    subtitle: {
      fr: 'Déploiement fiable, mises à jour sans coupure et travail en équipe.',
      en: 'Reliable launches, zero-friction updates and smooth teamwork.',
    },
    items: [
      {
        id: 'docker',
        name: 'Docker',
        benefit: { fr: 'Application qui fonctionne à l’identique sur tout serveur', en: 'Consistent behaviour across every server environment' },
      },
      {
        id: 'aws',
        name: 'AWS Cloud',
        benefit: { fr: 'Hébergement disponible et capable d’absorber la charge', en: 'Highly available cloud hosting built to scale' },
      },
      {
        id: 'git',
        name: 'Git',
        benefit: { fr: 'Historique propre et collaboration fluide en équipe', en: 'Clean version history and smooth team collaboration' },
      },
      {
        id: 'cicd',
        name: 'CI / CD',
        benefit: { fr: 'Mises en ligne automatisées et vérifiées à chaque étape', en: 'Automated checks and smooth, safe releases' },
      },
      {
        id: 'agile',
        name: 'Agile / Scrum',
        benefit: { fr: 'Livraisons régulières alignées sur les priorités métier', en: 'Regular deliveries aligned with business priorities' },
      },
    ],
  },
];

/** Liste plate utilisée uniquement pour le JSON-LD `knowsAbout`. */
export const allSkills = [...new Set(skillGroups.flatMap((g) => g.items.map((i) => i.name)))];
