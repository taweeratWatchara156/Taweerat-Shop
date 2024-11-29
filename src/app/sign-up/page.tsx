"use client"

import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Navigation from "../components/Navigation";
import TopBar from "../components/TopBar";
import { toast, ToastContainer } from "react-toastify";
import { signIn } from "next-auth/react";

export default function page() {
    const route = useRouter()
    // Handle Sign Up
    const handleSignUp = async (e: any) => {
        e.preventDefault()

        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
            return toast.error("You can't leave the field(s) empty!")
        }

        if (password != confirmPassword) {
            return toast.error("Password do not match!")
        }

        try {
            // Check Email
            const resCheckEmail = await fetch('/api/checkUserEmail', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            })

            const emailData = await resCheckEmail.json();

            if (emailData.user) return toast.error("Email is already exists")

            // Check Username
            const resCheckUsername = await fetch('/api/checkUserUsername', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username })
            })

            const usernameData = await resCheckUsername.json();

            if (usernameData.user) return toast.error("Username is already exists")

            // Register API
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ firstName, lastName, username, email, password })
            })

            const data = await res.json();

            if (!data.success) return toast.error(data.message)

            try {
                const res = await signIn("credentials", { email, password, redirect: false })

                if (res?.error) return toast.error("Failed automatic sign in")

                route.push('/')
            } catch (error: any) {
                return toast.error("Failed automatic sign in!")
            }
        } catch (error: any) {
            return toast.error("Error occured while signing up user!")
        }
    }


    return (
        <div className="h-screen flex flex-col">
            <TopBar />
            <Navbar />
            <Navigation />
            <div className="flex items-center justify-center border-t h-full">
                <form onSubmit={handleSignUp} className="bg-white p-5 lg:p-7 border shadow-lg flex flex-col w-[95%] md:w-3/5 lg:w-2/5 h-fit rounded-lg">
                    <h1 className='text-2xl lg:text-3xl text-pink-500 font-semibold text-center'>Sign Up</h1>

                    {/* Inputs */}
                    <div className='flex flex-col gap-7 my-10 text-sm lg:text-base'>
                        <div className='flex gap-3'>
                            <input type="text" name="firstName" id="firstName" placeholder='First Name' className='border rounded-md p-3 px-4 w-full outline-none' />
                            <input type="text" name="lastName" id="lastName" placeholder='Last Name' className='border rounded-md w-full p-3 px-4 outline-none' />
                        </div>
                        <input type="text" name="username" id="username" placeholder='Username' className='border rounded-md p-3 px-4 outline-none' />
                        <input type="email" name="email" id="email" placeholder='Email' className='border rounded-md p-3 px-4 outline-none' />
                        <input type="password" name="password" id="password" placeholder='Password' className='border rounded-md p-3 px-4 outline-none' />
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' className='border rounded-md p-3 px-4 outline-none' />
                    </div>

                    {/* Submit Button */}
                    <button type='submit' className='bg-pink-500 rounded-md py-3 text-white font-semibold text-sm lg:text-lg duration-200 hover:bg-pink-600 active:scale-95'>Sign Up</button>
                    <span className='text-sm lg:text-base text-center mt-5 text-pink-700'>Already have an account <span className='text-pink-900 underline cursor-pointer' onClick={() => route.push('/sign-in')}>Sign In</span></span>
                </form>
            </div>

            <ToastContainer />
        </div>
    )
}
