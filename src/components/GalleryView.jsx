import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from './shared/Header';

const apiUrl = 'http://localhost:3000';

// awaiting backend get

export default function GalleryView(props) {
    const [height, setHeight] = useState('25vw');
    const [width, setWidth] = useState('25vw')
    const [images, setImages] = useState([]);
    let location = useLocation();
    location = location.pathname.split('/')[location.pathname.split('/').length - 1]
    console.log(location);
    let token = window.localStorage.getItem('Current User');

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

    useEffect(() => {
        // get all images for gallery and law it out

        const getImages = async () => {
            try {
                let response = await axios({
                    url: `${apiUrl}/galleries/${location}/photos`,
                    headers: { 'authorization': `bearer ${token}` },
                    method: 'GET'
                })
                console.log(response)
                setImages(response.data);

            } catch (error) {
                console.log(error)
            }
        }

        getImages();


    }, [])


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
                {images && images.map((image, index) => {
                    return (
                        <div style={style.imagecontainer} key={index}><img src={image.photourl} style={style.imgdimensions}/></div>
                    )
                })}

            </div>
        </div>
    )
}