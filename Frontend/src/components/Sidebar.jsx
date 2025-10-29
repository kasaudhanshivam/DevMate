import React from 'react'
import '../styles/sidebar.css'
import { useContext, useEffect } from 'react';
import { MyContext } from '../MyContext';
import { v1 as uuidv1 } from 'uuid';

const Sidebar = () => {
  // const serverURL = 'http://localhost:8000/api/';
  const serverURL = 'https://devmate-hxfi.onrender.com/api/';
  const { allThreads, setAllThreads, currThreadId, setCurrThreadId, setNewChat, setPrompt, setReply, setPrevChats } = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${serverURL}threads`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Threads response data:', data);
        const filteredData = data.map(thread => ({
          threadId: thread.threadId,
          title: thread.title
        }));
        setAllThreads(filteredData);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const changeThread = async(newThreadId) => {
    setCurrThreadId(newThreadId);

    try{
      const token = localStorage.getItem('token');
      let response = await fetch(`${serverURL}threads/${newThreadId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        let res = await response.json();
        setPrevChats(res);
        setNewChat(false);
        setReply(null);
      }
    }catch(err){
      console.log(err);
    }
  }

  const deleteThread = async(threadId) => {
    try{
      const token = localStorage.getItem('token');
      const response = await fetch(`${serverURL}threads/${threadId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));
        if(currThreadId === threadId){
          createNewChat();
        }
      }
    }catch(err){
      console.log(err);
    }
  }

  const createNewChat = () => {
    setNewChat(true);
    setPrompt('');
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  }

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  return (
    <div className='sidebar'>
      <button className='newChat' onClick={createNewChat}>
        <span>New Chat</span>
        <i className='fa-solid fa-pen-to-square'></i>
      </button>

      <ul className='threads'>
        {allThreads?.map((thread, key) => (
          <li 
            key={key} 
            onClick={() => changeThread(thread.threadId)}
            className={thread.threadId === currThreadId ? 'highlighted' : ''}
          >
            {thread.title}
            <i 
              className='fa-solid fa-trash' 
              onClick={(e) => {
                e.stopPropagation();
                deleteThread(thread.threadId);
              }}
            ></i>
          </li>
        ))}
      </ul>
      
      <div className='sign'>
        <hr />
        <p>By Shivam Kasaudhan &hearts;</p>
      </div>
    </div>
  )
}

export default Sidebar