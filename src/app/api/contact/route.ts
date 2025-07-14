import { ContactSubmissionEmail } from "@/emails/contact-submission-email";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const formdata = await req.json();
  const react = ContactSubmissionEmail(formdata);

  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "edwinmadeda@outlook.com",
      subject: `New message from ${formdata.fullName}`,
      react,
    });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send message. Please try again later.",
          resendError: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
      data,
    });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred.",
        apiError: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
