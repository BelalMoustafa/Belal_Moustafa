import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "belalmoustafa65@gmail.com";
  const password = process.env.ADMIN_PASSWORD || "Belal@Lead2026!X9kQ";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name: "Belal Moustafa" },
    create: { email, name: "Belal Moustafa", passwordHash },
  });

  await prisma.project.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.honor.deleteMany();
  await prisma.metric.deleteMany();
  await prisma.message.deleteMany();
  await prisma.siteSetting.deleteMany();

  await prisma.siteSetting.create({
    data: {
      key: "profile",
      value: JSON.stringify({
        nameEn: "Belal Moustafa",
        nameAr: "بلال مصطفى",
        titleEn: "Technical Lead & Full-Stack / Frontend Software Engineer",
        titleAr: "قائد تقني ومهندس برمجيات متكامل / واجهات في ترقمي",
        locationEn: "Cairo, Egypt",
        locationAr: "القاهرة، مصر",
        email: "belalmoustafa65@gmail.com",
        phone: "+201157167417",
        phoneDisplay: "+20 115 716 7417",
        whatsapp: "201157167417",
        linkedin: "https://www.linkedin.com/in/belal-moustafa30/",
        github: "https://github.com/BelalMoustafa",
        companyUrl: "https://tarqumi.com",
        photo: "/uploads/profile/belal-moustafa.png",
        availabilityEn:
          "Available for Technical Leadership, Consulting & High-Impact Projects",
        availabilityAr:
          "متاح للقيادة التقنية والاستشارات والمشاريع عالية الأثر",
        summaryEn:
          "Full-Stack and Frontend Software Engineer and Technical Lead with 3+ years building cloud systems, high-performance web apps, and cross-platform mobile products. Leads multi-disciplinary teams of up to 15 engineers, ships 55+ production projects, and designs platforms serving 10,000+ concurrent users.",
        summaryAr:
          "مهندس برمجيات Full-Stack وFrontend وقائد تقني بخبرة تتجاوز +3 سنوات في بناء الأنظمة السحابية وتطبيقات الويب عالية الأداء وتطبيقات الموبايل العابرة للمنصات. يقود فرقاً متعددة التخصصات تصل إلى 15 مطوراً، ويسلّم أكثر من +55 مشروعاً إنتاجياً، ويصمم منصات تخدم أكثر من +10,000 مستخدم متزامن.",
        cvFullstack: "/cv/belal-moustafa-cv-fullstack.html",
        cvFrontend: "/cv/belal-moustafa-cv.html",
      }),
    },
  });

  await prisma.siteSetting.create({
    data: {
      key: "seo",
      value: JSON.stringify({
        home: {
          titleEn:
            "Belal Moustafa | Technical Lead & Full-Stack Software Engineer",
          titleAr: "بلال مصطفى | قائد تقني ومهندس برمجيات متكامل",
          descriptionEn:
            "Official portfolio of Belal Moustafa — Technical Lead at Tarqumi. Full-Stack and Frontend engineering across SaaS, fintech, CRM, and clinic platforms.",
          descriptionAr:
            "الموقع الرسمي لبلال مصطفى — قائد تقني في ترقمي. هندسة Full-Stack وFrontend عبر منصات SaaS والتقنية المالية وCRM والعيادات.",
        },
        projects: {
          titleEn: "Engineering Case Studies | Belal Moustafa",
          titleAr: "دراسات حالة هندسية | بلال مصطفى",
          descriptionEn:
            "Flagship case studies: w-Hub, Care Synq, MetaTrader, AIM, and Clinova — architecture, stack, and ownership.",
          descriptionAr:
            "دراسات حالة رائدة: w-Hub وCare Synq وMetaTrader وAIM وClinova — المعمارية والتقنيات والملكية.",
        },
        resume: {
          titleEn: "Interactive Dual-Track Resume | Belal Moustafa",
          titleAr: "سيرة ذاتية تفاعلية بمسارين | بلال مصطفى",
          descriptionEn:
            "Switch between Full-Stack Technical Lead and Frontend Technical Lead CV tracks. Print-ready A4 PDF.",
          descriptionAr:
            "بدّل بين مسار Full-Stack ومسار Frontend. سيرة جاهزة للطباعة بحجم A4.",
        },
        contact: {
          titleEn: "Contact Belal Moustafa | Technical Leadership",
          titleAr: "تواصل مع بلال مصطفى | القيادة التقنية",
          descriptionEn:
            "WhatsApp +20 115 716 7417 · belalmoustafa65@gmail.com · Cairo, Egypt.",
          descriptionAr:
            "واتساب +20 115 716 7417 · belalmoustafa65@gmail.com · القاهرة، مصر.",
        },
      }),
    },
  });

  const metrics = [
    { value: "3+", labelEn: "Years experience", labelAr: "سنوات خبرة", sortOrder: 1 },
    { value: "55+", labelEn: "Production projects", labelAr: "مشاريع إنتاجية", sortOrder: 2 },
    { value: "15+", labelEn: "Engineers led", labelAr: "مطورون تحت القيادة", sortOrder: 3 },
    { value: "10k+", labelEn: "Concurrent users", labelAr: "مستخدم متزامن", sortOrder: 4 },
  ];
  for (const m of metrics) await prisma.metric.create({ data: m });

  const skills: { name: string; category: string; sortOrder: number }[] = [
    ...["TypeScript", "JavaScript", "PHP", "Dart", "Java"].map((name, i) => ({
      name,
      category: "languages",
      sortOrder: i + 1,
    })),
    ...[
      "Next.js",
      "React",
      "Flutter",
      "Expo",
      "Tailwind CSS",
      "Zustand",
      "Riverpod",
      "TanStack Query",
    ].map((name, i) => ({ name, category: "frontend", sortOrder: i + 1 })),
    ...[
      "NestJS",
      "Laravel",
      "Node.js",
      "RESTful APIs",
      "WebSockets (Socket.io)",
      "Laravel Sanctum",
    ].map((name, i) => ({ name, category: "backend", sortOrder: i + 1 })),
    ...["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma ORM"].map(
      (name, i) => ({ name, category: "databases", sortOrder: i + 1 }),
    ),
    ...[
      "Docker",
      "GitHub Actions (CI/CD)",
      "Nginx",
      "Linux (Ubuntu VPS)",
      "Monorepo (Turbo)",
      "Multi-tenant Architecture",
      "i18n (next-intl)",
      "UI/UX Optimization",
      "Responsive Design",
    ].map((name, i) => ({ name, category: "devops", sortOrder: i + 1 })),
  ];
  for (const s of skills) await prisma.skill.create({ data: s });

  const experiences = [
    {
      companyEn: "Tarqumi",
      companyAr: "ترقمي",
      roleEn: "Technical Lead & Full-Stack / Frontend Engineer",
      roleAr: "قائد تقني ومهندس Full-Stack / Frontend",
      startLabel: "Feb 2026",
      endLabel: "Present",
      track: "both",
      sortOrder: 1,
      bulletsEn: JSON.stringify([
        "Led full-stack and frontend architecture for a cross-functional team of 15 engineers, defining system standards, database patterns, and reusable UI libraries.",
        "Oversaw API integration and performance parity between web and mobile clients across 55+ production projects.",
        "Built zero-downtime CI/CD pipelines with GitHub Actions and Docker for platforms serving 10,000+ concurrent users.",
      ]),
      bulletsAr: JSON.stringify([
        "قيادة المعمارية الشاملة (Full-Stack وFrontend) لفريق يضم 15 مطوراً، مع وضع معايير الأنظمة وقواعد البيانات ومكتبات الواجهات القابلة لإعادة الاستخدام.",
        "الإشراف على تكامل الـ APIs وتطابق الأداء بين تطبيقات الويب والموبايل عبر أكثر من 55 مشروعاً إنتاجياً.",
        "بناء خطوط نشر مؤتمتة عبر GitHub Actions وDocker بدون توقف لمنصات تخدم أكثر من 10,000 مستخدم متزامن.",
      ]),
    },
    {
      companyEn: "Ashour Group",
      companyAr: "مجموعة عاشور",
      roleEn: "Head of Software Team & Software Board Member",
      roleAr: "رئيس فريق البرمجيات وعضو مجلس البرمجيات",
      startLabel: "Feb 2025",
      endLabel: "May 2026",
      track: "both",
      sortOrder: 2,
      bulletsEn: JSON.stringify([
        "Directed the technical roadmap, aligning frontend and backend delivery with strategic business goals.",
        "Standardized engineering practices across React, Next.js, and Laravel.",
        "Mentored developers on modern state management and architectural reviews for performance and security.",
      ]),
      bulletsAr: JSON.stringify([
        "توجيه خارطة الطريق التقنية وربط تطوير الواجهات والباك إند بالأهداف الاستراتيجية.",
        "توحيد المعايير الهندسية عبر React وNext.js وLaravel.",
        "تدريب المطورين على إدارة الحالة الحديثة والمراجعات المعمارية لضمان الأداء والأمان.",
      ]),
    },
    {
      companyEn: "Ashour Group",
      companyAr: "مجموعة عاشور",
      roleEn: "Full Stack Developer",
      roleAr: "مطور Full Stack",
      startLabel: "Dec 2024",
      endLabel: "Feb 2025",
      track: "both",
      sortOrder: 3,
      bulletsEn: JSON.stringify([
        "Built and maintained full-stack applications with Laravel, Next.js, and PostgreSQL.",
        "Integrated payment gateways and third-party APIs while improving UI responsiveness.",
      ]),
      bulletsAr: JSON.stringify([
        "تطوير وصيانة تطبيقات متكاملة باستخدام Laravel وNext.js وPostgreSQL.",
        "ربط بوابات الدفع والـ APIs الخارجية وتحسين سرعة استجابة الواجهات.",
      ]),
    },
    {
      companyEn: "7p",
      companyAr: "7p",
      roleEn: "Backend Developer",
      roleAr: "مطور Backend",
      startLabel: "Jul 2024",
      endLabel: "Oct 2024",
      track: "fullstack",
      sortOrder: 4,
      bulletsEn: JSON.stringify([
        "Engineered APIs and microservices with PHP/Laravel and MySQL.",
        "Accelerated data processing and response times using Redis caching.",
      ]),
      bulletsAr: JSON.stringify([
        "هندسة وبناء APIs وخدمات مصغرة باستخدام PHP/Laravel وMySQL.",
        "تسريع معالجة البيانات وأوقات الاستجابة باستخدام Redis.",
      ]),
    },
    {
      companyEn: "Freelance",
      companyAr: "عمل حر",
      roleEn: "Software Engineer",
      roleAr: "مهندس برمجيات",
      startLabel: "2023",
      endLabel: "Present",
      track: "both",
      sortOrder: 5,
      bulletsEn: JSON.stringify([
        "Designed and delivered end-to-end web and mobile solutions for international clients using NestJS, Laravel, Next.js, and Flutter.",
        "Deployed production stacks on Linux VPS with Docker and Nginx.",
      ]),
      bulletsAr: JSON.stringify([
        "تصميم وتسليم حلول ويب وموبايل متكاملة لعملاء دوليين باستخدام NestJS وLaravel وNext.js وFlutter.",
        "النشر على سيرفرات Linux VPS عبر Docker وNginx.",
      ]),
    },
  ];
  for (const e of experiences) await prisma.experience.create({ data: e });

  const projects = [
    {
      slug: "w-hub",
      titleEn: "W Omnichannel Hub (w-Hub)",
      titleAr: "W Omnichannel Hub (w-Hub)",
      summaryEn:
        "Multi-tenant WhatsApp SaaS platform built as a Turbo monorepo with NestJS, Next.js, and Expo.",
      summaryAr:
        "منصة SaaS متعددة المستأجرين لإدارة واتساب مبنية كـ Turbo Monorepo مع NestJS وNext.js وExpo.",
      challengeEn:
        "Operators needed real-time multi-session WhatsApp inboxes, SLA alerts, and strict RBAC across tenants without fragmenting web and mobile codebases.",
      challengeAr:
        "احتاج المشغّلون صناديق محادثات واتساب فورية متعددة الجلسات وتنبيهات SLA وصلاحيات صارمة عبر المستأجرين دون تفتيت كود الويب والموبايل.",
      solutionEn:
        "Delivered a Turbo monorepo with NestJS APIs, Next.js dashboard, Expo app, Socket.io chat, Zustand state, Tailwind UI, and Prisma/PostgreSQL RBAC.",
      solutionAr:
        "تسليم Turbo Monorepo مع APIs من NestJS ولوحة Next.js وتطبيق Expo ومحادثات Socket.io وZustand وTailwind وصلاحيات Prisma/PostgreSQL.",
      roleEn:
        "Led architecture across backend, web dashboard, and mobile clients; owned real-time inbox UX and multi-tenant RBAC model.",
      roleAr:
        "قيادة المعمارية عبر الباك إند ولوحة الويب والموبايل؛ ملكية تجربة صندوق المحادثات الفوري ونموذج RBAC متعدد المستأجرين.",
      featuresEn: JSON.stringify([
        "Turbo monorepo shared packages",
        "Real-time Socket.io inbox",
        "SLA alert surfaces",
        "PostgreSQL + Prisma RBAC",
      ]),
      featuresAr: JSON.stringify([
        "حزم مشتركة عبر Turbo Monorepo",
        "صندوق محادثات Socket.io فوري",
        "واجهات تنبيهات SLA",
        "صلاحيات PostgreSQL + Prisma",
      ]),
      categoryEn: "SaaS Platforms",
      categoryAr: "منصات SaaS",
      techStack: JSON.stringify([
        "NestJS",
        "Next.js",
        "Expo",
        "Turbo",
        "Socket.io",
        "Zustand",
        "Tailwind CSS",
        "PostgreSQL",
        "Prisma",
      ]),
      track: "both",
      sortOrder: 1,
      seoTitleEn: "w-Hub WhatsApp SaaS Case Study | Belal Moustafa",
      seoTitleAr: "دراسة حالة w-Hub | بلال مصطفى",
      seoDescEn:
        "How Belal Moustafa architected a multi-tenant WhatsApp SaaS with NestJS, Next.js, Expo, and Prisma.",
      seoDescAr:
        "كيف صمم بلال مصطفى منصة واتساب SaaS متعددة المستأجرين باستخدام NestJS وNext.js وExpo وPrisma.",
    },
    {
      slug: "care-synq",
      titleEn: "Care Synq (e-Hub CRM)",
      titleAr: "Care Synq (e-Hub CRM)",
      summaryEn:
        "Medical operations and marketing CRM with modular multi-tenant Laravel backend and Flutter clients.",
      summaryAr:
        "نظام CRM للعمليات الطبية والتسويق بباك إند Laravel معياري متعدد المستأجرين وعملاء Flutter.",
      challengeEn:
        "Clinics needed bilingual lead lifecycle tools, dynamic filters, and automation across web and mobile without siloed stacks.",
      challengeAr:
        "احتاجت العيادات أدوات دورة حياة عملاء ثنائية اللغة وفلاتر ديناميكية وأتمتة عبر الويب والموبايل دون أنظمة منعزلة.",
      solutionEn:
        "Built modular multi-tenant Laravel services, Flutter Web/iOS/Android clients, Redis-backed schedulers, and GitHub Actions CI/CD.",
      solutionAr:
        "بناء خدمات Laravel معيارية متعددة المستأجرين وعملاء Flutter ويب/iOS/Android ومجدولات Redis وCI/CD عبر GitHub Actions.",
      roleEn:
        "Owned backend modularization, Flutter UX for lead tracking, RTL/LTR localization, and delivery automation.",
      roleAr:
        "ملكية تفكيك الباك إند، وتجربة Flutter لتتبع العملاء، والتعريب RTL/LTR، وأتمتة التسليم.",
      featuresEn: JSON.stringify([
        "Modular multi-tenant Laravel",
        "Flutter Web/iOS/Android",
        "Dynamic filters & dashboards",
        "AR/EN RTL support",
        "Scheduler + Redis automation",
      ]),
      featuresAr: JSON.stringify([
        "Laravel معياري متعدد المستأجرين",
        "Flutter ويب/iOS/Android",
        "فلاتر ولوحات ديناميكية",
        "دعم عربي/إنجليزي RTL",
        "أتمتة Scheduler وRedis",
      ]),
      categoryEn: "Healthcare CRM",
      categoryAr: "CRM رعاية صحية",
      techStack: JSON.stringify([
        "Laravel",
        "Flutter",
        "Redis",
        "MySQL",
        "GitHub Actions",
      ]),
      track: "both",
      sortOrder: 2,
      seoTitleEn: "Care Synq CRM Case Study | Belal Moustafa",
      seoTitleAr: "دراسة حالة Care Synq | بلال مصطفى",
      seoDescEn:
        "Care Synq multi-tenant medical CRM engineered by Belal Moustafa with Laravel and Flutter.",
      seoDescAr:
        "Care Synq نظام CRM طبي متعدد المستأجرين صممه بلال مصطفى بـ Laravel وFlutter.",
    },
    {
      slug: "metatrader",
      titleEn: "MetaTrader — Fintech Investment Platform",
      titleAr: "MetaTrader — منصة استثمار مالية",
      summaryEn:
        "Full-stack fintech platform for wealth management, bank transfers, and daily ROI cycles.",
      summaryAr:
        "منصة تقنية مالية متكاملة لإدارة الثروات والتحويلات البنكية ودورات العوائد اليومية.",
      challengeEn:
        "Investors and operators needed trusted transfer workflows, ROI reporting, and bilingual mobile/desktop experiences with dark/light themes.",
      challengeAr:
        "احتاج المستثمرون والمشغّلون مسارات تحويل موثوقة وتقارير عوائد وتجارب ثنائية اللغة مع وضع ليلي/نهاري.",
      solutionEn:
        "Laravel API, Next.js React 19 admin with TanStack Query, Flutter + Riverpod mobile with dual language and theme modes.",
      solutionAr:
        "Laravel API ولوحة Next.js React 19 مع TanStack Query وتطبيق Flutter وRiverpod بدعم لغتين ووضع ليلي/نهاري.",
      roleEn:
        "Architected API contracts, wealth admin UX, and Flutter investment mobile flows.",
      roleAr:
        "تصميم عقود الـ API وتجربة لوحة إدارة الثروات ومسارات الاستثمار على Flutter.",
      featuresEn: JSON.stringify([
        "Laravel API core",
        "Next.js wealth admin",
        "Flutter + Riverpod app",
        "Daily ROI cycles",
        "Dark/Light bilingual UI",
      ]),
      featuresAr: JSON.stringify([
        "نواة Laravel API",
        "لوحة ثروات Next.js",
        "تطبيق Flutter وRiverpod",
        "دورات عوائد يومية",
        "واجهة ثنائية اللغة وضع ليلي/نهاري",
      ]),
      categoryEn: "Fintech",
      categoryAr: "تقنية مالية",
      techStack: JSON.stringify([
        "Laravel",
        "Next.js",
        "React 19",
        "TanStack Query",
        "Flutter",
        "Riverpod",
      ]),
      track: "both",
      sortOrder: 3,
      seoTitleEn: "MetaTrader Fintech Case Study | Belal Moustafa",
      seoTitleAr: "دراسة حالة MetaTrader | بلال مصطفى",
      seoDescEn:
        "Fintech investment platform case study by Belal Moustafa — Laravel, Next.js, Flutter.",
      seoDescAr:
        "دراسة حالة منصة استثمار مالية لبلال مصطفى — Laravel وNext.js وFlutter.",
    },
    {
      slug: "aim",
      titleEn: "AIM — Investment Tracking Platform",
      titleAr: "AIM — منصة تتبع الاستثمارات",
      summaryEn:
        "Bilingual investment tracking platform with multi-gateway payouts and automated withdrawal batches.",
      summaryAr:
        "منصة تتبع استثمارات ثنائية اللغة مع بوابات دفع متعددة ودفعات سحب مؤتمتة.",
      challengeEn:
        "Teams needed real-time financial visualization, PayMint/Binance payouts, and EN/AR product surfaces without slow data fetches.",
      challengeAr:
        "احتاجت الفرق تصورات مالية لحظية ومدفوعات PayMint/Binance وواجهات EN/AR دون جلب بيانات بطيء.",
      solutionEn:
        "Next.js 16 frontend with next-intl and TanStack Query, Laravel backend, multi-gateway payout automation.",
      solutionAr:
        "واجهة Next.js 16 مع next-intl وTanStack Query وباك إند Laravel وأتمتة مدفوعات متعددة البوابات.",
      roleEn:
        "Led bilingual frontend architecture and payout automation integration.",
      roleAr: "قيادة معمارية الواجهة الثنائية اللغة وتكامل أتمتة المدفوعات.",
      featuresEn: JSON.stringify([
        "Next.js 16 + next-intl",
        "TanStack Query caching",
        "PayMint & Binance gateways",
        "Automated withdrawal batches",
      ]),
      featuresAr: JSON.stringify([
        "Next.js 16 وnext-intl",
        "تخزين TanStack Query",
        "بوابات PayMint وBinance",
        "دفعات سحب مؤتمتة",
      ]),
      categoryEn: "Fintech",
      categoryAr: "تقنية مالية",
      techStack: JSON.stringify([
        "Next.js",
        "next-intl",
        "TanStack Query",
        "Laravel",
        "PayMint",
        "Binance",
      ]),
      track: "both",
      sortOrder: 4,
      seoTitleEn: "AIM Investment Platform Case Study | Belal Moustafa",
      seoTitleAr: "دراسة حالة AIM | بلال مصطفى",
      seoDescEn:
        "AIM bilingual investment tracking platform engineered by Belal Moustafa.",
      seoDescAr: "منصة AIM لتتبع الاستثمارات صممها بلال مصطفى.",
    },
    {
      slug: "clinova",
      titleEn: "Clinova — Clinic Management ERP",
      titleAr: "Clinova — نظام إدارة العيادات",
      summaryEn:
        "End-to-end clinic ERP covering bookings, scheduling, records, and role-based staff experiences.",
      summaryAr:
        "نظام عيادات متكامل يغطي الحجوزات والجدولة والسجلات وتجارب الموظفين حسب الصلاحيات.",
      challengeEn:
        "Clinics needed secure APIs, patient booking UX, and distinct views for doctors, reception, and admins.",
      challengeAr:
        "احتاجت العيادات APIs آمنة وتجربة حجز مرضى وواجهات مخصصة للأطباء والاستقبال والإدارة.",
      solutionEn:
        "Designed database and secure APIs through booking UIs and role-based dashboards for clinical operations.",
      solutionAr:
        "تصميم قاعدة البيانات والـ APIs الآمنة وحتى واجهات الحجز ولوحات الصلاحيات لعمليات العيادة.",
      roleEn:
        "Architected data model, secure APIs, and role-based clinic interfaces.",
      roleAr: "تصميم نموذج البيانات والـ APIs الآمنة وواجهات العيادة حسب الدور.",
      featuresEn: JSON.stringify([
        "Patient booking flows",
        "Appointment scheduling",
        "Role-based staff UIs",
        "Secure clinic APIs",
      ]),
      featuresAr: JSON.stringify([
        "مسارات حجز المرضى",
        "جدولة المواعيد",
        "واجهات موظفين حسب الدور",
        "APIs عيادات آمنة",
      ]),
      categoryEn: "Healthcare ERP",
      categoryAr: "ERP رعاية صحية",
      techStack: JSON.stringify([
        "Next.js",
        "NestJS",
        "PostgreSQL",
        "TypeScript",
        "Docker",
      ]),
      liveUrl: "https://clinova.tarqumi.com/",
      track: "both",
      sortOrder: 5,
      seoTitleEn: "Clinova Clinic ERP Case Study | Belal Moustafa",
      seoTitleAr: "دراسة حالة Clinova | بلال مصطفى",
      seoDescEn:
        "Clinova clinic management ERP case study by Belal Moustafa.",
      seoDescAr: "دراسة حالة نظام Clinova لإدارة العيادات لبلال مصطفى.",
    },
  ];
  for (const p of projects) await prisma.project.create({ data: p });

  const honors = [
    {
      kind: "education",
      titleEn: "B.Sc. in Information Technology (CS Major)",
      titleAr: "بكالوريوس تكنولوجيا المعلومات (تخصص علوم الحاسب)",
      orgEn: "October Technological University",
      orgAr: "جامعة أكتوبر التكنولوجية",
      detailEn: "2024 – Expected 2028 (Currently in 3rd Year)",
      detailAr: "2024 – متوقع 2028 (الفرقة الثالثة حالياً)",
      sortOrder: 1,
    },
    {
      kind: "education",
      titleEn: "Diploma in Web Development & Programming",
      titleAr: "دبلوم تطوير الويب والبرمجة",
      orgEn: "WE Applied Technology School",
      orgAr: "مدرسة WE للتكنولوجيا التطبيقية",
      detailEn: "2021 – 2024",
      detailAr: "2021 – 2024",
      sortOrder: 2,
    },
    {
      kind: "award",
      titleEn: "2nd Place Nationwide in Software",
      titleAr: "المركز الثاني على مستوى الجمهورية في البرمجيات",
      orgEn: "Egypt Science and Engineering Fair (ESIF)",
      orgAr: "معرض مصر للعلوم والهندسة (ESIF)",
      detailEn: "National recognition for software excellence.",
      detailAr: "تكريم وطني للتميز في البرمجيات.",
      sortOrder: 3,
    },
    {
      kind: "cert",
      titleEn: "Samsung Innovation Campus Certification",
      titleAr: "شهادة Samsung Innovation Campus",
      orgEn: "Samsung Innovation Campus",
      orgAr: "Samsung Innovation Campus",
      detailEn: "Certified program completion.",
      detailAr: "إتمام برنامج معتمد.",
      sortOrder: 4,
    },
    {
      kind: "cert",
      titleEn: "Multiple BIM Certifications",
      titleAr: "شهادات متعددة من BIM",
      orgEn: "BIM",
      orgAr: "BIM",
      detailEn: "Professional certifications portfolio.",
      detailAr: "مجموعة شهادات مهنية.",
      sortOrder: 5,
    },
  ];
  for (const h of honors) await prisma.honor.create({ data: h });

  console.log("Seed complete.");
  console.log(`Admin: ${email} / ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
