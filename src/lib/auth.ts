import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

type MongoState = {
  uri: string;
  client: MongoClient;
  connection?: Promise<MongoClient>;
};

const globalForMongo = globalThis as typeof globalThis & {
  bazardorMongo?: MongoState;
};

function createAuth(state: MongoState) {
  return betterAuth({
    database: mongodbAdapter(
      state.client.db(process.env.MONGODB_DATABASE || "bazardor"),
      { client: state.client },
    ),
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    secret: process.env.BETTER_AUTH_SECRET!,
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
    user: { changeEmail: { enabled: true } },
  });
}

type AuthInstance = ReturnType<typeof createAuth>;

let authInstance: AuthInstance | undefined;
let mongoState: MongoState | undefined;

function initializeAuth() {
  const mongoUri = process.env.BETTER_AUTH_DB_URL;
  if (!mongoUri) {
    throw new Error("BETTER_AUTH_DB_URL is required to start authentication.");
  }

  const authSecret = process.env.BETTER_AUTH_SECRET;
  if (!authSecret || authSecret.length < 32) {
    throw new Error("BETTER_AUTH_SECRET must contain at least 32 characters.");
  }

  const state =
    globalForMongo.bazardorMongo?.uri === mongoUri
      ? globalForMongo.bazardorMongo
      : { uri: mongoUri, client: new MongoClient(mongoUri) };
  globalForMongo.bazardorMongo = state;
  mongoState = state;

  const auth = createAuth(state);
  authInstance = auth;

  return { auth, mongo: state };
}

export function getAuth(): AuthInstance {
  return authInstance ?? initializeAuth().auth;
}

export async function connectMongo(): Promise<MongoClient> {
  const mongo = mongoState ?? initializeAuth().mongo;
  if (!mongo.connection) {
    const connection = mongo.client.connect().finally(() => {
      if (mongo.connection === connection) mongo.connection = undefined;
    });
    mongo.connection = connection;
  }
  return mongo.connection;
}
