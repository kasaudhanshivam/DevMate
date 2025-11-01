import React, { use } from 'react'
import '../styles/chat.css'
import { useContext, useState, useEffect } from 'react';
import { MyContext } from '../MyContext';
import rehypeHighlight from 'rehype-highlight';
import ReactMarkdown from 'react-markdown';
import "highlight.js/styles/github-dark.css";

const Chat = () => {

  const { newChat, setNewChat, prevChats, setPrevChats, reply } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);


  useEffect(() => {

    if(reply===null){
      setLatestReply(null);
      return;
    }

    if (!prevChats?.length) return;

    const content = reply.split(' ');

    let idx = 0;

    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(' '));

      idx++;
      if (idx >= content.length) clearInterval(interval);
    }, 40);

  }, [prevChats, reply]);

  return (
    <>
      {newChat && <h1>Where should we begin?</h1>}
      <div className="chats">
        {
          prevChats?.slice(0, -1).map((chat, index) => (
            <div key={index} className={chat.role === "user" ? "user-div" : "bot-div"}>
              {chat.role === "user" ?
                <p className='user-msg'>{chat.content}</p> :
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>}
            </div>
          ))
        }

        {
          prevChats?.length > 0 && latestReply!==null &&
          <div className="bot-div" key={"typing"}>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
          </div>
        }
        {
          prevChats.length > 0 && latestReply===null &&
          <div className="bot-div" key={"non-typing"}>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length-1].content}</ReactMarkdown>
          </div>
        }


      </div>
    </>
  )
}

export default Chat