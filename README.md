# Belal Moustafa — Personal Portfolio & Admin CMS

Official bilingual (EN/AR) personal site for **Belal Moustafa**, Technical Lead & Full-Stack / Frontend Software Engineer at [Tarqumi](https://tarqumi.com).

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS 4
- Prisma (SQLite)
- next-intl (`localePrefix: as-needed`)
- JWT-secured `/admin` CMS

## Local setup

```bash
npm install
npx prisma db push
npx tsx prisma/seed.ts
npm run dev
```

Open http://localhost:3100

## Admin

- Email: `belalmoustafa65@gmail.com`
- Password: set via `ADMIN_PASSWORD` (seeded default in `.env`)

## Production domain

https://belalmoustafa.tarqumi.com
