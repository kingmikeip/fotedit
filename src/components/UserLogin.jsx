import React from 'react'
import { Link } from 'react-router-dom'
import Splash from './shared/Splash'

export default function UserLogin(props) {
    const style = {
        formstyle: {
            width: "20vw",
            height: "6vh",
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
            height: "5vh",
            borderRadius: "6px",
            backgroundColor: "DodgerBlue",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            margin: "10px 0 0 0"
        }
    }
    

    return (
        <div>
            <Splash />
            <form style={style.formposition}>
                <div>
                <input type="text" placeholder="Username" style={style.formstyle}></input>
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