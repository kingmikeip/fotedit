import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './shared/Header';
import axios from 'axios';
import landlord from '../assets/landlord.png'
import ApiLink from './shared/ApiLink';
const apiUrl = ApiLink;


// useEffect checks auth token
// retrieve's user's name and list of edits

export default function ControlPanel(props) {

    // const [name,setName] = useState('User');
    const [user, setUser] = useState({});
    const [galleries, setGalleries] = useState([]);
    const [edits, setEdits] = useState([]);

    let history = useHistory();
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
            marginTop: "10vh",
            width: "40vw",
            backgroundColor: "white"
        },
        editbox: {
            width: "80%",
            height: "auto",
            minHeight: "80%",
            backgroundColor: "lightblue",
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
            // background: "lightblue",
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
        },
        link: {
            color: "black",
            textDecoration: "none",
            fontSize: "20px",
            fontFamily: "Helvetica",
            fontWeight: "bold"
        },
        ownericon: {
            width: '20px',
            height: '20px'
        },
        gallerylink: {
            textDecoration: 'none',
            color: "black"
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
        getEdits();
    }, [])

    const getGalleries = async () => {
        try {
            let response = await axios({
                url: `${apiUrl}/galleries`,
                method: 'GET',
                headers: { 'authorization': `bearer ${token}` }
            })
            // console.log(response.data)
            setGalleries(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    const getEdits = async () => {
        try {
            let response = await axios({
                url: `${apiUrl}/galleries/edit`,
                method: 'GET',
                headers: { 'authorization': `bearer ${token}` }
            })
            setEdits(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    const deleteGallery = async (e) => {
        let galleryId = e.target.getAttribute('id');
        let galleryTitle = e.target.getAttribute('title');
        let deleteCheck = prompt(`Are you sure you want to delete?\nPlease type '${galleryTitle}' to confirm`);
        if (deleteCheck === galleryTitle) {
            try {
                await axios({
                    method: 'DELETE',
                    url: `${apiUrl}/galleries/${galleryId}`,
                    headers: { 'authorization': `bearer ${token}` }
                })
            } catch (error) {
                console.log(error)
            }

            await getGalleries();
            await getEdits();
        }
    }

    const shareGallery = (id, title, sharecode) => {
        history.push({
            pathname: '/edit-share',
            state: { id: id, title: title, name: user.name, sharecode: sharecode }
        });
    }


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
                                <p style={style.galleryitem}><Link to={`/gallery/${gallery.id}`} style={style.gallerylink}>{gallery.title} <img src={landlord} style={style.ownericon}/></Link></p>
                                <div style={style.galleryactions}><p style={style.galleryactionstext} onClick={() => shareGallery(gallery.id, gallery.title, gallery.sharecode)}>Share</p></div>
                                <div style={style.galleryactions}><p style={style.galleryactionstext} onClick={deleteGallery} id={gallery.id} title={gallery.title}>Delete</p></div>
                            </div>
                        })}
                        {edits && edits.map((edit, index) => {
                            return <div style={style.galleryitemcontainer} key={index}>
                                <p style={style.galleryitem}><Link to={`/gallery/${edit.id}`} style={style.gallerylink}>{edit.title}</Link></p>
                                <div style={style.galleryactions}><p style={style.galleryactionstext} onClick={() => shareGallery(edit.id, edit.title, edit.sharecode)}>Share</p></div>
                                <div style={style.galleryactions}><p style={style.galleryactionstext} onClick={deleteGallery} id={edit.id} title={edit.title}>Delete</p></div>
                            </div>

                        })}

                    </div>
                </div>
                <div style={style.rightdiv}>
                    <p><Link to={`/user-details/${user.id}`} style={style.link}>Account Info</Link></p>
                    {/* Link to User Details** */}
                    <p><Link to="/gallery-create" style={style.link}>Create New Edit</Link></p>
                    {/* Link to Gallery Create */}
                    <p><Link to='/edit-add' style={style.link}>Add an Edit</Link></p>
                    {/* Link to Edit Add */}
                </div>
            </div>
        </div>
    )
}