import { defineField, defineType } from 'sanity';

export const technologyOrToolType = defineType({
  name: 'technologyOrTool',
  title: 'Technology or Tool',
  type: 'document',
  fields: [
    defineField({
      name: 'techName',
      title: 'Tech Name',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(50)
          .error('Tech Name must be between 3 and 50 characters.'),
    }),
    defineField({
      name: 'techLogo',
      title: 'Tech Logo',
      type: 'image',
      description:
        'Logo or icon representing the technology (must be provided).',
      validation: (Rule) =>
        Rule.required().error('Technology logo is required.'),
    }),
    defineField({
      name: 'proficiencyLevel',
      title: 'Proficiency Level',
      type: 'string',
      options: {
        list: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'Intermediate',
    }),
    defineField({
      name: 'techCategory',
      title: 'Technology Category',
      type: 'reference',
      to: [{ type: 'techCategory' }],
      description:
        'Select the category or domain this technology or tool belongs to. You can add new categories in the category section.',
    }),
  ],
});
