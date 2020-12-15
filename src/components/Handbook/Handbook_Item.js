import React from 'react'
import './Handbook_Item.css'

export default function Handbook_Item(props) {
    const { position, region, image, handbooks } = props;
    const urlImage = {
        backgroundImage: "url(" + image + ")"
    }
    return (
        <div className={"handbook-container " + position}>
            <div className="slide-left" style={urlImage}>
                <h2>{region}</h2>
            </div>
            <div className="slide-right">
                {handbooks && handbooks.map((item, key) => (
                    <div className="handbook" key={key}>
                        <a href="#">{item.title}</a>
                    </div>
                ))}
            </div>
        </div>
    )
}
