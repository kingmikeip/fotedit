import React from 'react'
import Header from './shared/Header'

export default function GalleryView (props) {
    const style = {
        buttonstyle: {
            width: "12vw",
            minWidth: "80px",
            height: "5vh",
            minHeight: "25px",
            borderRadius: "10px",
            margin: "0 10px",
            textAlign: "center",
            fontSize: "16px"
        },
        buttoncontainer: {
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0"
        }
    }
    return (
        <div>
            <Header/>
            <div style={style.buttoncontainer}>
            <button style={style.buttonstyle}>Reload</button>
            <button style={style.buttonstyle}>Sort By</button>
            <button style={style.buttonstyle}>Zoom</button>
            <button style={style.buttonstyle}>EditName</button>
            <button style={style.buttonstyle}>Save</button>
            </div>
        </div>
    )
}