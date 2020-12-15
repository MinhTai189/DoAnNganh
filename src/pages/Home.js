import React from 'react'
import Destination from '../components/Destination/Destination'
import Feedback from '../components/Feedback/Feedback'
import Gallery from '../components/Gallery/Gallery'
import Handbook from '../components/Handbook/Handbook'
import Header from '../components/Header/Header'
import Tours from '../components/Tours/Tours'
import PropTypes from 'prop-types'
import BtnScrollTop from '../components/BtnScrollTop/BtnScrollTop'

Tours.propTypes = {
    dataTours: PropTypes.object,
    handleTourDetail: PropTypes.func,
    handleSearchTour: PropTypes.func,
    handleShowMore: PropTypes.func,
    handleAccountForm: PropTypes.func,
}

Tours.defaultProps = {
    dataTours: {},
    handleTourDetail: null,
    handleSearchTour: null,
    handleShowMore: null,
    isOpenAccountForm: false,
}

export default function Home(props) {
    const { dataTours,
        handleSearchTour,
        handleTourDetail,
        handleShowMore } = props;

    return (
        <>
            <Header dataTours={dataTours}
                handleSearchTour={handleSearchTour}
            />
            <Tours dataTours={dataTours}
                handleTourDetail={handleTourDetail}
                handleShowMore={handleShowMore}
            />
            <Destination />
            <Handbook />
            <Gallery />
            <Feedback />
            <BtnScrollTop />
        </>
    )
}
