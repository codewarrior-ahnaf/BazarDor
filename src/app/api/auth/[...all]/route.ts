import { auth, connectMongo } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const runtime = "nodejs";
const handlers = toNextJsHandler(auth);

export async function GET(request: Request): Promise<Response> {
  await connectMongo();
  return handlers.GET(request);
}

export async function POST(request: Request): Promise<Response> {
  await connectMongo();
  return handlers.POST(request);
}

