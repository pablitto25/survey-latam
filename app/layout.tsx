import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";


/* export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.png",
  },
}; */

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative mx-auto flex flex-col justify-center items-center max-w-5xl">

            {/* <Navbar /> */}
            {/* <Header /> */}

            <main className="container mx-auto max-w-full flex-grow bg-white">
              {children}
            </main>

            <footer className="w-full flex items-center justify-center">
              <Footer/>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
