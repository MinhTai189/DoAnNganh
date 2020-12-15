import React from 'react'
import { Link } from 'react-router-dom'
import './AllTour_Item.css'
import { FaCalendarAlt } from 'react-icons/fa'

// ==========định dạng cho giá tiền==============
function formatPrice(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export default function AllTour_Item(props) {
    const { gia, hinh, id, ngaykhoihanh, noiden, noikhoihanh,
        songaydi, songuoi, tieude, ngayve } = props.dataCurrentPage;
    const { handleTourDetail } = props;

    // ===========xử lý khi nhấp vào tour==========
    const handleClickTour = () => {
        if (handleTourDetail)
            handleTourDetail(id);
    }

    return (
        <div className="row">
            <div className="col-1">
                <Link to="/tour-detail" onClick={handleClickTour}>
                    <img src={hinh} alt="sdfa" />
                </Link>
            </div>

            <div className="col-2">
                <h3 className="title-tour">
                    <Link to="/tour-detail" onClick={handleClickTour}>
                        {tieude}
                    </Link>
                </h3>
                <div className="place">
                    <strong>Địa điểm:</strong>
                    <p>{noiden}</p>
                </div>
                <div className="info">
                    <p>{`Thời gian: ${songaydi} ngày`}</p>
                    <p>{`Số lượng ghế: ${songuoi} ghế`}</p>
                </div>
            </div>

            <div className="col-3">
                <div className="price">
                    <Link to="/tour-detail" onClick={handleClickTour}>
                        Giá từ
                        <div className="money">
                            {formatPrice(gia)}
                        </div>
                    </Link>
                </div>
                <div className="time">
                    <div className="date">
                        <div className="icon-container">
                            <FaCalendarAlt className="icon" />
                        </div>
                        {ngaykhoihanh}
                    </div>
                    <div className="date">
                        <div className="icon-container">
                            <FaCalendarAlt className="icon" />
                        </div>
                        {ngayve}
                    </div>
                </div>
            </div>
        </div>
    )
}
