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
    title: 'createArticle',
    link: '/article/create',
  },
  {
    title: 'myArticles',
    link: '/my-articles',
  },
]
