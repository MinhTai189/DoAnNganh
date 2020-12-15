import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt } from "react-icons/fa";
import './Header.css';
import PropTypes from 'prop-types'

Header.propTypes = {
  dataTours: PropTypes.object,
  handleSearchTour: PropTypes.func,
  handleAccountForm: PropTypes.func,
  handleSignInForm: PropTypes.func,
  isErrorAccount: PropTypes.bool,
  handleSignUpForm: PropTypes.func,
  errorsSignUp: PropTypes.object,
}

Header.defaultProps = {
  dataTours: {},
  handleSearchTour: null,
  handleAccountForm: null,
  handleSignInForm: null,
  isErrorAccount: false,
  handleSignUpForm: null,
  errorsSignUp: {}
}

// ===============Kiểm tra giá trị giống nhau trong mảng================
let checkSuggestion = (arr, place) => {
  let indexArr = -1;
  arr.forEach((item, index) => {
    if (Object.keys(item)[0] === place)
      indexArr = index;
  })
  return indexArr;
}

export default function Header(props) {
  const [isOpenSuggestions, setIsOpenSuggestions] = useState(false);
  const elementInput = useRef(null);
  const [clickSpan, setClickSpan] = useState(false);
  const { handleSearchTour } = props;
  const { Trongnuoc, Ngoainuoc } = props.dataTours;
  let suggestions = [];


  // ===============Hiển thị tour gợi ý===================
  if (Trongnuoc) {
    const temp = Trongnuoc.reduce((temp, arr) => {
      if (checkSuggestion(temp, arr.noiden) === -1 || temp.length === 0) {
        temp.push({
          [arr.noiden]: 1,
          image: arr.hinh
        })
      }
      else {
        const index = checkSuggestion(temp, arr.noiden);
        temp[index][arr.noiden]++;
      }
      return temp;
    }, [])

    suggestions = temp.sort((a, b) => {
      return Object.values(b)[0] - Object.values(a)[0];
    }).slice(0, 6);
  }

  if (Ngoainuoc) {
    const temp = Ngoainuoc.reduce((temp, arr) => {
      if (checkSuggestion(temp, arr.noiden) === -1 || temp.length === 0) {
        temp.push({
          [arr.noiden]: 1,
          image: arr.hinh
        })
      }
      else {
        const index = checkSuggestion(temp, arr.noiden);
        temp[index][arr.noiden]++;
      }
      return temp;
    }, [])

    const temp2 = temp.sort((a, b) => {
      return Object.values(b)[0] - Object.values(a)[0];
    }).slice(0, 6);

    suggestions = [...suggestions, ...temp2];
  }

  // =================Ẩn hiện danh sách tour gợi ý==================
  const setShowSuggestion = () => {
    if (!elementInput.current.value && !clickSpan)
      setIsOpenSuggestions(!isOpenSuggestions);
  }

  // =========xxxxx=========Hàm xử lý dữ liệu tìm kiếm=======xxxxxx============

  // ============truyền dữ liệu search qua App.js=================
  const submitSearchTour = (e) => {
    e.preventDefault();
    const searchValue = elementInput.current.value;
    if (handleSearchTour && searchValue.length > 0)
      handleSearchTour(searchValue);
  }

  // ============Đóng/Mở Sugggestion khi dữ liệu nhập thay đổi=========
  const onChangeSuggestion = () => {
    if (!elementInput.current.value)
      setIsOpenSuggestions(true);
    else
      setIsOpenSuggestions(false);
  }

  // ============Đóng Sugggestion khi nhấn vào element input=========
  const clickSuggestionValue = (placeValue) => {
    elementInput.current.value = placeValue;
    setIsOpenSuggestions(false);
  }

  // ============Đóng Sugggestion khi nhấn vào Header=========
  const closeSuggestionHeader = (e) => {
    if (!e.target.classList.contains('whereyougo'))
      setIsOpenSuggestions(false);
  }

  // ==========reset lại clickSpan khi độ rộng màn hình hơn 960px============
  window.addEventListener('resize', () => {
    if (window.innerWidth > 960)
      setClickSpan(false);
  })

  return (
    <header id="header-container" onClick={closeSuggestionHeader}>
      <div className="header-content">
        <h2 className="title-header">Khám phá tour trong và ngoài nước</h2>
        <div className="form-search">
          <h3>Bạn thích đi du lịch đến đâu?</h3>
          <form action="" onSubmit={submitSearchTour}>
            <div className="input">
              <div className="label"><FaMapMarkerAlt className="icon"></FaMapMarkerAlt></div>
              <input type="text" name="whereyougo" id="whereyougo" className='whereyougo'
                ref={elementInput} autoComplete="off" onChange={onChangeSuggestion}
                placeholder="chọn nơi bạn muốn khám phá!" onClick={setShowSuggestion} />
              {isOpenSuggestions && <div className='suggestions'>
                <span onClick={() => { setIsOpenSuggestions(true); setClickSpan(true); }}>&#10140;</span>
                <h4>&#9733; Địa điểm gợi ý</h4>
                <div className="suggestions-wrapper">
                  {suggestions && suggestions.map(suggestion => {
                    const place = Object.keys(suggestion)[0];
                    return (
                      <div className="suggestion" onClick={() => clickSuggestionValue(place)}>
                        <img src={suggestion.image} alt="suggestion" />
                        <div className="suggestion-right">
                          <h5>{place}</h5>
                          <p>{`${suggestion[place]} Tours`}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>}
            </div>
            <button type="submit" onClick={submitSearchTour}><Link to='/tour-finded'>Khám phá &#10142;</Link></button>
          </form>
        </div>
      </div>
    </header>
  )
}
