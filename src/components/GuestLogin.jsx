import React from 'react'
import { Link, useLocation } from 'react-router-dom'

// awaiting backend route

export default function GuestLogin(props) {
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
        },
        welcometext: {
            fontSize: "45px"
        },
        textwrapper: {
            margin: "0 auto",
            width: "70vw"
        }
    }

    let location = useLocation();
    let search = location.search.split("=")[1]
    // console.log(search)
    // handleChange
    // submit

    return (
        <div>
            <div style={style.textwrapper}>
                <p style={style.welcometext}>Welcome! Please enter your name and your edit code we'll get started!</p>
            </div>

            <form style={style.formposition}>
                <div>
                    <input type="text" placeholder="Your Name" style={style.formstyle}></input>
                </div>
                <div>
                    <input type="text" placeholder="Edit Code" style={style.formstyle} name="editcode" defaultValue={search}></input>
                </div>
                <button style={style.loginbutton}>Let's Go!</button>

            </form>
        </div>
    )
}