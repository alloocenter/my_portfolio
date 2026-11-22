import type { L10n } from '../i18n/ui';

export type ProjectVisualKind =
  | 'payments'
  | 'hr'
  | 'learning'
  | 'inventory'
  | 'messaging'
  | 'notifications'
  | 'suite';

export interface ProjectTech {
  name: string;
  benefit: L10n;
}

export interface ProjectItem {
  id: string;
  number: string;
  visual: ProjectVisualKind;
  title: L10n;
  context: L10n;
  year: string;
  category: L10n;
  /** 1 phrase orientée usage/bénéfice affichée sur la carte visuelle. */
  summary: L10n;
  /** 3 points concis sans jargon affichés uniquement dans la modale. */
  problem: L10n;
  solution: L10n;
  result: L10n;
  role: L10n;
  stack: ProjectTech[];
  repo?: string;
}

/** Projet phare pleine largeur — MediaSoft Lafayette (confidentiel). */
export const flagshipProject: ProjectItem = {
  id: 'interop',
  number: '01',
  visual: 'payments',
  title: {
    fr: 'Plateforme de paiements numériques & interopérabilité',
    en: 'Digital payments & financial interoperability platform',
  },
  context: { fr: 'MediaSoft Lafayette', en: 'MediaSoft Lafayette' },
  year: '2026',
  category: { fr: 'FinTech', en: 'FinTech' },
  summary: {
    fr: 'Relie plusieurs partenaires financiers pour faire circuler paiements et alertes sans perte ni retard.',
    en: 'Connects financial partners so digital payments and alerts flow smoothly with zero data loss.',
  },
  problem: {
    fr: 'Faire dialoguer des partenaires financiers équipés de systèmes différents sans perdre de transaction ni d’alerte.',
    en: 'Connect financial partners running different systems without dropping a single transaction or alert.',
  },
  solution: {
    fr: 'Création d’un portail web de pilotage, d’une application mobile terrain et d’un moteur d’échanges sécurisés entre partenaires.',
    en: 'Built a web operations portal, a mobile field app and a secure exchange engine linking partner networks.',
  },
  result: {
    fr: 'Chaque opération est tracée de bout en bout et chaque service peut évoluer sans interrompre les autres.',
    en: 'Every operation is tracked end-to-end and services can scale independently without downtime.',
  },
  role: { fr: 'Développeur Web & Mobile Full-Stack', en: 'Full-Stack Web & Mobile Developer' },
  stack: [
    { name: 'Java / Spring Boot', benefit: { fr: 'Moteur serveur fiable et sécurisé', en: 'Reliable, secure back-end core' } },
    { name: 'Apache Kafka', benefit: { fr: 'Échanges temps réel sans perte', en: 'Loss-free real-time exchanges' } },
    { name: 'Angular & React Native', benefit: { fr: 'Portail web et app mobile fluides', en: 'Fast web portal & mobile app' } },
    { name: 'PostgreSQL · Redis · Docker', benefit: { fr: 'Données protégées et déploiement stable', en: 'Protected data & stable deployment' } },
  ],
};

