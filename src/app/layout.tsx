import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// const link = "https://www.quiz.nirmaanhyperloop.com"
const link = "https://quiz-app-nh.vercel.app/"

export const metadata: Metadata = {
  title: "Hyperloop Quiz App - Test Your Knowledge",
  description:
    "Challenge yourself with the ultimate Hyperloop Quiz App. Learn about hyperloop technology, engineering, and innovation while competing with friends!",
  keywords: [
    "Hyperloop",
    "Quiz",
    "Technology Quiz",
    "Engineering Quiz",
    "Innovative Transport",
  ],
  authors: [
    { name: "Steve Fernandes", url: "https://github.com/Aspireve" },
    { name: "Nirmaan Hyperloop Team", url: "https://nirmaanhyperloop.com" },
  ],
  applicationName: "Hyperloop Quiz App",
  themeColor: "#4e558d",
  robots: "index, follow",
  openGraph: {
    title: "Hyperloop Quiz App",
    description:
      "Test your knowledge about Hyperloop technology with our engaging quiz app!",
    url: link,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.nirmaanhyperloop.com/cdn/quiz-thumbnail.jpg",
        width: 1200,
        height: 630,
        alt: "Hyperloop Quiz App Thumbnail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyperloop Quiz App",
    description:
      "Test your knowledge about Hyperloop technology with our engaging quiz app!",
    site: "@nirmaanloop",
    creator: "@nirmaanloop",
    images: ["https://www.nirmaanhyperloop.com/cdn/quiz-thumbnail.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo (1).png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo (1).png" />
        <link rel="preconnect" href="https://stijndv.com" />
        <link
          rel="stylesheet"
          href="https://stijndv.com/fonts/Eudoxus-Sans.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-gradient-to-br from-[#4e558d] to-[#161931]`}
      >
        <UserProvider>{children}</UserProvider>
        <Toaster />
      </body>
    </html>
  );
}
