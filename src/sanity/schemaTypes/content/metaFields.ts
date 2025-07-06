import { defineField } from "sanity";

export const metadataFields = [
  defineField({
    name: "metaTitle",
    title: "Meta Title",
    type: "string",
    description: `
      **Purpose:** The title that appears in browser tabs, search engine results, and social media links.
      **Guidelines:**
      - Keep it **concise and descriptive** of the page's content.
      - Aim for **50-60 characters** for optimal display in search results. Longer titles might be cut off.
      - **Default:** If left empty, this will usually default to the **Profile Name** (e.g., "John Doe - Web Developer").
    `,
    validation: (Rule) =>
      Rule.max(60).warning(
        "Meta title should ideally be under 60 characters for best display in search results.",
      ),
  }),
  defineField({
    name: "metaDescription",
    title: "Meta Description",
    type: "text",
    description: `
      **Purpose:** A brief summary of the page's content, displayed under the title in search results.
      **Guidelines:**
      - Write a compelling summary that encourages clicks.
      - Aim for **150-160 characters** for optimal display. Longer descriptions might be truncated.
      - Include relevant keywords naturally, but prioritize readability.
      - **Default:** If left empty, this will usually default to your **Hero Section's Tagline** or the **About Me Short Introduction**.
    `,
    validation: (Rule) =>
      Rule.max(160).warning(
        "Meta description should ideally be under 160 characters for best display in search results.",
      ),
  }),
  defineField({
    name: "metaKeywords",
    title: "Meta Keywords",
    type: "array",
    of: [{ type: "string" }],
    description: `
      **Purpose:** Words or phrases that describe the content of the page, helping search engines understand your topic.
      **Guidelines:**
      - Add **relevant terms** people might search for.
      - Use **commas to separate** keywords (e.g., "web development, portfolio, UI/UX design").
      - This field is **optional** and its impact on SEO varies, but it can still be useful.
    `,
  }),
  defineField({
    name: "metaImage",
    title: "Meta Image (Social Sharing Image)",
    type: "image",
    description: `
      **Purpose:** The image displayed when this page is shared on social media (e.g., Twitter, Facebook, LinkedIn).
      **Guidelines:**
      - Choose an image that **represents the page** or your brand well.
      - **Recommended Size:** Aim for images around **1200x630 pixels** for optimal display across platforms.
      - **Default:** If left empty, your **main Branding Image** will typically be used as a fallback.
    `,
  }),
  defineField({
    name: "metaURL",
    title: "Meta URL (Canonical URL)",
    type: "url",
    description: `
      **Purpose:** Specifies the preferred URL for this page, helping search engines understand the authoritative version.
      **Guidelines:**
      - Use the **full, absolute URL** (e.g., "https://yourdomain.com/your-profile").
      - This helps prevent duplicate content issues.
      - **Auto-generated:** If left blank, this URL will typically be **auto-generated** based on your site's domain and the profile's slug. Only fill this in if you need a custom canonical URL.
    `,
  }),
  defineField({
    name: "metaType",
    title: "Meta Type (Open Graph Type)",
    type: "string",
    options: {
      list: [
        { title: "Website", value: "website" },
        { title: "Profile", value: "profile" },
        { title: "Portfolio", value: "portfolio" },
      ],
    },
    description: `
      **Purpose:** Informs social media platforms about the general type of content on this page.
      **Guidelines:**
      - **Website:** Use for general pages.
      - **Profile:** Use for personal profile pages (most common for a portfolio site).
      - **Portfolio:** A custom type you might use for specific project pages if you define it in your Open Graph configuration.
      - **Default:** Usually defaults to **"profile"** if not explicitly selected.
    `,
    initialValue: "profile",
  }),
];
