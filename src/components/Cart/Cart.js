import React from 'react'
import './Cart.css'
import Cart_Item from './Cart_Item';

// ==========định dạng cho giá tiền==============
function formatPrice(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export default function Cart(props) {
    const { tourInCart,
        handleRemoveCart,
        handleSeat,
        handlePayTour } = props;
    let totalSeat = 0;
    let totalCost = 0;

    tourInCart.forEach(item => {
        totalSeat += item.soghe;
        totalCost += item.tour.gia * item.soghe;
    })

    if (tourInCart.length === 0)
        return <h1 class='null'>Giỏ hàng đang trống</h1>
    else {
        return (
            <section id="cart">
                <div className="container">
                    <h1>Giỏ hàng của bạn</h1>
                    <div className="statictis">
                        <div className="total">
                            Số tour đã đặt: <p>{tourInCart.length}</p>
                        </div>
                        <div className="total">
                            Số ghế đã đặt: <p>{totalSeat}</p>
                        </div>
                        <div className="total">
                            Tổng số tiền: <p>{`${formatPrice(totalCost)}đ`}</p>
                        </div>
                        <div className="btn-pay" onClick={() => handlePayTour()}>Thanh toán</div>
                    </div>
                    <div className="cart-container">
                        {tourInCart.map((item, key) => (
                            <Cart_Item
                                key={key}
                                cart={item}
                                handleRemoveCart={handleRemoveCart}
                                handleSeat={handleSeat} />
                        ))}
                    </div>
                </div>
            </section>
        )
    }
}
