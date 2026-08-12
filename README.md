# OK Global 2026 Electronic Invitation

Electronic invitation and RSVP website for Hebei OK Global Trade Co., Ltd.

## Features

- Responsive English invitation page
- Shanghai night-view visual design
- September 11–13, 2026 itinerary
- RSVP form with server-side validation
- Cloudflare D1-compatible RSVP storage
- Drizzle database schema and migration

## Local development

Requirements: Node.js 22.13 or later.

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Build

```bash
npm run build
npm run start
```

## RSVP database

The RSVP API uses the Cloudflare D1 database `okglobal-rsvp` with the binding name `DB`. The database schema is in `db/schema.ts`, and the generated migration is in `drizzle/`.

For deployment on a platform other than OpenAI Sites, configure a D1 database and bind it as `DB`. If you deploy only the visual invitation without the database binding, the page will load but RSVP submissions will not be stored.

## Important

- Do not commit `.env` files or credentials.
- The RSVP form intentionally does not collect passport or identity-document information.
- Review the itinerary, flight times and contact workflow before public distribution.

## GitHub upload

Upload everything inside this folder to the root of a new GitHub repository. The included `.gitignore` excludes dependencies, build output, local database state, logs and temporary files.
