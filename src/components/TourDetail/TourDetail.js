import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FaCartPlus } from 'react-icons/fa'
import './TourDetail.css'

TourDetail.propTypes = {
    dataTourDetail: PropTypes.object,
    handleCart: PropTypes.func,
}

TourDetail.defaultProps = {
    dataTourDetail: {},
    handleCart: null,
}

// ==========định dạng cho giá tiền==============
function formatPrice(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// ===========định dạng ngày mm/dd/yyyy=============
const formatTime = (time) => {
    const temp = time.split(/\//);
    return [temp[1], temp[0], temp[2]].join('/')
}

// ================tính thời gian ngày, giờ, phút, giây============
function getTime(date1, date2) {
    const time = date2 - date1;
    const s = 1000;
    const m = s * 60;
    const h = m * 60;
    const d = h * 24;

    const days = Math.floor(time / (d)) < 100
        ? ("0" + Math.floor(time / (d))).slice(-2)
        : Math.floor(time / (d));
    const hours = ("0" + Math.floor((time % d) / (h))).slice(-2);
    const minutes = ("0" + Math.floor((time % h) / (m))).slice(-2);
    const seconds = ("0" + Math.floor((time % m) / (s))).slice(-2);

    return {
        days,
        hours,
        minutes,
        seconds
    }
}

export default function TourDetail(props) {
    // =====nếu có props thì lấy data là props, không có thì lấy trong Session=======
    const [countDownTime, setCountDownTime] = useState({});
    const [countClick, setCountClick] = useState(0);
    const { dataTourDetail,
        handleCart } = props;
    const data = Object.keys(dataTourDetail).length > 0
        ? dataTourDetail
        : JSON.parse(sessionStorage.getItem('tourDetail'));
    const { gia, hinh, ngaykhoihanh, noiden, noikhoihanh,
        songaydi, songuoi, tieude, id, ngayve } = data;
    const depatureDate = new Date(formatTime(ngaykhoihanh)).getTime();

    // =========lưu lại giá trị trong bộ nhớ Session khi reload lại trang=========
    useEffect(() => {
        return (() => {
            sessionStorage.setItem('tourDetail', JSON.stringify(data))
        })
    }, [])

    // ==========set giá trị countdown time============
    useEffect(() => {
        const interval = setInterval(() => {
            const nowDate = new Date().getTime();
            setCountDownTime(getTime(nowDate, depatureDate));
        }, 1000)

        return (() => {
            clearInterval(interval)
        })
    }, []);

    // ============click vào nút đặt tour=============
    const onClickReverseTour = () => {
        if (songuoi > 0) {
            setCountClick(countClick + 1);
            if (countClick + 1 <= songuoi)
                handleCart(id);
            else
                alert('Vượt quá số tour cho phép!');
        } else alert('Tour đã hết chỗ. Hãy tham khảo các tour khác của chúng tôi');

    }

    return (
        <section id="tour-detail">
            <div className="container">
                <div className="detail-wrapper">
                    <div className="img">
                        <img src={hinh} alt="image" />
                    </div>

                    <div className="detail">
                        <h2 className="title-tour">{tieude}</h2>
                        <div className="infos">
                            <div className="info">
                                <h4>Khởi hành:</h4>
                                <p>{ngaykhoihanh}</p>
                            </div>
                            <div className="info">
                                <h4>Ngày về:</h4>
                                <p>{ngayve}</p>
                            </div>
                            <div className="info">
                                <h4>Thời gian:</h4>
                                <p>{`${songaydi} ngày`}</p>
                            </div>
                            <div className="info">
                                <h4>Nơi đến:</h4>
                                <p>{noiden}</p>
                            </div>
                            <div className="info">
                                <h4>Nơi khởi hành:</h4>
                                <p>{noikhoihanh}</p>
                            </div>
                        </div>
                        <div className="about">
                            <div className="col-left">
                                <div className="price"><strong>{formatPrice(gia)}</strong> đ</div>
                                <div className="amount">Số chỗ còn nhận: <strong>{songuoi}</strong></div>
                            </div>
                            <div className="col-right">
                                <div className="btn" onClick={() => onClickReverseTour()}>
                                    <div className="icon-container">
                                        <FaCartPlus className="icon" />
                                    </div>
                                    Đặt ngay
                                </div>
                            </div>
                        </div>
                        <div className="countdown-time">
                            <h4>Thời gian còn lại:</h4>
                            <div className="time-container">
                                <div className="day time">{countDownTime.days}</div>
                                <div className="hour time">{countDownTime.hours}</div>
                                <div className="minute time">{countDownTime.minutes}</div>
                                <div className="second time">{countDownTime.seconds}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
