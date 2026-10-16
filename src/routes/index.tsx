import { createFileRoute } from "@tanstack/react-router";
import { ScrollReveals } from "@/components/scroll-reveals";
import { Navbar, Hero, CredibilityStrip, AboutSection, SeafoodCategories, QualitySection, WhyChooseUs, Certifications, VisionMission, ContactCTA, Footer } from "@/components/corporate-site";
import { siteImages } from "@/lib/site-assets";

const title = "Al Tayyibath Fish Trading Company LLC | Premium Seafood Supplier in Abu Dhabi";
const description = "Al Tayyibath Fish Trading Company LLC — premium fresh, frozen, live and seafood products with over 40 years of industry experience in Abu Dhabi, UAE.";
export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: siteImages.hero, type: "image/avif" },
    ],
  }),
});

function Index() {
  return <><a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:px-5 focus:py-3 focus:text-primary-foreground">Skip to content</a><Navbar /><main id="main-content"><Hero /><CredibilityStrip /><AboutSection /><SeafoodCategories /><QualitySection /><WhyChooseUs /><Certifications /><VisionMission /><ContactCTA /></main><Footer /><ScrollReveals /></>;
}
