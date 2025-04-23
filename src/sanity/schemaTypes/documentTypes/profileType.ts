import { UserPen } from 'lucide-react';
import { defineField, defineType, SlugIsUniqueValidator } from 'sanity';
import { heroFields } from '../content/heroFields';
import { aboutFields } from '../content/aboutFields';
import { metadataFields } from '../content/metaFields';
import { introField } from '../content/introField';
import { isUniqueAcrossAllDocuments } from '@/sanity/lib/utils';

const SECTIONS = {
  HERO: 'heroSection',
  ABOUT: 'aboutMe',
  TECHNOLOGIES_AND_TOOLS: 'technologiesAndToolsSection',
  WORKS: 'worksSection',
  SERVICES: 'servicesSection',
  TESTIMONIALS: 'testimonialsSection',
  CONTACT: 'contactSection',
  METADATA: 'metadataSection',
};

export const profileType = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  icon: UserPen,

  fields: [
    defineField({
      name: 'profileName',
      title: 'Profile Name',
      description: 'e.g Software Developer',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(100)
          .regex(
            /^[a-zA-Z0-9 ]+$/,
            'Profile name should only contain alphanumeric characters and spaces'
          )
          .error('Profile name must be between 3 and 100 characters'),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The URL-friendly version of the profile name',
      options: {
        source: 'profileName',
        maxLength: 96,
        isUnique: isUniqueAcrossAllDocuments,
      },
      validation: (Rule) => Rule.required().error('Slug is required'),
    }),

    defineField({
      name: 'brandingImage',
      title: 'Branding Image',
      description:
        'An image that represents your brand (e.g., logo, abstract design, etc.)',
      type: 'reference',
      to: [{ type: 'brandingImage' }],
    }),

    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fieldset: SECTIONS.HERO,
      fields: [
        introField({
          name: 'greeting',
          title: 'Greeting',
          description:
            'A warm greeting or introduction. e.g. "Hi, I\'m [Your Name], a web developer."',
          initialValue: "Hi, I'm [Your Name], a web developer.",
        }),
        ...heroFields,
      ],
    }),

    defineField({
      name: 'about',
      title: 'About Me Section',
      type: 'object',
      fieldset: SECTIONS.ABOUT,
      fields: [
        introField({
          title: 'About Introduction',
          description: 'A short introduction or tagline about yourself.',
          initialValue:
            'Hi, I am [Your Name], and I specialize in [Your Field].',
        }),
        ...aboutFields,
      ],
    }),

    defineField({
      name: 'technologiesAndTools',
      title: 'Technologies & Tools Section',
      type: 'object',
      fieldset: SECTIONS.TECHNOLOGIES_AND_TOOLS,
      fields: [
        introField({
          title: 'Technologies and Tools Introduction',
          description:
            'An overview of the technologies and tools you work with.',
          initialValue: "Here's an overview of my technologies and tools",
        }),
        defineField({
          name: 'technologiesAndTools',
          title: 'Technologies & Tools',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'technologyOrTool' }],
            },
          ],
          validation: (Rule) =>
            Rule.required()
              .min(1)
              .error('At least one technology is required.'),
        }),
      ],
    }),

    defineField({
      name: 'works',
      title: 'Works Section',
      type: 'object',
      fieldset: SECTIONS.WORKS,
      fields: [
        introField({
          title: 'Works Introduction',
          description: 'A short introduction or tagline for the work.',
          initialValue: "Here's an overview of my work",
        }),
        defineField({
          name: 'featuredProjects',
          title: 'Featured Projects',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'project' }],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: 'services',
      title: 'Services Section',
      type: 'object',
      fieldset: SECTIONS.SERVICES,
      fields: [
        introField({
          title: 'Services Introduction',
          description: 'A short introduction or tagline about what you offer.',
          initialValue: "Here's what I offer",
        }),
        defineField({
          name: 'featuredServices',
          title: 'Featured Services',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'service' }],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'object',
      fieldset: SECTIONS.TESTIMONIALS,
      fields: [
        introField({
          title: 'Testimonials Introduction',
          description:
            'A brief introduction to the testimonials section (optional).',
          initialValue: 'What others are saying about my work.',
        }),
        defineField({
          name: 'featuredTestimonials',
          title: 'Featured Testimonials',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'testimonial' }],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'reference',
      to: [{ type: 'contact' }],
      fieldset: SECTIONS.CONTACT,
    }),

    defineField({
      name: 'resume',
      title: 'Resume',
      type: 'reference',
      to: [{ type: 'resume' }],
    }),

    defineField({
      name: 'metadata',
      title: 'Website Metadata',
      type: 'object',
      fieldset: SECTIONS.METADATA,
      fields: metadataFields,
    }),
  ],

  fieldsets: [
    { name: SECTIONS.HERO, title: '🦸‍♂️ **HERO SECTION**' },
    { name: SECTIONS.ABOUT, title: '👤 **ABOUT ME**' },
    {
      name: SECTIONS.TECHNOLOGIES_AND_TOOLS,
      title: '🛠️ **TECHNOLOGIES AND TOOLS**',
    },
    { name: SECTIONS.WORKS, title: '💼 **WORKS**' },
    { name: SECTIONS.SERVICES, title: '⚙️ **SERVICES**' },
    { name: SECTIONS.TESTIMONIALS, title: '💬 **TESTIMONIALS**' },
    { name: SECTIONS.CONTACT, title: '📞 **CONTACT INFORMATION**' },
    { name: SECTIONS.METADATA, title: '🌐 **WEBSITE METADATA**' },
  ],

  preview: {
    select: {
      title: 'profileName',
      media: 'brandingImage',
    },
  },
});
