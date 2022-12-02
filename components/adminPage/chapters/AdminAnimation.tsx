import React, {useState} from "react";
import AdminCard from "../AdminCard";
import MyButton from "../../../UI/buttons/MyButton";
import Add from "../../../assets/iconsComponent/Add";
import AnimationSidebar from "../sidebars/AnimationSidebar";
import Delete from "../../../assets/iconsComponent/Delete";
import {animationAction, animationText, deleteAnimation, hideAnimation} from "../../../hooks/useGeneral";
import Hide from "../../../assets/iconsComponent/Hide";
import Edit from "../../../assets/iconsComponent/Edit";
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import {generalData, setGeneral, updateGeneralSlice} from "../../../redux/general/slice";
import {setPosts} from "../../../redux/posts/slice";


const AdminAnimation: React.FC = () => {
    const dispatch = useAppDispatch()
    const { general } = useAppSelector(generalData)
    const generalState = {...general}

    const animText = animationText(generalState)
    const [animTextData, setAnimTextData] = useState(animText)
    const [currentAnimation, setCurrentAnimation] = useState(animTextData[0]._id)
    const [addMode, setAddMode] = useState(false)

    const [inputValue, setInputValue] = useState(animTextData[0].label)
    const [textareaValue, setTextareaValue] = useState(animTextData[0].text)
    const buttonData = [
        {title: 'Delete', Icon: Delete, callback: () => deleteAnimationData()},
        {title: animTextData.find(el => el._id === currentAnimation)?.hidden ? 'Show' : 'Hide', Icon: Hide, callback: () => hideAnimationData()},
        {title: addMode ? 'Add item' : 'Edit item', Icon: addMode ? Add : Edit , callback: () => animationActionData()

        },
    ]



    const animationActionData = async () => {
        const data = await animationAction(addMode, inputValue, textareaValue, generalState, setCurrentAnimation, setAnimTextData, setAddMode, currentAnimation)
        if (data) {
            dispatch(updateGeneralSlice(data))
        }
    }

    const hideAnimationData = async () => {
        const data = await hideAnimation(generalState, currentAnimation, animTextData, setAnimTextData)
        if (data) {
            dispatch(updateGeneralSlice(data))
        }
    }

    const deleteAnimationData = async () => {
        const data = await deleteAnimation(animTextData, generalState, currentAnimation, setCurrentAnimation, setInputValue, setTextareaValue, setAnimTextData)
        if (data) {
            dispatch(updateGeneralSlice(data))
        }
    }

    const changeAnimation = (_, item) => {
        setCurrentAnimation(item)
        setInputValue(animTextData.find(el => el._id === item)?.label)
        setTextareaValue(animTextData.find(el => el._id === item)?.text)
        setAddMode(false)
    }

    const addAnimItem = () => {
        setAddMode(true)
        setCurrentAnimation('')
        setInputValue('')
        setTextareaValue('')
    }

    return (
        <>
            <div className="admin-content__block">
                <h1 className="label">
                    Animation
                </h1>
                <div className="admin-list__wrap ">
                    <div className="admin-list">
                        {
                            animTextData.map((item, i) =>
                                <AdminCard key={item.title} focus={item._id === currentAnimation} cardData={item}  value={item._id} setValue={changeAnimation} actionCard="Visible" />
                            )
                        }
                        <MyButton active={addMode} setValue={addAnimItem}><Add/><span>Add item</span></MyButton>
                    </div>

                </div>
            </div>
            <div className="admin-content__block">
                <h1 className="label">
                    Statements animation
                </h1>
                <AnimationSidebar
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    textareaValue={textareaValue}
                    setTextareaValue={setTextareaValue}
                    buttonData={buttonData}
                    sidebarTitle={addMode ? 'Add animation item' : 'Edit animation item'}
                />
            </div>
        </>
    )
}


export default AdminAnimation
