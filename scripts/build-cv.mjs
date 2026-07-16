// Generates the .docx version of the CV using the `docx` package.
// Run: node scripts/build-cv.mjs
//
// Writes the file to:
//   - /Daniel_Fortune_Ofu-Owoicho_CV.docx   (repo root, for ad-hoc sharing)
//   - /public/Daniel_Fortune_Ofu-Owoicho_CV.docx   (served by Vite, downloaded from the site)

import { writeFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  HeadingLevel,
  Header,
  LevelFormat,
  PageNumber,
  Packer,
  Paragraph,
  TextRun,
  ShadingType,
  TabStopType,
  TabStopPosition,
  convertInchesToTwip,
} from 'docx';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const FILENAME = 'Daniel_Fortune_Ofu-Owoicho_CV.docx';
const OUT_ROOT = join(ROOT, FILENAME);
const OUT_PUBLIC = join(ROOT, 'public', FILENAME);

// --- Theme tokens ---
const C = {
  ink: '111827',        // near-black for body
  muted: '4B5563',      // secondary text
  accent: '1F3A8A',     // deep blue (subtle accent only)
  rule: 'D1D5DB',       // divider lines
  bg: 'F3F4F6',         // subtle callout background
};

const FONT = 'Calibri';

// --- Section builders ---

const header = (name, role, contact) => [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [
      new TextRun({ text: name, bold: true, size: 36, color: C.ink, font: FONT }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [
      new TextRun({ text: role, size: 22, color: C.muted, font: FONT }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: contact.flatMap((line, i) => {
      const sep = i < contact.length - 1
        ? [new TextRun({ text: '   •   ', color: C.rule, size: 20, font: FONT })]
        : [];
      return [new TextRun({ text: line, size: 20, color: C.muted, font: FONT }), ...sep];
    }),
  }),
];

const sectionTitle = (text) =>
  new Paragraph({
    spacing: { before: 240, after: 80 },
    border: {
      bottom: { color: C.rule, style: BorderStyle.SINGLE, size: 6, space: 4 },
    },
    children: [
      new TextRun({ text: text.toUpperCase(), bold: true, size: 22, color: C.accent, font: FONT, characterSpacing: 40 }),
    ],
  });

const body = (text, opts = {}) =>
  new Paragraph({
    spacing: { after: 80, ...opts.spacing },
    children: [new TextRun({ text, size: 22, color: C.ink, font: FONT, ...opts.run })],
  });

const muted = (text) =>
  new Paragraph({
    spacing: { after: 80 },
    children: [new TextRun({ text, size: 20, color: C.muted, font: FONT })],
  });

const bullet = (parts) => {
  // parts: array of { text, bold?: boolean } runs
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 60 },
    children: parts.map((p) =>
      new TextRun({ text: p.text, size: 22, color: C.ink, font: FONT, bold: !!p.bold }),
    ),
  });
};

// Two-column row: left = label, right = value (used for Education entries)
const labeledRow = (label, value, valueOpts = {}) =>
  new Paragraph({
    spacing: { after: 40 },
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      new TextRun({ text: label, bold: true, size: 22, color: C.ink, font: FONT }),
      new TextRun({ text: '\t', font: FONT }),
      new TextRun({ text: value, size: 22, color: C.muted, font: FONT, ...valueOpts.run }),
    ],
  });

// Project entry: title with optional right-aligned tech stack, then bullets.
const project = ({ title, stack, description, bullets, link }) => {
  const children = [
    new Paragraph({
      spacing: { after: 40 },
      tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
      children: [
        new TextRun({ text: title, bold: true, size: 22, color: C.ink, font: FONT }),
        new TextRun({ text: '\t', font: FONT }),
        new TextRun({ text: stack, italics: true, size: 20, color: C.muted, font: FONT }),
      ],
    }),
  ];
  if (description) {
    children.push(
      new Paragraph({
        spacing: { after: 60 },
        children: [new TextRun({ text: description, size: 21, color: C.ink, font: FONT })],
      }),
    );
  }
  for (const b of bullets) {
    children.push(bullet(b));
  }
  if (link) {
    children.push(
      new Paragraph({
        spacing: { after: 160 },
        indent: { left: convertInchesToTwip(0.25) },
        children: [
          new TextRun({ text: 'Source: ', bold: true, size: 20, color: C.muted, font: FONT }),
          new TextRun({ text: link, size: 20, color: C.accent, font: FONT }),
        ],
      }),
    );
  } else {
    children.push(new Paragraph({ spacing: { after: 140 }, children: [new TextRun('')] }));
  }
  return children;
};

