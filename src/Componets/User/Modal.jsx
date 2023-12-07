import React from "react";
import { FaEdit } from "react-icons/fa";
import SignUp from "./SignUp";

const Modal = ({ user,setState={setState} }) => {
  const openModal = () => {
    document.getElementById("my_modal_3").showModal();
    document.getElementById("overlay").classList.add("bg-opacity-50");
  };

  const closeModal = () => {
    document.getElementById("my_modal_3").close();
    document.getElementById("overlay").classList.remove("bg-opacity-50");
  };
  return (
    <div className="">
      <div className="flex">
        <p className="mr-2" onClick={openModal}>
          edit
        </p>
        <FaEdit
          onClick={openModal}
          size={20}
          color="black"
          className="cursor-pointer"
        />
      </div>

      {/* Semi-transparent black overlay */}
      <div
        id="overlay"
        className="fixed inset-0 bg-black transition-opacity duration-300 opacity-0 z-50 pointer-events-none"
      ></div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box relative">
          <div className="h-10"></div>
          {/* Close button */}
          <p
            className=" text-black btn-ghost absolute right-2 top-2 w-5 h-10 cursor-pointer"
            onClick={closeModal}
          >
            ✕
          </p>

          {/* Sign Up component */}
          <SignUp edit="edit" user={user} setState={setState} />
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
