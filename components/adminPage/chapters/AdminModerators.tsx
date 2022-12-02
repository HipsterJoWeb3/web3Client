import MyInput from '../../../UI/inputs/MyInput'
import iconSearch from '../../../assets/img/search.svg'

import AdminCard from '../AdminCard'
import ModeratorsSidebar from '../sidebars/ModeratorsSidebar'
import {useAppSelector} from "../../../redux/store";
import {userData} from "../../../redux/users/slice";
import { useMemo, useState} from "react";
import ScrollWrap from "../../ScrollWrap";


const AdminModerators = () => {
  const {users} = useAppSelector(userData)
  const [searchModer, setSearchModer] = useState('')

  const updatedModer = useMemo(() => {
      let filterModer = users.map(user => {
          return {
              ...user,
              roles: user.roles.map(role => role.value),
              title: user.username,
              link: `/posts?author=${user.username}`,
              image: user.imageUrl,
              date: user.createdAt,
          }
      }).filter(user => user.roles.includes('MODER'))

      if (searchModer.length > 3) {
          filterModer = filterModer.filter(user => user.username.toLowerCase().includes(searchModer.toLowerCase()))
      }

      return filterModer
  }, [users, searchModer])


    const [currentUserId, setCurrentUserId] = useState(updatedModer[0]?._id)

    const changeCurrentUserId = (e, value, _) => {
        setCurrentUserId(value)
    }


    const searchModerator = (e) => {
      setSearchModer(e.target.value)
    }



  return (

    <div className="admin-content__wrap mobile-reverse">
      <div className="admin-content middle">
        <h1 className="label">Moderators</h1>
        <div className="admin-list__wrap">
          <div className="admin-list__header d-flex jcb aic">
            <div className="admin-list__count">Count: <span>{updatedModer.length}</span></div>
            <MyInput placeholder={'Search moderator'} iconUrl={iconSearch} value={searchModer} setValue={searchModerator}/>
          </div>
            <div className="admin-list">
                {
                    updatedModer.map(item =>
                        <AdminCard key={item.title} cardData={item} setValue={changeCurrentUserId} value={item._id}/>
                    )
                }
            </div>
        </div>
      </div>
      <ModeratorsSidebar userId={currentUserId} />
    </div>
  )
}

export default AdminModerators
