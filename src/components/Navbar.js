import '../App.css'
import { NavLink  } from 'react-router-dom'

function Navbar(){
    return(
        <ul>
            <li><a><NavLink to="/upload">File Upload</NavLink></a></li>
            <li><a><NavLink to="/content">Content</NavLink></a></li>
            <li style={{float:'right'}}><a><NavLink to="/login">Logout</NavLink></a></li>
        </ul>
    )
}

export default Navbar;