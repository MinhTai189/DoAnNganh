import React, { useEffect, useState } from 'react'
import './AllTour.css'
import AllTour_Item from './AllTour_Item';

export default function AllTour(props) {
    // =====nếu có props thì lấy data là props, không có thì lấy trong Session=======
    const { dataAllTour, handleTourDetail } = props;
    const data = dataAllTour.length > 0
        ? dataAllTour
        : JSON.parse(sessionStorage.getItem('dataAllTour'));
    const [currentPage, setCurrentPage] = useState(1);
    const [dataCurrentPage, setDataCurrentPage] = useState([]);
    const numTourInPage = 5;
    const numPage = Math.ceil(data.length / numTourInPage);
    const arrBtn = new Array(numPage).fill('1');
    // ==========xử lý chuyển trang, mỗi trang 10 phần tử========
    useEffect(() => {
        const dataTemp = data.slice((currentPage - 1) * numTourInPage,
            currentPage * numTourInPage);
        setDataCurrentPage(dataTemp);
    }, [currentPage])

    // =========lưu giá trị vào Sessionstorage khi reload lại trang=============
    useEffect(() => {
        return (
            sessionStorage.setItem('dataAllTour', JSON.stringify(data))
        )
    }, [])

    // =============tăng/giảm trang hiện tại=========
    const increasePage = () => {
        currentPage < numPage && setCurrentPage(currentPage + 1)
    }

    const reducePage = () => {
        currentPage > 1 && setCurrentPage(currentPage - 1)
    }

    if (dataAllTour.length === 0)
        return (<h1 className='wrong'>Không tìm thấy tour</h1>)
    else {
        return (
            <section id="all-tour">
                <div className="container">
                    <h1>Danh sách các tour {data[0].id.substr(0, 2) === "TN" ? "Trong nước" : "Ngoài nước"}</h1>
                    <div className="alltour-wrapper">
                        {dataCurrentPage.map(item => (
                            <AllTour_Item key={item.id}
                                dataCurrentPage={item}
                                handleTourDetail={handleTourDetail}
                            />
                        ))}
                    </div>
                    <div className="btn-container">
                        {currentPage > 1 && <div className="btn" onClick={() => reducePage()}>&#x2770;</div>}

                        {arrBtn.map((item, index) => {
                            let position = '';
                            if (index === currentPage - 1)
                                position = 'active';
                            return <div key={index} className={`btn ${position}`}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </div>
                        })}

                        {currentPage < numPage && <div className="btn" onClick={() => increasePage()}>&#x2771;</div>}
                    </div>
                </div>
            </section>
        )
    }
}
