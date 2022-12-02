import React, {useState, useMemo, useCallback} from 'react'
import AdminTitleOption from "../sidebarOptions/AdminTitleOption";
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import {chaptersData} from "../../../redux/chapters/slice";
import AdminDropDownList from "../sidebarOptions/AdminDropDownList";
import PreviewPost from "../createPost/PreviewPost";
import {updatePreview} from "../../../asyncActions/posts";
import {toast, ToastContainer} from "react-toastify";
import dynamic from "next/dynamic";
import CreatePostSidebar from "../sidebars/CreatePostSidebar";
import {userData} from "../../../redux/users/slice";
import {createPostHandler, updatePostHandler} from "../../../hooks/usePosts";
import {Post} from "../../../@types/posts";
import {useRouter} from "next/router";
import {updatePostSlice} from "../../../redux/posts/slice";
import {toastSuccess} from "../../../hooks/useModalAndAlert";
const EditorJs = dynamic(() => import('../createPost/Editor'), {ssr: false})


export interface CreatePostProps {
    edit?: boolean,
    post?: Post
}


const CreatePost: React.FC<CreatePostProps> = ({edit, post}) => {
  const dispatch = useAppDispatch()
    // @ts-ignore
  const [dropdownTitle, setDropdownTitle] = useState(edit ? `${post.chapter.value} ↓` : 'Enter type ↓')
  const [title, setTitle] = useState(edit ? post.title : '')
  const {chapters} = useAppSelector(chaptersData)
  const [postImageUrl, setPostImageUrl] = useState(edit ? post.imageUrl : '')
  const [description, setDescription] = useState(edit ? post.description : '')
  const [content, setContent] = useState<any>(post   ? post.text : [])
  const [tags, setTags] = useState( [])
  const postId = edit ? post._id : ''
  const {user} = useAppSelector(userData)
  const router = useRouter()



  const dropdownData = useMemo(() => {
    return chapters.map(category => {
      return {
        name: category.value,
      }

    })
  }, [chapters])

  const uploadPreview = async (e) => {
    const file = e.target.files[0]
    const url = await updatePreview(file)
    setPostImageUrl(url)
    toastSuccess(`Preview uploaded`)
  }

  const setUrl = (url) => {
    setPostImageUrl(url)
    toastSuccess(`Preview uploaded`)
  }

  const postData = useMemo(() => {
    return {
        title,
        description,
        text: content,
        imageUrl: postImageUrl,
        tags: tags.map(tag => tag.text),
        userId: user?._id,
        chapter: dropdownTitle.split(' ')[0],
    }
  }, [title, dropdownTitle, postImageUrl, description, content, tags, user, postId])


  const editPost = useCallback(async() => {
    const post = await updatePostHandler(postData, postId)
    if (post) {
        await dispatch(updatePostSlice(post))
        await router.push(`/posts/${post._id}`)

    }

  }, [postData, router])

  const addPost = useCallback(async() => {

    const post = await createPostHandler(postData)
    if (post) {
        await router.push(`/posts/${post._id}`)
    }
  }, [postData])



  return (
    <>

        <div className="admin-content__wrap admin-content__wrap-post">
            <div className="admin-content post">
              <h1 className="label">Create Post</h1>
              <div className="d-flex jcb aic gap20">
                <AdminTitleOption value={title} setValue={setTitle} title="Enter title"/>
                <AdminDropDownList buttonTitle={dropdownTitle} items={dropdownData} dropdownindex={-1} setDropdownTitle={setDropdownTitle}/>
              </div>

              <PreviewPost uploadPreview={uploadPreview} url={postImageUrl} setUrl={setUrl}/>

              <div>
                <h1 className="label">Content</h1>
                <EditorJs setText={setContent} text={content} tools={true}/>
              </div>
            </div>
            <CreatePostSidebar
                setTags={setTags}
                tags={tags}
                description={description}
                setDescription={setDescription}
                action={() => edit ? editPost() : addPost()}
                edit={edit}
                uploadTags={post?.tags}
            />


        </div>

        <ToastContainer closeButton={true} />

    </>
  )
}

export default CreatePost
