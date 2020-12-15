import React, { useEffect, useState } from 'react'
import { GiWhiteBook } from 'react-icons/gi'
import { FaAngleDoubleRight } from 'react-icons/fa'
import Data from './Handbook_Data'
import Handbook_Item from './Handbook_Item'
import './Handbook.css'

export default function Handbook() {
    const [dataIndex, setDataIndex] = useState(0);
    const data = Data;

    const nextSlide = () => {
        setDataIndex((oldIndex) => {
            let index = dataIndex === data.length - 1 ? 0 : oldIndex + 1;
            return index;
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 10000);
        return (() => {
            clearInterval(interval);
        })
    }, [dataIndex])

    return (
        <section id="handbook">
            <div className="title">
                <h1>Cẩm nang du lịch</h1>
                <p>Bỏ túi những kiến thức và địa điểm thú vị trước khi đi du lịch!</p>
                <span><GiWhiteBook className="icon"></GiWhiteBook></span>
            </div>
            <div className="handbook-wrapper">
                <div className="container">
                    <div className="slide-container">
                        {data.map((item, index) => {

                            let position = '';
                            if (dataIndex === index) {
                                position = 'activeSlide'
                            }

                            if (dataIndex + 1 === index) {
                                position = 'nextSlide'
                            }

                            if (dataIndex === data.length - 1 && index === 0) {
                                position = 'nextSlide';
                            }

                            return (
                                <Handbook_Item key={index} position={position} region={item.region}
                                    image={item.image}
                                    handbooks={item.handbooks}></Handbook_Item>
                            )
                        })}
                        <div onClick={nextSlide} className="btn-slide"><div className='icon-container'>
                            <FaAngleDoubleRight className="icon"></FaAngleDoubleRight></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
