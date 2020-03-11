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

    const [nameEmail, setNameEmail] = useState({});
    const [password, setPassword] = useState({});
    const [passwordOk, setPasswordOk] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);

    const [userInfo, setUserInfo] = useState({})

    const handleInput = (e) => {
        let temp = e.target.value;
        let name = e.target.name;
        if (name === 'password' || name === 'repeat') {
            setPassword((prev) => ({ ...prev, [name]: temp }))
            // if (password.password!=password.repeat){
            //     setPasswordOk(false);
            // } else if (password.password && password.password.length<8){
            //     setPasswordMatch(false);
            // }
            // console.log(password);
        } else {
            setNameEmail((prev) => ({ ...prev, [name]: temp }))
            console.log(nameEmail);
        }
    }

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
            height: "150px",
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
        middlediv: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            textAlign: "center"
        },
        middledivsub: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "lightblue",
            width: "70%",
            padding: "20px",
            textAlign: "center"
        },
        text: {
            fontSize: '20px',
            fontWeight: 'bold',
            padding: "0",
            margin: "0",
            textAlign: "center"
        },
        passwordbutton: {
            margin: "10px 0"
        },
        passwordform: {
            fontSize: '20px',
            fontWeight: 'bold',
            padding: "0",
            margin: "5px 0 10px 0",
            textAlign: "center"
        }
    }

    const deleteUser = () => {
        // deletes user
        alert(`Don't Delete Your Account!`)
    }

    const updatePassword = async () => {
        try {
            let response = await axios({
                url: `${apiUrl}/users/${userInfo.id}/change-password`,
                method: 'PUT',
                data: {password: password.password},
                headers: {'authorization': `bearer ${token}`}
            })
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }

    const checkPassword = async (e) => {
        e.preventDefault();
        // update password
        if (password.password === password.repeat) {
            // something
            if (password.password.length >= 8) {
                console.log("password is ok!")
                await updatePassword();
            } else {
                alert("Password must be at least 8 characters");
            }
        } else {
            alert("Passwords do not match!")
        }
    }

    const updateInformation = async (e) => {
        e.preventDefault();
        if (Object.keys(nameEmail).length === 0) {
            alert('There are no changes to your information!')
            return;
        }
        try {
            let response = await axios({
                method: "PUT",
                url: `${apiUrl}/users/${userId}`,
                data: { user: { name: nameEmail.name, email: nameEmail.email } },
                headers: { 'authorization': `bearer ${token}` }
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
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
                </div>
                <div style={style.rightdiv}>
                    <div style={style.infodiv}>
                        <p style={style.text}>{userInfo && userInfo.id}</p>
                    </div>
                    <div style={style.infodiv}>
                        <input type="text" defaultValue={userInfo && userInfo.name} style={style.text} onChange={handleInput} name="name" />
                    </div>
                    <div style={style.infodiv}>
                        <input type="text" defaultValue={userInfo && userInfo.email} style={style.text} onChange={handleInput} name="email" />
                    </div>
                    <div style={style.infodiv}>
                        <p style={style.text}>{userInfo && userInfo.group || "None"}</p>
                    </div>
                </div>
            </div>

            <div style={style.middlediv}>
                <div style={style.middledivsub}>
                    <button><p style={style.text} onClick={updateInformation}>Update Info</p></button>
                </div>
            </div>

            <div style={style.topdiv}>
                <div style={style.leftdiv}>
                    <div style={style.infodivpw}>
                        <p style={style.text}>Update Password -></p>
                    </div>
                    <div style={style.infodivbottom}>
                        <p style={style.text}>Delete Account -></p>
                    </div>
                </div>
                <div style={style.rightdiv}>
                    <div style={style.infodivpw}>
                        <div>
                            <input type="password" placeholder="Password" name="password" style={style.passwordform} onChange={handleInput} name="password" value={password.password}></input>
                        </div>
                        <div>
                            <input type="password" placeholder="Repeat Password" style={style.passwordform} onChange={handleInput} name="repeat" value={password.repeat}></input>
                        </div>
                        <button style={style.passwordbutton} onClick={checkPassword}><p style={style.text} >Update Password</p></button>
                        {/* <div>
                            <p style={style.passwordtext}>{passwordMatch ? '' : 'Passwords do not match'}</p>
                            <p style={style.passwordtext}>{passwordOk ? "" : "Password must be at least 8 characters"}</p>
                        </div> */}
                    </div>
                    <div style={style.infodivbottom}>
                        <button><p style={style.text} onClick={deleteUser}>Delete Account</p></button>
                    </div>
                </div>
            </div>
        </div>
    )
}