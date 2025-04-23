import { defineField, defineType } from 'sanity';

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The full name of the person providing the testimonial.',
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(150)
          .error('Name must be between 3 and 150 characters.'),
    }),
    defineField({
      name: 'feedback',
      title: 'Feedback',
      type: 'text',
      description: 'The testimonial text or feedback from the person.',
      validation: (Rule) => Rule.required().error('Feedback is required.'),
    }),
    defineField({
      name: 'position',
      title: 'Position and Affiliation',
      type: 'object',
      fields: [
        defineField({
          name: 'positionTitle',
          title: 'Position Title',
          type: 'string',
          description: 'The person’s job title or position.',
          options: {
            list: [
              // Tech & Engineering
              { title: 'Software Engineer', value: 'Software Engineer' },
              { title: 'Frontend Developer', value: 'Frontend Developer' },
              { title: 'Backend Developer', value: 'Backend Developer' },
              { title: 'Full Stack Developer', value: 'Full Stack Developer' },
              { title: 'DevOps Engineer', value: 'DevOps Engineer' },

              {
                title: 'Site Reliability Engineer',
                value: 'Site Reliability Engineer',
              },
              { title: 'Mobile Developer', value: 'Mobile Developer' },
              { title: 'QA Engineer', value: 'QA Engineer' },
              {
                title: 'Machine Learning Engineer',
                value: 'Machine Learning Engineer',
              },
              { title: 'Data Engineer', value: 'Data Engineer' },
              { title: 'Cloud Architect', value: 'Cloud Architect' },

              // Design & UX
              { title: 'UX Designer', value: 'UX Designer' },
              { title: 'UI Designer', value: 'UI Designer' },
              { title: 'Product Designer', value: 'Product Designer' },
              { title: 'Graphic Designer', value: 'Graphic Designer' },
              { title: 'Design Lead', value: 'Design Lead' },

              // Product & Marketing
              { title: 'Product Manager', value: 'Product Manager' },
              { title: 'Product Owner', value: 'Product Owner' },
              { title: 'Marketing Director', value: 'Marketing Director' },
              { title: 'Growth Marketer', value: 'Growth Marketer' },
              { title: 'Content Strategist', value: 'Content Strategist' },

              // Leadership & Strategy
              { title: 'CTO', value: 'CTO' },
              { title: 'CEO', value: 'CEO' },
              { title: 'Co-founder', value: 'Co-founder' },
              { title: 'Engineering Manager', value: 'Engineering Manager' },
              { title: 'Tech Lead', value: 'Tech Lead' },
              { title: 'Lead Developer', value: 'Lead Developer' },
              {
                title: 'Director of Engineering',
                value: 'Director of Engineering',
              },
              { title: 'Head of Design', value: 'Head of Design' },

              // Community & Misc
              {
                title: 'Open Source Contributor',
                value: 'Open Source Contributor',
              },
              { title: 'Freelancer', value: 'Freelancer' },
              { title: 'Consultant', value: 'Consultant' },
              { title: 'Instructor', value: 'Instructor' },
              { title: 'Mentor', value: 'Mentor' },
              { title: 'Volunteer', value: 'Volunteer' },
              { title: 'Advocate', value: 'Advocate' },
            ],
          },
          validation: (Rule) =>
            Rule.required().error('Position title is required.'),
        }),

        defineField({
          name: 'customPositionTitle',
          title: 'Custom Position Title',
          type: 'string',
          description:
            'If your role isn’t listed above, enter a custom title here.',
        }),

        defineField({
          name: 'affiliationName',
          title: 'Affiliation Name',
          type: 'string',
          description: 'The name of the organization, company, or project.',
          validation: (Rule) =>
            Rule.required().error('Affiliation name is required.'),
        }),
        defineField({
          name: 'affiliationType',
          title: 'Affiliation Type',
          type: 'string',
          description:
            'Specify the kind of organization or group this person represents.',
          options: {
            list: [
              { title: 'Company', value: 'company' },
              { title: 'Nonprofit', value: 'nonprofit' },
              { title: 'Community Project', value: 'community' },
              { title: 'Open Source', value: 'openSource' },
              { title: 'Government Body', value: 'government' },
              { title: 'Freelance', value: 'freelance' },
              { title: 'Personal Brand', value: 'personalBrand' },
              { title: 'Other', value: 'other' },
            ],
          },
        }),

        defineField({
          name: 'affiliationLink',
          title: 'Affiliation Link',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({ scheme: ['http', 'https'] }).error(
              'Please provide a valid URL for the affiliation.'
            ),
        }),
      ],
    }),

    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      description: 'Upload a photo of the person giving the testimonial.',
      options: { hotspot: true, storeOriginalFilename: false },
    }),
    defineField({
      name: 'isPinned',
      title: 'Pinned Testimonial',
      type: 'boolean',
      description: 'Mark this testimonial as pinned to feature it at the top.',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Most Popular', value: 'mostPopular' },
          { title: "Client's Favorite", value: 'clientsFavorite' },
          { title: 'Top Rated', value: 'topRated' },
          { title: 'Other', value: 'other' },
        ],
      },
      description: 'Categorize testimonials based on their type or importance.',
      initialValue: 'other',
    }),
  ],
});
