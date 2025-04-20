import { hc } from "hono/client";
import { AppType, testaaType } from "backend/api";

export const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL!);
export const testaaClient = hc<testaaType>(process.env.NEXT_PUBLIC_API_URL!);
