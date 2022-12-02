import Card from './Card'
import { useMemo } from 'react'




const Articles = ({orientation, items}) => {
  const list = orientation === 'list'


  const dividedByThree = useMemo(() => {
    return [
      items.filter((_, i)=>i % 3 == 0),
      items.filter((_, i)=>i % 3 == 1),
      items.filter((_, i)=>i % 3 == 2)
    ]
  }, [items])


  const dividedByTwo = useMemo(() => {
    return [
      items.filter((_, i)=>i % 2 == 0),
      items.filter((_, i)=>i % 2 != 0)
    ]
  }, [items])





  return (
    <div className={`articles-content ${list ? 'list' : ''}`}>
    {
      list
      ?
      <div className="articles-content__column">
        {
          items && items.map(article =>
            <Card orientation={orientation} key={article._id} postData={article}/>
          )
        }
      </div>
      :
      <>
      {
        dividedByThree && dividedByThree.map((articles, i) =>
          <div className="articles-content__column full-page" key={i}>
            {
              articles.map(article =>
                <Card orientation={orientation} key={article._id} postData={article}/>
              )
            }
          </div>
        )


      }

      {
        dividedByTwo && dividedByTwo.map((articles, i) =>
          <div className="articles-content__column mobile-page" key={i}>
            {
              articles.map(article =>
                <Card orientation={orientation} key={article._id} postData={article}/>
              )
            }
          </div>
        )
      }

      </>

    }
    </div>
  )
}

export default Articles
