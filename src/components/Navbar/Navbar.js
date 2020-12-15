import { React } from 'react';
import ScrollIntoView from 'react-scroll-into-view';
import disableScroll from 'disable-scroll';
import Account from '../Account/Account';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from "react-router-dom";
import './Navbar.css';

export default function Navbar(props) {
    const { handleAccountForm,
        isSignInSuccess,
        isOpenAccountForm,
        handleSignInForm,
        handleSignUpForm,
        isErrorAccount,
        errorsSignUp,
        toggle,
        setToggle } = props;
    const location = useLocation().pathname !== '/';
    var changeToggle = () => {
        setToggle(!toggle);
    }

    toggle ? disableScroll.on() : disableScroll.off();

    // ============chặn cuộn chuột khi account form được mở===========
    isOpenAccountForm ? disableScroll.on() : disableScroll.off();


    return (
        <nav className="nav-container">
            <Account handleAccountForm={handleAccountForm}
                handleSignInForm={handleSignInForm}
                isErrorAccount={isErrorAccount}
                handleSignUpForm={handleSignUpForm}
                errorsSignUp={errorsSignUp}
                isOpenAccountForm={isOpenAccountForm}
            />

            <div className={isOpenAccountForm ? 'cover active' : 'cover'} onClick={() => handleAccountForm()}></div>
            <div className="logo">
                Travelling
                </div>
            <div className={toggle ? "nav-items active" : "nav-items"}>
                <ul>
                    {!location && <>
                        <li>
                            <Link to="/" onClick={() => setToggle(false)}>Trang chủ</Link>
                        </li>

                        <li>
                            <ScrollIntoView selector='#our-tours'>
                                <Link to="" onClick={() => setToggle(false)} > Tours</Link>
                            </ScrollIntoView>
                        </li>

                        <li>
                            <ScrollIntoView selector='#destination'>
                                <Link to="" onClick={() => setToggle(false)} > Điểm đến</Link>
                            </ScrollIntoView>
                        </li>

                        <li>
                            <ScrollIntoView selector='#handbook'>
                                <Link to="" onClick={() => setToggle(false)} > Cẩm nang</Link>
                            </ScrollIntoView>
                        </li>

                        <li>
                            <ScrollIntoView selector='#feedback'>
                                <Link to="" onClick={() => setToggle(false)} > Phản hồi</Link>
                            </ScrollIntoView>
                        </li>
                    </>}

                    {location && <>
                        <li>
                            <Link to="/" onClick={() => setToggle(false)}>Trang chủ</Link>
                        </li>

                        <li>
                            <Link to="/" onClick={() => setToggle(false)} > Tours</Link>
                        </li>

                        <li>
                            <Link to="/" onClick={() => setToggle(false)} > Điểm đến</Link>
                        </li>

                        <li>
                            <Link to="/" onClick={() => setToggle(false)} > Cẩm nang</Link>
                        </li>

                        <li>
                            <Link to="/" onClick={() => setToggle(false)} > Phản hồi</Link>
                        </li>
                    </>}

                    {!isSignInSuccess && <li className="signin" onClick={() => {
                        handleAccountForm(); setToggle(false);
                    }}
                    >Đăng nhập
                    </li>}
                </ul>
            </div>
            <div className="btn-hamburger" onClick={changeToggle}>{toggle ? <FaTimes fill="#d64933"></FaTimes> : <FaBars fill="#d64933"></FaBars>}</div>
        </nav>
    )
}
