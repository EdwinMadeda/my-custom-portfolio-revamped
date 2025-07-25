import type { Metadata } from "next";
import "./globals.css";
import {
  dmSans,
  lemonJelly,
  manrope,
  rainbowBridge,
  roadBlast,
} from "@/config/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { PersonalLinksDesktop } from "@/components/personal-links";
import { Toaster } from "@/components/ui/sonner";
import { getDefaultProfile } from "@/lib/sanity";

const otherMetadata = {
  applicationName: siteConfig.name,
  keywords: siteConfig.keyWords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
};

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.title}`,
    default: siteConfig.title,
  },
  description: siteConfig.description,
  manifest: "/site.webmanifest",
  icons: {
    apple: [
      {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "180x180",
        url: "/apple-touch-icon.png",
      },
    ],
    icon: [
      { url: "/favicon.ico" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
    ],
  },
  ...otherMetadata,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getDefaultProfile();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsx(
          `${dmSans.variable} ${manrope.variable}`,
          `${lemonJelly.variable} ${rainbowBridge.variable} ${roadBlast.variable}`,
          `antialiased`,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" richColors />

          {profile && (
            <PersonalLinksDesktop
              contact={profile.contact}
              resume={profile.resume}
            />
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