// --- Content ---

const NAME = 'Daniel Fortune Ofu-Owoicho';
const ROLE = 'Frontend Developer  |  React, Next.js & JavaScript';
const CONTACT = [
  'Abuja, Nigeria',
  'fortunerohi27@gmail.com',
  'github.com/fortunerohi27-crypto',
  'Portfolio: daniel-fortune-portfolio.vercel.app',
];

const PROFILE =
  'Frontend developer with hands-on experience designing, building, and deploying responsive web applications. Comfortable across the React ecosystem (React, Next.js, Vite, React Native/Expo) and grounded in core JavaScript, HTML5, and CSS3. Currently expanding into backend and full-stack work through the ADSE program at Aptech, with a strong interest in shipping polished interfaces that solve real problems.';

const SKILLS = [
  ['Frontend', 'React, Next.js, Vite, React Native (Expo), HTML5, CSS3, JavaScript (ES6+)'],
  ['Backend (in progress)', 'Node.js, Express.js, REST APIs, JWT authentication'],
  ['Programming Languages', 'JavaScript, Java'],
  ['Tools & Workflow', 'Git, GitHub, Vercel, VS Code, IntelliJ IDEA, Figma, npm'],
  ['Core Concepts', 'Component-based architecture, Responsive Web Design, DOM manipulation, Form validation, OOP, REST fundamentals'],
];

const PROJECTS = [
  {
    title: 'Nex Studio — Cinematic Landing Page',
    stack: 'Next.js 14, TypeScript, Prisma',
    description:
      'Full-stack marketing site for a creative studio. Features smooth cinematic scroll, full authentication, a role-based admin dashboard, and a content management system for gallery, testimonials, contact submissions, and newsletter subscribers.',
    bullets: [
      [{ text: 'Built the marketing site with a smooth, cinematic scroll experience and a polished, content-driven UI.' }],
      [{ text: 'Implemented role-based admin dashboard and CMS for gallery, testimonials, and subscriber data.' }],
      [{ text: 'Modeled the data layer with ', bold: false }, { text: 'Prisma', bold: true }, { text: ' and delivered end-to-end auth flows.' }],
    ],
    link: 'github.com/fortunerohi27-crypto/cinematic-landing-page',
  },
  {
    title: 'PlayfulOutings — Picnic Games & Getaways',
    stack: 'HTML5, CSS3, JavaScript, Responsive Design',
    description:
      'Single-page recreational outing platform cataloguing picnic and party games by audience (Indoor, Outdoor, Kids, Males, Females, Family) alongside curated getaway itineraries. Includes a looping background video, smooth-scroll navigation, active-section highlighting, a category filter, and a localStorage-backed visitor counter.',
    bullets: [
      [{ text: 'Collaborated with a teammate from concept to a ', bold: false }, { text: 'live Vercel deployment', bold: true }, { text: '.' }],
      [{ text: 'Built responsive layouts with animated backgrounds across desktop, tablet, and mobile.' }],
      [{ text: 'Implemented category filtering, smooth scroll, and a persistent visitor counter using ', bold: false }, { text: 'localStorage', bold: true }, { text: '.' }],
    ],
    link: 'github.com/fortunerohi27-crypto/playful-outings',
  },
  {
    title: 'Jevinik Restaurant',
    stack: 'React 18, Vite, JavaScript, CSS',
    description:
      'Polished single-page restaurant site for a Nigerian restaurant brand. Refactored from a hand-coded HTML prototype into a component-based React + Vite build, with sections for hero, about, tabbed menu, gallery, and a reservation form.',
    bullets: [
      [{ text: 'Refactored a static prototype into a ', bold: false }, { text: 'component-based React + Vite', bold: true }, { text: ' application.' }],
      [{ text: 'Implemented tabbed menu, gallery, and a reservation form with client-side validation.' }],
    ],
    link: 'github.com/fortunerohi27-crypto/jevinik-restaurant',
  },
  {
    title: 'ATM Console Application',
    stack: 'Java, OOP, File I/O',
    description:
      'Java console ATM with login, balance, deposit, withdraw, transfer, and bounded transaction history. State is persisted to disk after every mutating action; PINs are stored as hashes, not plaintext.',
    bullets: [
      [{ text: 'Modelled the domain as ', bold: false }, { text: 'Account', bold: true }, { text: ', ', bold: false }, { text: 'Bank', bold: true }, { text: ', and ', bold: false }, { text: 'Transaction', bold: true }, { text: ' classes with clear separation of I/O, validation, and business logic.' }],
      [{ text: 'Implemented ', bold: false }, { text: 'file persistence', bold: true }, { text: ' (Java serialization) so balances and history survive a restart, plus an atomic transfer with rollback on failure.' }],
      [{ text: 'Defended input at two layers: ', bold: false }, { text: 'reusable validation helpers', bold: true }, { text: ' in the CLI plus invariant checks inside the model.' }],
    ],
    link: 'github.com/fortunerohi27-crypto/-atm-console-app',
  },
];

