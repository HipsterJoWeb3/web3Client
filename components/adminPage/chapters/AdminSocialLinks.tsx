import React, {useState} from "react";
import AdminCard from "../AdminCard";
import MyButton from "../../../UI/buttons/MyButton";
import Add from "../../../assets/iconsComponent/Add";
import SocialLinksSidebar from "../sidebars/SocialLinksSidebar";
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import {generalData, updateGeneralSlice} from "../../../redux/general/slice";
import {
    addSocialLink,
    deleteSocialLink,
    socialLinks,
    updateSocialLink
} from "../../../hooks/useGeneral";
import Delete from "../../../assets/iconsComponent/Delete";
import Edit from "../../../assets/iconsComponent/Edit";


const AdminSocialLinks: React.FC = () => {
    const dispatch = useAppDispatch()
    const { general } = useAppSelector(generalData)


    const social = socialLinks(general)
    const [linksData, setLinksData] = useState(social)
    const [addMode, setAddMode] = useState(false)




    // social links state
    const [currentSocialId, seCurrentSocialId] = useState(social[0]._id)
    const [socialTitle, setSocialTitle] = useState(social[0].title)
    const [socialUrl, setSocialUrl] = useState(social[0].href)
    const buttonDataSocial = [
          {title: 'Delete', Icon: Delete, callback: () => deleteSocialLinkData()},
          {title: addMode ? 'Add item' : 'Edit item', Icon: addMode ? Add : Edit , callback: () => {
              addMode ? addSocialLinkData() : updateSocialLinkData()
          }},
    ]

    const changeSocialLinks = (_, item) => {
        seCurrentSocialId(item)
        setSocialTitle(linksData.find(el => el._id === item)?.title)
        setSocialUrl(linksData.find(el => el._id === item)?.href)
        setAddMode(false)
    }

    const addAnimItem = () => {
        setAddMode(true)
        seCurrentSocialId('')
        setSocialTitle('')
        setSocialUrl('')
    }

    const deleteSocialLinkData = async () => {
        const data = await deleteSocialLink(setLinksData, general,linksData, currentSocialId, setSocialTitle, setSocialUrl)
        if (data) {
            dispatch(updateGeneralSlice(data))
        }
    }

    const addSocialLinkData = async () => {
        const data = await addSocialLink(socialTitle, socialUrl, setLinksData, general)
        if (data) {
            dispatch(updateGeneralSlice(data))
        }
    }

    const updateSocialLinkData = async () => {
        const data = await updateSocialLink(socialTitle, socialUrl, setLinksData, linksData, general, currentSocialId)
        if (data) {
            dispatch(updateGeneralSlice(data))
        }
    }



    return (
        <>
            <div className="admin-content__block">
                <h1 className="label">
                    Sociable links
                </h1>
                <div className="admin-list__wrap">
                    <div className="admin-list">
                        {
                            linksData.map((item, i) =>
                                <AdminCard key={item.title} cardData={item} focus={item._id === currentSocialId}  value={item._id} setValue={changeSocialLinks}  />
                            )
                        }
                        <MyButton active={addMode} setValue={addAnimItem}><Add/><span>Add link</span></MyButton>
                    </div>
                </div>

            </div>

            <div className="admin-content__block">
                <h1 className="label">
                    Social links
                </h1>
                <SocialLinksSidebar
                    socialTitle={socialTitle}
                    setSocialTitle={setSocialTitle}
                    socialUrl={socialUrl}
                    setSocialUrl={setSocialUrl}
                    buttonDataSocial={buttonDataSocial}
                />
            </div>
        </>
    )
}

export default AdminSocialLinks