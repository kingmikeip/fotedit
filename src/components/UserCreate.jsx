// awaiting backend route
// upon user creation => control panel

import React from 'react'

export default function UserCreate(props) {
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
        }
    }
    return (
        <div>
            <p style={style.headerstyle}>Create Your Account</p>
            <form style={style.formposition}>
                <p>Create your account and let's get started!</p>
                <div>
                    <input type="text" placeholder="Your Name" style={style.formstyle}></input>
                </div>
                <div>
                    <input type="text" placeholder="Email" style={style.formstyle}></input>
                </div>
                <div>
                    <input type="password" placeholder="Password" style={style.formstyle}></input>
                </div>
                <button style={style.createbutton}>Create Account</button>
            </form>
        </div>
    )
}