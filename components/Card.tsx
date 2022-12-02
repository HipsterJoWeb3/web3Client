import previewUrl from '../assets/img/preview1.png'
import Link from 'next/link'
import React, { useEffect } from 'react'

import { motion, useAnimation } from 'framer-motion'
// @ts-ignore
import { useInView } from 'react-intersection-observer'
import CardSkeleton from './CardSkeleton'
import {getFormattedDate} from "../hooks/useDate";
import {Post} from "../@types/posts";
import Image from "next/image";
import {getTitleLessThan} from "../hooks/useTitle";
import {colors} from "../utils/colors";

export interface CardProps {
    postData: Post
    orientation: string

}

const Card: React.FC<CardProps> = ({postData, orientation}) => {
  const cardVariants = {
    visible: { opacity: 1, scale: 1, transition: { duration: .1 } },
    hidden: { opacity: 0, scale: 0.85 }
  }


  const [ref, inView] = useInView()

  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])






  return (
    postData.title
    ?
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={cardVariants}
    >
        <Link href={`/posts/${postData._id}`}>
          <div className={`card d-flex fdc ${orientation === 'list' ? 'list' : 'grid'}`}>
            {
                postData?.imageUrl &&
                <div className="card__image"
                     style={{height: orientation === 'list' ? 'auto' : '220px', width: orientation === 'list' ? '40%' : '100%'}}
                >
                  <Image
                      src={postData?.imageUrl}
                      alt="post preview"
                      objectFit="cover"
                      objectPosition="center"
                      loader={() => postData?.imageUrl}
                      layout="fill"
                      placeholder="blur"
                      blurDataURL={postData?.imageUrl}
                  />
                </div>

            }
            <div className={`card-content ${!postData?.imageUrl ? 'without-picture' : ''}`}>
              <div className="card-content__header">{postData.title}</div>
              <div className="card-content__date">{getFormattedDate(postData.createdAt)}</div>
              <p>{getTitleLessThan(postData.description, 24)}</p>
              <div className="card-content__footer aic jcb d-flex">
                <ul className="tags">
                  {
                    postData.tags.map(item =>
                        <li key={item._id}><Link href={`/posts?tags=${item.value}`}><a>#{item.value}</a></Link></li>
                    )
                  }

                </ul>
              </div>
            </div>
          </div>
        </Link>
    </motion.div>
    :
    <div className={`card ${orientation === 'list' ? 'list' : 'grid'}`}>
      <CardSkeleton/>
    </div>

  )
}

export default Card
