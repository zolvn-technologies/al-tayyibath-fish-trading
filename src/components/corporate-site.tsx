import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowDown, Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brandImages, siteImages } from "@/lib/site-assets";

import { useMenuScrollLock } from "@/hooks/use-menu-scroll-lock";

const navigation = [["Home", "home"], ["About", "about"], ["Products", "products"], ["Quality", "quality"], ["Contact", "contact"]] as const;

export function Coastline() {
  return <svg className="coastline" viewBox="0 0 82 14" fill="none" aria-hidden="true"><path d="M1 8c9 0 9-5 18-5s9 7 18 7 9-6 18-6 9 4 18 4h8" stroke="currentColor" strokeWidth="1" /></svg>;
}

export function Wordmark({ footer = false }: { footer?: boolean }) {
  return <a href="#home" className={`wordmark${footer ? " footer-logo-lockup" : ""}`} aria-label="AL TAYYIBATH FISH TRADING L.L.C — home"><img className="wordmark-logo" src={brandImages.company} alt="" width={324} height={307} loading={footer ? "lazy" : undefined} /><img className="company-name" src={brandImages.companyWordmark} alt="" width={2172} height={724} loading={footer ? "lazy" : undefined} /></a>;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const headerRef = useRef<HTMLElement>(null);
  const closeMenu = useCallback(() => setOpen(false), []);
  useMenuScrollLock(open, headerRef, closeMenu);
  const selectMobileLink = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (!target) return;
      window.history.pushState(null, "", `#${id}`);
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }));
  };
  useEffect(() => {
    const onScroll = () => {
      if (document.body.dataset["menuLocked"]) return;
      setScrolled(window.scrollY > 45);
      const current = navigation.map(([, id]) => document.getElementById(id)).filter((element) => element && element.getBoundingClientRect().top < 170).at(-1);
      setActive(current?.id ?? "home");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return <header ref={headerRef} className={`site-nav ${scrolled || open ? "solid" : ""}`}>
    <div className="shell nav-inner"><Wordmark /><nav className="nav-links" aria-label="Main navigation">{navigation.map(([name, id]) => <a key={id} href={`#${id}`} className={`nav-link ${active === id && scrolled ? "active" : ""}`} aria-current={active === id ? "location" : undefined}>{name}</a>)}<Button asChild size="sm"><a href="#contact">Contact Us <ArrowRight /></a></Button></nav>
      <Button variant="ghost" size="icon" className="mobile-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">{navigation.filter(([, id]) => id !== "contact").map(([name, id]) => <a key={id} href={`#${id}`} onClick={(event) => selectMobileLink(event, id)}>{name}</a>)}<Button asChild className="mobile-contact"><a href="#contact" onClick={(event) => selectMobileLink(event, "contact")}>Contact Us <ArrowRight /></a></Button></nav>}
  </header>;
}

export function AnniversarySeal() {
  return <div className="anniversary hero-seal" aria-label="40 years of seafood excellence, 1986 to 2026"><span className="number">40</span><span className="years">YEARS</span><span className="excellence">OF SEAFOOD EXCELLENCE</span><span className="dates">1986 — 2026</span></div>;
}

export function Hero() {
  return <section id="home" className="hero" aria-labelledby="hero-heading">
    <img className="hero-photo" src={siteImages.hero} alt="Whole seafood and shellfish displayed on crushed ice against a deep blue backdrop" width={1596} height={768} fetchPriority="high" decoding="async" />
    <div className="shell hero-inner"><div className="hero-copy"><div className="eyebrow">ESTABLISHED 1986</div><h1 id="hero-heading">Seafood expertise<br className="hidden sm:block" /> built over four decades.</h1><p className="hero-description">Premium seafood sourcing, processing and supply from Abu Dhabi, built on quality, careful handling and trusted service.</p><div className="hero-actions"><Button asChild size="lg"><a href="#products">Explore Our Seafood <ArrowRight /></a></Button><a className="text-cta hero-contact" href="#contact">Contact Us <ArrowRight /></a></div></div></div>
    <div className="shell hero-bottom"><span>ABU DHABI, UNITED ARAB EMIRATES</span><a href="#about">DISCOVER AL TAYYIBATH <ArrowDown size={15} /></a></div>
  </section>;
}

export function CredibilityStrip() {
  const credentials = [["40+ Years", "Experience"], ["HACCP", "Certified"], ["ISO 9001", "Certified"], ["ISO 22000", "Certified"], ["ICV", "Certified"]];
  return <section className="credentials" aria-label="Company experience and credentials"><div className="shell credentials-inner">{credentials.map(([title, detail]) => <div className="credential" key={title}><strong>{title}</strong>{detail && <span>{detail}</span>}</div>)}</div></section>;
}

export function AboutSection() {
  return <section id="about" className="section-space"><div className="shell split"><div className="about-photo"><img src={siteImages.about} alt="Seafood carefully handled on ice in a hygienic processing environment" loading="lazy" width={1200} height={1008} /></div><div className="copy"><div className="eyebrow">About Al Tayyibath</div><h2>Seafood trading in Abu Dhabi since 1986.</h2><p>Al Tayyibath Fish Trading Company LLC was established in 1986 as a sister concern of Al Tayyib Fish Shop in the Mina fish market region. Over the years, the company developed into a comprehensive seafood trading and processing operation serving customers in Abu Dhabi and the wider UAE.</p><p>With decades of practical experience in seafood sourcing, handling, processing, storage and distribution, the company has built lasting relationships with customers across hospitality, catering, retail and institutional sectors.</p><div className="sectors"><span>Royal Palaces</span><span>Five-Star Hotels</span><span>Catering Companies</span><span>Supermarkets</span></div><a href="#our-story" className="text-cta mt-5">Discover Our Story <ArrowRight /></a></div></div></section>;
}

const categories = [
  { name: "Fresh Seafood", image: siteImages.fresh, alt: "Fresh seafood displayed at Golden Harbour Fish Market", copy: "Freshly sourced seafood handled with care to preserve quality and freshness.", className: "category-fresh" },
  { name: "Frozen Seafood", image: siteImages.frozen, alt: "Whole seafood kept chilled with frost and ice in a stainless steel tray", copy: "Carefully handled and stored seafood designed to maintain dependable product quality.", className: "category-wide" },
  { name: "Premium Seafood", image: siteImages.premium, alt: "A carefully arranged selection of whole seafood and shellfish on ice", copy: "Selected products for customers who expect exceptional quality and presentation.", className: "category-small" },
  { name: "Live Seafood", image: siteImages.live, alt: "Live seafood held in clear water in a professional holding tank", copy: "Live seafood handled with the care and attention required to preserve freshness.", className: "category-small" },
] as const;

function CategoryItem({ category }: { category: typeof categories[number] }) {
  return <article className="category-item"><div className="category-photo"><img src={category.image} alt={category.alt} loading="lazy" decoding="async" width={1008} height={752} /></div><div className="category-heading"><h3>{category.name}</h3></div><p>{category.copy}</p></article>;
}

export function SeafoodCategories() {
  return <section id="products" className="section-space categories"><div className="shell"><div className="section-head"><div><div className="eyebrow">Our Seafood</div><h2>Seafood for your business.</h2></div><p>Our seafood range is built around freshness, quality and the needs of customers who expect consistency from every delivery.</p></div><div className="category-grid">{categories.map(category => <CategoryItem key={category.name} category={category} />)}</div></div></section>;
}

export function ProcessSection() {
  const steps = [["01", "SOURCE", "Carefully selected seafood from trusted sources."], ["02", "PROCESS", "Professional and hygienic handling."], ["03", "STORE & DELIVER", "Careful storage and dependable delivery."]];
  return <div className="process-grid" aria-label="Our seafood process">{steps.map(([number, heading, copy]) => <div key={number}><span className="process-number">{number}</span><h3>{heading}</h3><p>{copy}</p></div>)}</div>;
}

export function QualitySection() {
  return <section id="quality" className="section-space quality"><div className="shell"><div className="split"><div className="copy"><div className="eyebrow">Quality from source to delivery</div><h2>Careful handling,<br />from source to delivery.</h2><p>The company acquires fresh seafood from trusted auction locations and suppliers across the UAE, with experienced purchasers selecting products based on quality and freshness.</p><p>Seafood is handled, cleaned and stored with careful attention to hygiene and cleanliness, using specialized facilities designed to help preserve product quality and freshness.</p><div className="quality-tags">{["Sourcing", "Hygiene", "Processing", "Storage", "Delivery"].map(tag => <span key={tag}>{tag}</span>)}</div></div><img className="quality-photo" src={siteImages.quality} alt="Gloved hands attending to fresh fish during professional seafood handling" loading="lazy" width={1200} height={1008} /></div><ProcessSection /></div></section>;
}

export function WhyChooseUs() {
  const reasons = [["40 Years of Experience", "Four decades of seafood industry knowledge and practical expertise."], ["Consistent Quality", "Careful sourcing, handling and processing to maintain dependable product quality."], ["Professional Standards", "Operations aligned with recognized food safety and quality standards."], ["Trusted Relationships", "Long-standing relationships with customers across hospitality, catering, retail and institutional sectors."], ["Customer Focus", "Attention to individual customer requirements and expectations."]];
  return <section id="our-story" className="section-space"><div className="shell why-layout"><div className="why-heading"><div className="eyebrow">Why Al Tayyibath</div><h2>Experience in seafood.<br />Dependable supply.</h2><Coastline /></div><div>{reasons.map(([heading, copy], index) => <article className="reason" key={heading}><span className="reason-num">0{index + 1}</span><div><h3>{heading}</h3><p>{copy}</p></div></article>)}</div></div></section>;
}

export function Certifications() {
  const seals = [[brandImages.haccp, "HACCP CERTIFIED"], [brandImages.iso9001, "ISO 9001"], [brandImages.iso22000, "ISO 22000"], [brandImages.icv, "ICV CERTIFIED"]];
  return <section className="section-space certifications" aria-labelledby="cert-heading"><div className="shell"><div className="eyebrow">Recognized standards</div><h2 id="cert-heading">Food safety and quality standards.</h2><p>Our commitment to quality, food safety and responsible business practices is reflected through recognized certifications and standards.</p><div className="cert-grid">{seals.map(([image, label]) => <div className="cert-item" key={label}><div className="cert-artwork"><img src={image} alt={`${label} — client-provided certification logo`} loading="lazy" width={200} height={200} /></div><span>{label}</span></div>)}</div></div></section>;
}

export function VisionMission() {
  return <section className="section-space"><div className="shell"><div className="vision-grid"><div><div className="eyebrow">Our Vision</div><h2>To be the most trusted seafood company by offering every customer superior quality products and impeccable service.</h2></div><div><div className="eyebrow">Our Mission</div><h2>To consistently provide high-quality seafood through committed people, smart technology and a relentless focus on customer satisfaction.</h2></div></div><div className="values" aria-label="Our values">{["Sincerity", "Commitment", "Honesty", "Social Responsibility", "Service Orientation", "Care", "Responsibility"].map(value => <span key={value}>{value}</span>)}</div></div></section>;
}

export function ContactCTA() {
  return <section id="contact" className="section-space contact"><div className="shell contact-main"><div><div className="eyebrow">Let’s talk seafood</div><h2>Looking for a trusted seafood partner?</h2><p>Talk to Al Tayyibath Fish Trading Company LLC about your seafood requirements.</p><div className="contact-actions"><Button asChild><a href="tel:+971505663756"><Phone />Call Us <ArrowRight /></a></Button><Button asChild variant="outline" className="border-rule bg-transparent text-ivory hover:bg-marine hover:text-ivory"><a href="mailto:sales@altayyibathfish.com"><Mail />Send an Email</a></Button></div></div><div className="contact-details"><div><span className="contact-label">Call us</span><a href="tel:+97125583786">02 558 3786</a><a href="tel:+971505663756">050 566 3756</a><a href="tel:+971527810412">052 781 0412</a></div><div><span className="contact-label">Email us</span><a href="mailto:sales@altayyibathfish.com">sales@altayyibathfish.com</a><a href="mailto:tayyibath@gmail.com">tayyibath@gmail.com</a></div><div className="contact-address"><span className="contact-label">Visit us</span><address>M41, ICAD-1, Musaffah, Abu Dhabi, UAE</address><a href="https://www.altayyibathfish.com" className="mt-3">www.altayyibathfish.com</a></div></div></div></section>;
}

export function Footer() {
  return <footer className="footer"><div className="shell"><div className="footer-top"><div className="footer-brand"><Wordmark footer /><p>Quality seafood. Trusted service. Since 1986.</p></div><nav className="footer-links" aria-label="Footer navigation">{navigation.map(([name, id]) => <a key={id} href={`#${id}`}>{name}</a>)}</nav><div className="footer-contacts"><div className="footer-contact-group"><span className="footer-contact-label">Email</span><a href="mailto:sales@altayyibathfish.com">sales@altayyibathfish.com</a><a href="mailto:tayyibath@gmail.com">tayyibath@gmail.com</a></div><div className="footer-contact-group"><span className="footer-contact-label">Phone</span><a href="tel:+97125583786">02 558 3786</a><a href="tel:+971505663756">050 566 3756</a><a href="tel:+971527810412">052 781 0412</a></div><div className="footer-contact-group"><span className="footer-contact-label">Visit</span><address>M41, ICAD-1, Musaffah, Abu Dhabi, UAE</address><a href="https://www.altayyibathfish.com">www.altayyibathfish.com</a></div></div></div><div className="footer-bottom"><span>© 2026 Al Tayyibath Fish Trading Company LLC. All Rights Reserved.</span><Coastline /></div></div></footer>;
}
