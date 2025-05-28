import React from "react";
import { FaTruck, FaMapMarkedAlt, FaChartLine, FaWarehouse, FaUserTie, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", icon: <FaChartLine />, route: "/dashboard" },
  { title: "Trucks", icon: <FaTruck />, route: "/vehicles" },
  { title: "Warehouses", icon: <FaWarehouse />, route: "/warehouses" },
  { title: "Geo Locations", icon: <FaMapMarkedAlt />, route: "/geo-locations" },
  { title: "Managers", icon: <FaUserTie />, route: "/managers" },
];

function Sidebar() {
  return (
    <div className="h-screen w-64 bg-blue-600 text-white p-4 flex flex-col justify-between" style={{borderRadius:"20px"}}>
      <div>
        <div className="flex items-center gap-3 mb-6">
          <img
            src="https://via.placeholder.com/40"
            alt="Logo"
            className="w-10 h-10 rounded"
          />
          <div>
            <h2 className="text-sm font-bold">LogisticsPro</h2>
            <p className="text-xs text-gray-200">FOR ADMIN</p>
          </div>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <Link to={item.route} key={index} className="flex items-center gap-2 text-sm py-2 px-3 hover:bg-blue-500 rounded cursor-pointer">
              <span className="text-lg">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
      <button className="w-full flex items-center justify-center gap-2 py-2 text-sm bg-blue-500 hover:bg-blue-400 rounded">
        <FaSignOutAlt /> Log out
      </button>
    </div>
  );
}

export default Sidebar;