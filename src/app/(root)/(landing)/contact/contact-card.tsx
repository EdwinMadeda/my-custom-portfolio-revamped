"use client";

import { Heading3, Paragraph } from "@/components/typography";
import { Button } from "@/components/ui/custom-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import formSchema, { ContactFormInputsType } from "./form-schema";
import { VercelPhoneInput } from "@/components/vercel-phone-input";
import { EAST_AFRICA_COUNTRIES } from "@/config/countries";
import { SpinnerCircularFixed } from "spinners-react/lib/esm/SpinnerCircularFixed";
import { toast } from "sonner";
import { getCountryDetails } from "@/lib/utils";
import { CountryCode } from "libphonenumber-js";

export default function ContactCard() {
  const form = useForm<ContactFormInputsType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      phoneCountry: "KE",
      message: "",
      _honeypot: "",
    },
  });

  async function onSubmit(values: ContactFormInputsType) {
    const formdata = {
      ...values,
      country: getCountryDetails(values.phoneCountry as CountryCode)
        .countryName,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Message sent successfully", { duration: 3000 });
        form.reset();
      } else {
        toast.error(
          JSON.stringify(result.error) ||
            "Something went wrong. Please try again.",
          {
            duration: 3000,
          },
        );
      }
    } catch (error) {
      toast.error("Unable to send message. Please check your connection.", {
        duration: 3000,
      });
    }
  }

  return (
    <>
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>
            <Heading3>Reach Out</Heading3>
          </CardTitle>
          <CardDescription>
            <Paragraph>
              I’m always open to new opportunities and conversations. Fill out
              the form below, and I’ll get back to you soon!
            </Paragraph>
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid grid-cols-2 items-start justify-stretch gap-4">
              <input
                type="hidden"
                {...form.register("_honeypot")}
                autoComplete="off"
                tabIndex={-1}
              />
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Jane Doe" {...field} autoFocus />
                    </FormControl>
                    <FormDescription>
                      Let me know how you'd like to be addressed!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. janedoe@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      I'll get back to you here, so make sure it’s correct.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <VercelPhoneInput
                        defaultCountry="KE"
                        priorityCountries={EAST_AFRICA_COUNTRIES}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is optional, but feel free to share if you'd prefer a
                      call.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Your Message</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-32 resize-none"
                        placeholder="How can I help you?"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Let me know how I can assist you, whether it's about a
                      project, collaboration, or anything else.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="mt-4 flex items-center space-x-2"
              >
                <span>Let's Connect!</span>
                {form.formState.isSubmitting ? (
                  <SpinnerCircularFixed
                    size={80}
                    thickness={200}
                    speed={120}
                    color="#fff"
                    secondaryColor={"rgba(0,0,0,0.44)"}
                    className="!h-5 !w-5"
                  />
                ) : (
                  <MessageCircle className="!h-5 !w-5" aria-hidden="true" />
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
