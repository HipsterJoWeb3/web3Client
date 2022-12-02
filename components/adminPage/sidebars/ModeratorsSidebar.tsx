import MyButton from '../../../UI/buttons/MyButton'
import Add from '../../../assets/iconsComponent/Add'


import AdminSimpleOption from '../sidebarOptions/AdminSimpleOption'
import AdminActionsOption from '../sidebarOptions/AdminActionsOption'
import AdminAvatarOption from '../sidebarOptions/AdminAvatarOption'
import AdminButtonListOption from '../sidebarOptions/AdminButtonListOption'
import React, {useMemo, useState} from 'react'

import Ban from '../../../assets/iconsComponent/Ban'
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import {postsData} from "../../../redux/posts/slice";
import {banUserInnerSLice, updateUser, userData} from "../../../redux/users/slice";
import {getFormattedDate} from "../../../hooks/useDate";
import {toast, ToastContainer} from "react-toastify";
import {addAdmin, banUser} from "../../../asyncActions/users";

export interface moderatorsSidebarProps {
  userId: string
}

const ModeratorsSidebar: React.FC<moderatorsSidebarProps> = ({userId}) => {

  const dispatch = useAppDispatch()

  const {posts} = useAppSelector(postsData)
  const {users} = useAppSelector(userData)



  const groupButton = posts.filter(post => post?.userId === userId).map((post, i) => {
    return {
      text: post.title.length > 18 ? post.title.slice(0, 18) + '...' : post.title,
      to: `/posts/${post._id}`
    }
  })

  const user = useMemo(() => {
    return users.find(user => user._id === userId)
  }, [users, userId])





  const buttonData = useMemo(() => [
    {title: user?.ban ? 'Unbanned' : 'Banned' , Icon: Ban, callback: async () => user?.ban ? unbannedUser() : bannedUser()},
    {title: 'Create Admin', Icon: Add, callback: () => addAdminModer()},
  ], [ user])

  const addAdminModer = async () => {
    const userData = await addAdmin(user._id)

    await dispatch(updateUser(userData))

    toast.success(`The user ${user.username} is admin.`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: 'toast-popup',
        icon: false,
        closeButton: true,
    })
  }

  const bannedUser = async () => {

    const {username} = await banUser({_id: userId, ban: true})
    await dispatch(banUserInnerSLice({_id: userId, ban: true}))


    toast.success(`User ${username} was banned`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: 'toast-popup',
      icon: false,
      closeButton: true,
    })
  }

  const unbannedUser = async () => {


    const {username} = await banUser({_id: userId, ban: false})
    await dispatch(banUserInnerSLice({_id: userId, ban: false}))

    toast.success(`User ${username} was unbanned`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: 'toast-popup',
      icon: false,
      closeButton: true,

    })
  }

  return (
    <>
      <div className="admin-sidebar">
        <div className="admin-sidebar__buttons d-flex jce">
          <MyButton to={'/admin?chapter=add_moderator'}><Add/><span>Add new moderator</span></MyButton>
        </div>
        <div className="admin-sidebar__options">

          <AdminAvatarOption titleOption={'Moderator info'} username={user?.username} avatarUrl={user?.imageUrl}/>
          <AdminSimpleOption titleOption={'Was created'} text={getFormattedDate(user?.createdAt)}/>
          <AdminButtonListOption titleOption={'Posts created and moderated'} emptyMessage="Posts not created" buttonData={groupButton} />
          <AdminActionsOption buttonData={buttonData} titleOption={'Actions with the moderator'}/>


        </div>
      </div>

      <ToastContainer closeButton={true} />
    </>
  )
}

export default ModeratorsSidebar
