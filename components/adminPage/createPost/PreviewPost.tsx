import MyButton from '../../../UI/buttons/MyButton'
import MyInput from '../../../UI/inputs/MyInput'
import Image from 'next/image'

import React, {useRef, useState} from 'react'
import PreviewPostButtons from "./PreviewPostButtons";
import {toast} from "react-toastify";

export interface AdminPreviewPostProps {
    url?: string
    setUrl?: (url: string) => void
    uploadPreview?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PreviewPost: React.FC<AdminPreviewPostProps> = ({url, setUrl, uploadPreview}) => {

  const [changePicture, setChangePicture] = useState(false)
  const [showInputUrl, setShowInputUrl] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const uploadRef = useRef<HTMLInputElement>(null)

  const showInput = () => {
    setShowInputUrl(!showInputUrl)

  }


  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)

  }


  return (
    <div className="preview d-flex aic jcc">
      {
          url &&
          <Image
              src={url}
              alt="post preview"
              className="card-image"
              objectFit="cover"
              objectPosition="center"
              loader={() => url}
              placeholder="blur"
              blurDataURL={url}
              layout={'fill'}
          />
      }
        <PreviewPostButtons
            setUrl={setUrl}
            uploadPreview={uploadPreview}
            inputValue={inputValue}
            changeInputValue={changeInputValue}
            uploadRef={uploadRef}
            changePicture={changePicture}
            setChangePicture={setChangePicture}
            url={url}
        />



    </div>
  )
}

export default PreviewPost
