import { defineQuery } from "next-sanity";

// GROQ Fragment for Hero Section
export const heroQueryFragment = `
  hero {
    greeting,
    tagline,
    subHeadline,
    ctaButtonText,
    ctaButtonLink
  }
`;

// GROQ Fragment for About Me Section
export const aboutMeQueryFragment = `
  about {
    shortIntro,
    longIntro,
    personalStory
  }
`;

// GROQ Fragment for Technologies & Tools Section
export const technologiesAndToolsQueryFragment = `
  technologiesAndTools {
    shortIntro,
    longIntro,
    featuredTechnologiesAndTools[]->{
      _id,
      techName,
      techDescription,
      proficiencyLevel,
      techLogo {
        asset->{
          _id,
          url,
          metadata {
            blurHash,
            lqip,
            dimensions
          }
        }
      },
      websiteUrl,
      techCategory->{ 
        _id,
        categoryName,
        categoryDescription,
        "categorySlug": categorySlug.current
      }
    }
  }
`;

// GROQ Fragment for Works Section
export const worksQueryFragment = `
  works {
    shortIntro,
    longIntro,
    "featuredProjects": featuredProjects[]->{
      _id,
      title,
      description,
      "slug": slug.current,
      thumbnail {
        asset->{
          _id,
          url,
          metadata {
            blurHash,
            lqip,
            dimensions
          }
        }
      }
    },
    "otherWorks": otherWorks[]->{
      _id,
      title,
      "slug": slug.current,
      description,
      thumbnail {
        asset->{
          _id,
          url,
          metadata {
            blurHash,
            lqip,
            dimensions
          }
        }
      }
    }
  }
`;

// GROQ Fragment for Services Section
export const servicesQueryFragment = `
  services {
    shortIntro,
    longIntro,
    featuredServices[]->{ 
      _id,
      serviceIcon{
        asset->{
          _id,
          url,
          metadata {
            blurHash,
            lqip,
            dimensions
          }
        }
      },
      serviceName,
      shortDescription,
      longDescription
    }
  }
`;

// GROQ Fragment for Testimonials Section
export const testimonialsQueryFragment = `
  testimonials {
    shortIntro,
    longIntro,
    featuredTestimonials[]->{ 
      _id,
      name,
      feedback,
      position{
        "title": select( 
          positionTitle == "Other" => customPositionTitle,
          positionTitle
        ),
        affiliation->{
          _id,
          name,
          type,
          link,
          logo{
            asset->{
              _id,
              url,
              metadata {
                blurHash,
                lqip,
                dimensions
              }
            }
          },
          description,
          location
        }
      },
      photo {
        asset->{
          _id,
          url,
          metadata {
            blurHash,
            lqip,
            dimensions
          }
        }
      },
      isPinned,
      category
    }
  }
`;

// GROQ Fragment for Contact Section
export const contactQueryFragment = `
  contact {
    email->{
      title,
      "value": address 
    },
    phoneNumber->{
      title,
      "value": numberDetails.dialCode + numberDetails.phoneNumberValue 
    },
    "socialMedia": socialMediaLinks->{
      title,
      links[]{
        platform,
        link
      }
    }
  }
`;

// GROQ Fragment for Metadata Section
export const metadataQueryFragment = `
  metadata {
    metaTitle,
    metaDescription,
    metaKeywords[]->{
      _id,
      keywordName,
     "keywordSlug" : keywordSlug.current
    },
    metaImage->{ 
      "asset": image.asset->{
        _id,
        url,
        metadata {
          blurHash,
          lqip,
          dimensions
        }
      },
      altText 
    },
    metaURL,
    metaType
  }
`;

// export const PROFILES_QUERY = defineQuery(
//   `*[_type == "profile" && defined(slug.current)]`,
// );

export const PROFILE_QUERY = defineQuery(
  `*[_type == "profile" && slug.current == $slug][0]{
    ${heroQueryFragment},
    ${aboutMeQueryFragment},
    ${technologiesAndToolsQueryFragment},
    ${worksQueryFragment},
    ${servicesQueryFragment},
    ${testimonialsQueryFragment},
    ${contactQueryFragment},
    ${metadataQueryFragment},
  }`,
);

const projectPreviewImageFragment = `
   mobileView[]{
        image{
          asset->{
            _id,
            url,
            metadata{
              blurHash,
              lqip,
              dimensions
            }
          }
        },
        primaryDisplay,
        variant,
      screenshotViewItem->{
        _id,
        title,
        "slug": value.current
      }
  },
`;

export const SINGLE_PROJECT_QUERY = defineQuery(
  `*[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    description,
    "slug": slug.current,
    technologiesUsed[]->{
      _id,
      techName,
      techDescription,
      proficiencyLevel,
      websiteUrl,
      techCategory->{
        _id,
        categoryName,
        categoryDescription,
        "categorySlug": categorySlug.current
      }
    },
    projectPreviewImages {
      mobileView[] {
        image {
          asset->{
            _id,
            url,
            metadata {
              blurHash,
              lqip,
              dimensions
            }
          }
        },
        primaryDisplay,
        variant,
        screenshotViewItem->{
          _id,
          title,
          "slug": value.current
        }
      },
      tabletView[] {
        image {
          asset->{
            _id,
            url,
            metadata {
              blurHash,
              lqip,
              dimensions
            }
          }
        },
        primaryDisplay,
        variant,
        screenshotViewItem->{
          _id,
          title,
          "slug": value.current
        }
      },
      desktopView[] {
        image {
          asset->{
            _id,
            url,
            metadata {
              blurHash,
              lqip,
              dimensions
            }
          }
        },
        primaryDisplay,
        variant,
        screenshotViewItem->{
          _id,
          title,
          "slug": value.current
        }
      }
    },
    liveDemoLink,
    repoLink,
    detailedDescription,
    developmentStatus,
    date
  }`,
);

export const PROFILE_SLUGS = defineQuery(
  ` *[_type == "profile"]{
    "slug": slug.current
  }`,
);
