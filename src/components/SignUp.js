import { useState } from 'react';
import { NavLink,useNavigate  } from 'react-router-dom'
import '../App.css';

function SignUp() {
  const [fullname,setfullname] = useState("");
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    const [error,setError] = useState("");

    let navigate = useNavigate();
    function userSignUp(){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fullname,username:username,password:password })
    };

      fetch('http://127.0.0.1:8000/api/register/', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if(data.rc.returncode=='0'){
                          navigate('/login', { replace: true})
                        }else{
                          setError(data.rc.errorMessage);
                        }
                    }
                    );
    }

    return (
      <div class="inputForm">
        <p>SignUp</p>
        <input type="text" className="input" placeholder='FullName' value={fullname} onChange={e => setfullname(e.target.value)}/>
        <input type="text" className="input" placeholder='Email' value={username} onChange={e => setusername(e.target.value)}/>
        <input type="password" className="input" placeholder='Password' value={password} onChange={e => setpassword(e.target.value)}/>
        <button className="input" onClick={userSignUp}>SignUp</button>
        <button className="input" onClick={()=>navigate("/login")}>Login</button>
      </div>
    );
  }
  
  export default SignUp;