import { defineField, defineType } from 'sanity';

export const resumeType = defineType({
  name: 'resume',
  title: 'Resume',
  type: 'document',
  fields: [
    defineField({
      name: 'resume',
      title: 'Resume',
      description: 'In PDF format only',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    }),
  ],
});
