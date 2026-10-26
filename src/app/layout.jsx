import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import data from "@/data/portfolio.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const { name } = data.profile;

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-eight-phi-xohg8f4qq7.vercel.app"),
  title: {
    default: `${name} — Full Stack Software Engineer (MERN)`,
    template: `%s — ${name}`,
  },
  description: data.profile.summary,
  keywords: [
    "Mehadee Hassan",
    "Full Stack Developer",
    "MERN Stack",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Portfolio",
    "Bangladesh",
  ],
  authors: [{ name: "Mehadee Hassan", url: data.socials[0]?.url }],
  openGraph: {
    title: `${name} — Full Stack Software Engineer (MERN)`,
    description: data.profile.summary,
    type: "website",
    siteName: `${name} · Portfolio`,
    images: [{ url: data.profile.photo, width: 1024, height: 1024, alt: `Portrait of ${name}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${name} — Full Stack Software Engineer (MERN)`,
    description: data.profile.summary,
    images: [data.profile.photo],
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
    { media: "(prefers-color-scheme: dark)", color: "#09090f" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem("mh-theme");if(t!=="light"&&t!=="dark"){t="dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){}try{document.documentElement.classList.add("js")}catch(e){}})()`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
