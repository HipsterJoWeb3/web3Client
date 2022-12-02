import Link from 'next/link'

const ArticleAuthor = ({author, date}) => {


  return (
    <div className="article-content__author d-flex jcb aic">
      <div className="author">
        <div className="author-avatar" style={{backgroundImage: `url(${author?.imageUrl})`}}></div>
        <span>by <Link href={`/posts?author=${author?.username}`}><a>@{author?.username}</a></Link></span>
      </div>
      <div className="date">{date}</div>
    </div>
  )
}

export default ArticleAuthor
