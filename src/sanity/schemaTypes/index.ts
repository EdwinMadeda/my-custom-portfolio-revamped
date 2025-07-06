import { type SchemaTypeDefinition } from "sanity";
import { brandingImageType } from "./documentTypes/brandingImageType";
import { profileType } from "./documentTypes/profileType";
import { technologyOrToolType } from "./documentTypes/technologyOrToolType";
import { projectType } from "./documentTypes/projectType";
import { serviceType } from "./documentTypes/serviceType";
import { testimonialType } from "./documentTypes/testimonialsType";
import { resumeType } from "./documentTypes/resumeType";
import { techCategoryType } from "./documentTypes/techCategoryType";
import { otherWorkType } from "./documentTypes/otherWorkType";
import { contactEmailType } from "./documentTypes/contactEmailType";
import { socialMediaLinksType } from "./documentTypes/socialMediaLinksType";
import { phoneNumberType } from "./documentTypes/phoneNumberType";
import { screenshotViewItemDescType } from "./documentTypes/screenshotViewItemDescType";
import { affiliationType } from "./documentTypes/affiliationType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    brandingImageType,
    profileType,
    technologyOrToolType,
    projectType,
    otherWorkType,
    screenshotViewItemDescType,
    serviceType,
    testimonialType,
    affiliationType,
    contactEmailType,
    phoneNumberType,
    socialMediaLinksType,
    resumeType,
    techCategoryType,
  ],
};
