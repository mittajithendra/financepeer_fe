import './App.css';
import FileUpload from './components/FileUpload';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Content from './components/Content';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Logout from './components/Logout';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import { useEffect } from 'react';

function App() {
  
  return (
    <div className="App">
      <Router>
        <div>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/upload" element={<FileUpload/>}/>
          <Route exact path="/content" element={<Content/>}/>
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signUp" element={<SignUp/>} />
          <Route exact path="/logout" element={<Logout/>} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        </div>
    </Router>
      {/* <header className="App-header">
        <FileUpload />
      </header> */}
    </div>
  );
}

export default App;
