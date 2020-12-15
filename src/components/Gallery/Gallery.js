import React from 'react'
import Masonry from "react-responsive-masonry"
import { BiPhotoAlbum } from 'react-icons/bi'
import './Gallery.css'
import Image1 from '../../images/gallery1.jpg'
import Image2 from '../../images/gallery2.jpg'
import Image3 from '../../images/gallery3.jpg'
import Image4 from '../../images/gallery4.jpg'
import Image5 from '../../images/gallery5.jpg'
import Image6 from '../../images/gallery6.jpg'
import Image7 from '../../images/gallery7.jpg'
import Image8 from '../../images/gallery8.jpg'
import Image9 from '../../images/gallery9.jpg'
import Image10 from '../../images/gallery10.jpg'
import Image11 from '../../images/gallery11.jpg'
import Image12 from '../../images/gallery12.jpg'

export default function Gallery() {
    const srcImages = [Image9, Image10, Image3, Image7, Image1,
        Image12, Image2, Image4, Image11, Image5, Image8, Image6];

    return (
        <section id="gallery">
            <div className="container">
                <div className="title">
                    <h1>Bộ sưu tập ảnh</h1>
                    <p>Bộ sưu tập những hình ảnh đẹp từ khắp nơi trên thế giới</p>
                    <span><BiPhotoAlbum className="icon"></BiPhotoAlbum></span>
                </div>
                <Masonry
                    columnsCount={3}
                    gutter={'10px'}
                >
                    {srcImages.map((src, index) => (
                        <img src={src} alt="image" key={index} />
                    ))}
                </Masonry>
            </div>
        </section>
    )
}
