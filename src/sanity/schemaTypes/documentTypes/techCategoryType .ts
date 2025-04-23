import { CodeIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const techCategoryType = defineType({
  name: 'techCategory',
  title: 'Technology Category',
  type: 'document',
  fields: [
    defineField({
      name: 'categoryName',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required().error('Category name is required.'),
    }),
    defineField({
      name: 'categoryDescription',
      title: 'Category Description',
      type: 'text',
      description: 'Provide a brief description of the category.',
    }),
  ],
});
