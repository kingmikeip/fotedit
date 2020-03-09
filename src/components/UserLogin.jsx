import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Splash from './shared/Splash'
import axios from 'axios'

const apiUrl = 'http://localhost:3000'

// to do await backend auth

export default function UserLogin(props) {

    const [input, setInput] = useState({})
    let history = useHistory();

    const style = {
        formstyle: {
            width: "20vw",
            minWidth: "120px",
            height: "6vh",
            minHeight: "20px",
            margin: "10px",
            borderRadius: "6px",
            fontSize: "20px"
        },
        formposition: {
            position: "absolute",
            top: "40%",
            left: "40%",
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
        }
    }

    const handleChange = (e) => {
        // records input
        let name = e.target.name;
        let temp = e.target.value;
        setInput((prev) => ({ ...prev, [name]: temp }))
        // console.log(input)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            let response = await axios({
                url: `${apiUrl}/auth/login`,
                method: 'POST',
                data: { email: input.email, password: input.password}
            })
            console.log(response)
            window.localStorage.setItem("Current User", response.data.token )
            // goes to control panel
            if (response.status === 200){
                history.push('/cp')
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <Splash />
            <form style={style.formposition}>
                <div>
                    <input type="text" placeholder="Email" style={style.formstyle} onChange={handleChange} name="email"></input>
                </div>
                <div>
                    <input type="password" placeholder="Password" style={style.formstyle} onChange={handleChange} name="password"></input>
                </div>
                <button style={style.loginbutton} onClick={handleSubmit}>Login</button>
                <p>Guest Editor?</p>
            </form>
        </div>
    )
}