import React, {useEffect, useRef, useState} from 'react'
import {NextPage} from "next";
import {wrapper} from "../../redux/store";
import ArticleAuthor from "../../components/articlePage/ArticleAuthor";
import {getFormattedDate} from "../../hooks/useDate";
import ArticleShare from "../../components/articlePage/ArticleShare";
import {fetchPost} from "../../asyncActions/posts";
import {useUploadStore} from "../../hooks/useStore";
import CreatePost from "../../components/adminPage/chapters/CreatePost";
import TextArticle from "../../components/articlePage/TextArticle";
import ArticleAnchor from "../../components/articlePage/ArticleAnchor";

import Image from 'next/image'
import {useGetCookie} from "../../hooks/useAuth";


function ScrollToTop() {
    return null;
}

const Post: NextPage = (props: any) => {
    const {post, type} = props
    const articleRef = useRef<any>()
    const [indexAnchor, setIndexAnchor] = useState(-1)

    const [anchor, setAnchor] = useState<any>(null)


    useEffect(() => {
        if(type !== 'edit') {
            const heading = Array.from(articleRef.current.getElementsByTagName('h2', 'h1')).map(el => { return {el, name: el['innerText']} })
            setAnchor(heading)

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {

                        setIndexAnchor(heading?.findIndex(el => el.name == entry.target['innerText']))
                    }
                })
            })

            const targets = articleRef.current.querySelectorAll('h2, h3, h4, h5, h6')
            targets.forEach((target: any) => {
                observer.observe(target)

            })




            return () => observer.disconnect();
        }

    }, [])


    return (
        <>
            <ScrollToTop />
            {type === 'edit' ?
                <CreatePost edit={true} post={post}></CreatePost>
                :
                <>
                    {post && <div className="article-wrap">
                        <h1 className="article-label label">{post.title}</h1>
                        <div className="article">
                            <div className="article-content">
                                <ArticleAuthor author={post.author} date={getFormattedDate(post.createdAt)}/>

                                <div className="article-content__post">
                                    {
                                        post?.imageUrl &&
                                        <div className="article-content__post-image">
                                            <Image
                                                src={post?.imageUrl}
                                                alt="post"
                                                width="100%"
                                                height="400px"
                                                objectFit="cover"
                                                objectPosition={'center'}
                                                layout="fill"
                                                loader={({src}) => src}

                                            />
                                        </div>
                                    }
                                    <div ref={articleRef} className="article-content__text">
                                        <TextArticle text={post.text} />
                                    </div>
                                </div>

                            </div>
                            <div className="article-content__sidebar">
                                <div className="article-content__sidebar-inner">
                                    <ArticleAnchor anchor={anchor} index={indexAnchor}/>
                                    <ArticleShare id={post?._id} tags={post?.tags}/>
                                </div>
                            </div>
                        </div>
                    </div>}
                </>
            }

        </>
    )
}




Post.getInitialProps = wrapper.getInitialPageProps(store => async (data) => {
    const {id} = data.query
    const {type} = data.query

    const tokenValue1 = useGetCookie('token')
    // @ts-ignore
    const tokenValue2 = data.req?.cookies.token

    const token = tokenValue1 || tokenValue2
    await useUploadStore(store, token)

    const post = await fetchPost(id)


    return {
        post,
        type
    }
})


export default Post