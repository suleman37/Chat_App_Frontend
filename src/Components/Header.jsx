import React, { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
    const [userName, setUserName] = useState("Loading...");

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log('Header Token:', token);

        if (token) {
            axios.get('http://localhost:5000/api/user/get', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log('User Data:', response.data);
                if (response.data.success && response.data.users.length > 0) {
                    setUserName(response.data.users[0].fullName || "User");
                } else {
                    setUserName("User");
                }
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
                setUserName("User");
            });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = "/";
    };

    return (
        <div className="flex justify-between items-center bg-white rounded-xl px-6 py-4 shadow-md m-6">
            <div>
                <p className="text-xs text-gray-400">Welcome Back 👋</p>
                <h1 className="text-lg font-semibold text-gray-800">{userName}</h1>
            </div>
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Search here..."
                    className="px-4 py-2 text-sm rounded-full bg-gray-100 focus:outline-none"
                />
                <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">⚙️</span>
                </button>
                <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">🔔</span>
                </button>
                <button onClick={handleLogout} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">🚪</span>
                </button>
                <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=3b82f6&color=fff`}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full border-2 border-blue-500"
                />
            </div>
        </div>
    );
};

export default Header;