

import ArticlesFilter from '../../components/ArticlesFilter'
import Articles from '../../components/Articles'
import Options from '../../components/Options'

import React, {useEffect, useState} from 'react'

import {NextPage} from "next";
import {wrapper} from "../../redux/store";

import MyHead from "../../components/Head";
import {useUploadStore} from "../../hooks/useStore";

import {fetchPosts} from "../../asyncActions/posts";
import {setPosts} from "../../redux/posts/slice";
import {getPostsByParams} from "../../hooks/usePosts";

import {ToastContainer} from "react-toastify";
import {useRouter} from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import {useGetCookie} from "../../hooks/useAuth";






export interface PostsProps {
    posts: any
    limit: string
    totalCount: number
    tags?: string
    author?: string
    search?: string
    type?: string
    chapter?: string
}

const PostsPage: NextPage<PostsProps> = ({posts, limit, totalCount, search, chapter, type, author, tags}) => {

    const [orientation, setOrientation] = useState('grid')

    const router = useRouter()
    const setPostsOrientation = (_, value) => setOrientation(value)


    return (
        <>
            <MyHead></MyHead>
            <h1 className="label">
                {
                    router.query.author ? `Posts by ${router.query.author}` :
                        router.query.tags ? `Posts by tag ${router.query.tags}` :
                            router.query.chapter ? `Posts by chapter ${router.query.chapter}` :
                                router.query.search ? `Posts by search ${router.query.search}` :
                                    'Posts'

                }
            </h1>
            <ArticlesFilter />
            <div className={`articles`}>
                {
                    posts?.length
                    ?
                        <Articles orientation={orientation} items={posts} />


                    :
                     <div className="d-flex jcc aic gap20">
                            <h2 className="label">Posts not founded.</h2>
                     </div>
                }
                <Options orientation={orientation} setOrientation={setPostsOrientation}/>
            </div>
            <ToastContainer closeButton={true} />
        </>
    )
}

PostsPage.getInitialProps = wrapper.getInitialPageProps(store => async (data) => {
    const chapter = data.query.chapter
    const tags = data.query.tags
    const author = data.query.author
    const search = data.query.search
    const type = data.query.type


    const tokenValue1 = useGetCookie('token')
    // @ts-ignore
    const tokenValue2 = data.req?.cookies.token

    const token = tokenValue1 || tokenValue2



    await useUploadStore(store, token)

    const {chapters} = store.getState().chapters

    const chapterId = chapters?.find(el => el.value === chapter)?._id

    const limit = '60'
    const offset = '1'


    const searchPosts = await fetchPosts({chapter: chapterId, limit, tag: tags, author, search, type})
    await store.dispatch(setPosts(searchPosts))

    const {posts} = await store.getState().posts



    const returnedPosts = await getPostsByParams({limit, offset, type, author, chapter:chapterId, tag:tags, posts, search})

    return {
        posts: returnedPosts?.filter(item => !item?.hidden),
        query: data.query,
        limit,
        totalCount: posts?.totalCount,
        tags,
        author,
        search,
        type,
        chapter
    }
})

export default PostsPage
