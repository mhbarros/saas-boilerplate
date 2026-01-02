import * as Sentry from '@sentry/nestjs'
import packageJson from 'package.json'
import { existsSync } from 'fs'
import { join } from 'path'

// Only load .env file if it exists (for local development)
const envPath = join(process.cwd(), '.env')
if (existsSync(envPath)) {
  process.loadEnvFile()
}

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  release: packageJson.version,
})
