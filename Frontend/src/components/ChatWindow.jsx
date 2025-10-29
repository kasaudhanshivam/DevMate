import React, { useEffect } from 'react'
import '../styles/chatWindow.css'
import Chat from './Chat.jsx'
import { useContext } from 'react';
import { MyContext } from '../MyContext.jsx';
import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import { useAuth } from '../contexts/AuthContext.jsx';

const ChatWindow = () => {
  // const serverURL = 'http://localhost:8000/api/';
  const serverURL = 'https://devmate-hxfi.onrender.com/api/';
  const { prompt, setPrompt, reply, setReply, currThreadId, setCurrThreadId, prevChats, setPrevChats, setNewChat } = useContext(MyContext);
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getReply = async () => {
    setLoading(true);
    setNewChat(false);
    
    const token = localStorage.getItem('token');
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId
      })
    };

    try {
      const response = await fetch(`${serverURL}chat`, options);
      const rep = await response.json();
      
      if (response.ok) {
        setReply(rep.reply);
        setPrevChats(prev => [
          ...prev,
          { role: 'user', content: prompt },
          { role: 'assistant', content: rep.reply }
        ]);
      } else {
        console.error('Error:', rep.error);
      }
    } catch (error) {
      console.error('Error fetching reply:', error);
    }
    setLoading(false);
    setPrompt('');
  };

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  }

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  }

  return (
    <div className="window">
      <div className="navbar">
        <p> DevMate <i className="fa-solid fa-angle-down"></i></p>
        <div className='user' onClick={handleProfileClick}>
          <i className="fa-solid fa-user"></i>
          <span className="user-name">{user?.name}</span>
        </div>
      </div>
      {
        isOpen &&
        <div className="dropDown">
          {/* <div className="dropDownItem">
            <i className="fa-solid fa-envelope"></i> {user?.email}
          </div> */}
          <div className="dropDownItem"><i className="fa-solid fa-gear"></i> Settings</div>
          <div className="dropDownItem" onClick={handleLogout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
          </div>
          <div onClick={() => window.open('https://www.linkedin.com/in/kasaudhanshivam/', '_blank')} className="dropDownItem">
            <i className="fa-solid fa-code"></i> Developer
          </div>
        </div>
      }
      <Chat />
      <ScaleLoader color="#fff" loading={loading} />
      <div className="message">
        <div className="ask">
          <input 
            type="text" 
            placeholder='Ask Anything' 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' ? getReply() : null} 
          />
          <button onClick={getReply}><i className="fa-solid fa-paper-plane"></i></button>
        </div>
        <div className="chat-footer">
          <p>DevMate can make mistakes. Check important info. See Cookie Preferences.</p>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow