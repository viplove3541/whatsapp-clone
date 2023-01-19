import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import {useStateValue} from './StateProvider';
import {BrowserRouter as Router,Routes, Route } from 'react-router-dom';


function App() {
  const [{user},] = useStateValue();
  return (
    <div className='app'>
    {!user ? (
      <Login/>
    ):(
      <div className="app__body">
      <Router>
      <Sidebar/>
        <Routes>
        <Route path="/rooms/:roomId" element={<Chat/>}></Route>
        <Route path="/" element={<Chat/>} ></Route>
      </Routes>
      </Router>
      </div>

      )}
    </div>
  );
}

export default App;