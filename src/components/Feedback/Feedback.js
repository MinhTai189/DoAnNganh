import React, { useEffect, useState } from 'react'
import { BsFillChatQuoteFill, BsCaretRightFill } from 'react-icons/bs'
import './Feedback.css'
import Feedback_Item from './Feedback_Item'
import Data from './Feedback_Data'


export default function Feedback() {
    const [indexSlide, setIndexSlide] = useState(0);
    const data = Data;
    const [isSlideRight, setIsSlideRight] = useState(true)

    const nextSlide = () => {
        setIsSlideRight(true);
        setIndexSlide((oldIndex) => {
            let index = indexSlide === data.length - 1 ? 0 : oldIndex + 1;
            return index;
        })
    }

    const prevSlide = () => {
        setIsSlideRight(false)
        setIndexSlide((oldIndex) => {
            let index = indexSlide === 0 ? data.length - 1 : oldIndex - 1;
            return index;
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return (() => {
            clearInterval(interval)
        });
    }, [indexSlide]);

    return (
        <section id="feedback">
            <div className="container">
                <div className="title">
                    <h1>Ý kiến khách hàng</h1>
                    <p>Phản hồi của khách hàng sau khi đi tour của chúng tôi</p>
                    <span><BsFillChatQuoteFill className="icon"></BsFillChatQuoteFill></span>
                </div>
                <div className="feedback-container">
                    {data.map((item, index) => {

                        let position = null;

                        if (isSlideRight) {
                            if (index === indexSlide) {
                                position = 'active-right';
                            }

                            if (index === indexSlide - 1 || (indexSlide === 0 && index === data.length - 1)) {
                                position = 'prev-right';
                            }

                            if (index === indexSlide - 2 || (indexSlide === 0 && index === data.length - 2) ||
                                (indexSlide === 1 && index === data.length - 1)) {
                                position = 'prev2-right'
                            }

                            if (index === indexSlide + 1 || (indexSlide === data.length - 1 && index === 0)) {
                                position = 'next-right'
                            }
                        }
                        if (!isSlideRight) {
                            if (index === indexSlide) {
                                position = 'active-left';
                            }

                            if (index === indexSlide - 1 || (indexSlide === 0 && index === data.length - 1)) {
                                position = 'prev-left';
                            }

                            if (index === indexSlide + 1 || (indexSlide === data.length - 1 && index === 0)) {
                                position = 'next-left'
                            }

                            if (index === indexSlide + 2 || (indexSlide === data.length - 2 && index === 0) ||
                                (indexSlide === data.length - 1 && index === 1)) {
                                position = 'next2-left'
                            }

                        }

                        return <Feedback_Item key={index} data={item} position={position}></Feedback_Item>
                    })}
                    <div className="btn-prev" onClick={prevSlide}>
                        <BsCaretRightFill></BsCaretRightFill>
                    </div>
                    <div className="btn-next" onClick={nextSlide}>
                        <BsCaretRightFill></BsCaretRightFill>
                    </div>
                </div>
            </div>
        </section>
    )
}
