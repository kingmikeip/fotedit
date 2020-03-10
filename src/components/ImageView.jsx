import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import Header from './shared/Header';
import axios from 'axios'

const apiUrl = 'http://localhost:3000';
// need image information

export default function ImageView(props) {
    let location = useLocation();
    let history = useHistory();
    let token = window.localStorage.getItem('Current User');
    const [image,setImage] = useState(null)

    const style = {
        bodystyle: {
            width: "100%",
            margin: "8px 0"
        },
        topstyle: {
            width: "98%",
            height: "75vh",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "0 auto"
        },
        imagestyle: {
            width: "80%",
            border: "1px solid black"
        },
        exifstyle: {
            width: "19%",
            border: "1px solid black"
        },
        captionstyle: {
            width: "98%",
            height: "15vh",
            border: "1px solid black",
            margin: "0 auto",
            marginTop: "10px"
        }
    }

    useEffect(()=>{
        location = location.pathname.split('/');
        console.log(location);
        const getImage = async () => {
            try{
                let response = await axios({
                    method: "GET",
                    url: `${apiUrl}/galleries/${location[2]}/photos/${location[4]}`,
                    headers: { 'authorization': `bearer ${token}` }
                })
                console.log(response.data)
                setImage(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getImage();
        
    },[])

    return (
        <div>
            <Header />
            <div style={style.bodystyle}>
                <div style={style.topstyle}>
                    <div style={style.imagestyle}><img src={image && image.photourl}/></div>
                    <div style={style.exifstyle}>Exif</div>
                </div>
                <div style={style.captionstyle}>Cpation Info</div>
            </div>
        </div>
    )
}