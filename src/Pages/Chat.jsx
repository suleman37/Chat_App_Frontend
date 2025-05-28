import React from 'react';
import Chat from "./chatroom";
import Sidebar from "../Components/sidebar";

const ChatFunc = () => {
  return (
    <div className='flex w-full'>
      <Sidebar className='w-full'/>
      <Chat className='w-full'/>
    </div>
  );
}

export default ChatFunc;