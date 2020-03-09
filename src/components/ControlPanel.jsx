import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './shared/Header';
import axios from 'axios';
const apiUrl = 'http://localhost:3000';

// useEffect checks auth token
// retrieve's user's name and list of edits

export default function ControlPanel(props) {

    // const [name,setName] = useState('User');
    const [user, setUser] = useState({})
    const [galleries, setGalleries] = useState([])

    const style = {
        parentdiv: {
            display: "flex",
            flexDirection: "row",
            height: "auto",
            minHeight: "94vh"
        },
        leftdiv: {
            width: "60vw",
            backgroundColor: "white"
        },
        rightdiv: {
            width: "40vw",
            backgroundColor: "white"
        },
        editbox: {
            width: "80%",
            height: "auto",
            minHeight: "80%",
            backgroundColor: "pink",
            margin: "0 auto",
            borderRadius: "6px",
            padding: "5px"
        },
        welcometext: {
            fontSize: "24px",
            fontFamily: "Helvetica",
            fontWeight: "bold",
            margin: "10px 0"
        },
        edittext: {
            fontSize: "20px",
            fontFamily: "Helvetica",
            fontWeight: "bold",
            margin: "10px 0"
        },
        galleryitemcontainer: {
            display: "flex",
            background: "lightblue",
            width: "100%"
        },
        galleryitem: {
            fontFamily: "Helvetica",
            fontSize: "18px",
            textAlign: "left",
            marginLeft: "15px",
            width: "60%"
        },
        galleryactions: {
            width: "18%",
            marginRight: "10px"
        },
        galleryactionstext: {
            fontFamily: "Helvetica",
            fontSize: "18px",
            textAlign: "right",
            marginLeft: "15px"
        }
    }

    let token = window.localStorage.getItem("Current User")
    // console.log(token);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                let response = await axios({
                    url: `${apiUrl}/auth/verify`,
                    method: 'GET',
                    headers: { 'authorization': `bearer ${token}` }
                })
                setUser({
                    name: response.data.name,
                    email: response.data.email,
                    id: response.data.id,
                    group: response.data.group
                })

            } catch (error) {
                console.log(error);
            }
        }
        verifyUser();
        getGalleries();
    }, [])

    const getGalleries = async () => {
        try {
            let response = await axios({
                url: `${apiUrl}/galleries`,
                method: 'GET',
                headers: { 'authorization': `bearer ${token}` }
            })
            console.log(response.data)
            setGalleries(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    // if (user.id) {
    //     getGalleries();
    // }

    return (
        <div>
            <Header />
            <div style={style.parentdiv}>
                <div style={style.leftdiv}>
                    <p style={style.welcometext}>Welcome Back {user.name}!</p>
                    <div>
                        <p style={style.edittext}>Your Current Edits</p>
                    </div>
                    <div style={style.editbox}>
                        {galleries && galleries.map((gallery, index) => {
                            return <div style={style.galleryitemcontainer} key={index}>
                                <p style={style.galleryitem}>{gallery.title}</p>
                                <div style={style.galleryactions}><p style={style.galleryactionstext}>Share</p></div>
                                <div style={style.galleryactions}><p style={style.galleryactionstext}>Delete</p></div>
                            </div>
                        })}

                    </div>
                </div>
                <div style={style.rightdiv}>
                    <p>Account Info</p>
                    {/* Link to User Details** */}
                    <p>Create New Edit</p>
                    {/* Link to Gallery Create */}
                    <p>Add an Edit</p>
                    {/* Link to Edit Add */}
                </div>
            </div>
        </div>
    )
}