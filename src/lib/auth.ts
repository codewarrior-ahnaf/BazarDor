import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error("MONGODB_URI is required to start authentication.");
}

const authSecret = process.env.BETTER_AUTH_SECRET;
if (!authSecret || authSecret.length < 32) {
  throw new Error("BETTER_AUTH_SECRET must contain at least 32 characters.");
}

const globalForMongo = globalThis as typeof globalThis & {
  bazardorMongo?: {
    uri: string;
    client: MongoClient;
    connection?: Promise<MongoClient>;
  };
};
const mongoState =
  globalForMongo.bazardorMongo?.uri === mongoUri
    ? globalForMongo.bazardorMongo
    : {
        uri: mongoUri,
        client: new MongoClient(mongoUri),
      };
globalForMongo.bazardorMongo = mongoState;
const mongoClient = mongoState.client;

export async function connectMongo(): Promise<MongoClient> {
  if (!mongoState.connection) {
    const connection = mongoClient.connect().finally(() => {
      if (mongoState.connection === connection) mongoState.connection = undefined;
    });
    mongoState.connection = connection;
  }
  return mongoState.connection;
}

const mongoDatabase = mongoClient.db(process.env.MONGODB_DATABASE || "bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(mongoDatabase, { client: mongoClient }),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: authSecret,
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