const EDUCATION = [
  {
    school: 'Aptech Computer Education',
    detail: 'Advanced Diploma in Software Engineering (ADSE) — In Progress',
    meta: 'Current: In view',
  },
  {
    school: 'Senior Secondary School Certificate (SSCE) — NECO',
    detail: '',
    meta: '',
  },
  {
    school: 'West African Senior School Certificate (WASSCE) — WAEC',
    detail: '',
    meta: '',
  },
];

const ACHIEVEMENTS = [
  'Designed, developed, and deployed multiple production web applications to Vercel.',
  'Built a portfolio of full-stack web projects and Java-based software on GitHub.',
];

// --- Document ---

const children = [
  ...header(NAME, ROLE, CONTACT),
  sectionTitle('Profile'),
  body(PROFILE),
  sectionTitle('Technical Skills'),
  ...SKILLS.flatMap(([label, list]) => [
    new Paragraph({
      spacing: { after: 60 },
      tabStops: [{ type: TabStopType.LEFT, position: 1700 }],
      children: [
        new TextRun({ text: `${label}:`, bold: true, size: 22, color: C.ink, font: FONT }),
        new TextRun({ text: '  ', font: FONT }),
        new TextRun({ text: list, size: 22, color: C.ink, font: FONT }),
      ],
    }),
  ]),
  sectionTitle('Key Projects'),
  ...PROJECTS.flatMap((p) => project(p)),
  sectionTitle('Education'),
  ...EDUCATION.flatMap(({ school, detail, meta }) => {
    const rows = [
      labeledRow(school, meta),
    ];
    if (detail) rows.push(muted(detail));
    rows.push(new Paragraph({ spacing: { after: 80 }, children: [new TextRun('')] }));
    return rows;
  }),
  sectionTitle('Achievements'),
  ...ACHIEVEMENTS.map((a) => bullet([{ text: a }])),
];

const doc = new Document({
  creator: NAME,
  title: `${NAME} — CV`,
  description: 'Frontend Developer CV (React, Next.js, JavaScript).',
  styles: {
    default: {
      document: { run: { font: FONT, size: 22 } },
    },
  },
  numbering: {
    config: [
      {
        reference: 'bullet-list',
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: '•',
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: convertInchesToTwip(0.3), hanging: convertInchesToTwip(0.2) } } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(0.7),
            right: convertInchesToTwip(0.8),
            bottom: convertInchesToTwip(0.7),
            left: convertInchesToTwip(0.8),
          },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({ text: `${NAME}  —  ${ROLE}`, size: 18, color: C.muted, font: FONT }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: 'Page ', size: 18, color: C.muted, font: FONT }),
                new TextRun({ children: [PageNumber.CURRENT], size: 18, color: C.muted, font: FONT }),
                new TextRun({ text: ' of ', size: 18, color: C.muted, font: FONT }),
                new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: C.muted, font: FONT }),
              ],
            }),
          ],
        }),
      },
      children,
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
mkdirSync(dirname(OUT_PUBLIC), { recursive: true });
writeFileSync(OUT_ROOT, buffer);
copyFileSync(OUT_ROOT, OUT_PUBLIC);
console.log(`Wrote:\n  ${OUT_ROOT}\n  ${OUT_PUBLIC}`);
