import React from "react";
import { Link } from "react-router-dom";
import Navlinks from "./Navlinks";

const Navbar = () => {
  return (
    <div className="flex justify-around border-b border-gray-100 w-full py-2">
     
        <div className="text-3xl font-extrabold text-gray-900 dark:text-white font-roboto">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-green-500 from-blue-400"> <Link to='/'>Mini-Social</Link> </span>  
        </div>

        <div>
            <Navlinks/>
        </div>
   
     
   
    </div>
  );
};

export default Navbar;
