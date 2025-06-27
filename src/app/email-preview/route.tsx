// app/email-preview/route.tsx
import { ContactSubmissionEmail } from "@/emails/contact-submission-email";
import { render } from "@react-email/render";
import { NextResponse } from "next/server";

export async function GET() {
  const emailHtml = render(
    <ContactSubmissionEmail
      fullName="Jane Doe"
      email="jane@example.com"
      country="Kenya"
      phone="+254712345678"
      message="Hi there! I'm interested in working with you."
    />,
  );

  return new NextResponse(await emailHtml, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
