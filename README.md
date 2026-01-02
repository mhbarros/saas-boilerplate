# NestJS SaaS Boilerplate

A production-ready, full-stack SaaS boilerplate built with modern technologies and best practices. Get your SaaS up and running in minutes, not weeks.

## Tech Stack

### Backend
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Drizzle](https://img.shields.io/badge/drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)

### Frontend
![Next JS](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react_19-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss_4-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![PostHog](https://img.shields.io/badge/posthog-%231d4aff.svg?style=for-the-badge&logo=posthog&logoColor=white)

### DevOps & Monitoring
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Turborepo](https://img.shields.io/badge/turborepo-%23EF4444.svg?style=for-the-badge&logo=turborepo&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)
![Sentry](https://img.shields.io/badge/sentry-%23362D59.svg?style=for-the-badge&logo=sentry&logoColor=white)

## Features

- **Monorepo Architecture**: Powered by Turborepo and pnpm workspaces for optimal build performance
- **Type-Safe Database**: Drizzle ORM with PostgreSQL for type-safe queries and migrations
- **Modern UI**: shadcn/ui components with Radix Nova and Tailwind CSS 4
- **API Documentation**: Auto-generated Swagger/OpenAPI docs at `/api`
- **Docker Ready**: Multi-stage Dockerfiles optimized for production
- **Error Tracking**: Integrated Sentry monitoring
- **Product Analytics**: PostHog integration for user behavior tracking and feature flags
- **High Performance**: Fastify instead of Express for superior speed
- **Authentication Ready**: AWS Cognito integration included
- **Developer Experience**: Hot reload, ESLint, Prettier, and comprehensive testing setup

## Quick Start

### Prerequisites

- Node.js 22+
- pnpm 8+
- Docker and Docker Compose (for database)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd nestjs-boilerplate
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
# Copy example env files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

4. Start the database:
```bash
cd docker
docker compose up -d
```

5. Run database migrations:
```bash
pnpm --filter api db:migrate
```

6. Start development servers:
```bash
# Start API (port 3000)
pnpm --filter api start:dev

# Start Web (port 3001) - in another terminal
pnpm --filter web dev
```

## Project Structure

```
.
├── apps/
│   ├── api/              # NestJS backend API
│   │   ├── src/
│   │   ├── test/
│   │   └── drizzle.config.ts
│   └── web/              # Next.js frontend
│       ├── app/
│       ├── components/
│       └── lib/
├── packages/
│   └── config/           # Shared configurations
├── docker-compose.yml
├── turbo.json
└── pnpm-workspace.yaml
```

## Available Scripts

### Root Level
```bash
pnpm install              # Install all dependencies
pnpm build                # Build all apps
pnpm start:prod           # Run all apps in production
pnpm format               # Format code with Prettier
```

### API Commands
```bash
pnpm --filter api start:dev       # Development mode with watch
pnpm --filter api build           # Build for production
pnpm --filter api test            # Run unit tests
pnpm --filter api test:e2e        # Run e2e tests
pnpm --filter api db:generate     # Generate migrations
pnpm --filter api db:migrate      # Run migrations
```

### Web Commands
```bash
pnpm --filter web dev             # Development server
pnpm --filter web build           # Build for production
pnpm --filter web start           # Start production server
pnpm --filter web lint            # Lint code
```

## Environment Variables

### API (.env)
```env
DB_URL=postgresql://user:password@localhost:5000/database
NODE_ENV=development
SENTRY_DSN=your_sentry_dsn_here
```

### Web (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Docker Deployment

Build and run all services with Docker Compose:

```bash
docker compose up --build
```

Services will be available at:
- API: http://localhost:3000
- Web: http://localhost:3001
- Database: localhost:5000

## Documentation

- **API Docs**: Available at `http://localhost:3000/api` (Swagger UI)
- **Project Guidelines**: See [CLAUDE.md](./CLAUDE.md) for detailed architecture and development guidelines

## Tech Stack Details

### Backend
- **NestJS**: Progressive Node.js framework
- **Fastify**: Fast and low overhead web framework
- **Drizzle ORM**: TypeScript ORM with SQL-like syntax
- **PostgreSQL**: Robust relational database
- **Joi**: Schema validation for environment variables

### Frontend
- **Next.js 16**: React framework with App Router
- **React 19**: Latest React with Server Components
- **Tailwind CSS 4**: Utility-first CSS framework
- **shadcn/ui**: Re-usable component library
- **HugeIcons**: Modern icon library
- **PostHog**: Product analytics and feature management

## License

MIT

---

Built with by Marcelo Barros
