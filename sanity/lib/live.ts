import "server-only";
import { client } from "@/sanity/lib/client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type SanityFetchOptions<T> = {
  query: string;
  params?: Record<string, unknown>;
};

// Simple wrapper around the Sanity client so we can keep the same API
// that the rest of the app expects: `const { data } = await sanityFetch(...)`.
export async function sanityFetch<T>({
  query,
  params,
}: SanityFetchOptions<T>): Promise<{ data: T }> {
  const data = await client.fetch<T>(
    query,
    params ?? {}
  );
  return { data };
}

// Placeholder component so existing `<SanityLive />` usages keep working.
// The real "live" mode from `next-sanity` isn't used here.
export const SanityLive = () => null;
