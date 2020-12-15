import React from 'react'
import { Link } from 'react-router-dom'
import { FaList, FaShoppingCart } from 'react-icons/fa'
import { GoSignOut } from 'react-icons/go'
import './Userbar.css'

export default function Userbar(props) {
    const { setIsSignInSuccess,
        amountTourInCart,
        setAccountSignSuccess,
        handleClickCart,
        accountSignSuccess,
        setToggle } = props;

    const permission = Object.values(accountSignSuccess).length > 0
        ? accountSignSuccess.quyen
        : '';
    return (
        <section id="user-bar">
            <div className="container">
                <div className="item-container">
                    <ul>
                        {
                            permission === 'admin' && <li title='Quản lý tour'>
                                <Link to='/tour-manage' onClick={() => setToggle(false)}>
                                    <div className="icon-container">
                                        <FaList className='icon' />
                                    </div>
                                </Link></li>
                        }
                        {(permission === 'admin' || permission === 'user') && <li title='Giỏ hàng'>
                            <Link to='/cart' onClick={() => { handleClickCart(); setToggle(false) }}>
                                <div className="icon-container">
                                    <FaShoppingCart className='icon' />
                                    <span class="amount">{amountTourInCart}</span>
                                </div>
                            </Link>
                        </li>}
                        {(permission === 'admin' || permission === 'user') && <li title='Đăng xuất' onClick={() => { setAccountSignSuccess({}); setIsSignInSuccess(false) }}>
                            <div className="icon-container">
                                <Link to='/' onClick={() => setToggle(false)}>
                                    <GoSignOut className='icon' />
                                </Link>
                            </div>
                        </li>}
                    </ul>
                </div>
            </div>
        </section>
    )
}
