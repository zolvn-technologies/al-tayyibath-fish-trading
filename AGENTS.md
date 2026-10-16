<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the corporate website as one static index route with reusable section components and hash navigation; no server services are required.
- Centralize photography and supplied branding CDN pointers in the asset module, rendering logos in aspect-preserving fixed-height regions so artwork can be replaced without changing composition.
- Reuse one logo lockup component for navbar and footer, rendering the supplied symbol together with the supplied wordmark artwork instead of typed text, so branding stays consistent.
- Define the brand palette and editorial geometry in global semantic tokens; interactive links use the shared Button component where button presentation is intended.
- Load uploaded font weights through CDN pointers and a local font-face stylesheet, so typography does not depend on external font services.
- Use a shared IntersectionObserver reveal component for non-hero content, excluding buttons and defaulting to visible content for graceful failure and reduced motion.
- Lock mobile navigation with a fixed-body position snapshot, inert background and bounded keyboard focus so iOS scrolling and page-position restoration are reliable.
