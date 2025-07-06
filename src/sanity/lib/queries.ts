import { defineQuery } from "next-sanity";

export const PROFILES_QUERY = defineQuery(
  `*[_type == "profile" && defined(slug.current)]`,
);

export const PROFILE_QUERY = defineQuery(
  `*[_type == "profile" && slug.current == $slug][0]`,
);

export const PROFILE_SLUGS = defineQuery(
  ` *[_type == "profile"]{
    "slug": slug.current
  }`,
);
