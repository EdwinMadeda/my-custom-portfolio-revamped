import { z } from "zod";

const formSchema = z.object({
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
    .refine((val) => !/[^a-zA-Z\s'-.]/.test(val), {
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
    }),

  phone: z
    .string()
    .trim()
    .min(10, {
      message: "Phone number must be at least 10 characters long.",
    })
    .max(20, {
      message: "Phone number cannot exceed 20 characters.",
    })
    .regex(/^\+?[0-9\s()-]+$/, {
      message: "Phone number contains invalid characters.",
    })
    .refine(
      (val) => {
        const digitsOnly = val.replace(/\D/g, "");
        return digitsOnly.length >= 10 && digitsOnly.length <= 15;
      },
      {
        message: "Please enter a valid phone number format.",
      },
    )
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
});

export type ContactFormInputsType = z.infer<typeof formSchema>;

export default formSchema;
