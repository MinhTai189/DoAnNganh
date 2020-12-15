import React from 'react'
import PropTypes from 'prop-types'
import AllTour from '../components/AllTour/AllTour'

AllTourPage.propTypes = {
    dataAllTour: PropTypes.array,
    handleTourDetail: PropTypes.func,
}

AllTourPage.defaultProps = {
    dataAllTour: [],
    handleTourDetail: null
}

export default function AllTourPage(props) {
    const { dataAllTour, handleTourDetail } = props;

    return (
        <>
            <AllTour
                dataAllTour={dataAllTour}
                handleTourDetail={handleTourDetail}
            />
        </>
    )
}
