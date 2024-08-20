
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { HeaderClientPartners } from "@/components/header-client-partners";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: {
    default: "Survey Client Partners",
    template: `%s | Survey Client Partners`,
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
    <HeaderClientPartners/>
    <section className="flex flex-col items-center justify-center gap-4 py-8">
      {children}
    </section>
    <Footer/>
    </>
  );
}
