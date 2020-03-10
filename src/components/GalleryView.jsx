import React, { useState, useEffect } from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from './shared/Header';
// still needs to save sequence and selects
// order, reload, save, zoom and sort-by


const apiUrl = 'http://localhost:3000';


export default function GalleryView(props) {
    const [height, setHeight] = useState('25vw');
    const [width, setWidth] = useState('25vw')
    const [images, setImages] = useState([]);
    const [imgProps, setImgProps] = useState({});
    let location = useLocation();
    let history = useHistory();

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
            flexWrap: "wrap",
            justifyContent: "space-between"
        },
        imagecontainer: {
            width: width,
            height: height,
            border: "1px solid LightGray",
            margin: "2px",
            backgroundColor: "LightGray",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        },
        imgdimensions: {
            width: "80%",
            height: "80%",
            objectFit: "contain"
        },
        checkboxdiv: {
            width: "100%",
            textAlign: "right"
        },
        checkbox: {
            width: "20px",
            height: "20px"
        },
        numberbox: {
            width: "30px",
            height: "20px"
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

    // const readIptc = async () => {

    //     let metadata;
    //     images && images.map(async (image, index) => {
    //         metadata = iptc(image)
    //         console.log(metadata);
    //     });
    // }

    // readIptc();

    const handleChange = (e) => {
        console.log(e.target.type);
        let temp = e.target.value;
        let isChecked = e.target.checked;
        let name = e.target.name;
        if (e.target.type==='checkbox'){
            setImgProps((prev) => ({ ...prev, [name]: {...imgProps[name], "select": isChecked}}))
            console.log(e.target.checked)
        } else {
            setImgProps((prev) => ({ ...prev, [name]: {...imgProps[name], "sequence": temp}}))
        }
        console.log(imgProps);

    }

    const saveChange = () => {
        // saves changes user made -- use for ... in
        // creates new "gallery" as edit

    }

    const biggerImage = (id) => {
        history.push(`/gallery/${location}/image/${id}`)
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
                {images && images.map((image, index) => {
                    return (
                        
                        <div style={style.imagecontainer} key={index}>
                            {/* <Link to={`/image/${image.id}`}> */}
                            <img src={image.photourl} style={style.imgdimensions} onDoubleClick={() => biggerImage(image.id)}/>
               
                            <div style={style.checkboxdiv}>
                                <input type="text" name={image.id} defaultValue={index} style={style.numberbox} onChange={handleChange} />
                                <input type="checkbox" name={image.id} style={style.checkbox} onChange={handleChange} />
                            </div>
                        </div>
                        
                    )
                })}

            </div>
        </div>
    )
}