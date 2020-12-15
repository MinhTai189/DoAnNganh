import React from 'react';
import { Link } from 'react-router-dom'
import './Tours.css';
import { FaAvianex } from "react-icons/fa";
import TourItem from './TourItem';

export default function Tours(props) {
    const { Trongnuoc, Ngoainuoc } = props.dataTours;
    const { handleTourDetail, handleShowMore } = props;
    let domesticArr = [];
    let foreignArr = [];

    // ============hiển thị giới hạn và ngẫu nhiên các tour===========
    if (Trongnuoc) {
        if (Trongnuoc.length > 9) {
            for (let i = 0; i < 9; i++) {
                do {
                    var random = Trongnuoc[Math.floor(Math.random() * Trongnuoc.length)];
                } while (domesticArr.includes(random))
                domesticArr.push(random);
            }
        } else domesticArr = [...Trongnuoc];
    }

    if (Ngoainuoc) {
        if (Ngoainuoc.length > 6) {
            for (let i = 0; i < 6; i++) {
                do {
                    var random2 = Ngoainuoc[Math.floor(Math.random() * Ngoainuoc.length)];
                } while (foreignArr.includes(random2))
                foreignArr.push(random2);
            }
        }
        else foreignArr = [...Ngoainuoc];
    }

    return (
        <section id="our-tours">
            <div className="container">
                <div className="title">
                    <h1>Tour du lịch của chúng tôi</h1>
                    <span><FaAvianex className="icon"></FaAvianex></span>
                </div>
                <div className="content-container">
                    <div className="sub-title">
                        <h3>Tour trong nước</h3>
                    </div>
                </div>
                <div className="items-container">
                    {domesticArr && domesticArr.map((item) => (
                        <TourItem key={item.id} dataTour={item} handleTourDetail={handleTourDetail}></TourItem>
                    ))}
                </div>
                <button className="btn" onClick={() => handleShowMore('Trongnuoc')}>
                    <Link to="/all-tour">Xem thêm</Link>
                </button>
            </div>
            <div className="foreign">
                <div className="container">
                    <div className="content-container">
                        <div className="sub-title">
                            <h3>Tour ngoài nước</h3>
                        </div>
                    </div>
                    <div className="items-container">
                        {foreignArr && foreignArr.map((item) => (
                            <TourItem key={item.id} dataTour={item} handleTourDetail={handleTourDetail}></TourItem>
                        ))}
                    </div>
                    <button className="btn" onClick={() => handleShowMore('Ngoainuoc')}>
                        <Link to="/all-tour">Xem thêm</Link>
                    </button>
                </div>
            </div>
        </section>
    )
}
