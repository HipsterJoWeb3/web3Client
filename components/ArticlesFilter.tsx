import MyButton from '../UI/buttons/MyButton'
import MyInput from '../UI/inputs/MyInput'

import Popular from '../assets/iconsComponent/Popular'
import Recent from '../assets/iconsComponent/Recent'

import searchIcon from '../assets/img/search.svg'
import debounce from 'lodash.debounce'

import {useRouter} from 'next/router'
import {useCallback, useMemo, useState} from "react";

const ArticlesFilter = () => {
  const router = useRouter()
  const {query} = router
  const categoryArticle = query.type === 'undefined' ? 'recent' : query.type

  const sortsLinkByCategory = (type) => {
      if(query.tags) return `/posts?type=${type}&tags=${query.tags}`
      if(query.author) return `/posts?type=${type}&author=${query.author}`
      if(query.chapter) return `/posts?type=${type}&chapter=${query.chapter}`
      if(query.search) return `/posts?type=${type}&search=${query.search}`
      return `/posts?type=${type}&chapter=news`
  }

  const sortLink = useMemo(() => {
      return {
            recent: sortsLinkByCategory('recent'),
            popular: sortsLinkByCategory('popular')
      }
  }, [query])


  const [value, setValue] = useState('')

    const updateSearchValue = useCallback(
        debounce(str => {
            router.push(`/posts?search=${str}&type=${categoryArticle}`)
        }, 250),
        []
    )

    const onChangeInput = e => {
        setValue(e.target.value)
        e.target.value.length > 3 && updateSearchValue(e.target.value)
    }

  return (
    <div className="articles-filter d-flex aic jcb">
      <div className="articles-filter__buttons d-flex">
        <MyButton active={categoryArticle === 'popular'} to={sortLink.popular}><Popular /><span>Popular</span></MyButton>
        <MyButton active={categoryArticle === 'recent'}  to={sortLink.recent}><Recent /><span>Recent</span></MyButton>
      </div>
      <div className="articles-filter__input">
        <MyInput placeholder={'Search'} iconUrl={searchIcon} setValue={onChangeInput} value={value}/>
      </div>

    </div>
  )
}

export default ArticlesFilter
