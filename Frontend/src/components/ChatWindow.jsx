import React, { useEffect } from 'react'
import '../styles/chatWindow.css'
import Chat from './Chat.jsx'
import { useContext } from 'react';
import { MyContext } from '../MyContext.jsx';
import { useState } from "react";
import { ScaleLoader } from "react-spinners";




const ChatWindow = () => {


  const serverURL = 'http://localhost:8000/api/';

  const { prompt, setPrompt, reply, setReply, currThreadId, setCurrThreadId, prevChats, setPrevChats, setNewChat } = useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);




  const getReply = async () => {
    setLoading(true);
    setNewChat(false);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId
      })
    };





    try {
      const response = await fetch(`${serverURL}chat`, options);
      const rep = await response.json();
      console.log(rep.reply);
      setReply(rep.reply);

      setPrevChats(prev => [
        ...prev,
        { role: 'user', content: prompt },
        { role: 'assistant', content: rep.reply }
      ]);

    } catch (error) {
      console.error('Error fetching reply:', error);
    }
    setLoading(false);
    setPrompt('');
  };



  // useEffect(() => {
  //   if (prompt && reply) {
  //     setPrevChats(prev => (
  //       [...prev, {
  //         role: 'user',
  //         content: prompt,
  //       },
  //       {
  //         role: 'assistant',
  //         content: reply,
  //       }]
  //     ));
  //   }
  // }, [reply]);


  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="window">
      <div className="navbar">
        <p> DevMate <i className="fa-solid fa-angle-down"></i></p>
        <div className='user' onClick={handleProfileClick}>
          <i className="fa-solid fa-user"></i>
        </div>
      </div>
      {
        isOpen &&
        <div className="dropDown">
          <div className="dropDownItem"><i class="fa-solid fa-gear"></i> Settings</div>
          <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</div>
          <div onClick={() => window.open('https://www.linkedin.com/in/kasaudhanshivam/', '_blank')} className="dropDownItem"><i class="fa-solid fa-code"></i> Developer</div>
        </div>
      }
      <Chat />
      <ScaleLoader color="#fff" loading={loading} />
      <div className="message">
        <div className="ask">
          <input type="text" placeholder='Ask Anything' value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => e.key === 'Enter' ? getReply() : null} />
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
