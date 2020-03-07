import React, {useState} from 'react';
import Header from './shared/Header';
import cat001 from './assets/cat001.jpg'
import cat002 from './assets/cat002.jpg'
import cat003 from './assets/cat003.jpg'
import cat004 from './assets/cat004.jpg'
import cat005 from './assets/cat005.jpg'
import cat006 from './assets/cat006.jpg'
import cat007 from './assets/cat007.jpg'
import cat008 from './assets/cat008.jpg'
import cat009 from './assets/cat009.jpg'

// awaiting backend get

export default function GalleryView(props) {
    const [height, setHeight] = useState('25vw');
    const [width, setWidth] = useState('25vw')


    const style = {
        buttonstyle: {
            width: "12vw",
            minWidth: "80px",
            height: "5vh",
            minHeight: "25px",
            borderRadius: "10px",
            margin: "0 10px",
            textAlign: "center",
            fontSize: "16px"
        },
        buttoncontainer: {
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0"
        },
        gallerycontainer: {
            width: "95vw",
            border: "2px solid DodgerBlue",
            height: "auto",
            minHeight: "80vh",
            margin: "0 2.5%",
            display: "flex",
            flexWrap: "wrap"
        },
        imagecontainer: {
            width: width,
            height: height,
            border: "1px solid LightGray",
            margin: "2px",
            backgroundColor: "LightGray"
        },
        imgdimensions: {
            width: "90%",
            height: "90%",
            objectFit: "contain"
        }

    }
    return (
        <div>
            <Header />
            <div style={style.buttoncontainer}>
                <button style={style.buttonstyle}>Reload</button>
                <button style={style.buttonstyle}>Sort By</button>
                <button style={style.buttonstyle}>Zoom</button>
                <button style={style.buttonstyle}>EditName</button>
                <button style={style.buttonstyle}>Save</button>
            </div>
            <div style={style.gallerycontainer}>
                {/* Placeholder divs */}
                <div style={style.imagecontainer}><img src={cat001} style={style.imgdimensions}/></div>
                <div style={style.imagecontainer}><img src={cat002} style={style.imgdimensions}/></div>
                <div style={style.imagecontainer}><img src={cat003} style={style.imgdimensions}/></div>
                <div style={style.imagecontainer}><img src={cat004} style={style.imgdimensions}/></div>
                <div style={style.imagecontainer}><img src={cat005} style={style.imgdimensions}/></div>
                <div style={style.imagecontainer}><img src={cat006} style={style.imgdimensions}/></div>
                <div style={style.imagecontainer}><img src={cat007} style={style.imgdimensions}/></div>
                <div style={style.imagecontainer}><img src={cat008} style={style.imgdimensions}/></div>
                <div style={style.imagecontainer}><img src={cat009} style={style.imgdimensions}/></div>
                <div style={style.imagecontainer}></div>
            </div>
        </div>
    )
}