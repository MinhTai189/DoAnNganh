import React, { useRef, useState } from 'react'
import './Cart_Item.css'
import { Link } from 'react-router-dom'
import { MdLocationCity, MdEventSeat } from 'react-icons/md'
import { BsCalendar, BsClockHistory } from 'react-icons/bs'
import { GrMoney } from 'react-icons/gr'

// ==========định dạng cho giá tiền==============
function formatPrice(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export default function Cart_Item(props) {
    const oldState = useRef(1);
    const { tour, soghe } = props.cart;
    const { handleRemoveCart,
        handleSeat } = props;
    const [seat, setSeat] = useState(soghe);

    const reduceSeat = () => {
        setSeat((oldSeat) => {
            oldState.current = oldSeat;
            let seat = oldSeat - 1;
            if (seat <= 1)
                seat = 1
            return seat
        }, handleSeat(tour.id, seat - 1, tour.songuoi))
    }

    const increaseSeat = () => {
        setSeat((oldSeat) => {
            let seat = oldSeat + 1;
            if (seat >= tour.songuoi)
                seat = tour.songuoi
            return seat
        }, handleSeat(tour.id, seat + 1, tour.songuoi))
    }

    return (
        <div className="item">
            <div className="col-1">
                <img src={tour.hinh} alt="image" />
            </div>

            <div className="col-2">
                <div className="title-tour">
                    <h2><Link>{tour.tieude}</Link></h2>
                    <div className="btn"
                        onClick={() => handleRemoveCart(tour.id)}>
                        Hủy Tour
                            </div>
                </div>

                <div className="content">
                    <div className="left">
                        <div className="info">
                            <div className="icon-container">
                                <MdLocationCity className="icon" />
                            </div>
                            <div className="text">
                                Nơi khởi hành: <p>{tour.noikhoihanh}</p>
                            </div>
                        </div>

                        <div className="info">
                            <div className="icon-container">
                                <BsCalendar className="icon" />
                            </div>
                            <div className="text">
                                Ngày khởi hành: <p>{tour.ngaykhoihanh}</p>
                            </div>
                        </div>

                        <div className="info">
                            <div className="icon-container">
                                <BsClockHistory className="icon" />
                            </div>
                            <div className="text">
                                Số ngày: <p>{tour.songaydi}</p>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="info">
                            <div className="icon-container">
                                <MdEventSeat className="icon" />
                            </div>
                            <div className="seat">
                                <div className="text">Số ghế đã đặt:</div>
                                <button onClick={() => reduceSeat()}>&#10094;</button>
                                <input type="text" value={seat} />
                                <button onClick={() => increaseSeat()}>&#10095;</button>
                            </div>
                        </div>

                        <div className="info">
                            <div className="icon-container">
                                <BsCalendar className="icon" />
                            </div>
                            <div className="text">
                                Ngày quay về: <p>1/1/2020</p>
                            </div>
                        </div>

                        <div className="info">
                            <div className="icon-container">
                                <GrMoney className="icon" />
                            </div>
                            <div className="text">
                                Chi phí: <p className="money">{`${formatPrice(tour.gia)} đ`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
