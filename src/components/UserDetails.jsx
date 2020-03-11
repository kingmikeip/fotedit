import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import Header from './shared/Header'
const apiUrl = 'http://localhost:3000'


export default function UserDetails() {
    let token = window.localStorage.getItem("Current User")
    let history = useHistory();
    let location = useLocation();
    let userId = location.pathname.split('/')[location.pathname.split('/').length - 1];
    // console.log(userId);

    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                let response = await axios({
                    url: `${apiUrl}/users/${userId}`,
                    method: 'GET',
                    headers: { 'authorization': `bearer ${token}` }
                })
                console.log(response.data);
                setUserInfo({
                    name: response.data.name,
                    email: response.data.email,
                    id: response.data.id,
                    group: response.data.group
                })

            } catch (error) {
                console.log(error)
            }
        }
        getUserInfo();

    }, [])

    const style = {
        topdiv: {
            display: 'flex',
            flexDirection: 'row',
            width: '100vw',
            justifyContent: 'center',
            alignItems: 'center'
        },
        titletext: {
            fontSize: "48px",
            fontFamily: "Helvetica",
            fontWeight: "bold",
            margin: "10px"
        },
        leftdiv: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'lightblue',
            width: "35%",
            padding: "10px",
            borderRight: "1px dashed black"
        },
        rightdiv: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'lightblue',
            width: "35%",
            padding: "10px"
        },
        infodiv: {
            display: "flex",
            height: "40px",
            justifyContent: "center",
            alignItems: "center",
            borderBottom: "1px solid black"
        },
        infodivpw: {
            display: "flex",
            flexDirection: "column",
            height: "80px",
            justifyContent: "center",
            alignItems: "center",
            borderBottom: "1px solid black"
        },
        infodivbottom: {
            display: "flex",
            height: "40px",
            justifyContent: "center",
            alignItems: "center"
        },
        text: {
            fontSize: '20px',
            fontWeight: 'bold',
            padding: "0",
            margin: "0",
            textAlign: "center"
        },
        passwordform: {
            fontSize: '20px',
            fontWeight: 'bold',
            padding: "0",
            margin: "0",
            textAlign: "center"
        }
    }

    const deleteUser = () => {
        // deletes user
    }

    const updatePassword = async () => {
        // update password
    }

    const updateInformation = async () => {
        // updateUserinfo
    }

    return (
        <div>
            <Header />
            <p style={style.titletext}>Account Details</p>
            <div style={style.topdiv}>
                <div style={style.leftdiv}>
                    <div style={style.infodiv}>
                        <p style={style.text}>User Id -></p>
                    </div>
                    <div style={style.infodiv}>
                        <p style={style.text}>Name -></p>
                    </div>
                    <div style={style.infodiv}>
                        <p style={style.text}>Email -></p>
                    </div>
                    <div style={style.infodiv}>
                        <p style={style.text}>Work Group -></p>
                    </div>
                    <div style={style.infodivpw}>
                        <p style={style.text}>Update Password -></p>
                    </div>
                    <div style={style.infodivbottom}>
                        <p style={style.text}>Delete Account -></p>
                    </div>
                </div>
                <div style={style.rightdiv}>
                    <div style={style.infodiv}>
                        <p style={style.text}>{userInfo && userInfo.id}</p>
                    </div>
                    <div style={style.infodiv}>
                        <input type="text" defaultValue={userInfo && userInfo.name} style={style.text} />
                    </div>
                    <div style={style.infodiv}>
                        <input type="text" defaultValue={userInfo && userInfo.email} style={style.text} />
                    </div>
                    <div style={style.infodiv}>
                        <p style={style.text}>{userInfo && userInfo.group || "None"}</p>
                    </div>
                    <div style={style.infodivpw}>
                        <div>
                            <input type="password" placeholder="Password" name="password" style={style.passwordform}></input>
                        </div>
                        <div>
                            <input type="password" placeholder="Repeat Password" style={style.passwordform}></input>
                        </div>
                    </div>
                    <div style={style.infodivbottom}>
                        <button><p style={style.text}>Delete Account</p></button>
                    </div>
                </div>
            </div>
        </div>
    )
}