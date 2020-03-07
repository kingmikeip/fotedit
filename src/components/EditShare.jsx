import React from 'react'

// awaiting backend 

export default function EditShare(props) {
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
        subjectstyle: {
            width: "100%",
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
        submitbutton: {
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
        },
        descriptionformstyle: {
            width: "100%",
            minWidth: "350px",
            height: "25vh",
            minHeight: "100px",
            margin: "10px",
            borderRadius: "6px",
            fontSize: "20px",
            resize: "none"
        },
        formleft: {
            textAlign: "left"
        },
        formcontainer: {
            width: "60vw",
            margin: "0 auto"
        }
    }

    // handlechange
    // submit
    // generate share code?

    return (
        <div style={style.formcontainer}>
            <p style={style.welcometext}>Share Edit</p>
            <div style={style.formleft}>
                <input type="text" name="email" placeholder="Email address" style={style.formstyle} />
            </div>
            <div>
                <input type="text" name="subject" placeholder="Subject" style={style.subjectstyle} />
            </div>
            <div>
                <textarea placeholder="Email body" name="body" style={style.descriptionformstyle} />
            </div>
            <button style={style.submitbutton}>Send</button>
        </div>
    )
}