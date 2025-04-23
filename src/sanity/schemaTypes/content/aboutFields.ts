import { defineField } from 'sanity';

export const aboutFields = [
  defineField({
    name: 'personalStory',
    title: 'About Me',
    type: 'array',
    of: [
      {
        type: 'block',
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'Heading', value: 'h2' },
        ],
        marks: {
          decorators: [
            { title: 'Bold', value: 'strong' },
            { title: 'Italic', value: 'em' },
          ],
        },
      },
      {
        type: 'image',
        options: { hotspot: true },
      },
    ],
    description:
      'Tell us about your journey, background, and experiences. You can add images as well.',
    validation: (Rule) => Rule.required().error('Personal story is required.'),
  }),
];
