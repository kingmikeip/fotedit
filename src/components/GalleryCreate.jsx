import React, { useState } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
const apiUrl = 'http://localhost:3000'

// To Do - create gallery with axios post (awaiting backend routes)
// test multiple file uploads, single working

export default function GalleryCreate() {
    const style = {
        formstyle: {
            width: "30vw",
            minWidth: "120px",
            height: "6vh",
            minHeight: "20px",
            margin: "10px",
            borderRadius: "6px",
            fontSize: "20px",
            border: "1px solid black"
        },
        descriptionformstyle: {
            width: "30vw",
            minWidth: "120px",
            height: "15vh",
            minHeight: "40px",
            margin: "10px",
            borderRadius: "6px",
            fontSize: "20px",
            resize: "none"
        },
        uploadformstyle: {
            width: "30vw",
            minWidth: "120px",
            height: "6vh",
            minHeight: "20px",
            margin: "10px",
            borderRadius: "6px",
            fontSize: "20px"
        },
        formposition: {
            position: "absolute",
            top: "20%",
            left: "35%",
            textAlign: "center"
        },
        loginbutton: {
            width: "10vw",
            minWidth: "80px",
            height: "5vh",
            minHeight: "25px",
            borderRadius: "6px",
            backgroundColor: "DodgerBlue",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            margin: "10px 0 0 0"
        },
        toptext: {
            fontSize: "45px",
            fontFamily: "Helvetica",
            fontWeight: "bold"
        }
    }

    const [files, setFiles] = useState(null);
    const [gallery, setGallery] = useState({});
    const [galleryId, setGalleryId] = useState(null);
    let token = window.localStorage.getItem("Current User")
    let history = useHistory();
    const handleFile = (e) => {
        setFiles(e.target.files);
        // console.log(e.target.files);
    }

    const handleGallery = (e) => {
        let temp = e.target.value;
        let name = e.target.name;
        setGallery((prev) => ({ ...prev, [name]: temp }));
        // console.log(gallery)
    }

    const handleSubmit = async (e) => {
        let galleryTemp
        e.preventDefault();
        try {
            let response = await axios({
                url: `${apiUrl}/galleries`,
                method: 'POST',
                headers: {
                    'authorization': `bearer ${token}`
                },
                data: { gallery: { title: gallery.title, comment: gallery.comment } }
            })
            galleryTemp = response.data.id;
            setGalleryId(response.data.id)
        } catch (error) {
            console.log(error)
        }

        for (let i = 0; i < files.length; i++) {
            let photo = new FormData();
            photo.append('picture', files[i])
            // console.log(files[i])
            await fileUpload(photo,galleryTemp);
        }

        return history.push('/cp');

    }
    // deprecated function - left for legacy
    const createGallery = async () => {
        try {
            let response = await axios({
                url: `${apiUrl}/galleries`,
                method: 'POST',
                headers: {
                    'authorization': `bearer ${token}`
                },
                data: { gallery: { title: gallery.title, comment: gallery.comment } }
            })
            // console.log(response);
            setGalleryId(response.data.id)
        } catch (error) {
            console.log(error)
        }
    }

    const fileUpload = async (photo,galleryTemp) => {
        // need to post gallery to get gallery ID to post images 
        // let photo = new FormData();
        // for (let i = 0; i < files.length; i++) {
        //     photo.append('picture', files[i])
        //     // console.log(files[i])
        // }

        // console.log(galleryTemp)

        let token = window.localStorage.getItem("Current User")
        try {
            let response = await axios({
                url: `${apiUrl}/galleries/${galleryTemp}/photos`,
                headers: {
                    'authorization': `bearer ${token}`
                },
                method: 'POST',
                data: photo
                // onUploadProgress: progressEvent => {
                //     console.log(`Progress ${Math.round((progressEvent.loaded / progressEvent.total)*100)}`)
                // }
            });
            // console.log(response);

        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div>
            <p style={style.toptext}>Create A New Gallery</p>
            <form style={style.formposition}>
                <div>
                    <p>Please Name Your Gallery: </p>
                    <div>
                        <input type="text" placeholder="Gallery Name" name="title" style={style.formstyle} onChange={handleGallery}></input>
                    </div>
                    <div>
                        <textarea placeholder="Description" name="comment" style={style.descriptionformstyle} onChange={handleGallery} maxLength="104" />
                    </div>
                </div>
                <div>
                    <p>Upload your files here: </p>
                    <input type="file" multiple onChange={handleFile} style={style.uploadformstyle} />
                </div>
                <button style={style.loginbutton} onClick={handleSubmit}>Upload</button>
            </form>
            {/* <DragItems/> */}
        </div>
    )
}