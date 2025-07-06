import { SanityClient, SlugIsUniqueValidator } from "sanity";
import { apiVersion } from "../env";

export const isUniqueAcrossAllDocuments: SlugIsUniqueValidator = async (
  slug,
  context,
) => {
  const { document, getClient } = context;
  if (!document || !document._id) {
    console.warn("Validation context missing document or _id");
    return true;
  }

  const client: SanityClient = getClient({ apiVersion });
  const id = document._id.replace(/^drafts\./, "");
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  };

  const query = `
  !defined(*[
    !(_id in [$draft, $published]) && slug.current == $slug
  ][0]._id)
`;
  return await client.fetch(query, params);
};
