import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header (){
    const style = {
        header: {
            height: "6vh",
            backgroundColor: "DodgerBlue",
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
        },
        fontsize: {
            fontSize: '20px',
            fontWeight: 'bold',
            fontFamily: 'Helvetica',
            display: "inline-block",
            margin: "0 25px",
            alignItems: "center",
            textDecoration: "none",
            color: "white"
        }
    }
    return (
        <div style={style.header}>
            <NavLink to='/' style={style.fontsize}>File</NavLink>
            <NavLink to='/edit' style={style.fontsize}>Edit</NavLink>
            <NavLink to='/view' style={style.fontsize}>View</NavLink>
            <NavLink to='/help' style={style.fontsize}>Help</NavLink>
        </div>
    )
}