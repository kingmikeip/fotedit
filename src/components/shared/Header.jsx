// build in drop down menus -- replace Navlink 

import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'

export default function Header (){
    let history = useHistory();

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

    const logOut = () => {
        window.localStorage.removeItem("Current User");
        history.push('/');
    }

    return (
        <div style={style.header}>
            <NavLink to='/' style={style.fontsize}>File</NavLink>
            <NavLink to='/cp' style={style.fontsize}>Control</NavLink>
            <NavLink to='/help' style={style.fontsize}>Help</NavLink>
            <NavLink to='/' style={style.fontsize} onClick={logOut}>Log Out</NavLink>
        </div>
    )
}