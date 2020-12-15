import React from 'react'
import TourDetail from '../components/TourDetail/TourDetail';

export default function TourDetailPage(props) {
    const { dataTourDetail,
        handleCart } = props;

    return (
        <>
            <TourDetail
                dataTourDetail={dataTourDetail}
                handleCart={handleCart} />
        </>
    )
}
