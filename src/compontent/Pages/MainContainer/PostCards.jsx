import React from "react";
import { Avatar, Button } from "@material-tailwind/react";

const PostCards = ({ logo, uid, id, name, email, text, image,  timestamp}) => {
  return (
    <>
    <div className=" w-[80%] shadow-xl rounded-md mb-5 mt-1">
        <div className="flex items-center my-3 mx-2">
        <Avatar
            src="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
            size="sm"
            variant="circular"
            alt="avatar"
          />
           <p className="ml-4 py-2 font-roboto text-sm text-gray-700 no-underline tracking-normal leading-none">
              {name}
            </p>
            <p className="px-3 py-2 font-roboto text-sm text-gray-700 no-underline tracking-normal leading-none">{timestamp}</p>
        </div>

        <div>
        <p className="ml-4 pb-4 py-2 font-roboto text-sm text-gray-700 no-underline tracking-normal leading-none">
            {text}
          </p>
        </div>
        <div className="flex justify-center items-center">
            <div>

            {image && (
          <img className="h-96 px-4 py-5 w-fit rounded-3xl" src={image} alt="postImage" />
        )}
            </div>
        </div>
      <div className="flex justify-start  pt-4">
        <button className=" items-end cursor-pointer rounded-lg p-2 hover:text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </button>
      </div>
    </div>
   
    </>
  );
};

export default PostCards;
