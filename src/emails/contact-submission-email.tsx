import { siteConfig } from "@/config/site";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Link,
  Hr,
} from "@react-email/components";
import React from "react";

interface ContactSubmissionEmailProps {
  fullName: string;
  email: string;
  country?: string;
  phone?: string;
  message: string;
}

export const ContactSubmissionEmail = ({
  fullName,
  email,
  country,
  phone,
  message,
}: ContactSubmissionEmailProps) => (
  <Html>
    <Head />
    <Preview>{fullName} just reached out via your portfolio 🚀</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <Heading as="h3" style={styles.subheading}>
          📬 Contact Submission
        </Heading>
        <Heading as="h2" style={styles.heading}>
          {siteConfig.name}
        </Heading>

        <Hr />

        <Section style={styles.section}>
          <Text style={styles.label}>👤 Full Name:</Text>
          <Text>{fullName}</Text>

          <Text style={styles.label}>📧 Email Address:</Text>
          <Text>{email}</Text>

          {phone && (
            <>
              {country && (
                <>
                  <Text style={styles.label}>🌍 Country:</Text>
                  <Text>{country}</Text>
                </>
              )}
              <Text style={styles.label}>📞 Phone Number:</Text>
              <Text>{phone}</Text>
            </>
          )}

          <Text style={styles.label}>💬 Message:</Text>
          <Text style={{ whiteSpace: "pre-wrap" }}>{message}</Text>
        </Section>

        <Section style={styles.footer}>
          <Text>
            ✨ This message was submitted via {siteConfig.name}. You can reply
            directly to{" "}
            <strong>
              <Link
                href={`mailto:${email}?subject=Re: Your Message from ${siteConfig.name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {email}
              </Link>
            </strong>
            .
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const styles = {
  body: {
    backgroundColor: "#f9fafb",
    padding: "40px 0",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "32px",
    maxWidth: "600px",
    margin: "0 auto",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
  },
  subheading: {
    marginBottom: "20px",
    fontSize: "16px",
    fontWeight: 500,
    color: "#6b7280", // Tailwind gray-500
  },
  heading: {
    marginTop: "0",
    marginBottom: "24px",
    fontSize: "24px",
    fontWeight: 700,
    color: "#111827", // Tailwind gray-900
    paddingBottom: "12px",
    display: "inline",
  },

  section: {
    marginBottom: "20px",
    fontSize: "16px",
    color: "#374151",
  },
  label: {
    marginTop: "12px",
    fontWeight: "bold",
    color: "#111827",
  },
  footer: {
    marginTop: "32px",
    fontSize: "14px",
    color: "#6b7280",
    borderTop: "1px solid #e5e7eb",
    paddingTop: "16px",
  },
};
