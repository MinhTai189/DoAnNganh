import React, { useEffect, useRef, useState } from 'react'
import './BtnScrollTop.css'
import { ImArrowUp2 } from 'react-icons/im'

const onClick = () => {
    window.scrollTo(0, 0);
}

export default function BtnScrollTop() {
    const [className, setClassName] = useState('');
    const scroll = useRef();

    const handleScroll = () => {
        let temp;
        if (window.scrollY > 1000)
            temp = 'active';
        else temp = '';
        setClassName(temp);
    }

    window.addEventListener('scroll', handleScroll);

    return (
        <div className={'btn-scroll ' + className} ref={scroll} onClick={() => onClick()}>
            <div className="icon-container">
                <ImArrowUp2 className='icon' />
            </div>
        </div>
    )
}
