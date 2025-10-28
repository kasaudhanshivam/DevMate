import React from 'react'
import '../styles/sidebar.css'
import { useContext, useEffect } from 'react';
import { MyContext } from '../MyContext';
import { v1 as uuidv1 } from 'uuid';


const Sidebar = () => {

  const serverURL = 'https://devmate-hxfi.onrender.com/api/';

  const { allThreads, setAllThreads, currThreadId, setCurrThreadId, setNewChat, setPrompt, setReply, setPrevChats } = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const response = await fetch(`${serverURL}threads`);
      const data = await response.json();
      const filteredData = data.map(thread => ({
        threadId: thread.threadId,
        title: thread.title
      }))
      setAllThreads(filteredData);
    } catch (e) {
      console.log(e);
    }
  }

  const changeThread = async(newThreadId) => {
    setCurrThreadId(newThreadId);

    try{
      let response = await fetch(`${serverURL}threads/${newThreadId}`);
      let res = await response.json();
      console.log(res);
      setPrevChats(res);
      setNewChat(false);
      setReply(null);
    }catch(err){
      console.log(err);
    }
  }


  const deleteThread = async(threadId) => {
    try{
      const response = await fetch(`${serverURL}threads/${threadId}`, {method: 'DELETE'});
      const res = await response.json();
      console.log(res);

      // updated threads re-render
      setAllThreads(prev => prev.filter(thread=> thread.threadId !== threadId));

      if(currThreadId === threadId){
        createNewChat();
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
  }, [currThreadId])


  return (
    <div className='sidebar'>

      <button className='newChat' onClick={createNewChat}>
        <span>New Chat</span>
        <i className='fa-solid fa-pen-to-square'></i>
      </button>

      <ul className='threads'>
        {allThreads?.map((thread, key) => (
          <li key={key} onClick={()=>changeThread(thread.threadId)}
          className={thread.threadId===currThreadId?'highlighted':''}>{thread.title}
          <i className='fa-solid fa-trash' onClick={(e)=> {
            e.stopPropagation(); // stop event bubling
            deleteThread(thread.threadId);
          }}></i>
          </li>
        ))
        }
      </ul>
      <div className='sign'>
        <hr />
        <p>By Shivam Kasaudhan &hearts;</p>
      </div>
    </div>
  )
}

export default Sidebar
