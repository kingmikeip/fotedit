import React from 'react'
import Header from './shared/Header'

// waiting for back end

export default function EditAdd (props) {
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
            top: "50%",
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
            fontSize: "45px",
            fontWeight: "bold"
        },
        welcometextsm: {
            fontSize: "32px"
        },
        textwrapper: {
            margin: "0 auto",
            width: "70vw"
        }
    }
    return (
        <div>
            <Header />
        <div style={style.textwrapper}>
            <p style={style.welcometext}>Add an Edit</p>
            <p style={style.welcometextsm}>Please enter an edit code and it will be added to your list of current events.</p>

            <form style={style.formposition}>
                <div>
                    <input type="text" placeholder="Edit Code" style={style.formstyle}></input>
                </div>
                <button style={style.loginbutton}>Add Edit</button>

            </form>
        </div>
        </div>
    )
}