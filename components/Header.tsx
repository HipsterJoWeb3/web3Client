import Link from 'next/link'
import {useRouter} from 'next/router'
import {useState, useEffect, useRef, useMemo} from 'react'
import React from 'react'
import {motion} from 'framer-motion'
import MenuPopup from './MenuPopup'
import ButtonList from './ButtonList'
import { useAppSelector} from "../redux/store";
import { logoutLinks, links } from '../router'
import {chaptersData} from "../redux/chapters/slice";
import {generalData} from "../redux/general/slice";
import {userData} from "../redux/users/slice";
import {mobileLinks, routes, tabLinks} from "../hooks/useCustomRoutes";
import {useHandleClick} from "../hooks/useHandleClick";
import {pagesData} from "../redux/pages/slice";




const Header: React.FC = () => {
  const {general} = useAppSelector(generalData)
  const {chapters} = useAppSelector(chaptersData)
  const {user} = useAppSelector(userData)
  const {pages} = useAppSelector(pagesData)
  const {asPath} = useRouter()



  const routesData = routes(general, chapters, pages)
  const [menuActive, setMenuActive] = useState(false)
  const menuClass = menuActive ? 'active' : ''
  const menuRef = useRef()




  useEffect(() => {
    useHandleClick(menuRef, setMenuActive)
  }, [])

  const tabLinksData = tabLinks(user)


  return (
    <>
      <header>
        <ul className="header__inner">
          {
            routesData && routesData.map(route =>
              <li key={route.link} className={route.link === asPath ? 'current' : undefined}>
                <Link href={route.link}><a>{route.name}</a></Link>
              </li>
            )
          }
        </ul>

        <div ref={menuRef} className={`button-menu-popup ${menuClass}`} onClick={() => setMenuActive(!menuActive)}>
          <div className="button-menu-popup__inner" ></div>
          {
            menuActive &&
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1}}
              transition={{ duration: 0.15 }}

            >
              <MenuPopup className={'menu-full__page'}><ButtonList items={user ? links : logoutLinks} color={'white'}/></ MenuPopup>
              <MenuPopup className={'menu-tab__page'}><ButtonList items={tabLinksData} color={'white'}/></ MenuPopup>
              {/*<MenuPopup className={'menu-mobile__page'}><ButtonList items={mobileLinksData.filter(link => link.name !== 'Admin')} color={'white'}/></ MenuPopup>*/}
            </motion.div>
          }


        </div>
      </header>


    </>
  )
}




export default Header
