import React, {useMemo, useState} from "react";
import MyButton from "../UI/buttons/MyButton";
import { TextScramble } from '@a7sc11u/scramble';
import { TypeAnimation } from 'react-type-animation'
import {useAppSelector} from "../redux/store";
import {generalData} from "../redux/general/slice";

export interface AnimationProps {
    label?: string,
    subtitle?: string,
    link?: {
        text: string,
        url: string
    },
    setIndex?: (id: number) => void
}


const Animation: React.FC<AnimationProps> = ({label, subtitle, link, setIndex}) => {


    const [termIndex, setTermIndex] = useState(1)
    const {general} = useAppSelector(generalData)

    const [show, setShow] = useState(false);


    const animationData = useMemo(() => {
        return general.animationText && general?.animationText?.map((item, index) => {
            return {
                id: index,
                name: item.label,
                text: item.text
            }
        })
    }, [general])



    const count = animationData?.length;

    const termValue = useMemo(() => {
        return animationData.find(item => item.id === termIndex)?.text
    }, [termIndex])


    return (
        <div className="main-animation">

            <div className="main-animation__container">


                <div className="box">


                    <div className="box-carousel__wrap">
                        <div className={`box-carousel ${show ? 'loaded' : ''}`}>
                            {
                                label &&
                                <div className={`box-title ${show ? 'loaded' : ''}`}>
                                    <p >
                                        <TextScramble
                                            text={label}
                                            play={true}
                                            speed={0.2}
                                            scramble={28}
                                            step={6}
                                            onComplete={() => setShow(true)}
                                        />
                                    </p>
                                </div>
                            }
                            {
                                count > 0 &&
                                <>
                                    <ul className="box-carousel__rotate">
                                        {animationData.map((button, i) =>
                                            ( i % 2 === 0 && <div style={{
                                                transform: `rotateY(${Math.round((360 / count) * i )}deg)  translateZ(300px)`,
                                                top: `${-10}px`,

                                            }}
                                            key={i}
                                            >
                                                <MyButton
                                                    key={button.id}
                                                    active
                                                    setValue={() => setTermIndex(button.id)}
                                                >{button.name}</MyButton>
                                            </div>)
                                        )}
                                    </ul>
                                    <ul className="box-carousel__rotate">
                                        {animationData.map((button, i) =>
                                            ( i % 2 === 1 && <div style={{transform: `rotateY(${Math.round((360 / count) * i )}deg)  translateZ(300px)`, top: `${80}px`}} key={i}>
                                                <MyButton
                                                    key={button.id}
                                                    active
                                                    setValue={() => setTermIndex(button.id)}
                                                >{button.name}</MyButton>
                                            </div>)
                                        )}
                                    </ul>
                                </>
                            }
                        </div>
                    </div>


                    {
                        subtitle &&
                        <div className="box-subtitle">
                            <TypeAnimation
                                sequence={[subtitle, 2000, '']}
                                speed={40}
                                repeat={Infinity}
                                wrapper="p"
                            />
                        </div>
                    }



                    {
                        link &&
                        <div className="box-link">
                            <MyButton
                                to={link.url}
                            >{link.text}</MyButton>

                        </div>
                    }

                </div>

                {
                    termValue &&
                    <div className="box-term">
                        <TypeAnimation
                            sequence={[termValue, 2000, '']}
                            speed={60}
                            repeat={Infinity}
                            wrapper="p"
                        />
                    </div>
                }
            </div>

        </div>
    )
}

export default Animation