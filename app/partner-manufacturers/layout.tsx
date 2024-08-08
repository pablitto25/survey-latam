import { Header } from "@/components/header";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: "Survey Partner Manufacturers",
    template: `%s | Survey Partner Manufacturers`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.png",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <Header/>
    <section className="flex flex-col items-center justify-center gap-4 py-8">
      {children}
    </section>
    </>
  );
}
