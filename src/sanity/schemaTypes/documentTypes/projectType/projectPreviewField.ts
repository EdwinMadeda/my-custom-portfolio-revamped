import { capitalize } from "@/lib/utils";
import { defineField } from "sanity";

/**
 * Defines standard device configurations for project preview images.
 * The `resolution` values here serve as the canonical target physical pixel dimensions
 * for screenshots to be uploaded by content creators, aligning with common browser
 * Developer Tools presets for ease of capture.
 */

const devices = [
  {
    device: "desktop",
    guidelines: `
      For screenshots, use DevTools' 'Responsive' mode.
      Standard (16:9): Set CSS Viewport to 1920x1080, DPR to 1.0x.
      Ultrawide (21:9): Set CSS Viewport to 2560x1080, DPR to 1.0x.
      Center the main content. Lower resolution images may crop and lose quality.
      If dimensions are not met, cropping will occur. Ensure focal point stays within visible area.
    `,
    variants: [
      { variant: "standard", aspectRatio: "16:9", resolution: "1920x1080" },
      { variant: "ultraWide", aspectRatio: "21:9", resolution: "2560x1080" },
    ],

    variantDescription:
      "Choose 'Standard' for common desktop views or 'Ultrawide' for wider displays.",
  },
  {
    device: "tablet",
    guidelines: `
      For screenshots, use DevTools' 'iPad' preset (7th/8th/9th Gen) and set to Landscape orientation.
      CSS Viewport (Landscape): 1080x810, DPR: 2.0x.
      Resulting Physical Pixels: 2160x1620 (4:3 aspect ratio).
      Center the content. Cropping may occur with lower resolution.
    `,
    variants: [
      { variant: "standard", aspectRatio: "4:3", resolution: "2160x1620" },
    ],
  },
  {
    device: "mobile",
    guidelines: `
      For screenshots, use DevTools' 'iPhone 12 Pro' preset (or similar modern iPhone).
      CSS Viewport (Portrait): 390x844, DPR: 3.0x.
      Resulting Physical Pixels: 1170x2532 (~1:2.16 aspect ratio).
      Ensure the main content is visible.
    `,
    variants: [
      { variant: "standard", aspectRatio: "~1:2.16", resolution: "1170x2532" },
    ],
    variantDescription:
      "Mobile phones generally share similar aspect ratios. Use the 'Standard' option corresponding to common modern iPhones.",
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
                  title: "Screenshot Image",
                  description: `
                    Upload the ${capitalizedDeviceName} screenshot asset here.
                    Refer to the selected variant below for recommended dimensions and detailed guidelines on how to capture it using DevTools.
                    Ensure the main content is centered.
                  `,
                  validation: (Rule) =>
                    Rule.required().error(
                      `A screenshot image for ${capitalizedDeviceName} is required.`,
                    ),
                }),
                defineField({
                  type: "boolean",
                  name: "primaryDisplay",
                  title: "Primary Display Image",
                  description:
                    "Mark this as the main image to display for this device/variant (e.g., as the primary thumbnail or hero image).",
                  initialValue: false,
                }),
                defineField({
                  name: "screenshotViewItem",
                  title: "Screenshot View Name",
                  type: "reference",
                  to: [{ type: "screenshotViewItemDesc" }],
                  description:
                    "Select a descriptive name for the page/view shown in this screenshot. You can add new view names in the 'Screenshot View Item' section.",
                  validation: (Rule) =>
                    Rule.required().error(
                      "A screenshot view name is required.",
                    ),
                }),
                defineField({
                  type: "string",
                  name: "variant",
                  title: `${capitalizedDeviceName} Variant`,

                  description: `
                    Select the ${capitalizedDeviceName} variant for this image.
                    Recommended dimensions for selected variant (for DevTools screenshot capture):
                    ${variants
                      .map(
                        (v) =>
                          `${capitalize(v.variant)}: ${v.resolution} (${
                            v.aspectRatio
                          })`,
                      )
                      .join("\n")}
                    ${variantDescription ? `\n${variantDescription}` : ""}
                    ${guidelines}
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

                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
        };
      },
    ),
  ],
});
