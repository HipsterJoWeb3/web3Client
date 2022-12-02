import React, {useState} from 'react'
import {useRouter}  from "next/router";
import { NextPage} from "next";
import {useAppSelector, wrapper} from "../redux/store";
import dynamic from "next/dynamic";
const Animation = dynamic(() => import('../components/Animation'), {ssr: false})

import MyHead from "../components/Head";
import { useUploadStore} from "../hooks/useStore";
import TextArticle from "../components/articlePage/TextArticle";
import {userData} from "../redux/users/slice";
import MyButton from "../UI/buttons/MyButton";
import Edit from "../assets/iconsComponent/Edit";
import AdminPagesAdd from "../components/adminPage/chapters/AdminPagesAdd";
import {useGetCookie} from "../hooks/useAuth";

export interface CustomPageProps {
    pages: any,
    type: string
}

const CustomPage: NextPage<CustomPageProps> = ({ pages, type}) => {

    const router = useRouter()
    const {query} = router
    const page = pages.find((page: any) => page.route === `/${query.page}`)
    const {user} = useAppSelector(userData)


    return (
        <>

            {
                   page && page.content
                   ?
                   <>
                       {
                            type === 'edit'
                            ?
                                <div className="page-container">
                                    <AdminPagesAdd
                                        id={page._id}
                                        edit
                                        titleProp={page.value}
                                        descriptionProp={page.description}
                                        contentProp={page.content}
                                        routeProp={page.route}
                                    />
                                </div>

                                :
                                <>
                                    <MyHead title={page.value} description={page.description}/>
                                    <div className="gap20 fdc page-container article-content__text">
                                        <h2 className="label">{page.value}</h2>
                                        <TextArticle text={page.content} />
                                        {
                                            user?._id &&
                                            <MyButton setValue={() => router.push(`${page.route}?type=edit`)}><Edit /><span>Edit</span></MyButton>
                                        }
                                    </div>
                                </>
                       }
                   </>
                   :
                       <div className="d-flex jcc aic">
                            <Animation
                                label="404"
                                subtitle={`Page ${query.page} not found`}
                                link={{url: '/', text: 'Go to home page'}}
                            />
                       </div>
               }


        </>
    )
}

CustomPage.getInitialProps = wrapper.getInitialPageProps(store => async (data) => {

    const tokenValue1 = useGetCookie('token')
    // @ts-ignore
    const tokenValue2 = data.req?.cookies.token

    const token = tokenValue1 || tokenValue2
    await useUploadStore(store, token)
    const {type} = data.query

    const {pages} = store.getState().pages

    return {
        pages,
        type
    }
})





export default CustomPage