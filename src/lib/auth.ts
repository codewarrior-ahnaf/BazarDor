import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error("MONGODB_URI is required to start authentication.");
}

const globalForMongo = globalThis as typeof globalThis & {
  bazardorMongoClient?: MongoClient;
};
const mongoClient =
  globalForMongo.bazardorMongoClient ?? new MongoClient(mongoUri);
globalForMongo.bazardorMongoClient = mongoClient;

const mongoDatabase = mongoClient.db(process.env.MONGODB_DATABASE || "bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(mongoDatabase, { client: mongoClient }),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "bazardor-super-secret-key-at-least-32-chars-long-2026",
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    requireEmailVerification: false,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET as string,
    },
    github: {
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET as string,
    },
  },
  user: {
    changeEmail: {
      enabled: true,
    },
  },
});

