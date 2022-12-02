import Link from 'next/link'
import React from 'react'
import {Links} from "../router";
import {useAppDispatch} from "../redux/store";
import {setUser} from "../redux/users/slice";
import {useDestroyCookie} from "../hooks/useAuth";
import {useRouter} from "next/router";
import {toast, ToastContainer} from "react-toastify";


interface IProps {
  items: Links[],
  color?: string,
  setValue?: (e: React.MouseEvent<HTMLButtonElement>, item: [], i: number) => void;
  index?: number

}


const ButtonList: React.FunctionComponent<IProps> = ({items, color, setValue, index}) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const callback = (item, i, e) => {
    if(setValue)  {
      setValue(item, i, e)
    }
  }

  const logoutUser = () => {
    dispatch(setUser(null))
    useDestroyCookie('token')


    toast.success(`You have successfully logged out of your account.`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: 'toast-popup',
      icon: false,
      closeButton: true,

    })

    router.push('/')
  }


  return (
    <>
      <ul className="buttonList">
        {
            items && items.map((item, i) =>
                <li key={i}>
                  {
                    item.link
                        ? <Link href={item.link} >
                          <a onClick={e => callback(item, i, e)} className={i === index ? 'active' : ''} style={{color: color}}>{item.name}</a>
                        </Link>
                        : <button style={{color}}  className={i === index ? 'active' : ''} onClick={e => item?.actionCallback === 'logout' ? logoutUser() : callback(item, i, e)}>{item.name}</button>
                  }

                </li>
            )
        }
      </ul>
    </>
  )
}

export default ButtonList
