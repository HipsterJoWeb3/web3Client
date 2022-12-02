import styles from './MySelect.module.scss'
import React from "react";

export interface MySelectProps {
    callback: (checked: boolean, id: string | number) => void
    active?: boolean,
    id?: string | number,

}

const MySelect: React.FC<MySelectProps> = ({callback, active, id}) => {
    console.log(active)

  return (

    <label className={styles.select}>
      <input onChange={(e) => callback(!active, id)} className={active ? 'active' : ''} type="checkbox" hidden checked={active}/>
      <div className={styles.select__inner}></div>
    </label>
  )
}

export default MySelect
