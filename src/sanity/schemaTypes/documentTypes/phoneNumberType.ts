import { defineField, defineType } from "sanity";

import parsePhoneNumberFromString, { CountryCode } from "libphonenumber-js";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

import { allCountryCodes } from "@/config/countries";
import { Phone } from "lucide-react";
import { getCountryDetails } from "@/lib/utils";

export const phoneNumberType = defineType({
  name: "phoneNumber",
  title: "Phone Number",
  type: "document",
  icon: Phone,
  fields: [
    defineField({
      name: "title",
      title: "Phone Number Set Name",
      description:
        "A descriptive name for this phone number (e.g., 'Main Mobile', 'Business Line').",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "numberDetails",
      title: "Phone Number Details",
      type: "object",

      fields: [
        defineField({
          name: "countryCode",
          title: "Country Code",
          type: "string",
          options: {
            list: allCountryCodes.map(({ name, flag, code, dial_code }) => {
              const { exampleNumberAsNational } = getCountryDetails(
                code as CountryCode,
              );
              const exampleText = exampleNumberAsNational
                ? ` - e.g., ${exampleNumberAsNational}`
                : "";
              return {
                title: `${flag} ${name} (${dial_code}) ${exampleText}`,
                value: code,
              };
            }),
          },
          validation: (Rule) =>
            Rule.required().error("Please select a country code."),
          initialValue: "KE" as CountryCode,
        }),
        defineField({
          name: "phoneNumberValue",
          title: "Phone Number (Local)",
          type: "string",
          validation: (Rule) =>
            Rule.regex(
              /^\d+$/, // Relaxed initial regex to allow more numbers, specific validation is in custom()
              "Please enter only digits for the phone number.",
            )
              .max(15)
              .error("Phone number is too long (max 15 digits)."),
          description:
            "Enter your local phone number, excluding the country code.",
        }),
      ],
      validation: (Rule) =>
        Rule.custom((value) => {
          const { phoneNumberValue, countryCode } = value as {
            phoneNumberValue?: string;
            countryCode?: CountryCode;
          };

          if (!phoneNumberValue && !countryCode) {
            return "Phone number details (country code and number) are required.";
          }

          if (phoneNumberValue && !countryCode)
            return "Country code is required when a phone number is entered.";

          if (!phoneNumberValue && countryCode)
            return "Phone number is required when a country code is selected.";

          if (phoneNumberValue && countryCode) {
            try {
              const phoneNumber = parsePhoneNumberFromString(phoneNumberValue, {
                defaultCountry: countryCode as CountryCode,
              });

              if (
                !phoneNumber ||
                !phoneNumber.isValid() ||
                phoneNumber.country !== countryCode
              ) {
                const countryName = countries.getName(countryCode, "en");
                return `Please enter a valid phone number for ${countryName || "the selected country"}.`;
              }
            } catch (error) {
              return "An error occurred during phone number validation. Please check the format.";
            }
          }

          return true; // Validation passed
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      countryCode: "numberDetails.countryCode",
      phoneNumberValue: "numberDetails.phoneNumberValue",
    },
    prepare({ title, countryCode, phoneNumberValue }) {
      let subtitleText = "No Number Set";
      try {
        if (phoneNumberValue && countryCode) {
          const phoneNumber = parsePhoneNumberFromString(phoneNumberValue, {
            defaultCountry: countryCode as CountryCode,
          });
          subtitleText =
            phoneNumber?.formatInternational() ||
            `+${countryCode}${phoneNumberValue}`;
        }
      } catch (error) {
        subtitleText = `${countryCode}${phoneNumberValue}`;
      }
      return {
        title: title,
        subtitle: subtitleText,
      };
    },
  },
});
