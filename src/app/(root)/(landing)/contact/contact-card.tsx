"use client";

import {
  Heading3,
  Heading6,
  Lead,
  Muted,
  Paragraph,
} from "@/components/typography";
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
import { z } from "zod";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "Phone number must be valid.",
  }),
  message: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
});

export default function ContactCard() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fullName: "", email: "", phone: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle the form submission (e.g., send an email, save to a database, etc.)
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
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Jane Doe" {...field} />
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
                      <Input placeholder="+1 (555) 123-4567" {...field} />
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
                className="mt-4 flex items-center space-x-2"
              >
                <span>Let's Connect!</span>
                <MessageCircle className="h-5 w-5" />
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
