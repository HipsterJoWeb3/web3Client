import {useAppSelector, wrapper} from "../redux/store";
import {generalData} from "../redux/general/slice";
import React, {useEffect, useMemo} from "react";

export interface FooterProps {
    data?: any;
}

const Footer: React.FC<FooterProps> = () => {

  const {general} = useAppSelector(generalData)


  const links = useMemo(() => general?.links, [general])

  return (
    <footer>
      <ul>
        {
          links && links.map(link =>
            <li key={link.value}>
              <a href={link.url} target="_blank">{link.value}</a>
            </li>
          )
        }
      </ul>
    </footer>
  )
}




export default Footer
