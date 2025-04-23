import { defineField, defineType } from 'sanity';

export const brandingImageType = defineType({
  name: 'brandingImage',
  title: 'Branding Image',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Branding Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description:
        'Alt text for the image (important for SEO and accessibility)',
    }),
  ],
});
