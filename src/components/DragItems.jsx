import React, { useState } from 'react'
import Draggable, { DraggableCore } from 'react-draggable'
import google from '../assets/google.png'

// not an app component

export default function DragItems(props) {

    const [file, setFile] = useState(null)

    const handleFile = (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0]);
    }

    const fileUpload = async (e) => {
        const fd = new FormData();
        fd.append('image', file, file.name)
        // let response = await axios.post('./');
        console.log(file)

    }

    const [activeDrags, setActiveDrags] = useState(0);
    const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });
    const [controlledPosition, setControlledPosition] = useState({ x: -400, y: 200 })

    const handleDrag = (e, ui) => {
        const { x, y } = deltaPosition;
        setDeltaPosition({
            x: x + ui.deltaX,
            y: y + ui.deltaY,
        }
        );
    };

    const onStart = () => {
        setActiveDrags(activeDrags + 1);
    };

    const onStop = () => {
        setActiveDrags(activeDrags - 1);
    };


    return (
        <div>
            <input type="file" onChange={handleFile} />
            <button onClick={fileUpload}>Upload</button>
            <Draggable
                axis="both"
                handle=".handle"
                defaultPosition={{ x: 0, y: 0 }}
                position={null}
                grid={[50, 50]}
                scale={1}
                onStart={onStart}
                onDrag={handleDrag}
                onStop={onStop}>
                <div className="handle">
                    <div >Drag from here</div>
                    <img src={google} draggable="false" />
                    <div>This readme is really dragging on...</div>
                </div>
            </Draggable>
            <p>Active Drags: {activeDrags}</p>
        </div>
    )
}