import { useEffect } from "react";

export function ScrollReveals() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !("IntersectionObserver" in window)) return;
    const elements = [...document.querySelectorAll<HTMLElement>("main section:not(.hero) .eyebrow, main section:not(.hero) h2, main section:not(.hero) p, .about-photo, .quality-photo, .category-photo, .category-heading, .cert-item, .vision-grid > div, .contact-details > div, .reason")];
    const targets = elements.filter(element => !elements.some(parent => parent !== element && parent.contains(element)));
    let observer: IntersectionObserver | undefined;
    const showAll = () => targets.forEach(element => element.classList.add("is-visible"));
    try {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer?.unobserve(entry.target); }
        });
      }, { threshold: 0.08 });
      targets.forEach(element => {
        element.classList.add("first-reveal");
        if (element.getBoundingClientRect().top < window.innerHeight) element.classList.add("is-visible");
        observer?.observe(element);
        element.classList.add("reveal-ready");
      });
    } catch { showAll(); }
    media.addEventListener("change", showAll);
    return () => { observer?.disconnect(); media.removeEventListener("change", showAll); targets.forEach(element => element.classList.remove("first-reveal", "reveal-ready", "is-visible")); };
  }, []);
  return null;
}