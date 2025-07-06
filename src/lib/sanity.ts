import { PROFILE_QUERY, PROFILE_SLUGS } from "@/sanity/lib/queries";
import { PROFILE_QUERYResult, PROFILE_SLUGSResult } from "../../sanity.types";
import { client } from "@/sanity/lib/client";

const options = { next: { revalidate: 60 } };

export function getAllProfiles() {}

export async function getAllProfileSlugs(): Promise<PROFILE_SLUGSResult> {
  return await client.fetch<PROFILE_SLUGSResult>(PROFILE_SLUGS);
}

export async function getDefaultProfile(): Promise<PROFILE_QUERYResult> {
  const defaultProfileSlug = process.env.NEXT_PUBLIC_DEFAULT_PROFILE_SLUG;

  const profile = await client.fetch<PROFILE_QUERYResult>(
    PROFILE_QUERY,
    { slug: defaultProfileSlug },
    options,
  );

  return profile;
}
