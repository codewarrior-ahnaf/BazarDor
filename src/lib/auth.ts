import { betterAuth } from "better-auth";
import { db } from "./db";

export const auth = betterAuth({
  database: db,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || "bazardor-super-secret-key-at-least-32-chars-long-2026",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "demo-google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "demo-google-client-secret",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "demo-github-client-id",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "demo-github-client-secret",
    },
  },
  user: {
    changeEmail: {
      enabled: true,
    },
  },
});

