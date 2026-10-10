import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { MongoClient } from "mongodb";

type MongoState = {
  uri: string;
  client: MongoClient;
  connection?: Promise<MongoClient>;
};

const globalForMongo = globalThis as typeof globalThis & {
  bazardorMongo?: MongoState;
};

function createAuth(mongo: MongoState) {
  const isDevelopment = process.env.NODE_ENV === "development";
  const vercelHosts = [
    process.env.VERCEL_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
  ].filter((host): host is string => Boolean(host));
  const baseURL =
    (isDevelopment ? "http://localhost:3000" : process.env.BETTER_AUTH_URL) ||
    (vercelHosts[0] ? `https://${vercelHosts[0]}` : "http://localhost:3000");

  return betterAuth({
    database: mongodbAdapter(mongo.client.db("bazar-dor"), {
      client: mongo.client,
    }),
    baseURL,
    trustedOrigins: [
      ...new Set([
        baseURL,
        ...(isDevelopment
          ? ["http://localhost:3000", "http://127.0.0.1:3000"]
          : []),
        ...vercelHosts.map((host) => `https://${host}`),
      ]),
    ],
    secret: process.env.BETTER_AUTH_SECRET,
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
    rateLimit: {
      enabled: true,
      storage: "database",
      window: 60,
      max: 100,
      customRules: {
        "/sign-in/email": { window: 60, max: 10 },
        "/sign-up/email": { window: 60, max: 5 },
      },
    },
    plugins: [
      username({
        minUsernameLength: 1,
        maxUsernameLength: 64,
        usernameValidator: (value) => /^[\p{L}\p{N}_.-]+$/u.test(value),
      }),
    ],
  });
}

type AuthInstance = ReturnType<typeof createAuth>;

let authInstance: AuthInstance | undefined;
let mongoState: MongoState | undefined;

function initializeAuth() {
  const uri = process.env.BETTER_AUTH_DB_URL;
  if (!uri) {
    throw new Error("BETTER_AUTH_DB_URL is required to start authentication.");
  }

  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "BETTER_AUTH_SECRET must contain at least 32 characters to start authentication.",
    );
  }

  const mongo =
    globalForMongo.bazardorMongo?.uri === uri
      ? globalForMongo.bazardorMongo
      : {
          uri,
          client: new MongoClient(uri, {
            serverSelectionTimeoutMS: 10_000,
            connectTimeoutMS: 10_000,
          }),
        };

  globalForMongo.bazardorMongo = mongo;
  mongoState = mongo;
  authInstance = createAuth(mongo);

  return { auth: authInstance, mongo };
}

export function getAuth(): AuthInstance {
  return authInstance ?? initializeAuth().auth;
}

export async function connectMongo(): Promise<MongoClient> {
  const mongo = mongoState ?? initializeAuth().mongo;
  if (!mongo.connection) {
    const connection = mongo.client.connect().finally(() => {
      if (mongo.connection === connection) {
        mongo.connection = undefined;
      }
    });
    mongo.connection = connection;
  }
  return mongo.connection;
}
