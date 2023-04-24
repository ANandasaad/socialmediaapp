import React, { useContext } from "react";
import { Button, Tooltip} from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import { AuthContext } from "../../AppContext/AppContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/firebase";
import { useSignOut } from 'react-firebase-hooks/auth';


const Navlinks = () => {
   
  const  {signOutUser,user,userData}=useContext(AuthContext);

  return (
    <div className=" flex justify-center items-center cursor-pointer space-x-10 ">
      <div className="hover:translate-y-1 duration-500 ease-in-out  hover:text-green-500 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </div>
     
      <div className="mx-4 items-center flex ">
        <Tooltip content="SignOut" placement="bottom">
        <div className="hover:translate-y-1 duration-500 ease-in-out    hover:text-green-500 "  onClick={signOutUser}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
      </div>

        </Tooltip>
        <p className="ml-4 font-roboto text-sm font-medium "  >
        {user?.displayName === null && userData?.name !== undefined
            ? userData?.name?.charAt(0)?.toUpperCase() +
              userData?.name?.slice(1)
            : user?.displayName?.split(" ")[0]}
          </p>

      </div>
    </div>
  );
};

export default Navlinks;
