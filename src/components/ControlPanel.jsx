import React from 'react'

// useEffect checks auth token
// retrieve's user's name and list of edits

export default function ControlPanel(props) {
    const style = {
        parentdiv: {
            display: "flex",
            flexDirection: "row",
            height: "auto",
            minHeight: "100vh"
        },
        leftdiv: {
            width: "60vw",
            backgroundColor: "red"
        },
        rightdiv: {
            width: "40vw",
            backgroundColor: "green"
        },
        editbox: {
            width: "80%",
            height: "auto",
            minHeight: "80vh",
            backgroundColor: "pink",
            margin: "0 auto"

        }
    }
    return (
        <div style={style.parentdiv}>
            <div style={style.leftdiv}>
                <p>Welcome Back NAME</p>
                <div>
                    <p>Current Edits</p>
                </div>
                <div style={style.editbox}>Edits Box</div>
            </div>
            <div style={style.rightdiv}>
                <p>Account Info</p>
                <p>Create New Edit</p>
                <p>Add an Edit</p>
            </div>
        </div>
    )
}