import { defineField, defineType } from 'sanity';

import { FolderGit2 } from 'lucide-react';
import { projectPreviewImageField } from './projectPreviewField';

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: FolderGit2,
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .min(5)
          .max(150)
          .error(
            'Project Title must be between 5 and 150 characters and cannot be empty or just whitespace.'
          ),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required'),
    }),

    defineField({
      name: 'status',
      title: 'Visible Status',
      description: 'Control if this profile is publicly visible',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
        ],
        layout: 'radio', // Optional: display as a set of radio buttons
      },
      initialValue: 'draft',
    }),

    defineField({
      name: 'thumbnail',
      title: 'Project Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Image that represents the project (used in previews/cards)',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().min(10).max(300),
    }),

    defineField({
      name: 'technologiesUsed',
      title: 'Technologies Used',
      type: 'array',
      description:
        'Technologies, tools, and frameworks used to build the project.',
      of: [{ type: 'technologyOrTool' }],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(10)
          .error(
            'You must list at least 1 technology, tool or framework used in the project, with a maximum of 10.'
          ),
    }),

    defineField({
      name: 'liveDemoLink',
      title: 'Live Demo Link',
      type: 'url',
      description: 'Link to the live version or demo of the project.',
      validation: (Rule) =>
        Rule.uri({ allowRelative: true, scheme: ['http', 'https'] }).error(
          'Please enter a valid URL starting with http:// or https:// or a valid relative URL.'
        ),
    }),
    defineField({
      name: 'repoLink',
      title: 'Repository Link',
      type: 'url',
      description:
        'Link to the project’s source code repository (e.g., GitHub).',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'] }).error(
          'Please enter a valid absolute URL (starting with http:// or https://) for the repository link.'
        ),
    }),

    defineField({
      name: 'detailedDescription',
      title: 'Detailed Project Description',
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
      validation: (Rule) =>
        Rule.required().error(
          'Project Description is required and cannot be empty.'
        ),
    }),

    defineField({
      name: 'date',
      title: 'Completion Date',
      type: 'date',
    }),

    projectPreviewImageField,
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
    },
  },
});
