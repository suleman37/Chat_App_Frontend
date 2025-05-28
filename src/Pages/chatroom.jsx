import React, { useState, useEffect } from 'react';

const initialMessages = [
  { from: 'them', text: 'omg, this is amazing' },
  { from: 'them', text: 'perfect 🤑' },
  { from: 'them', text: 'Wow, this is really epic' },
  { from: 'me', text: 'How are you?' },
  { from: 'them', text: 'just ideas for next time' },
  { from: 'them', text: "I'll be there in 2 mins 🤍" },
  { from: 'me', text: 'woohoooo' },
  { from: 'me', text: 'Hahh oh man' },
  { from: 'me', text: "Haha that's terrifying 😂" },
  { from: 'them', text: 'aww' },
  { from: 'them', text: 'omg, this is amazing' },
  { from: 'them', text: 'wohooooo 🔥' },
];

const ChatUI = ({ user }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    console.log("Selected user DATA:", user);
  }, [user]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    if (storedToken) {
      try {
        const base64Url = storedToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const decodedData = JSON.parse(jsonPayload);
        setUserId(decodedData.user_id);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      const messageData = {
        sender: userId,
        receiver: user.id,
        chatRoomId: 'chatroom789',
        content: newMessage
      };

      try {
        const response = await fetch('http://localhost:8000/message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(messageData)
        });

        if (response.ok) {
          setMessages([...messages, { from: 'me', text: newMessage }]);
          setNewMessage('');
        } else {
          console.error('Failed to send message:', response.statusText);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg flex flex-col h-[100vh]">
      <div className="flex items-center gap-3 px-4 py-3 border-b">
        <img
          src={user?.img || "https://randomuser.me/api/portraits/men/75.jpg"}
          alt={user?.name || "Profile"}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h2 className="font-semibold">{user?.name || "Florencio Dorrance"}</h2>
          <p className="text-green-500 text-sm">Online</p>
        </div>
        <div className="ml-auto text-blue-500 text-xl">📞</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm ${msg.from === 'me'
                ? 'bg-blue-500 text-white rounded-br-none'
                : 'bg-gray-200 text-gray-900 rounded-bl-none'
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 p-2 pl-10 rounded-full border bg-gray-100 focus:outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="text-blue-600 text-xl" onClick={handleSendMessage}>➤</button>
      </div>
    </div>
  );
};

export default ChatUI;