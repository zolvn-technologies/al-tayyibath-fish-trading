import { useEffect, type RefObject } from "react";

export function useMenuScrollLock(open: boolean, header: RefObject<HTMLElement | null>, close: () => void) {
  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const html = document.documentElement;
    const x = window.scrollX;
    const y = window.scrollY;
    const previousBody = body.getAttribute("style");
    const previousBehavior = html.style.scrollBehavior;
    const previousOverflow = html.style.overflow;
    const gutter = window.innerWidth - html.clientWidth;
    const background = [...document.querySelectorAll<HTMLElement>("main, footer")];
    const inertStates = background.map(element => element.inert);
    background.forEach(element => { element.inert = true; });
    body.dataset["menuLocked"] = "true";
    Object.assign(body.style, { position: "fixed", top: `-${y}px`, left: `-${x}px`, width: "100%", overflow: "hidden", paddingRight: `${gutter}px` });
    html.style.overflow = "hidden";
    const toggle = header.current?.querySelector<HTMLElement>(".mobile-toggle");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); close(); toggle?.focus(); }
      if (event.key !== "Tab") return;
      const controls = [...(header.current?.querySelectorAll<HTMLElement>('a[href], button') ?? [])].filter(element => element.getClientRects().length > 0);
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    const preventBackgroundTouch = (event: TouchEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest(".mobile-menu")) event.preventDefault();
    };
    const onResize = () => { if (window.innerWidth >= 768) close(); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("touchmove", preventBackgroundTouch, { passive: false });
    window.addEventListener("resize", onResize);
    header.current?.querySelector<HTMLElement>(".mobile-menu a")?.focus({ preventScroll: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("touchmove", preventBackgroundTouch);
      window.removeEventListener("resize", onResize);
      background.forEach((element, index) => { element.inert = inertStates[index] ?? false; });
      if (previousBody === null) body.removeAttribute("style"); else body.setAttribute("style", previousBody);
      delete body.dataset["menuLocked"];
      html.style.overflow = previousOverflow;
      html.style.scrollBehavior = "auto";
      window.scrollTo(x, y);
      html.style.scrollBehavior = previousBehavior;
    };
  }, [open, header, close]);
}