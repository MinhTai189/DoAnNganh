import React from 'react';
import { Link } from 'react-router-dom'
import './TourItem.css';
import { FaCalendarAlt, FaMapMarkedAlt, FaMoneyBillAlt } from "react-icons/fa";
import { GiSofa } from "react-icons/gi";

// ==========định dạng cho giá tiền==============
function formatPrice(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export default function TourItem(props) {
    const { gia,
        hinh,
        id,
        ngaykhoihanh,
        noiden,
        songaydi,
        songuoi,
        tieude } = props.dataTour;
    const { handleTourDetail } = props;

    // ===========xử lý khi nhấp vào tour==========
    const handleClickTour = () => {
        if (handleTourDetail)
            handleTourDetail(id);
    }

    return (
        <div className="items">
            <div className="header-item">
                <img src={hinh} title="source: imgur.com" />
                <Link to="/tour-detail" onClick={handleClickTour}><div className="cover"></div></Link>
                <div className="infos-header">
                    <div className="date">
                        <div><FaCalendarAlt className="icon"></FaCalendarAlt></div>
                        <h4>{`${ngaykhoihanh} - ${songaydi} ngày`}</h4>
                    </div>
                    <div className="amount">
                        <div className="icon-container"><GiSofa className='icon'></GiSofa></div>
                        {songuoi}
                    </div>
                </div>
            </div>
            <div className="title-items">
                <Link to="/tour-detail" onClick={handleClickTour}>{tieude}</Link>
            </div>
            <div className="content-item">
                <div className="info-item">
                    <div className="info-title">
                        <div className='icon-container'><FaMapMarkedAlt className="icon"></FaMapMarkedAlt></div>
                        <div>Địa điểm:</div>
                    </div>
                    <div className="start">{noiden}</div>
                </div>
                <div className="info-item">
                    <div div className="info-title">
                        <div className='icon-container'><FaMoneyBillAlt className="icon"></FaMoneyBillAlt></div>
                        <div className='old-price'>{`${formatPrice(gia + gia / 10)} vnd`}</div>
                    </div>
                    <div className="new-price">{`${formatPrice(gia)} vnd`}</div>
                </div>
            </div>
        </div>
    )
}
