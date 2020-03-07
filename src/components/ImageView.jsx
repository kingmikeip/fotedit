import React from 'react'
import Header from './shared/Header'

// need image information

export default function ImageView(props) {
    const style = {
        bodystyle: {
            width: "100%",
            margin: "8px 0"
        },
        topstyle: {
            width: "98%",
            height: "75vh",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "0 auto"
        },
        imagestyle: {
            width: "80%",
            border: "1px solid black"
        },
        exifstyle: {
            width: "19%",
            border: "1px solid black"
        },
        captionstyle: {
            width: "98%",
            height: "15vh",
            border: "1px solid black",
            margin: "0 auto",
            marginTop: "10px"
        }
    }
    return (
        <div>
            <Header />
            <div style={style.bodystyle}>
                <div style={style.topstyle}>
                    <div style={style.imagestyle}>Image</div>
                    <div style={style.exifstyle}>Exif</div>
                </div>
                <div style={style.captionstyle}>Cpation Info</div>
            </div>
        </div>
    )
}