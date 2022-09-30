import React from "react";
import { TbClearAll } from "react-icons/tb";

const NotificationModal = ({ notifications, isOpen, setOpen }) => {

  const handleOverlayClick = () => {
    setOpen(false)
  }

  return (
    <>
    <div className={`absolute z-40 w-full h-screen top-0 left-0 ${isOpen ? "block" : "hidden"}`} onClick={handleOverlayClick}></div>
    <ul
      className={`py-2 px-4 bg-white absolute z-50 left-0 top-16 rounded-md shadow-lg w-[300px] flex flex-col overflow-hidden duration-1000 ${
        isOpen ? "visible opacity-1" : "hidden opacity-0"
      }`}
    >
      {notifications.map((notification, index) => (
        <li
          className="w-full px-3 py-3 text-sm text-stone-500 font-light mb-2 cursor-pointer hover:bg-stone-50 transition rounded-md hover:text-teal-500"
          key={index}
        >
          {notification.title}
        </li>
      ))}
      <button className="w-full bg-stone-50 flex flex-row justify-center items-center gap-5 py-2 rounded-md my-2 hover:bg-stone-200 text-red-500 transition">
        پاک کردن همه <TbClearAll />
      </button>
    </ul>
    </>
  );
};

export default NotificationModal;
