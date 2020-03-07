import React from 'react'
import { Link } from 'react-router-dom'
import Splash from './shared/Splash'

// to do await backend auth

export default function UserLogin(props) {
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
    
    // handleChange
    // submit

    return (
        <div>
            <Splash />
            <form style={style.formposition}>
                <div>
                <input type="text" placeholder="Email" style={style.formstyle}></input>
                </div>
                <div>
                <input type="text" placeholder="Password" style={style.formstyle}></input>
                </div>
                <button style={style.loginbutton}>Login</button>
                <p>Guest Editor?</p>
            </form>
        </div>
    )
}