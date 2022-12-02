
import Image from 'next/image'


const AdminAvatarOption = ({titleOption, avatarUrl, username}) => {


  return (
    <div className="admin-sidebar__options-item">
      <h3>{titleOption}</h3>
      <div className="d-flex aic gap20">
          <Image
              alt="avatar"
              src={avatarUrl}
              loader={() => avatarUrl}
              width={80}
                height={80}
              className="admin-sidebar__options-avatar"
              blurDataURL={avatarUrl}
              placeholder="blur"
          />
        <p className="admin-sidebar__options-username">{username}</p>
      </div>
    </div>
  )
}

export default AdminAvatarOption
