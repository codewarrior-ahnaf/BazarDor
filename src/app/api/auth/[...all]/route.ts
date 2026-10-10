import { getAuth, connectMongo } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AuthMethod = "GET" | "POST";

async function handleAuthRequest(
  request: Request,
  method: AuthMethod,
): Promise<Response> {
  let handler: (request: Request) => Promise<Response>;
  try {
    await connectMongo();
    handler = toNextJsHandler(getAuth())[method];
  } catch (error) {
    const errorCode =
      error && typeof error === "object" && "code" in error &&
      typeof error.code === "string"
        ? error.code
        : undefined;
    console.error("[auth] Request initialization failed", {
      method,
      name: error instanceof Error ? error.name : "UnknownError",
      code: errorCode,
    });
    return Response.json(
      {
        code: "AUTH_SERVICE_UNAVAILABLE",
        message:
          "Authentication is unavailable. Check the server auth configuration and database connection.",
      },
      { status: 503 },
    );
  }

  return handler(request);
}

export const GET = (request: Request) => handleAuthRequest(request, "GET");
export const POST = (request: Request) => handleAuthRequest(request, "POST");
