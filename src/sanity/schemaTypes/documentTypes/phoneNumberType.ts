import { defineField, defineType } from "sanity";

import parsePhoneNumberFromString, { CountryCode } from "libphonenumber-js";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

import {
  ALL_COUNTRIES,
  CountryDialCode,
  CountryInfo,
} from "@/lib/generated-countries";

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
      description: `
        A label to identify this phone number in the Studio (e.g., "Main Mobile", "Business Line").
      `,
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "numberDetails",
      title: "Phone Number Details",
      type: "object",
      description: `
        Combine the dial code and local number for a complete international phone number.
      `,
      fields: [
        defineField({
          name: "dialCode",
          title: "Dial Code",
          type: "string",
          options: {
            list: ALL_COUNTRIES.map(({ name, flag, code, dial_code }) => {
              const { exampleNumberAsNational } = getCountryDetails(
                code as CountryCode,
              );
              const exampleText = exampleNumberAsNational
                ? ` - e.g., ${exampleNumberAsNational}`
                : "";
              return {
                title: `${flag} ${name} (${dial_code}) ${exampleText}`,
                value: dial_code,
              };
            }),
          },
          validation: (Rule) =>
            Rule.required().error("Please select a dial code."),
          initialValue: "+254" as CountryDialCode,
          description: `
            The international dialing prefix (e.g., +1, +44, +254). Select the correct country's code from the list.
          `,
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
          description: `
            The main digits of the phone number, excluding the international dial code. Enter digits only (0-9). Do NOT include spaces, hyphens, or the dial code. For example, for "+254 7XX XXX XXX", enter "7XX XXX XXX".
          `,
        }),
      ],
      validation: (Rule) =>
        Rule.custom((value) => {
          const { dialCode, phoneNumberValue } = value as {
            dialCode?: CountryDialCode;
            phoneNumberValue?: string;
          };

          const countryCode = getCountryInfoByDialCode(dialCode)?.code;

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
            } catch {
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
      dialCode: "numberDetails.dialCode",
      phoneNumberValue: "numberDetails.phoneNumberValue",
    },
    prepare({ title, dialCode, phoneNumberValue }) {
      let subtitleText = "No Number Set";
      const countryCode = getCountryInfoByDialCode(dialCode)?.code;
      try {
        if (phoneNumberValue && dialCode) {
          const phoneNumber = parsePhoneNumberFromString(phoneNumberValue, {
            defaultCountry: countryCode as CountryCode,
          });
          subtitleText =
            phoneNumber?.formatInternational() ||
            `+${countryCode}${phoneNumberValue}`;
        }
      } catch {
        subtitleText = `${countryCode}${phoneNumberValue}`;
      }
      return {
        title: title,
        subtitle: subtitleText,
      };
    },
  },
});

function getCountryInfoByDialCode(
  dialCode: CountryDialCode | undefined,
): CountryInfo | undefined {
  const countryCode = ALL_COUNTRIES.find((item) => item.dial_code === dialCode);
  return countryCode;
}
