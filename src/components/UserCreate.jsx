import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ApiLink from './shared/ApiLink';
const apiUrl = ApiLink;

export default function UserCreate(props) {

    const [nameEmail, setNameEmail] = useState({});
    const [password, setPassword] = useState({});
    const [passwordOk, setPasswordOk] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [created, setCreated] = useState(false);
    const [countdown, setCountdown] = useState('5');

    let history = useHistory();

    const handleInput = (e) => {
        let temp = e.target.value;
        let name = e.target.name;
        if (name === 'password' || name === 'repeat') {
            setPassword((prev) => ({ ...prev, [name]: temp }))
            // console.log(password);
        } else {
            setNameEmail((prev) => ({ ...prev, [name]: temp }))
            // console.log(nameEmail);
        }
    }

    useEffect(() => {
        if (password.password && password.password.length < 8) {
            setPasswordOk(false);
        } else {
            setPasswordOk(true);
        }
        if (password.password !== password.repeat) {
            setPasswordMatch(false);
        } else {
            setPasswordMatch(true)
        }
    }, [password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log("creating user")
        try {
            let response = await axios({
                url: `${apiUrl}/users`,
                method: 'POST',
                data: {
                    user:
                    {
                        name: nameEmail.name,
                        email: nameEmail.email,
                        password: password.password
                    }
                }
            })
            console.log(response.data);
            window.localStorage.setItem("Current User", response.data.token);
            setCreated(true);

            let counter = 5;
            let interval;

            interval = setInterval(() => {
                counter = counter - 1;
                setCountdown(counter)
                console.log(counter);
                if (counter == 0) {
                    clearInterval(interval);
                    return history.push('/');
                }
            }, 1000);


        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    const style = {
        formstyle: {
            width: "20vw",
            minWidth: "200px",
            height: "6vh",
            minHeight: "20px",
            margin: "10px",
            borderRadius: "6px",
            fontSize: "20px"
        },
        formposition: {
            // position: "relative",
            top: "35%",
            left: "40%",
            textAlign: "center"
        },
        createbutton: {
            width: "14vw",
            minWidth: "140px",
            height: "5vh",
            minHeight: "25px",
            borderRadius: "6px",
            backgroundColor: "DodgerBlue",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            margin: "10px 0 0 0"
        },
        headerstyle: {
            fontSize: "45px",
            fontWeight: "bold"
        },
        passwordtext: {
            color: "red",
            fontWeight: "bold"
        }
    }
    return (
        <div>
            <p style={style.headerstyle}>Create Your Account</p>
            <form style={style.formposition}>
                <p>Create your account and let's get started!</p>
                <div>
                    <input type="text" placeholder="Your Name" name="name" style={style.formstyle} onChange={handleInput} value={nameEmail.name}></input>
                </div>
                <div>
                    <input type="text" placeholder="Email" name="email" style={style.formstyle} onChange={handleInput} value={nameEmail.email}></input>
                </div>
                <div>
                    <input type="password" placeholder="Password" name="password" style={style.formstyle} onChange={handleInput} value={password.password}></input>
                    <input type="password" placeholder="Repeat Password" name="repeat" style={style.formstyle} onChange={handleInput} value={password.repeat}></input>
                </div>
                <div>
                    <p style={style.passwordtext}>{passwordMatch ? '' : 'Passwords do not match'}</p>
                    <p style={style.passwordtext}>{passwordOk ? "" : "Password must be at least 8 characters"}</p>
                </div>
                <button style={style.createbutton} onClick={handleSubmit} disabled={!passwordOk}>Create Account</button>
                <p>{created ? `Account created! Re-directing in ${countdown} seconds` : ""}</p>
            </form>
        </div>
    )
}