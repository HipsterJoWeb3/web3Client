import MainSection from "../components/mainPage/MainSection";
import {useAppSelector, wrapper} from "../redux/store";
import {GetServerSideProps, GetStaticProps} from "next";

import ArticlesWrap from "../components/ArticlesWrap";
import latest from '../assets/img/latest.svg'
import popular from '../assets/img/popular.svg'
import {useMemo, useState} from "react";

import MyHead from "../components/Head";
import { useUploadStore} from "../hooks/useStore";
import dynamic from "next/dynamic";
import {fetchPosts} from "../asyncActions/posts";
import {setPosts} from "../redux/posts/slice";
import {useGetCookie} from "../hooks/useAuth";
const Animation = dynamic(() => import('../components/Animation'), {ssr: false})



const Home = ({posts, chapters, general}) => {
    const items = useMemo(() => posts, [posts])





    const metaSeo = useMemo(() => {
        return {
            title: general?.title,
            description: general?.description,
            keywords: general?.keywords,
        }
    }, [general])




    const recentChapters = useMemo(() => chapters.filter(el => el.showRecent), [chapters])
    const popularChapters = useMemo(() => chapters.filter(el => el.showPopular), [chapters])






    return (
        <>
            <MyHead title={metaSeo.title} description={metaSeo.description} keywords={metaSeo.keywords}/>
            <Animation
                label="v3v"
                subtitle="web 3 is the future"
            />


            {
                recentChapters?.map((el, index) =>
                    (items && <ArticlesWrap
                        items={items.filter(item => item.chapter === el?._id)?.sort((a, b) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime())?.splice(0, 6)}
                        title={`Recent ${el?.value}`}
                        iconUrl={latest}
                        orientationType={'grid'}
                        key={index}
                        url={`/posts?type=recent&chapter=${el?.value}`}/>)

                )
            }

            {
                popularChapters?.map((el, index) =>
                    (items && <ArticlesWrap
                        items={items.filter(item => item.chapter === el?._id)?.sort((a, b) => b.views - a.views)?.splice(0, 6)}
                        title={`Recent ${el?.value}`}
                        iconUrl={popular}
                        orientationType={'grid'}
                        key={index}
                        url={`/posts?type=popular&chapter=${el?.value}`}
                    />)
                )
            }

        </>

    )
}



Home.getInitialProps = wrapper.getInitialPageProps(store => async (data) => {
    const tokenValue1 = useGetCookie('token')
    // @ts-ignore
    const tokenValue2 = data.req?.cookies.token



    const token = tokenValue1 || tokenValue2


    await useUploadStore(store, token)


    const {chapters} = await store.getState().chapters
    const {general} = await store.getState().general

    const searchPosts = await fetchPosts({ limit: '40'})
    await store.dispatch(setPosts(searchPosts))

    const {posts} = await store.getState().posts


    return {
        posts,
        chapters,
        general
    }
})





export default Home

