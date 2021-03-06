import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from './shared/Header';
import DropdownButton from 'react-bootstrap/DropdownButton'
import ApiLink from './shared/ApiLink';
const apiUrl = ApiLink;

// still needs to save sequence and selects
// order, reload, save, zoom and sort-by




export default function GalleryView(props) {
    const [height, setHeight] = useState('25vw');
    const [width, setWidth] = useState('25vw')
    const [images, setImages] = useState([]);
    const [imgProps, setImgProps] = useState({});
    const [open, setOpen] = useState(false);
    const [zoom, setZoom] = useState('large')
    let location = useLocation();
    let history = useHistory();
    let container = useRef();

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
            height: "20%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center"
        },
        checkbox: {
            width: "20px",
            height: "20px",
            margin: "0 5px"
        },
        numberbox: {
            width: "20%",
            maxWidth: "60px",
            height: "80%",
            fontSize: "3vh",
            border: "0",
            margin: "0"

        },
        zoomcontainer: {
            display: "inline-block",
            position: "relative"
        },
        zoombutton: {
            padding: "0",
            width: '50px',
            border: '0',
            backgroundColor: '#fff',
            color: '#333',
            cursor: 'pointer',
            outline: '0',
            fontSize: '40px'
        },
        zoomdropdown: {
            position: "absolute",
            top: "100%",
            left: '10px',
            width: "12vw",
            zIndex: '999',
            backgroundColor: "rgba(255,255,255,0.7)",
            border: '1px solid rgba(0,0,0,0.04)',
            boxShadow: '0 16px 24px 2px rgba(0,0,0,0.14)'
        },
        zoomul: {
            listStyle: "none",
            padding: "0",
            margin: "0"
        },
        zoomli: {
            padding: "8px 12px",
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
        document.addEventListener("mousedown", handleClickOutside);

        return () => { document.removeEventListener("mousedown", handleClickOutside) }
    }, [])


    const reloadPage = async () => {
        if (Object.keys(imgProps).length !== 0) {
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
        if (e.target.type === 'checkbox') {
            setImgProps((prev) => ({ ...prev, [name]: { ...imgProps[name], "select": isChecked } }))
            console.log(e.target.checked)
        } else {
            setImgProps((prev) => ({ ...prev, [name]: { ...imgProps[name], "sequence": temp } }))
        }
        console.log(imgProps);

    }

    const saveChange = async () => {
        const changes = Object.entries(imgProps);
        // console.log(changes)
        changes.map(async (change) => {
            await saveImageProps(change);
        })
    }

    const saveImageProps = async (image) => {
        // saves changes user made -- use for ... in
        try {
            let response = await axios({
                method: 'PUT',
                url: `${apiUrl}/galleries/${location}/photos/${image[0]}`,
                data: { isselected: image[1].select, sequencenumber: image[1].sequence },
                headers: { 'authorization': `bearer ${token}` }
            })
            console.log(response);
            // console.log(image[1].select, image[1].sequence)
        } catch (error) {
            console.log(error);
        }

    }

    const handleButtonClick = () => {
        setOpen(!open);
    }

    const handleClickOutside = (event) => {
        if (container.current && !container.current.contains(event.target)) {
            setOpen(false);
        }
    }

    const biggerImage = (id) => {
        history.push(`/gallery/${location}/image/${id}`)
    }

    const handleZoom = (e) => {
        // e.preventDefault();
        let name = e.target.getAttribute('name');

        setOpen(!open);

        // console.log(name);
        switch (name) {
            case 'small':
                setHeight('15vh');
                setWidth('15vw');
                break;
            case 'medium':
                setHeight('25vh');
                setWidth('25vw');
                break;
            case 'large':
                setHeight('33vh');
                setWidth('33vw');
                break;
            case 'xlarge':
                setHeight('45vh');
                setWidth('45vw');
                break;
            default:
                setHeight('25vh');
                setWidth('25vw');
                break;
        }
    }

    return (
        <div>
            <Header />
            <div style={style.buttoncontainer}>
                <button style={style.buttonstyle} onClick={reloadPage}>Reload</button>
                <button style={style.buttonstyle}>Sort By</button>
                {/* <button style={style.buttonstyle}>Zoom</button> */}

                <div style={style.zoomcontainer} ref={container}>
                    <button style={style.buttonstyle} onClick={handleButtonClick}>Zoom</button>
                    {/* <button type="button" style={style.zoombutton} onClick={handleButtonClick}>
                    O
                </button> */}
                    {open && (

                        <div style={style.zoomdropdown}>
                            <ul style={style.zoomul}>
                                <li style={style.zoomli} name="small" onClick={handleZoom}>Small</li>
                                <li style={style.zoomli} name="medium" onClick={handleZoom}>Medium</li>
                                <li style={style.zoomli} name="large" onClick={handleZoom}>Large</li>
                                <li style={style.zoomli} name="xlarge" onClick={handleZoom}>X-Large</li>
                            </ul>
                        </div>
                    )
                    }
                </div>

                <button style={style.buttonstyle}>EditName</button>
                <button style={style.buttonstyle} onClick={saveChange}>Save</button>
            </div>
            <div style={style.gallerycontainer}>
                {/* Placeholder divs */}
                {images && images.sort((a, b) => { return a.sequencenumber - b.sequencenumber }).map((image, index) => {

                    return (

                        <div style={style.imagecontainer} key={index}>
                            {/* <Link to={`/image/${image.id}`}> */}
                            <img src={image.photourl} style={style.imgdimensions} onDoubleClick={() => biggerImage(image.id)} />

                            <div style={style.checkboxdiv}>
                                <input type="text" name={image.id} defaultValue={image.sequencenumber} style={style.numberbox} onChange={handleChange} />
                                <input type="checkbox" name={image.id} style={style.checkbox} onChange={handleChange} defaultChecked={image.isselected ? "checked" : ""} />
                            </div>
                        </div>

                    )
                })}

            </div>
        </div>
    )
}