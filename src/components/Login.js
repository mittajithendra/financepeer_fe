import { useState,useEffect } from 'react';
import { NavLink,useNavigate  } from 'react-router-dom'
import '../App.css';

function Login() {
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    const [error,setError] = useState("");

    useEffect(()=>{
      localStorage.removeItem("token");
    },[])
    let navigate = useNavigate();
    function userlogin(){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username:username,password:password })
    };

      fetch('http://127.0.0.1:8000/api/login/', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if(data.rc.returncode=='0'){
                          localStorage.setItem('token',data.jwt)
                          navigate('/upload', { replace: true})
                        }else{
                          setError(data.rc.errorMessage);
                        }
                    }
                    );
    }

    return (
      <div className='inputForm'>
        <p >Login</p>
        <input className="input" type="text" placeholder='Email' value={username} onChange={e => setusername(e.target.value)}/>
        <input className="input" type="password" placeholder='Password' value={password} onChange={e => setpassword(e.target.value)}/>
        <button className="input" onClick={userlogin}>Login</button>
        <button className="input" onClick={()=>navigate("/signUp")}>Signup</button>
      </div>
    );
  }
  
  export default Login;