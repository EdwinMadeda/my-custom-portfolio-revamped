import { defineField, defineType } from 'sanity';

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'serviceName',
      title: 'Service Name',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .min(5)
          .max(150)
          .error('Service Name must be between 5 and 150 characters.'),
    }),
    defineField({
      name: 'serviceDescription',
      title: 'Service Description',
      type: 'text',
      validation: (Rule) =>
        Rule.required().error('A service description is required.'),
    }),
    defineField({
      name: 'serviceIcon',
      title: 'Service Icon',
      type: 'image',
      description: 'An icon representing the service (optional).',
    }),
  ],
});
