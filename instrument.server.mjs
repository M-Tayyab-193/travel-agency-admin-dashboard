import * as Sentry from "@sentry/react-router";

Sentry.init({
    dsn: "https://19104c466ecc8c2929a5b42512724dcb@o4509820971909120.ingest.us.sentry.io/4509849282936832",
    // Adds request headers and IP for users, for more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
    sendDefaultPii: true,
});