export const siteConfig = {
  profile: {
    name: "Nishu Murmu",
    brand: "_Gliches_",
  },
  seo: {
    title: "Nishu Murmu | _Gliches_",
  },
  navigation: {
    blogsLabel: "Blogs",
  },
  footer: {
    rightsText: "All rights reserved.",
    builtWithLabel: "Built with",
    frameworkName: "Astro",
    frameworkUrl: "https://astro.build",
  },
  blog: {
    title: "Blogs",
    description: "Thoughts on code, tools, and building things.",
    postsPerPage: 10,
    emptyState: "No posts yet. Check back soon!",
  },
} as const;
