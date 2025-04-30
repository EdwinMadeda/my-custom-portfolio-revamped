import { capitalize } from "@/lib/utils";
import { defineField } from "sanity";

const devices = [
  {
    device: "desktop",
    guidelines: `
      Desktop: 1920x1080 (16:9 aspect ratio)
      Ultrawide Desktop: 2560x1080 (21:9 aspect ratio)
      Center the main content. Lower resolution images may crop and lose quality.
      If dimensions are not met, cropping will occur. Ensure focal point stays within visible area.
    `,
    variants: [
      { variant: "standard", aspectRatio: "16:9", resolution: "1920x1080" },
      { variant: "ultraWide", aspectRatio: "21:9", resolution: "2560x1080" },
    ],
  },
  {
    device: "tablet",
    guidelines: `
      Tablet: 2048x1536 (4:3 aspect ratio)
      Center the content. Cropping may occur with lower resolution.
    `,
    variants: [
      { variant: "standard", aspectRatio: "4:3", resolution: "2048x1536" },
      { variant: "ultraWide", aspectRatio: "21:9", resolution: "2560x1080" },
    ],
  },
  {
    device: "mobile",
    guidelines: `
      Mobile: 1080x1920 (9:16 aspect ratio)
      Ensure the main content is visible. Use the same image for most devices with similar aspect ratios.
    `,
    variants: [
      { variant: "standard", aspectRatio: "18:9", resolution: "1080x1920" },
    ],
    variantDescription:
      "Mobile phones generally share similar aspect ratios (18:9, 19:9). Use the same image for most devices.",
  },
];

export const projectPreviewImageField = defineField({
  name: "projectPreviewImages",
  title: "Project Preview Images",
  type: "object",
  description:
    "Images showcasing previews of the project on different devices.",
  fields: [
    ...devices.map(
      ({ device: deviceName, guidelines, variants, variantDescription }) => {
        const capitalizedDeviceName = capitalize(deviceName);

        return {
          name: `${deviceName}View`,
          title: `${capitalizedDeviceName} View`,
          type: "array",
          of: [
            {
              title: `${capitalizedDeviceName} Screenshot`,
              type: "object",
              fields: [
                defineField({
                  type: "image",
                  name: "image",
                  description: `
                    Recommended Dimensions for ${capitalizedDeviceName} View:
                    ${guidelines}
                    Make sure the main content is centered and visible. If the image doesn't meet these sizes, cropping may occur, and quality could be reduced.
                  `,
                  options: {
                    hotspot: true,
                  },
                }),
                defineField({
                  type: "string",
                  name: "screenshotDescription",
                  title: "Screenshot Description",
                  description:
                    "Provide a brief description of this screenshot (optional).",
                  validation: (Rule) => Rule.max(200),
                }),
                defineField({
                  type: "string",
                  name: "variant",
                  title: `${capitalizedDeviceName} Variant`,
                  description: `
                    Select the ${capitalizedDeviceName} variant for this image.
                    ${variantDescription ?? ""}
                  `,
                  options: {
                    list: variants.map(
                      ({ variant, aspectRatio, resolution }) => ({
                        title: `${capitalize(
                          variant,
                        )} (${aspectRatio}, ${resolution})`,
                        value: variant,
                      }),
                    ),
                  },
                }),
              ],
            },
          ],
        };
      },
    ),
  ],
});
