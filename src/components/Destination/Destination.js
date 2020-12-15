import React from 'react'
import { RiHeartsFill } from "react-icons/ri";
import Destination_Item from './Destination_Item';
import './Destination.css'
import Hinh1 from '../../images/halong.jpg'
import Hinh2 from '../../images/saigon.jpg'
import Hinh3 from '../../images/hoian.jpg'
import Hinh4 from '../../images/mienbac.jpg'

export default function Destination() {
    const dataDestination = [
        {
            image: Hinh1,
            region: 'Thủ đô Hà Nội'
        },
        {
            image: Hinh2,
            region: 'Thành phố Hồ Chí Minh'
        },
        {
            image: Hinh3,
            region: 'Phố cổ Hội An'
        },
        {
            image: Hinh4,
            region: 'Đồng bằng Sông Cửu Long'
        }
    ]

    return (
        <section id="destination">
            <div className="container">
                <div className="title">
                    <h1>Điểm đến địa phương</h1>
                    <p>Bạn đã sẵn sàng khám phá những địa điểm tốt nhất cùng chúng tôi?</p>
                    <span><RiHeartsFill className="icon"></RiHeartsFill></span>
                </div>
                <div className="destination-wrapper">
                    <div className="cards">
                        {dataDestination.map((item, index) => (
                            <Destination_Item
                                key={index}
                                image={item.image}
                                region={item.region}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
