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

    useEffect(() => {
        // get all images for gallery and law it out

        getImages();


    }, [])


    const reloadPage = async () => {
        if (Object.keys(imgProps).length !==0){
            console.log(Object.keys(imgProps).length);
            await saveChange();
        }
        // await getImages();
        window.location.reload();
        // saves images then reloads it
    }

    const sortBy = () => {
        // file name
        // selected
        // sequence number
    }


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

    const saveChange = async () => {
        const changes = Object.entries(imgProps);
        // console.log(changes)
        changes.map(async (change)=>{
            await saveImageProps(change);
        })
    }

    const saveImageProps = async (image) => {
        // saves changes user made -- use for ... in
        try {
            let response = await axios({
                method: 'PUT',
                url: `${apiUrl}/galleries/${location}/photos/${image[0]}`,
                data: {isselected: image[1].select, sequencenumber: image[1].sequence},
                headers: {'authorization': `bearer ${token}`}
            })
            console.log(response);
            // console.log(image[1].select, image[1].sequence)
        } catch (error) {
            console.log(error);
        }

    }

    const biggerImage = (id) => {
        history.push(`/gallery/${location}/image/${id}`)
    }

    return (
        <div>
            <Header />
            <div style={style.buttoncontainer}>
                <button style={style.buttonstyle} onClick={reloadPage}>Reload</button>
                <button style={style.buttonstyle}>Sort By</button>
                <button style={style.buttonstyle}>Zoom</button>
                <button style={style.buttonstyle}>EditName</button>
                <button style={style.buttonstyle} onClick={saveChange}>Save</button>
            </div>
            <div style={style.gallerycontainer}>
                {/* Placeholder divs */}
                {images && images.sort((a,b)=>{return a.sequencenumber-b.sequencenumber}).map((image, index) => {
                    
                    return (
                        
                        <div style={style.imagecontainer} key={index}>
                            {/* <Link to={`/image/${image.id}`}> */}
                            <img src={image.photourl} style={style.imgdimensions} onDoubleClick={() => biggerImage(image.id)}/>
               
                            <div style={style.checkboxdiv}>
                                <input type="text" name={image.id} defaultValue={image.sequencenumber} style={style.numberbox} onChange={handleChange} />
                                <input type="checkbox" name={image.id} style={style.checkbox} onChange={handleChange} defaultChecked={image.isselected? "checked" : ""} />
                            </div>
                        </div>
                        
                    )
                })}

            </div>
        </div>
    )
}