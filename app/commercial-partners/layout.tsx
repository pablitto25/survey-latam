

import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { HeaderCommercialPartners } from "@/components/header-commercial-partners";

export const metadata: Metadata = {
  title: {
    default: "Survey Commercial Partners",
    template: `%s | Survey Commercial Partners`,
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
    <HeaderCommercialPartners/>
    <section className="flex flex-col items-center justify-center gap-4 py-8">
      {children}
    </section>
    </>
  );
}