/** Grille visuelle de réalisations (02 → 07). */
export const galleryProjects: ProjectItem[] = [
  {
    id: 'sirh',
    number: '02',
    visual: 'hr',
    title: { fr: 'Portail RH — Douane malienne', en: 'HR Portal — Malian Customs' },
    context: { fr: 'Douane malienne', en: 'Malian Customs' },
    year: '2023',
    category: { fr: 'Secteur public', en: 'Public sector' },
    summary: {
      fr: 'Centralise carrières, congés et mobilités des agents pour remplacer les suivis papier.',
      en: 'Centralises staff careers, leave and transfers to replace slow manual tracking.',
    },
    problem: {
      fr: 'Le suivi des agents (carrières, congés, mutations, formations) se faisait à la main : lent et difficile à contrôler.',
      en: 'Managing staff records, leave, transfers and training by hand was slow and hard to audit.',
    },
    solution: {
      fr: 'Développement d’un portail web complet regroupant 12 espaces métier (agents, congés, formations, tableaux de bord et journal d’activité).',
      en: 'Built a 12-module web portal covering staff profiles, leave, training, analytics dashboards and audit trails.',
    },
    result: {
      fr: 'Démarches RH centralisées, historique consultable à tout moment et forte baisse des saisies manuelles.',
      en: 'Unified HR workflows, complete activity history and markedly less manual paperwork.',
    },
    role: { fr: 'Développeur Full-Stack (stage)', en: 'Full-Stack Developer (internship)' },
    stack: [
      { name: 'Angular', benefit: { fr: 'Interface claire organisée en 12 modules', en: 'Clean interface structured in 12 modules' } },
      { name: 'Spring Boot', benefit: { fr: 'Accès protégés par rôle et suivi des actions', en: 'Role-protected access and audit history' } },
      { name: 'Chart.js', benefit: { fr: 'Statistiques RH lisibles en un coup d’œil', en: 'At-a-glance HR analytics charts' } },
    ],
    repo: 'https://github.com/alloocenter/douanes-frt',
  },
  {
    id: 'elearning',
    number: '03',
    visual: 'learning',
    title: { fr: 'Plateforme e-learning sécurisée', en: 'Secured e-learning platform' },
    context: { fr: 'Orange Digital Center', en: 'Orange Digital Center' },
    year: '2024',
    category: { fr: 'Éducation', en: 'EdTech' },
    summary: {
      fr: 'Espace de formation en ligne complet avec accès dédiés pour administrateurs, formateurs et apprenants.',
      en: 'Complete online training hub with tailored access for admins, trainers and learners.',
    },
    problem: {
      fr: 'Offrir une plateforme de cours en ligne fiable en séparant strictement les droits de chaque profil utilisateur.',
      en: 'Deliver a reliable online learning space with strict permission boundaries for every user role.',
    },
    solution: {
      fr: 'Conception de l’espace web, de la gestion des comptes et des notifications par e-mail au sein d’une équipe de 6 personnes.',
      en: 'Built the web experience, secure user accounts and automated email alerts in an Agile team of 6.',
    },
    result: {
      fr: 'Livraison complète en 5 mois avec sécurité renforcée et socle réutilisable sur d’autres projets.',
      en: 'Shipped in 5 months with hardened security and a reusable authentication foundation.',
    },
    role: { fr: 'Analyse, développement & tests', en: 'Analysis, development & QA' },
    stack: [
      { name: 'Spring Boot & Security', benefit: { fr: 'Comptes et rôles protégés', en: 'Protected accounts and roles' } },
      { name: 'Angular', benefit: { fr: 'Navigation fluide sur les cours', en: 'Smooth course navigation' } },
      { name: 'AWS & MySQL', benefit: { fr: 'Hébergement cloud et stockage fiable', en: 'Cloud hosting & reliable storage' } },
    ],
    repo: 'https://github.com/alloocenter/odc_learning_api',
  },
  {
    id: 'inventory',
    number: '04',
    visual: 'inventory',
    title: { fr: 'Gestion de stocks & alertes rupture', en: 'Inventory & low-stock alerts' },
    context: { fr: 'Projet open source', en: 'Open source' },
    year: '2026',
    category: { fr: 'Logistique', en: 'Logistics' },
    summary: {
      fr: 'Suit les stocks en direct et prévient automatiquement les équipes avant toute rupture.',
      en: 'Tracks inventory in real time and alerts teams automatically before stock runs out.',
    },
    problem: {
      fr: 'Des ruptures imprévues et des commandes fournisseurs éparpillées dans des tableurs peu fiables.',
      en: 'Unexpected stock-outs and supplier orders scattered across error-prone spreadsheets.',
    },
    solution: {
      fr: 'Création d’une application de gestion réunissant produits, fournisseurs, bons de commande, alertes de seuil bas et rapports visuels.',
      en: 'Designed a management app unifying products, suppliers, purchase orders, low-stock alerts and visual reports.',
    },
    result: {
      fr: 'Ruptures anticipées avant épuisement et historique complet de chaque contrôle d’inventaire.',
      en: 'Earlier restocking decisions and full traceability across every inventory audit.',
    },
    role: { fr: 'Conception & interface web', en: 'Product design & front-end' },
    stack: [
      { name: 'Angular & Material', benefit: { fr: 'Saisie rapide et ergonomique au quotidien', en: 'Fast, clear daily operations UI' } },
      { name: 'Highcharts', benefit: { fr: 'Courbes de stock et alertes visuelles', en: 'Visual stock trends & alerts' } },
      { name: 'TypeScript', benefit: { fr: 'Application stable et facile à maintenir', en: 'Stable, maintainable codebase' } },
    ],
    repo: 'https://github.com/alloocenter/inventory-front',
  },
  {
    id: 'messaging',
    number: '05',
    visual: 'messaging',
    title: { fr: 'Messagerie instantanée sécurisée', en: 'Secure real-time messaging' },
    context: { fr: 'Projet open source', en: 'Open source' },
    year: '2025',
    category: { fr: 'Communication', en: 'Real-time' },
    summary: {
      fr: 'Application de discussion temps réel avec partage de fichiers et connexion de niveau entreprise.',
      en: 'Instant messaging with file sharing and enterprise-grade user authentication.',
    },
    problem: {
      fr: 'Permettre des échanges instantanés et le transfert de fichiers tout en garantissant l’identité de chaque utilisateur.',
      en: 'Enable instant conversations and file sharing while strictly verifying every user’s identity.',
    },
    solution: {
      fr: 'Développement d’un serveur de messagerie instantanée relié à un système d’authentification centralisé et prêt à déployer.',
      en: 'Built a real-time chat server connected to centralised login security and ready-to-run deployment.',
    },
    result: {
      fr: 'Architecture claire (discussions, fichiers, sécurité) démarrable en une seule commande.',
      en: 'Clean, modular architecture (chats, files, security) ready to launch in one command.',
    },
    role: { fr: 'Architecture & développement serveur', en: 'Back-end architecture & build' },
    stack: [
      { name: 'WebSocket', benefit: { fr: 'Messages reçus instantanément sans recharger', en: 'Instant message delivery with zero reload' } },
      { name: 'Keycloak', benefit: { fr: 'Connexion sécurisée de niveau entreprise', en: 'Enterprise-grade authentication' } },
      { name: 'PostgreSQL & Docker', benefit: { fr: 'Historique fiable et mise en route rapide', en: 'Reliable history & quick setup' } },
    ],
    repo: 'https://github.com/alloocenter/wathsapp_clone',
  },
  {
    id: 'notifications',
    number: '06',
    visual: 'notifications',
    title: { fr: 'Suivi des notifications financières', en: 'Financial notification tracker' },
    context: { fr: 'MediaSoft Lafayette', en: 'MediaSoft Lafayette' },
    year: '2026',
    category: { fr: 'FinTech', en: 'FinTech' },
    summary: {
      fr: 'Donne aux équipes une vue directe sur chaque message financier pour détecter les incidents immédiatement.',
      en: 'Gives teams live visibility into every financial message to spot and resolve issues fast.',
    },
    problem: {
      fr: 'Suivre des échanges critiques entre plusieurs partenaires financiers et identifier rapidement le moindre blocage.',
      en: 'Monitor critical exchanges across multiple financial partners and pinpoint failures quickly.',
    },
    solution: {
      fr: 'Mise en place d’un outil dédié qui relie chaque notification à son statut réel (envoyée, reçue ou en erreur).',
      en: 'Built a dedicated tracking service correlating every notification with its live delivery state.',
    },
    result: {
      fr: 'Visibilité opérationnelle immédiate sur le cycle de vie de chaque message échangé.',
      en: 'Immediate operational visibility over the full lifecycle of every partner notification.',
    },
    role: { fr: 'Développeur Full-Stack', en: 'Full-Stack Developer' },
    stack: [
      { name: 'Spring Boot & Kafka', benefit: { fr: 'Suivi temps réel des événements', en: 'Live event correlation' } },
      { name: 'Angular', benefit: { fr: 'Tableau de bord clair pour les équipes', en: 'Clear monitoring dashboard' } },
      { name: 'PostgreSQL', benefit: { fr: 'Historique complet pour le diagnostic', en: 'Complete history for audits' } },
    ],
  },
  {
    id: 'crm-alloo',
    number: '07',
    visual: 'suite',
    title: { fr: 'Suite métier : CRM, Livraison & E-commerce', en: 'Business suite: CRM, Delivery & Store' },
    context: { fr: 'AllooCenter Mali', en: 'AllooCenter Mali' },
    year: '2024—2026',
    category: { fr: 'Applications métier', en: 'Business apps' },
    summary: {
      fr: 'Trois outils quotidiens réunis pour gérer la relation client, les livraisons et les ventes en ligne.',
      en: 'Three daily tools unified to manage customer relations, deliveries and online sales.',
    },
    problem: {
      fr: 'Unifier la relation client, le suivi des livreurs et la boutique en ligne sur une base fiable et évolutive.',
      en: 'Unify customer care, delivery tracking and online commerce on one reliable foundation.',
    },
    solution: {
      fr: 'Développement des trois applications web et de leurs tableaux de suivi, connectés à des services sécurisés.',
      en: 'Built all three web applications and reporting dashboards backed by secured shared services.',
    },
    result: {
      fr: 'Outils exploités chaque jour par les équipes internes avec des performances suivies en continu.',
      en: 'Used every day by internal teams with continuous reliability and performance improvements.',
    },
    role: { fr: 'Développeur Full-Stack', en: 'Full-Stack Developer' },
    stack: [
      { name: 'Angular', benefit: { fr: 'Interfaces fluides adaptées aux équipes', en: 'Smooth interfaces tailored to staff' } },
      { name: 'Spring Boot & Security', benefit: { fr: 'Accès cloisonnés et paiements protégés', en: 'Secured access & transactions' } },
      { name: 'PostgreSQL & MySQL', benefit: { fr: 'Stocks, clients et commandes synchronisés', en: 'Synced stock, clients & orders' } },
    ],
  },
];

export const allProjects: ProjectItem[] = [flagshipProject, ...galleryProjects];
