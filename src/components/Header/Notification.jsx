import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import NotificationModal from "./NotificationModal";

const Notification = ({ notifications }) => {
  const [isOpen, setOpen] = React.useState(false);

  const handleClick = () => {
    isOpen ? null : setOpen(true);
  };

  return (
    <div className=" flex flex-row">
      <a className="relative cursor-pointer" onClick={handleClick}>
        <IoMdNotificationsOutline className="text-3xl text-stone-700" />
        <span className="absolute -top-1/2 -right-1/2 -translate-x-1/2 translate-y-1/2 bg-red-500 text-white font-bold h-5 w-5 flex flex-row items-center justify-center rounded-full text-xs">
          {notifications.length}
        </span>
      </a>

      <NotificationModal notifications={notifications} isOpen={isOpen} setOpen={setOpen} />

    </div>
  );
};

export default Notification;
