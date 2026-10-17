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
        photo: "/uploads/profile/belal-moustafa.jpg",
        availabilityEn:
          "Available for Technical Leadership, Consulting & High-Impact Projects",
        availabilityAr:
          "متاح للقيادة التقنية والاستشارات والمشاريع عالية الأثر",
        summaryEn:
          "Results-driven Full-Stack Software Engineer and Technical Lead with over 3 years of experience architecting and delivering end-to-end, highly scalable systems. Demonstrated success in leading cross-functional teams of up to 15 members and deploying 55+ production projects handling 10,000+ concurrent users.",
        summaryAr:
          "مهندس برمجيات Full-Stack وقائد تقني بخبرة تتجاوز +3 سنوات في تصميم وتسليم أنظمة متكاملة قابلة للتوسع. نجاح مثبت في قيادة فرق متعددة التخصصات تصل إلى 15 عضواً وتسليم أكثر من +55 مشروعاً إنتاجياً تخدم أكثر من 10,000 مستخدم متزامن.",
        summaryFullstackEn:
          "Results-driven Full-Stack Software Engineer and Technical Lead with over 3 years of experience architecting and delivering end-to-end, highly scalable systems. Demonstrated success in leading cross-functional teams of up to 15 members and deploying 55+ production projects handling 10,000+ concurrent users. Deep expertise in bridging robust backends (NestJS, Laravel, PostgreSQL) with modern, responsive frontends (Next.js, Flutter, Expo), alongside streamlining operations via Docker and CI/CD pipelines.",
        summaryFullstackAr:
          "مهندس برمجيات Full-Stack وقائد تقني بخبرة تتجاوز +3 سنوات في تصميم وتسليم أنظمة متكاملة قابلة للتوسع، مع قيادة فرق تصل إلى 15 مطوراً وتسليم +55 مشروعاً إنتاجياً لأكثر من 10,000 مستخدم متزامن، وخبرة عميقة في ربط الباك إند (NestJS وLaravel وPostgreSQL) بالواجهات الحديثة (Next.js وFlutter وExpo) عبر Docker وCI/CD.",
        summaryFrontendEn:
          "Results-driven Frontend Software Engineer and Technical Lead with over 3 years of experience in building high-performance, responsive web applications and cross-platform mobile apps. Proven expertise in leading frontend architectures for complex platforms handling 10,000+ concurrent users. Highly skilled in modern frameworks including Next.js, React, and Flutter, with a strong focus on state management (Zustand, Riverpod), UI/UX optimization, multi-language support (i18n), and seamless API integrations.",
        summaryFrontendAr:
          "مهندس واجهات وقائد تقني بخبرة تتجاوز +3 سنوات في بناء تطبيقات ويب عالية الأداء وتطبيقات موبايل عابرة للمنصات، مع قيادة معمارية الواجهات لمنصات تخدم أكثر من 10,000 مستخدم متزامن وخبرة في Next.js وReact وFlutter وإدارة الحالة وتحسين تجربة المستخدم ودعم اللغات وتكامل الـ APIs.",
        summaryBackendEn:
          "Results-driven Backend Software Engineer and Technical Lead with over 3 years of experience in designing scalable architectures, RESTful APIs, and robust system infrastructures. Demonstrated success in leading engineering teams of up to 15 members and deploying 55+ production projects handling up to 10,000+ concurrent users. Proficient in modern backend frameworks (NestJS, Laravel, TypeScript) with deep expertise in optimizing CI/CD pipelines, DevOps automation, and integrating complex multi-tenant systems.",
        summaryBackendAr:
          "مهندس باك إند وقائد تقني بخبرة تتجاوز +3 سنوات في تصميم معماريات قابلة للتوسع وواجهات RESTful وبُنى تحتية قوية، مع قيادة فرق تصل إلى 15 مطوراً وتسليم +55 مشروعاً إنتاجياً لأكثر من 10,000 مستخدم متزامن، وخبرة في NestJS وLaravel وTypeScript وخطوط CI/CD وأتمتة DevOps والأنظمة متعددة المستأجرين.",
        cvFullstack: "/cv/belal-moustafa-fullstack.pdf",
        cvFrontend: "/cv/belal-moustafa-frontend.pdf",
        cvBackend: "/cv/belal-moustafa-backend.pdf",
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
    // Tarqumi — 3 track variants
    {
      companyEn: "Tarqumi",
      companyAr: "ترقمي",
      roleEn: "Technical Lead & Full-Stack Engineer",
      roleAr: "قائد تقني ومهندس Full-Stack",
      startLabel: "Feb 2026",
      endLabel: "Present",
      track: "fullstack",
      sortOrder: 1,
      bulletsEn: JSON.stringify([
        "Led full-stack architecture across a cross-functional team of 15 developers, overseeing end-to-end system design from database layer to client interfaces.",
        "Ensured seamless integration between complex APIs and frontend clients across 55+ production projects, maintaining consistency and reliability at scale.",
        "Implemented automated CI/CD pipelines via GitHub Actions and Docker, enabling rapid, zero-downtime deployments for platforms serving 10,000+ concurrent users.",
      ]),
      bulletsAr: JSON.stringify([
        "قيادة معمارية Full-Stack لفريق متعدد التخصصات من 15 مطوراً، من طبقة قواعد البيانات حتى واجهات العملاء.",
        "ضمان تكامل سلس بين الـ APIs المعقدة وعملاء الواجهة عبر أكثر من 55 مشروعاً إنتاجياً.",
        "تنفيذ خطوط CI/CD مؤتمتة عبر GitHub Actions وDocker بنشر بدون توقف لمنصات تخدم أكثر من 10,000 مستخدم متزامن.",
      ]),
    },
    {
      companyEn: "Tarqumi",
      companyAr: "ترقمي",
      roleEn: "Technical Lead & Frontend Engineer",
      roleAr: "قائد تقني ومهندس Frontend",
      startLabel: "Feb 2026",
      endLabel: "Present",
      track: "frontend",
      sortOrder: 1,
      bulletsEn: JSON.stringify([
        "Led frontend architecture across a cross-functional team of 15 developers, establishing reusable UI component standards and design system conventions.",
        "Ensured cross-platform mobile and web parity across 55+ production projects, delivering highly optimized user experiences at scale.",
        "Directed frontend technical delivery for platforms serving 10,000+ concurrent users, prioritizing performance, accessibility, and responsive design.",
      ]),
      bulletsAr: JSON.stringify([
        "قيادة معمارية الواجهات لفريق من 15 مطوراً مع وضع معايير مكونات UI ونظام تصميم قابل لإعادة الاستخدام.",
        "ضمان تطابق تجربة الويب والموبايل عبر أكثر من 55 مشروعاً إنتاجياً.",
        "توجيه تسليم الواجهات لمنصات تخدم أكثر من 10,000 مستخدم متزامن مع أولوية الأداء وإمكانية الوصول والتصميم المتجاوب.",
      ]),
    },
    {
      companyEn: "Tarqumi",
      companyAr: "ترقمي",
      roleEn: "Technical Lead & Backend Engineer",
      roleAr: "قائد تقني ومهندس Backend",
      startLabel: "Feb 2026",
      endLabel: "Present",
      track: "backend",
      sortOrder: 1,
      bulletsEn: JSON.stringify([
        "Led a cross-functional software team of 15 developers, overseeing system architecture and technical delivery.",
        "Successfully deployed and managed over 55 production projects, implementing fast, automated CI/CD deployment pipelines to minimize downtime.",
        "Architected highly scalable systems, including a CRM/POS platform that seamlessly handled 10,000+ concurrent users.",
      ]),
      bulletsAr: JSON.stringify([
        "قيادة فريق برمجي متعدد التخصصات من 15 مطوراً مع الإشراف على معمارية الأنظمة والتسليم التقني.",
        "نشر وإدارة أكثر من 55 مشروعاً إنتاجياً مع خطوط CI/CD سريعة لتقليل وقت التوقف.",
        "تصميم أنظمة عالية القابلية للتوسع تشمل منصة CRM/POS تخدم أكثر من 10,000 مستخدم متزامن.",
      ]),
    },
    // Ashour Head
    {
      companyEn: "Ashour Group",
      companyAr: "مجموعة عاشور",
      roleEn: "Head of Software Team & Software Board Member",
      roleAr: "رئيس فريق البرمجيات وعضو مجلس البرمجيات",
      startLabel: "Feb 2025",
      endLabel: "May 2026",
      track: "fullstack",
      sortOrder: 2,
      bulletsEn: JSON.stringify([
        "Directed the full-stack technical roadmap, aligning frontend and backend development with business objectives and long-term product strategy.",
        "Standardized both frontend (React, Next.js) and backend (Laravel) development practices, establishing shared coding standards and architectural patterns.",
        "Led architectural reviews and code quality initiatives, ensuring high performance, security, and maintainability across all company products.",
      ]),
      bulletsAr: JSON.stringify([
        "توجيه خارطة الطريق التقنية Full-Stack وربط الواجهات والباك إند بأهداف الأعمال.",
        "توحيد ممارسات React وNext.js وLaravel عبر معايير كود وأنماط معمارية مشتركة.",
        "قيادة مراجعات معمارية ومبادرات جودة لضمان الأداء والأمان وقابلية الصيانة.",
      ]),
    },
    {
      companyEn: "Ashour Group",
      companyAr: "مجموعة عاشور",
      roleEn: "Head of Software Team & Software Board Member",
      roleAr: "رئيس فريق البرمجيات وعضو مجلس البرمجيات",
      startLabel: "Feb 2025",
      endLabel: "May 2026",
      track: "frontend",
      sortOrder: 2,
      bulletsEn: JSON.stringify([
        "Drove adoption of the frontend tech stack (React, Next.js), defining architectural standards and tooling for the engineering department.",
        "Mentored developers on modern state management patterns and component-driven development, elevating code quality across all products.",
        "Ensured pixel-perfect UI delivery through rigorous design reviews, cross-browser testing, and consistent frontend best practices.",
      ]),
      bulletsAr: JSON.stringify([
        "قيادة تبني مكدس الواجهات (React وNext.js) ووضع معايير معمارية وأدوات للقسم الهندسي.",
        "تدريب المطورين على إدارة الحالة الحديثة والتطوير المبني على المكونات.",
        "ضمان تسليم واجهات دقيقة عبر مراجعات تصميم واختبارات متصفحات وممارسات Frontend متسقة.",
      ]),
    },
    {
      companyEn: "Ashour Group",
      companyAr: "مجموعة عاشور",
      roleEn: "Head of Software Team & Software Board Member",
      roleAr: "رئيس فريق البرمجيات وعضو مجلس البرمجيات",
      startLabel: "Feb 2025",
      endLabel: "May 2026",
      track: "backend",
      sortOrder: 2,
      bulletsEn: JSON.stringify([
        "Led the engineering department and directed the technical roadmap, transitioning the team to agile methodologies and structured CI/CD workflows.",
        "Architected scalable backend solutions and conducted extensive code reviews, ensuring high performance and security standards across all company products.",
      ]),
      bulletsAr: JSON.stringify([
        "قيادة القسم الهندسي وتوجيه خارطة الطريق التقنية مع التحول إلى منهجيات Agile وخطوط CI/CD منظمة.",
        "تصميم حلول باك إند قابلة للتوسع ومراجعات كود واسعة لضمان الأداء والأمان.",
      ]),
    },
    // Ashour FS
    {
      companyEn: "Ashour Group",
      companyAr: "مجموعة عاشور",
      roleEn: "Full Stack Developer",
      roleAr: "مطور Full Stack",
      startLabel: "Dec 2024",
      endLabel: "Feb 2025",
      track: "fullstack",
      sortOrder: 3,
      bulletsEn: JSON.stringify([
        "Developed and maintained full-stack applications using Laravel, Next.js, and PostgreSQL, delivering cohesive end-to-end product features.",
        "Integrated third-party APIs and payment gateways, ensuring seamless data flow between backend services and responsive client interfaces.",
      ]),
      bulletsAr: JSON.stringify([
        "تطوير وصيانة تطبيقات متكاملة باستخدام Laravel وNext.js وPostgreSQL.",
        "ربط APIs خارجية وبوابات دفع مع تدفق بيانات سلس بين الخدمات والواجهات.",
      ]),
    },
    {
      companyEn: "Ashour Group",
      companyAr: "مجموعة عاشور",
      roleEn: "Full Stack Developer",
      roleAr: "مطور Full Stack",
      startLabel: "Dec 2024",
      endLabel: "Feb 2025",
      track: "frontend",
      sortOrder: 3,
      bulletsEn: JSON.stringify([
        "Developed complex client-side applications using Next.js, consuming RESTful APIs to deliver fast, interactive user interfaces.",
        "Dramatically improved UI responsiveness through optimized rendering strategies, efficient data fetching, and streamlined component architecture.",
      ]),
      bulletsAr: JSON.stringify([
        "تطوير تطبيقات عميل معقدة بـ Next.js مع استهلاك RESTful APIs لواجهات سريعة وتفاعلية.",
        "تحسين استجابة الواجهة عبر استراتيجيات عرض محسّنة وجلب بيانات فعّال ومعمارية مكونات مبسطة.",
      ]),
    },
    {
      companyEn: "Ashour Group",
      companyAr: "مجموعة عاشور",
      roleEn: "Full Stack Developer",
      roleAr: "مطور Full Stack",
      startLabel: "Dec 2024",
      endLabel: "Feb 2025",
      track: "backend",
      sortOrder: 3,
      bulletsEn: JSON.stringify([
        "Developed and maintained full-stack applications using Laravel, Next.js, and PostgreSQL, improving overall system responsiveness.",
        "Integrated third-party APIs and payment gateways, and optimized database queries to handle increasing data loads efficiently.",
      ]),
      bulletsAr: JSON.stringify([
        "تطوير وصيانة تطبيقات متكاملة باستخدام Laravel وNext.js وPostgreSQL وتحسين استجابة النظام.",
        "ربط APIs وبوابات دفع وتحسين استعلامات قواعد البيانات للأحمال المتزايدة.",
      ]),
    },
    // 7p
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
        "Engineered robust backend APIs and microservices using PHP/Laravel and MySQL.",
        "Streamlined data processing and API response times with Redis caching and optimized server configurations.",
      ]),
      bulletsAr: JSON.stringify([
        "هندسة APIs وخدمات مصغرة باستخدام PHP/Laravel وMySQL.",
        "تسريع معالجة البيانات وأوقات الاستجابة عبر Redis وتحسين إعدادات السيرفر.",
      ]),
    },
    {
      companyEn: "7p",
      companyAr: "7p",
      roleEn: "Backend Developer",
      roleAr: "مطور Backend",
      startLabel: "Jul 2024",
      endLabel: "Oct 2024",
      track: "backend",
      sortOrder: 4,
      bulletsEn: JSON.stringify([
        "Engineered robust backend APIs and microservices using PHP/Laravel and MySQL.",
        "Streamlined data processing and improved API response times by implementing Redis caching and optimizing server configurations.",
      ]),
      bulletsAr: JSON.stringify([
        "هندسة APIs وخدمات مصغرة باستخدام PHP/Laravel وMySQL.",
        "تحسين معالجة البيانات وأوقات الاستجابة عبر Redis وتحسين إعدادات السيرفر.",
      ]),
    },
    // Freelance
    {
      companyEn: "Freelance",
      companyAr: "عمل حر",
      roleEn: "Software Engineer",
      roleAr: "مهندس برمجيات",
      startLabel: "2023",
      endLabel: "Present",
      track: "fullstack",
      sortOrder: 5,
      bulletsEn: JSON.stringify([
        "Delivered custom end-to-end web and mobile solutions for international clients, covering database design, API development, and frontend implementation.",
        "Built complete product stacks using NestJS, Laravel, Next.js, and Flutter, with deployment on Linux VPS via Docker and Nginx.",
      ]),
      bulletsAr: JSON.stringify([
        "تسليم حلول ويب وموبايل متكاملة لعملاء دوليين من قواعد البيانات حتى الواجهات.",
        "بناء مكدسات كاملة بـ NestJS وLaravel وNext.js وFlutter مع النشر على Linux VPS عبر Docker وNginx.",
      ]),
    },
    {
      companyEn: "Freelance",
      companyAr: "عمل حر",
      roleEn: "Software Engineer",
      roleAr: "مهندس برمجيات",
      startLabel: "2023",
      endLabel: "Present",
      track: "frontend",
      sortOrder: 5,
      bulletsEn: JSON.stringify([
        "Designed and delivered custom, pixel-perfect web and mobile interfaces for international clients using React, Next.js, and Flutter.",
        "Translated client requirements into polished, responsive UIs with strong attention to detail, branding alignment, and cross-device compatibility.",
      ]),
      bulletsAr: JSON.stringify([
        "تصميم وتسليم واجهات ويب وموبايل دقيقة لعملاء دوليين باستخدام React وNext.js وFlutter.",
        "تحويل متطلبات العميل إلى واجهات مصقولة ومتجاوبة مع توافق عبر الأجهزة.",
      ]),
    },
    {
      companyEn: "Freelance",
      companyAr: "عمل حر",
      roleEn: "Software Engineer",
      roleAr: "مهندس برمجيات",
      startLabel: "2023",
      endLabel: "Present",
      track: "backend",
      sortOrder: 5,
      bulletsEn: JSON.stringify([
        "Designed and delivered custom full-stack web applications and CRM systems for international clients using modern stacks (NestJS, Laravel, React).",
        "Handled end-to-end deployment on Linux VPS (Ubuntu) using Docker and Nginx.",
      ]),
      bulletsAr: JSON.stringify([
        "تصميم وتسليم تطبيقات ويب وأنظمة CRM لعملاء دوليين باستخدام NestJS وLaravel وReact.",
        "إدارة النشر الكامل على Linux VPS (Ubuntu) عبر Docker وNginx.",
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
