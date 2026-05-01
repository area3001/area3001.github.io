import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type RouteSeo = {
  title: string;
  description: string;
};

const DEFAULT_SEO: RouteSeo = {
  title: "Welcome to Area 3001 | Hackerspace Leuven",
  description: "This is the official home of Area 3001 - a hackerspace in Leuven",
};

const ROUTE_SEO: Record<string, RouteSeo> = {
  "/": {
    title: "Welcome to Area 3001 | Hackerspace Leuven",
    description: "This is the official home of Area 3001 - a hackerspace in Leuven",
  },
  "/projects": {
    title: "Projects | Area3001",
    description:
      "Browse Area3001 projects and repositories, from embedded experiments to IoT and open hardware builds.",
  },
  "/about": {
    title: "About | Area3001",
    description:
      "Learn what Area3001 is: a hackerspace in Leuven where like-minded makers collaborate on projects and ideas.",
  },
  "/contact": {
    title: "Contact | Area3001",
    description:
      "Get in touch with Area3001 and share your project ideas through our terminal-style contact flow.",
  },
};

function ensureMeta(selector: string, attribute: "name" | "property", key: string): HTMLMetaElement {
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  if (existing) {
    return existing;
  }

  const tag = document.createElement("meta");
  tag.setAttribute(attribute, key);
  document.head.appendChild(tag);
  return tag;
}

function ensureLink(selector: string, rel: string): HTMLLinkElement {
  const existing = document.head.querySelector<HTMLLinkElement>(selector);
  if (existing) {
    return existing;
  }

  const tag = document.createElement("link");
  tag.setAttribute("rel", rel);
  document.head.appendChild(tag);
  return tag;
}

export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = ROUTE_SEO[pathname] ?? DEFAULT_SEO;
    const url = new URL(pathname, window.location.origin).toString();

    document.title = seo.title;

    ensureMeta('meta[name="description"]', "name", "description").content = seo.description;
    ensureMeta('meta[name="robots"]', "name", "robots").content =
      "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

    ensureMeta('meta[property="og:type"]', "property", "og:type").content = "website";
    ensureMeta('meta[property="og:site_name"]', "property", "og:site_name").content = "Area3001";
    ensureMeta('meta[property="og:title"]', "property", "og:title").content = seo.title;
    ensureMeta('meta[property="og:description"]', "property", "og:description").content = seo.description;
    ensureMeta('meta[property="og:url"]', "property", "og:url").content = url;
    ensureMeta('meta[property="og:image"]', "property", "og:image").content =
      new URL("/images/logo_patch.png", window.location.origin).toString();
    ensureMeta('meta[property="og:image:alt"]', "property", "og:image:alt").content =
      "Area3001 retro terminal style logo";

    ensureMeta('meta[name="twitter:card"]', "name", "twitter:card").content = "summary_large_image";
    ensureMeta('meta[name="twitter:title"]', "name", "twitter:title").content = seo.title;
    ensureMeta('meta[name="twitter:description"]', "name", "twitter:description").content = seo.description;
    ensureMeta('meta[name="twitter:image"]', "name", "twitter:image").content =
      new URL("/images/logo_patch.png", window.location.origin).toString();

    ensureLink('link[rel="canonical"]', "canonical").href = url;
  }, [pathname]);

  return null;
}
