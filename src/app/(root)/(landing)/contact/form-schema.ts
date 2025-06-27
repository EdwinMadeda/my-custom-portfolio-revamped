import {
  CountryCode,
  getExampleNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

import { z } from "zod";
import examples from "libphonenumber-js/mobile/examples";

countries.registerLocale(enLocale);

const formSchema = z
  .object({
    fullName: z
      .string({
        required_error: "Full name is required.",
        invalid_type_error: "Full name must be text.",
      })
      .trim()
      .min(2, {
        message: "Full name must be at least 2 characters.",
      })
      .max(100, {
        message: "Full name cannot exceed 100 characters.",
      })
      .refine(
        (val) => {
          const parts = val.split(/\s+/).filter(Boolean);
          return parts.length >= 2;
        },
        {
          message: "Please enter both your first and last name.",
        },
      )
      .refine((val) => !/[^\p{L}\s'.-]/u.test(val), {
        message:
          "Full name can only contain letters, spaces, hyphens, apostrophes, or periods.",
      }),

    email: z
      .string({
        required_error: "Email address is required.",
      })
      .trim()
      .email({
        message: "Please enter a valid email address.",
      })
      .max(255, {
        message: "Email address is too long.",
      })
      .refine(
        (val) =>
          !/@(mailinator\.com|10minutemail\.com|guerrillamail\.com)$/i.test(
            val,
          ),
        {
          message: "Temporary email addresses aren’t allowed.",
        },
      ),

    phone: z
      .string()
      .trim()
      .transform((val) => (val === "" ? undefined : val))
      .optional(),

    phoneCountry: z
      .string()
      .transform((val) => (val === "" ? undefined : val))
      .optional(),

    message: z
      .string({
        required_error: "Message is required.",
      })
      .trim()
      .min(10, {
        message: "Message must be at least 10 characters.",
      })
      .max(500, {
        message: "Message cannot exceed 500 characters.",
      }),

    _honeypot: z.string().max(0, { message: "Spam detected." }).optional(),
  })
  .superRefine(({ phone, phoneCountry }, ctx) => {
    if (!phone) return;

    if (!phoneCountry) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Phone country is required when phone number is provided",
        path: ["phoneCountry"],
      });
      return;
    }

    const countryCode = (phoneCountry as CountryCode) ?? "KE";
    const phoneNumber = parsePhoneNumberFromString(phone, {
      defaultCountry: countryCode,
    });

    const valid =
      phoneNumber?.isValid() && phoneNumber.country === phoneCountry;

    if (!valid) {
      const countryName = countries.getName(countryCode, "en");
      const exampleNumber =
        getExampleNumber(countryCode, examples)?.formatNational() ?? "";

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Please enter a valid phone number from ${countryName} (e.g, ${exampleNumber})`,
        path: ["phone"],
      });
    }
  });

export type ContactFormInputsType = z.infer<typeof formSchema>;

export default formSchema;
