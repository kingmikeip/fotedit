import React, {useState} from 'react';
import './App.css';
import DragItems from './components/DragItems'
// import axios from 'axios'

function App() {
  // const [file,setFile] = useState(null)

  // const handleFile = (e) => {
  //   setFile(e.target.files[0]);
  //   console.log(e.target.files[0]);
  // }

  // const fileUpload = async (e) => {
  //   const fd = new FormData();
  //   fd.append('image', file, file.name)
  //   // let response = await axios.post('./');
  //   console.log(file)

  // }
// add multiple in input for multiple files
  return (
    <div className="App">
      {/* <input type="file" onChange={handleFile}/>
      <button onClick={fileUpload}>Upload</button> */}
      <DragItems/>
    </div>
  );
}

export default App;
