export interface Page {
  title: string
  link: string
}

export const pages: Page[] = [
  {
    title: 'recentArticles',
    link: '/',
  },
  {
    title: 'about',
    link: '/about',
  },
]
export const settings: Page[] = [
  {
    title: 'profile',
    link: '/profile',
  },
  {
    title: 'createArticle',
    link: '/create-article',
  },
  {
    title: 'myArticles',
    link: '/my-articles',
  },
]
