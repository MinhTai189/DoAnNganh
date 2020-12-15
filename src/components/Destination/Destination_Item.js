import React from 'react'
import { GiPositionMarker } from "react-icons/gi";
import './Destination_Item.css'

export default function Destination_Item(props) {
    const { image, region } = props;

    return (
        <div className="card">
            <img src={image} alt="image" />
            <div className="card-content">
                <div className="place-container">
                    <div className="icon-container">
                        <GiPositionMarker className='icon' />
                    </div>
                    <h3 className="place">{region}</h3>
                </div>
                <button className='btn'>Khám phá ngay</button>
            </div>
        </div>
    )
}
