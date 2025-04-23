import { defineField } from 'sanity';
import { introField } from './introField';

export const heroFields = [
  defineField({
    name: 'tagline',
    title: 'Tagline',
    type: 'string',
    description:
      'A short and impactful statement that describes what you do or your value proposition.',
    validation: (Rule) =>
      Rule.max(100).error('Tagline cannot be longer than 100 characters.'),
    initialValue: "Let's build something together",
  }),

  defineField({
    name: 'subHeadline',
    title: 'Sub-headline',
    type: 'text',
    description:
      'A longer description of your work, passion, or mission. Can explain more about your skills or approach.',
    validation: (Rule) =>
      Rule.max(200).error('Sub-headline cannot be longer than 200 characters.'),
  }),

  defineField({
    name: 'ctaButtonText',
    title: 'CTA Button Text',
    type: 'string',
    initialValue: 'View My Work',
    description:
      'Text to display on the call-to-action button. Default: "View My Work".',
    validation: (Rule) => Rule.required().error('CTA button text is required.'),
  }),
];
