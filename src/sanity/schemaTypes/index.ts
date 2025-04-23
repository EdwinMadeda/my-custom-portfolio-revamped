import { type SchemaTypeDefinition } from 'sanity';

import { brandingImageType } from './documentTypes/brandingImageType';
import { profileType } from './documentTypes/profileType';
import { technologyOrToolType } from './documentTypes/technologyOrToolType';
import { projectType } from './documentTypes/projectType';
import { serviceType } from './documentTypes/serviceType';
import { testimonialType } from './documentTypes/testimonialsType';
import { contactInfoType } from './documentTypes/contactInfoType';
import { resumeType } from './documentTypes/resumeType';
import { techCategoryType } from './documentTypes/techCategoryType ';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    brandingImageType,
    profileType,
    technologyOrToolType,
    projectType,
    serviceType,
    testimonialType,
    contactInfoType,
    resumeType,
    techCategoryType,
  ],
};
