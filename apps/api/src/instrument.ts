import * as Sentry from '@sentry/nestjs'

const SENTRY_DSN = 'your-sentry-dsn'

Sentry.init({
  dsn: SENTRY_DSN,
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  release: '1.0.0',
})
