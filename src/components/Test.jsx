import React, {useState, useEffect, useRef} from 'react'

export default function Test() {

    const [open, setOpen] = useState(false);
    let container = useRef();

    const handleButtonClick = () => {
        setOpen(!open);
    }

    const style = {
        container: {
            display: "inline-block",
            position: "relative"
        },
        button: {
            padding: "0",
            width: '50px',
            border: '0',
            backgroundColor: '#fff',
            color: '#333',
            cursor: 'pointer',
            outline: '0',
            fontSize: '40px'
        },
        dropdown: {
            position: "absolute",
            top: "100%",
            left: '0',
            width: "300px",
            zIndex: '999',
            border: '1px solid rgba(0,0,0,0.04)',
            boxShadow: '0 16px 24px 2px rgba(0,0,0,0.14)'
        },
        ul: {
            listStyle: "none",
            padding: "0",
            margin: "0"
        },
        li: {
            padding: "8px 12px",
        }

    }

    useEffect(()=>{
        document.addEventListener("mousedown", handleClickOutside);

        return ()=> {document.removeEventListener("mousedown", handleClickOutside)}
    },[])

    const handleClickOutside = (event) => {
        if (container.current && !container.current.contains(event.target)){
            setOpen(false);
        }
    }

    return (
        <div className="App">
            <div style={style.container} ref={container}>
                <button type="button" style={style.button} onClick={handleButtonClick}>
                    O
                </button>
                {open && (

                    <div style={style.dropdown}>
                    <ul style={style.ul}>
                        <li style={style.li}>Option 1</li>
                        <li style={style.li}>Option 2</li>
                        <li style={style.li}>Option 3</li>
                        <li style={style.li}>Option 4</li>
                    </ul>
                </div>
                )
                }
            </div>
        </div>
    )
}