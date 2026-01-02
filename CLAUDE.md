# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SaaS boilerplate built as a monorepo using **pnpm workspaces** and **Turborepo**. The project consists of:

- **apps/api**: NestJS backend API with Fastify, PostgreSQL, and Drizzle ORM
- **apps/web**: Next.js 16 frontend with App Router, React 19, Tailwind CSS 4, and shadcn/ui
- **packages/config**: Shared configuration (currently minimal)

## Development Commands

### Monorepo Commands (from root)

```bash
# Install dependencies
pnpm install

# Build all apps
pnpm build

# Run all apps in production mode (requires build first)
pnpm start:prod

# Format code
pnpm format
```

### API (apps/api)

```bash
# Development with watch mode
pnpm --filter api start:dev

# Production mode
pnpm --filter api start:prod

# Build
pnpm --filter api build

# Linting
pnpm --filter api lint

# Testing
pnpm --filter api test              # Run all unit tests
pnpm --filter api test:watch        # Watch mode
pnpm --filter api test:cov          # With coverage
pnpm --filter api test:e2e          # End-to-end tests

# Database (Drizzle ORM)
pnpm --filter api db:generate       # Generate migrations from schema
pnpm --filter api db:migrate        # Run migrations
```

### Web (apps/web)

```bash
# Development server
pnpm --filter web dev

# Build for production
pnpm --filter web build

# Start production server
pnpm --filter web start

# Linting
pnpm --filter web lint
```

### Docker

Currently, only the database runs in Docker, in file docker-compose.yml

## Architecture

### Monorepo Structure

- **Turborepo** orchestrates builds and caching
- **pnpm workspaces** manages dependencies across packages
- Build dependencies are configured in `turbo.json` (API and web can build in parallel)

### API Architecture (NestJS + Fastify)

**Platform**: Uses Fastify instead of Express for better performance (configured in `apps/api/src/main.ts:8`)

**Database Setup**:
- Drizzle ORM with PostgreSQL connection pooling (pg)
- Global `DbModule` (`apps/api/src/db/db.module.ts:4`) exports `DrizzleProvider`
- Database client injected as `DRIZZLE_CLIENT` token
- Schema defined in `apps/api/src/db/schema.ts`
- Drizzle config in `apps/api/drizzle.config.ts` reads `DB_URL` from environment

**Configuration**:
- Uses `@nestjs/config` with Joi validation globally (`apps/api/src/app.module.ts:14-20`)
- Environment variables validated: `SENTRY_DSN`, `NODE_ENV`
- Database requires `DB_URL` environment variable

**API Documentation**:
- Swagger/OpenAPI automatically configured at `/api` endpoint (`apps/api/src/main.ts:17`)

**Monitoring**:
- Sentry integration configured with global error filter (`apps/api/src/app.module.ts:25`)
- Instrument file loaded before app bootstrap (`apps/api/src/instrument.ts`)

### Web Architecture (Next.js 16)

**Framework**:
- Next.js 16 with App Router (not Pages Router)
- React 19 with Server Components enabled by default
- App directory structure: `apps/web/app/`

**UI Components**:
- **shadcn/ui** with Radix Nova style (`apps/web/components.json`)
- Icon library: **HugeIcons** (not Lucide)
- Components in `apps/web/components/ui/`
- Theme: Tailwind CSS 4 with zinc base color, CSS variables enabled

**Styling**:
- Tailwind CSS 4 (not v3)
- PostCSS configured
- Global styles in `apps/web/app/globals.css`

**Path Aliases**:
- `@/components` → `apps/web/components`
- `@/lib` → `apps/web/lib`
- `@/hooks` → `apps/web/hooks`
- `@/ui` → `apps/web/components/ui`

## Environment Setup

### API Environment Variables

Required in `apps/api/.env`:
```
DB_URL=postgresql://user:password@host:port/database
NODE_ENV=development
SENTRY_DSN=                  # Optional
```

Reference `apps/api/.env.example` for template.

### Database Connection

When using Docker PostgreSQL:
```
DB_URL=postgresql://mhbarros:123123@localhost:5000/boilerplate
```

## Docker Architecture

**Multi-stage builds**: Both API and Web use multi-stage Dockerfiles to optimize image size:
- Builder stage: Installs all dependencies and builds the application
- Production stage: Only includes production dependencies and built artifacts

**Next.js Standalone Output**: Web app uses `output: 'standalone'` in `next.config.ts` for smaller Docker images

**Service Dependencies**:
- API depends on database health check before starting
- All services connected via `boilerplate-network` bridge network
- Database uses named volume `boilerplate_postgres` for persistence

**Dockerfiles**:
- `apps/api/Dockerfile`: NestJS API with pnpm and Node 20 Alpine
- `apps/web/Dockerfile`: Next.js app with standalone output

## Key Technical Decisions

1. **Fastify over Express**: The API uses Fastify platform for better performance
2. **Drizzle ORM**: Type-safe database queries with schema-based migrations
3. **Global Database Module**: DbModule is marked as `@Global()` so database client is available everywhere without re-importing
4. **Monorepo with Turborepo**: Optimized builds with caching and task orchestration
5. **shadcn/ui Configuration**: Uses Radix Nova style with HugeIcons (not the default Lucide icons)
6. **Next.js App Router**: Modern Next.js architecture with React Server Components
7. **Fully Dockerized**: Complete Docker setup with multi-stage builds for production-ready containers
