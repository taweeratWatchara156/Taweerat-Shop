"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Navigation from "../components/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";

export default function page() {
  const [state, setState] = useState("profile")

  return (
    <div className="h-full">
      <Navbar />
      <Navigation />
      <div className="flex border-t-[1px] h-full p-10">
        {/* Left  */}
        <div className="flex flex-col w-1/5 border-r text-center">
          <h1 className="text-2xl text-pink-900 mb-8 font-bold">Profile Settings</h1>
          <div className="flex flex-col gap-3">
            <span className={`text-pink-800 ${state == "profile" ? 'border' : ''} rounded-full w-fit mx-auto px-10 py-2 cursor-pointer`} onClick={() => setState("profile")}>Profile</span>
            <span className={`text-pink-800 ${state == "account" ? 'border' : ''} rounded-full w-fit mx-auto px-10 py-2 cursor-pointer`} onClick={() => setState("account")}>Account Settings</span>
            <button className="bg-red-500 hover:bg-red-600 duration-200 rounded-full px-10 w-fit mx-auto py-2 text-white"><FontAwesomeIcon icon={faSignOut} /> Sign Out</button>
          </div>
        </div>
        {/* Right */}
        {
          state == "profile" ?
            <form className="flex flex-col w-4/5 px-20">
              <h1 className="text-2xl text-pink-900 mb-8 font-bold">Profile</h1>

              {/* Change Image */}
              <div className="flex">
                <img src="http://" alt="" className="rounded-full w-[250px] border-[5px] border-pink-700 shadow-lg" />
                <div className="flex flex-col justify-center ml-10">
                  <label htmlFor="profileImage" className="cursor-pointer bg-pink-500 rounded-lg px-8 py-5 text-white font-semibold">Change Picture</label>
                  <input type="file" name="profileImage" id="profileImage" className="hidden" />
                </div>
              </div>

              <div className="flex flex-col gap-8 mt-10">
                {/* Fisrt Name Last Name */}
                <div className="flex gap-5">
                  <div className="flex flex-col w-full">
                    <span>First Name</span>
                    <input type="text" name="firstName" className="border rounded-lg outline-none py-3 px-5" />
                  </div>
                  <div className="flex flex-col w-full">
                    <span>First Name</span>
                    <input type="text" name="lastName" className="border rounded-lg outline-none py-3 px-5" />
                  </div>
                </div>

                <div className="flex flex-col w-full">
                  <span>Username</span>
                  <input type="text" name="username" className="border rounded-lg outline-none py-3 px-5" />
                </div>
              </div>

              <button className="bg-pink-500 hover:bg-pink-600 duration-200 rounded-lg py-3 text-white mt-8" type="submit">Save Change</button>
            </form>
            :
            <form className="flex flex-col w-4/5 px-20">
              <h1 className="text-2xl text-pink-900 mb-8 font-bold">Profile</h1>

              {/* Change Image */}
              <div className="flex">
                <img src="http://" alt="" className="rounded-full w-[250px] border-[5px] border-pink-700 shadow-lg" />
                <div className="flex flex-col justify-center ml-10">
                  <label htmlFor="profileImage" className="cursor-pointer bg-pink-500 rounded-lg px-8 py-5 text-white font-semibold">Change Picture</label>
                  <input type="file" name="profileImage" id="profileImage" className="hidden" />
                </div>
              </div>

              <div className="flex flex-col gap-8 mt-10">

                <div className="flex flex-col w-full">
                  <span>Email</span>
                  <input type="email" name="email" className="border rounded-lg outline-none py-3 px-5" />
                </div>
                {/* Password COnfirm passowrd */}
                <div className="flex gap-5">
                  <div className="flex flex-col w-full">
                    <span>Current Password</span>
                    <input type="password" name="oldPassword" className="border rounded-lg outline-none py-3 px-5" placeholder="Current  Password" />
                  </div>
                  <div className="flex flex-col w-full">
                    <span>New Password</span>
                    <input type="password" name="newPassword" className="border rounded-lg outline-none py-3 px-5" placeholder="Confirm Password" />
                  </div>
                </div>
              </div>

              <button type="submit" className="bg-pink-500 hover:bg-pink-600 duration-200 rounded-lg py-3 text-white mt-8">Save Change</button>
            </form>
        }
      </div>
      <ToastContainer />
    </div>
  )
}
