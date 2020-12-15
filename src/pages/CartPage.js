import React from 'react'
import Cart from '../components/Cart/Cart'
import PropTypes from 'prop-types'

CartPage.propTypes = {
    tourInCart: PropTypes.array,
    handleRemoveCart: PropTypes.func,
    handleSeat: PropTypes.func,
    handlePayTour: PropTypes.func,
}

CartPage.defaultProps = {
    tourInCart: [],
    handleRemoveCart: null,
    handleSeat: null,
    handlePayTour: null,
}

export default function CartPage(props) {
    const { tourInCart,
        handleRemoveCart,
        handleSeat,
        handlePayTour } = props
    return (
        <>
            <Cart
                tourInCart={tourInCart}
                handleRemoveCart={handleRemoveCart}
                handleSeat={handleSeat}
                handlePayTour={handlePayTour} />
        </>
    )
}
