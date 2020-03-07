import React, { useState } from 'react'
import axios from 'axios'
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

    const galleryId = 1;
    const [file, setFile] = useState(null);
    const [gallery, setGallery] = useState({});

    const handleFile = (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0]);
    }

    const handleGallery = (e) => {
        let temp = e.target.value;
        let name = e.target.name;
        setGallery((prev) => ({ ...prev, [name]: temp }));
        console.log(gallery)
    }

    const fileUpload = async (e) => {
        // need to post gallery to get gallery ID to post images 
        const photo = new FormData();
        photo.append('picture', file, file.name)
        let response = await axios.post(`${apiUrl}/galleries/${galleryId}/photos`, photo);
        console.log(response)
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
                        <textarea placeholder="Description" name="comment" style={style.descriptionformstyle} onChange={handleGallery} maxlength="104"/>
                    </div>
                </div>
                <div>
                    <p>Upload your files here: </p>
                    <input type="file" multiple onChange={handleFile} style={style.uploadformstyle} />
                </div>
                <button style={style.loginbutton} onClick={fileUpload}>Upload</button>
            </form>
            {/* <DragItems/> */}
        </div>
    )
}