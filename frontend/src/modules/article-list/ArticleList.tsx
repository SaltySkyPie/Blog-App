import { GetArticlesQuery, useGetArticlesQuery } from '@app/graphql/types'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const ArticleList = () => {
  const { t } = useTranslation()
  const { data, loading, error } = useGetArticlesQuery()

  if (loading) return <p>{t('common.loading')}</p>
  if (error) return <p>{t('common.error')}</p>

  const articles = data?.articles || []

  return (
    <>
      <h1>{t('articleList.title')}</h1>
      <ul>
        {articles.map((article: GetArticlesQuery['articles'][0]) => (
          <li key={article.id}>
            <Link to={`/article/${article.id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ArticleList
