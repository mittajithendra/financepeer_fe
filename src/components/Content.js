import { useState,useEffect } from 'react';
import { NavLink,useNavigate  } from 'react-router-dom'

function Content() {

  const [records,setRecords] = useState([]);
  let navigate = useNavigate();
    useEffect(()=>{
      fetchRecords();
    },[])

    function fetchRecords(){
      fetch("http://127.0.0.1:8000/api/blogs/",{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jwt:localStorage.getItem("token") })
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
          if(data.rc.returncode !='0'){
            navigate("/login");
          }
          else{
            setRecords(data.data);
          }
          
      }
      );
    }

    return (
      <div>
        <h1>Content</h1>
        {records.map((val, key) => {
          return (
            <div style={{margin: '5px',background: 'black',color: 'white',padding: '10px'}}>
              <h3>{val.title}</h3>
              <p>{val.content}</p>
            </div>
          )
        })}
      </div>
    );
  }
  
  export default Content;