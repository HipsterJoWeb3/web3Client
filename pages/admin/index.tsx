
import AdminNavigation from '../../components/adminPage/AdminNavigation'
import {NextPage} from "next";
import {useRouter} from 'next/router'
import React, { useMemo, useEffect, useState } from 'react'
import { wrapper} from "../../redux/store";
import {useUploadStore} from "../../hooks/useStore";
import {tabLinksAdmin} from "../../router";
import AdminWebsite from "../../components/adminPage/chapters/AdminWebsite";
import {Users} from "../../@types/users";
import {tabLinks} from "../../hooks/useCustomRoutes";
import {fetchPosts} from "../../asyncActions/posts";
import {setPosts} from "../../redux/posts/slice";
import {useGetCookie} from "../../hooks/useAuth";


export interface AdminPageProps {
    showAdminPage: boolean
    user: Users
}


const AdminPage: NextPage<AdminPageProps> = ({showAdminPage, user}) => {
    const router = useRouter()

    useEffect(() => {
        if(!showAdminPage) {
            router.push('/login')
        }
    }, [])

    const adminNavigation = tabLinks(user).filter(link => link.name !== 'Logout')




    const [indexNavigation, setIndexNavigation] = useState(0)


    const CurrentComponent = useMemo(() => {

        const currentChapter = tabLinksAdmin.filter(item => item.link.split('=')[1] === router.query.chapter)[0]

        setIndexNavigation(adminNavigation.findIndex(item => currentChapter?.name === item.name))
        return !currentChapter ? AdminWebsite : currentChapter.Component
    }, [router.query.chapter])


    return (
        showAdminPage &&
        <div className="admin-wrap">

            <AdminNavigation chapterList={adminNavigation} indexNavigation={indexNavigation}/>

            <CurrentComponent />

        </div>
    )
}


AdminPage.getInitialProps = wrapper.getInitialPageProps(store => async (data) => {



    const tokenValue1 = useGetCookie('token')
    // @ts-ignore
    const tokenValue2 = data.req?.cookies.token

    const token = tokenValue1 || tokenValue2

    await useUploadStore(store, token)
    const searchPosts = await fetchPosts({limit: '100', offset: '1'})
    await store.dispatch(setPosts(searchPosts))
    const {user} = store.getState().users

    const showAdminPage = !!user?._id


    return {
        showAdminPage,
        user
    }
})


export default AdminPage
