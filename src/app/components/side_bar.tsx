// src/app/components/Sidebar.tsx

import React, { useState } from 'react';

const Sidebar = ({ currentTab }) => {
  const [openDropdown, setOpenDropdown] = useState('');

  const toggleDropdown = (tab) => {
    setOpenDropdown(openDropdown === tab ? '' : tab);
  };

  return (
    <div className="fixed left-0 top-16 w-64 bg-gray-100 h-full p-4 shadow-lg">
      <h2 className="text-lg font-bold text-black">Categories</h2>
      <ul className="mt-4">
        <li>
          <button
            className={`w-full text-left py-2 px-4 rounded ${currentTab === 'Fashion' ? 'bg-gray-300' : ''} font-bold text-black`}
            onClick={() => toggleDropdown('Fashion')}
          >
            Fashion
          </button>
          {openDropdown === 'Fashion' && (
            <ul className="pl-8 mt-1"> {/* Increased padding-left for more prominent indentation */}
              <li className="py-1 text-black">Cloths</li>
              <li className="py-1 text-black">Shoes</li>
              <li className="py-1 text-black">Jewelry</li>
            </ul>
          )}
        </li>        
      </ul>
    </div>
  );
};

export default Sidebar;
