"use client"

import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Navigation from "../components/Navigation";
import TopBar from "../components/TopBar";
import { toast, ToastContainer } from "react-toastify";
import { signIn } from "next-auth/react";

export default function page() {
    const route = useRouter()

        // Handle Sign In
        const handleSignIn = async (e: any) => {
            e.preventDefault()

            const email = e.target.email.value;
            const password = e.target.password.value;
    
            if (!email || !password) {
                return toast.error("You can't leave the field(s) empty!")
            }
    
            try {
                const res = await signIn("credentials", { email, password, redirect:false })

                if(res?.error) return toast.error("Email or Password is incorrect!")

                route.push('/')
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
                <form onSubmit={handleSignIn} className="bg-white p-5 lg:p-7 border shadow-lg flex flex-col w-[95%] md:w-3/5 lg:w-2/5 h-fit rounded-lg">
                    <h1 className='text-2xl lg:text-3xl text-pink-500 font-semibold text-center'>Sign In</h1>

                    {/* Inputs */}
                    <div className='flex flex-col gap-7 my-10 text-sm lg:text-base'>
                        <input type="email" name="email" id="email" placeholder='Email ( example@gmail.com )' className='border rounded-md p-3 px-4 outline-none' />
                        <input type="password" name="password" id="password" placeholder='Password ( 12345678 )' className='border rounded-md p-3 px-4 outline-none' />
                        <div className='flex items-center gap-2 text-pink-700 px-3'>
                            <input type="checkbox" name="remeber" id="remember" className='size-4' />
                            <span>Remeber me</span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type='submit' className='bg-pink-500 rounded-md py-3 text-white font-semibold text-base lg:text-lg duration-200 hover:bg-pink-600 active:scale-95'>Sign In</button>
                    <span className='text-sm lg:text-base text-center mt-5 text-pink-700'>Don't have an account <span className='text-pink-900 underline cursor-pointer' onClick={() => route.push('/sign-up')}>Sign Up</span></span>
                </form>
            </div>

            <ToastContainer/>
        </div>
    )
}
