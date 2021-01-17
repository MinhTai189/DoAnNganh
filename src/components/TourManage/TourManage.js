import React, { useEffect, useRef, useState } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import './TourManage.css'
import succ from '../../images/success.svg'
import err from '../../images/err.svg'

// =========thay đổi src trạng thái khi tên file thay đổi======
const onChangeFileInput = () => {
    const state = document.querySelector('.state');
    state.style.background = `url(${succ})`
}

// ============thay đổi trạng thái sort===============
const changeState = (state) => {
    if (state === 1)
        return 2
    return 1
}

// ===========kiểm tra ngày khởi hành nhập vào form thêm tour============
const checkDate = (date) => {
    const d1 = new Date(date);
    const d2 = Date.now();
    return d1 > d2
}
// =============kiểm tra định dạng ảnh nhập vào form thêm tour==========
const checkFile = (name) => {
    name = name.split('.');
    if (name[name.length - 1] === 'jpg')
        return true;
    return false;
}

// ============xóa dấu tiếng Việt===========
function removeAccents(str) {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
        .toUpperCase();
}

// ============định dạng ngày mm/dd/yyyy==============
const formatDate = (time) => {
    const temp = time.split(/\//);
    return [temp[1], temp[0], temp[2]].join('/')
}

// ===========định dạng ngày mm/dd/yyyy từ dd-mm-yyyy=============
const formatTime = (time) => {
    const temp = formatDeparDay(time).split(/\//);
    return [temp[1], temp[0], temp[2]].join('/')
}

// ==========định dạng ngày dd/mm/yyyy=======
const formatDeparDay = (time) => {
    const temp = time.split('-');
    return [temp[2], temp[1], temp[0]].join('/')
}

// ==========tính ngày về============
const clacDate = (date, num) => {
    const temp = new Date(formatTime(date));
    const res = new Date(temp);
    res.setDate(temp.getDate() + num);
    return `${('0' + res.getDate()).slice(-2)}/${('0' + (res.getMonth() + 1)).slice(-2)}/${res.getFullYear()}`
}

// ===========hàm so sánh để sắp xếp ==============
const compareValues = (key, order = 'asc') => {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }

        let varA;
        if (typeof a[key] === 'number')
            varA = a[key];
        else if (a[key].split('/').length === 3)
            varA = new Date(formatDate(a[key]))
        else if (typeof a[key] === 'string')
            varA = removeAccents(a[key]);

        let varB;
        if (typeof b[key] === 'number')
            varB = b[key];
        else if (b[key].split('/').length === 3)
            varB = new Date(formatDate(b[key]))
        else if (typeof b[key] === 'string')
            varB = removeAccents(b[key]);

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}

export default function TourManage(props) {
    const { addTour,
        dataWorkingTourRoot,
        dataTours,
        removeData,
        setIsUpdateData,
        isUpdateData } = props;

    const { Trongnuoc, Ngoainuoc } = dataTours;
    const allTour = Object.keys(dataWorkingTourRoot)[0] === 'tourdanghoatdong'
        ? [...Trongnuoc, ...Ngoainuoc]
        : [...Trongnuoc, ...Ngoainuoc, ...dataWorkingTourRoot];
    const [dataCurrentTours, setDataCurrentTours] = useState(allTour);
    const [isWorkingTour, setIsWorkingTour] = useState(false);
    const [dataTable, setDataTable] = useState([]);
    const [sort, setSort] = useState(1);
    const [searchValue, setSearchValue] = useState('');

    const starting = useRef();
    const destination = useRef();
    const locate = useRef();
    const amountDay = useRef();
    const amountSeat = useRef();
    const departureDate = useRef();
    const title = useRef();
    const cost = useRef();
    const img = useRef();

    const [amountItemsInAPage, setAmountItemsInAPage] = useState(10);
    const [amountPages, setAmountPages] = useState(Math.ceil(dataCurrentTours.length / 10));
    const [currentPage, setCurrentPage] = useState(1);
    const amountBtn = new Array(amountPages).fill(1);
    const amountWorkingTour = Object.keys(dataWorkingTourRoot)[0] === 'tourdanghoatdong'
        ? 0
        : dataWorkingTourRoot.length

    // ========xử lý phân dữ liệu ra=========
    useEffect(() => {
        const dataAllTour = [...dataCurrentTours];
        const temp = dataAllTour.slice(amountItemsInAPage * (currentPage - 1), amountItemsInAPage * currentPage)
        setDataTable(temp);
    }, [currentPage, amountItemsInAPage, dataCurrentTours]);

    // =============hiển thị các tour đang hoạt động===============
    const onClickWorkingTour = () => {
        if (Object.keys(dataWorkingTourRoot)[0] === 'tourdanghoatdong') {
            setDataCurrentTours([]);
            setAmountPages(0);
            setCurrentPage(1);
        } else if (!isWorkingTour) {
            setDataCurrentTours([...dataWorkingTourRoot]);
            setAmountPages(Math.ceil(dataWorkingTourRoot.length / amountItemsInAPage));
            setCurrentPage(1);
        } else {
            setDataCurrentTours([...allTour]);
            setAmountPages(Math.ceil(allTour.length / amountItemsInAPage));
            setCurrentPage(1);
        }
        setIsWorkingTour(!isWorkingTour);
    }

    // ========tăng/giảm trang hiện tại==========
    const increaseBtn = () => {
        setCurrentPage((old) => {
            const temp = old === amountPages ? amountPages : old + 1;
            return temp;
        })
    }

    const reduceBtn = () => {
        setCurrentPage((old) => {
            const temp = old === 1 ? 1 : old - 1;
            return temp;
        })
    }

    // ========thay đổi số lượng phần tử trên trang==========
    const onChangeItemAPage = (e) => {
        const temp = parseInt(e.target.value);
        setAmountItemsInAPage(temp);
        setAmountPages(Math.ceil(dataCurrentTours.length / temp))
        setCurrentPage(1);
    }

    // =========lấy dữ liệu tìm kiếm tour========
    const onChangeSearchValue = (e) => {
        setSearchValue(e.target.value);
    }

    // ===========xử lý tìm kiếm tour==========
    const handleSearch = () => {
        const dataAllTours = !isWorkingTour ? [...allTour] : [...dataWorkingTourRoot];
        const temp = dataAllTours.filter(item => removeAccents(item.noiden).includes(removeAccents(searchValue)) || removeAccents(item.noikhoihanh).includes(removeAccents(searchValue)));
        setDataCurrentTours(temp);
        setAmountPages(Math.ceil(temp.length / amountItemsInAPage));
        setCurrentPage(1);
    }

    // =======tìm kiếm tour phù hợp=========
    useEffect(() => {
        setTimeout(handleSearch, 300);
    }, [searchValue]);

    // ========xử lý form thêm tour==========
    const onSubmitForm = (e) => {
        e.preventDefault();
        const state = document.querySelector('.state');

        if (checkDate(departureDate.current.value) && checkFile(img.current.files[0].name)) {
            const date = clacDate(departureDate.current.value, parseInt(amountDay.current.value));
            const departure = formatDeparDay(departureDate.current.value);

            const temp = {
                gia: parseInt(cost.current.value),
                hinh: img.current.files[0],
                ngaykhoihanh: departure,
                noiden: destination.current.value,
                noikhoihanh: starting.current.value,
                songaydi: parseInt(amountDay.current.value),
                songuoi: parseInt(amountSeat.current.value),
                tieude: title.current.value,
                id: locate.current.value,
                ngayve: date
            }
            addTour(temp);
            e.target.reset();
            state.style.background = `url(${err})`
        }
        else {
            if (!checkDate(departureDate.current.value)) {
                alert('Ngày khởi hành không hợp lệ. Hãy kiểm tra lại!');
                return false;
            }
            if (!checkFile(img.current.files[0].name)) {
                alert('Hình ảnh phải là định dạng JPG');
                state.style.background = `url(${err})`
                return false;
            }
        }

    }

    // ===============xóa tour================
    const onClickRemoveTour = (id) => {
        if (window.confirm('Bạn có thật sự muốn xóa dữ liệu không?')) {
            removeData(id);
            setDataCurrentTours(() => {
                const temp = dataTable.filter(item => item.id !== id)
                return temp;
            })
        }
    }

    // ==========sắp xếp tour theo nơi khởi hành==========
    const sortValue = (value) => {
        switch (sort) {
            case 1:
                const temp1 = dataTable.sort(compareValues(value));
                setDataTable(temp1);

                break;

            case 2:
                const temp2 = dataTable.sort(compareValues(value, 'desc'));
                setDataTable(temp2)
                break;
        }
        setSort(changeState(sort));
    }

    // ======cập nhật lại dữ liệu sau khi thêm, xóa=======
    if (!isWorkingTour && searchValue === '' && dataCurrentTours.length !== allTour.length) {
        setDataCurrentTours(allTour);
    }

    return (
        <section id="tour-manage">
            <div className="container">
                <div className="wrapper">
                    <div className="add-tour">
                        <h2>Thêm tour</h2>

                        <div className="form-add">
                            <form action="" onSubmit={onSubmitForm}>
                                <div className='row'>
                                    <div className="input">
                                        <label htmlFor="starting">Nơi khởi hành(*)</label>
                                        <input type="text" name='starting' id='starting'
                                            required ref={starting} />
                                    </div>

                                    <div className="input">
                                        <label htmlFor="detination">Nơi đến(*)</label>
                                        <input type="text" name='destination' id='detination'
                                            required ref={destination} />
                                    </div>

                                    <div className="input">
                                        <label htmlFor="locate">Vị trí(*)</label>
                                        <select id='locate' ref={locate}>
                                            <option value="domestic">Trong nước</option>
                                            <option value='foreign'>Ngoài nước</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input">
                                        <label htmlFor="amount-day">Số ngày đi(*)</label>
                                        <input type="number" name='amount-day' min='1' id='amount-day'
                                            required ref={amountDay} />
                                    </div>

                                    <div className="input">
                                        <label htmlFor="amount-seat">Số ghế(*)</label>
                                        <input type="number" name='amount-seat' min='1' id='amount-seat'
                                            required ref={amountSeat} />
                                    </div>

                                    <div className="input">
                                        <label htmlFor="departure-date">Ngày khởi hành(*)</label>
                                        <input type="date" name='departure-date' id='departure-date'
                                            required ref={departureDate} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input">
                                        <label htmlFor="title">Tiêu đề(*)</label>
                                        <input type="text" name='title' id='title'
                                            required ref={title} />
                                    </div>

                                    <div className="input">
                                        <label htmlFor="cost">Chi phí(*)</label>
                                        <input type="number" name='cost' id='cost'
                                            required ref={cost} />
                                    </div>

                                    <div className="input upload">
                                        <label htmlFor="image">Ảnh(*)</label>
                                        <input type="file" name='image' id='image' required
                                            ref={img} onChange={() => onChangeFileInput()} />
                                        <span className='state'></span>
                                    </div>
                                </div>

                                <div className="row">
                                    <button className='btn' type='submit'>Thêm</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="statistical">
                        <h2>Thống kê</h2>
                        <div className="contents">
                            <div className="content">
                                &#x27A3;
                                {`Tổng số tour: ${allTour.length}`}
                            </div>

                            <div className="content">
                                &#x27A3;
                                {`Tổng số tour đang hoạt động: ${amountWorkingTour}`}
                            </div>

                            <div className="content">
                                &#x27A3;
                                {`Tổng số tour chưa hoạt động: ${allTour.length - amountWorkingTour}`}
                            </div>

                            <div className="content">
                                &#x27A3;
                                {`Tổng số tour trong nước: ${Trongnuoc.length}`}
                            </div>

                            <div className="content">
                                &#x27A3;
                                {`Tổng số tour ngoài nước: ${Ngoainuoc.length}`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-container">
                <div className="top">
                    <div className="select">
                        Hiển thị
                    <select id="show" onChange={onChangeItemAPage}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                            <option value="100">100</option>
                        </select>
                    tour
                    </div>

                    <input type="text" value={searchValue} onChange={onChangeSearchValue}
                        name='search' placeholder="Tìm kiếm" autoComplete="off" />
                </div>
                <div className="table">
                    <table>
                        <tr>
                            <th>STT</th>
                            <th className='sort'
                                onClick={() => sortValue('noikhoihanh')}>Nơi khởi hành
                            <div className="icon-container">
                                </div>
                            </th>
                            <th className='sort'
                                onClick={() => sortValue('noiden')}>Nơi đến
                            <div className="icon-container">
                                </div>
                            </th>
                            <th className='sort'
                                onClick={() => sortValue('ngaykhoihanh')}>Ngày khởi hành
                            <div className="icon-container">
                                </div>
                            </th>
                            <th>Ngày quay về</th>
                            <th>Số ngày đi</th>
                            <th>Số người</th>
                            <th className='sort'
                                onClick={() => sortValue('gia')}>Chí phí
                            <div className="icon-container">
                                </div>
                            </th>
                            <th></th>
                        </tr>

                        {dataTable && dataTable.map((item, index) => {
                            const { id,
                                noiden,
                                noikhoihanh,
                                ngaykhoihanh,
                                ngayve,
                                gia,
                                songaydi,
                                songuoi } = item;
                            let num = (currentPage - 1) * amountItemsInAPage + index + 1;
                            let className = '';

                            Object.keys(dataWorkingTourRoot)[0] !== 'tourdanghoatdong'
                                && dataWorkingTourRoot.forEach(item => {
                                    if (item.id === id) {
                                        const now = Date.now();
                                        const date = new Date(formatDate(item.ngayve));
                                        now > date
                                            ? className = 'worked'
                                            : className = 'working';
                                    }

                                })
                            return (
                                <tr className={className}>
                                    <td>{num}</td>
                                    <td>{noikhoihanh}</td>
                                    <td>{noiden}</td>
                                    <td>{ngaykhoihanh}</td>
                                    <td>{ngayve}</td>
                                    <td>{songaydi}</td>
                                    <td>{songuoi}</td>
                                    <td>{gia}</td>
                                    <td>
                                        {(className === '' || className === 'worked')
                                            && <div className='btn' onClick={() => onClickRemoveTour(id)}>
                                                <div className="icon-container">
                                                    <BsFillTrashFill className='icon' />
                                                </div>
                                            </div>
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
                <div className="bottom">
                    <div className="left">
                        <h4 onClick={() => onClickWorkingTour()}
                            className={isWorkingTour ? 'active' : ''}>Tour đang hoạt động
                        </h4>
                    </div>

                    {dataTable.length > 0 &&
                        <div className="btn-group right">
                            <button onClick={() => reduceBtn()}>«</button>

                            {amountBtn.map((item, index) => {
                                let className = '';
                                if (index === currentPage - 1)
                                    className = 'active';
                                return <button className={className}
                                    onClick={() => setCurrentPage(index + 1)}>
                                    {index + 1}
                                </button>
                            })}

                            <button onClick={() => increaseBtn()}>»</button>
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}
