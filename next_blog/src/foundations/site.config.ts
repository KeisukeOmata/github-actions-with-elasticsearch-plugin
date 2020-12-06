export const Config = {
  siteMeta: {
    title: 'Blog',
    copyright: 'Keisuke Omata',
    description: 'Blog using ISR(Incremental Static Regeneration).',
  },
  siteRoot:
    process.env.NODE_ENV === 'production'
      ? 'https://next-blog-navy.vercel.app'
      : 'http://localhost:3000',
  headerLinks: [
    // {
    //   title: "About",
    //   href: "/about",
    // },
    {
      title: 'Twitter',
      href: 'https://twitter.com/mete0la',
    },
    {
      title: 'GitHub',
      href: 'https://github.com/KeisukeOmata/next_blog',
    },
  ],
}
