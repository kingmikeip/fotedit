import React, {useState} from 'react'
import Header from './shared/Header'

// waiting for back end

// given share code - add edit to control panel

export default function EditAdd (props) {

    const [editCode, setEditCode] = useState('');
    let token = window.localStorage.getItem("Current User");

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

    const handleChange = (e) => {
        let temp = e.target.value;
        let name = e.target.name;
        setEditCode((prev)=>({...prev,[name]: temp}));
        console.log(editCode);
    }

    const addEdit = async (e) => {

    }

    return (
        <div>
            <Header />
        <div style={style.textwrapper}>
            <p style={style.welcometext}>Add an Edit</p>
            <p style={style.welcometextsm}>Please enter an edit code and it will be added to your list of current edits.</p>

            <form style={style.formposition}>
                <div>
                    <input type="text" placeholder="Edit Code" name="editcode" style={style.formstyle} onChange={handleChange}></input>
                </div>
                <button style={style.loginbutton}>Add Edit</button>

            </form>
        </div>
        </div>
    )
}