import React, { useState } from "react";
import {NavLink,useNavigate } from 'react-router-dom'


function FileUpload({ children }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [count,setCount] = useState(0);
  let navigate = useNavigate();

  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
        try{
            var data = JSON.parse(e.target.result);
            let i=0;
            for(i;i<data.length;i++){
                if(!data[i].hasOwnProperty('userId') || !data[i].hasOwnProperty('id') || !data[i].hasOwnProperty('title') || !data[i].hasOwnProperty('body')){
                    setError("Few Attributes are missing in Objects");
                    break;
                }

            }
            if(i==data.length){
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ blogs: data,jwt:localStorage.getItem('token') })
                };
                fetch('http://127.0.0.1:8000/api/', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if(data.rc.returncode =="0"){
                          setCount(data.count);
                        }else if(data.rc.errorCode=="Reg"){
                          navigate('/login');
                        }
                        
                    }
                    );

                setFiles(data);

            }

            
        }
        catch(err){
            setError("Please Recheck the File");
        }
        
    };
  };
  return (
    <>
      <h1>Upload Json file to add Content</h1>

      <input type="file" onChange={handleChange} accept="application/JSON"/>
      <br />
      {count+ " Records of data added"}
      {error}
      
    </>
  );
}



export default FileUpload