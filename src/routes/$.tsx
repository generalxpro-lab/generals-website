import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Coming Soon | Shanzen Enterprises" },
      {
        name: "description",
        content:
          "This Shanzen Enterprises page is still being built. Browse our grocery, household and general merchandise catalog in the meantime.",
      },
      { property: "og:title", content: "Coming Soon | Shanzen Enterprises" },
      {
        property: "og:description",
        content: "This page is still being built — browse the catalog in the meantime.",
      },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ComingSoon />,
});
