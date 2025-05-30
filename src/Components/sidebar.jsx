import React, { useState, useEffect } from 'react';
import User_img from "../assets/empty-user.jpg"

const MessageSidebar = ({ onChatSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch('http://localhost:8000/users');
        const data = await response.json();
        const formattedChats = data.map(user => ({
          name: user.username,
          id: user._id,
          msg: 'No message available',
          time: 'N/A',
          tags: [],
          img: User_img,
        }));
        setChats(formattedChats);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChatClick = (chat) => {
    console.log('Chat clicked:', chat);
    onChatSelect(chat);
  };

  return (
    <div className="w-full max-w-xs h-screen border-r bg-white">
      <div className="p-5 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Messages</h2>
        <button className="text-blue-500 text-xl">+</button>
      </div>

      <div className="px-4 py-2">
        <input
          type="text"
          placeholder="search"
          className="w-full p-2 rounded-md border bg-gray-100 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-y-auto h-[calc(100vh-128px)] scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent" >
        {filteredChats.map((chat, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 ${chat.active ? 'bg-blue-50 rounded-md' : ''
              }`}
            onClick={() => handleChatClick(chat)}
          >
            <img
              src={chat.img}
              alt={chat.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-sm">{chat.name}</h4>
                <span className="text-xs text-gray-500">{chat.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{chat.msg}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {chat.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 bg-gray-200 rounded-full text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageSidebar;