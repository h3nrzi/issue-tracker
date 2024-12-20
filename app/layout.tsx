import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import { Open_Sans } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import NavBar from "@/app/nav-bar";
import AuthProvider from "@/app/auth-provider";
import QueryClientProvider from "./query-client-provider";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  openGraph: {
    title: "Issue Tracker",
    description: "Tracking your project issues and resolve them by your teamworks",
    url: "https://issue-tracker5432.netlify.app",
    siteName: "Issue Tracker",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dk1j8lhuv/image/upload/v1732715915/issue-tracker/euuiv7dhvzqqnu20127n.jpg",
        width: 1200,
        height: 630,
        alt: "Issue Tracker Overview",
      },
    ],
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={openSans.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="violet" appearance="light">
              <NavBar />
              <main className="container m-auto p-5">{children}</main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
