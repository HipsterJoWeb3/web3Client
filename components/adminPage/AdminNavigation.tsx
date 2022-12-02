import ButtonList from '../ButtonList'



const AdminNavigation = ({chapterList, indexNavigation}) => {



  return (
    <div className="admin-navigation">
      <ButtonList index={indexNavigation} items={chapterList} />
    </div>
  )
}

export default AdminNavigation

