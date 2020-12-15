import React from 'react'
import { FaQuoteRight } from 'react-icons/fa'
import './Feedback_Item.css'

export default function Feedback_Item(props) {
    const { avatar, name, tour, quote } = props.data;
    const { position } = props;
    return (
        <div className={position ? `feedback ${position}` : `feedback`}>
            <div className="avatar">
                <img src={avatar} alt="avatar" />
            </div>
            <h3 className="name">{name}</h3>
            <h5 className="tour">{tour}</h5>
            <div className="icon-container">
                <FaQuoteRight className='icon'></FaQuoteRight>
            </div>
            <p>{quote}</p>
        </div>
    )
}
