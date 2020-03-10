// build in drop down menus -- replace Navlink 

import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'

export default function Header() {
    let history = useHistory();

    const style = {
        header: {
            height: "6vh",
            backgroundColor: "DodgerBlue",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
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

    // make Log Out on the right

    return (
        <div style={style.header}>
            <div>
                <NavLink to='/' style={style.fontsize}>File</NavLink>
                <NavLink to='/cp' style={style.fontsize}>Control</NavLink>
                <NavLink to='/help' style={style.fontsize}>Help</NavLink>
            </div>
            <div>
                <NavLink to='/' style={style.fontsize} onClick={logOut}>Log Out</NavLink>
            </div>
        </div>
    )
}