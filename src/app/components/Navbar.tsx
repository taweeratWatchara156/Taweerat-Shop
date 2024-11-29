"use client";

import Image from 'next/image'
import logo from '../../../public/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-toastify/dist/ReactToastify.css';
import { faCartShopping, faCircleNotch, faCog, faPerson, faStar, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify';
import { signOut, useSession } from 'next-auth/react';
import { useCart } from './contexts/CartContext';
import { useFavorite } from './contexts/FavoriteContext';

export default function Navbar() {
    const route = useRouter()
    const [userDetail, setUserDetail] = useState(false)
    const { data: session, status } = useSession()
    const [user, setUser] = useState<any>(null)
    const { cart, setCart } = useCart();
    const { favorite, setFavorite } = useFavorite();

    // FetchCart
    const fetchCart = async (email: string) => {
        try {
            const res = await fetch(`/api/cart/${email}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })

            const data = await res.json();

            if (!data.success) return toast.error(data.message)

            setCart({ cartLength: data.length, cart: data.cart })
        } catch (error: any) {
            return toast.error(error.message)
        }
    }

    // Fetch Favorite
    const fetchFavorite = async (email: string) => {
        try {
            const res = await fetch(`/api/favorite/${email}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })

            const data = await res.json();

            if (!data.success) return toast.error(data.message)

            setFavorite({ favoriteLength: data.length, favorite: data.favorite })
        } catch (error: any) {
            return toast.error(error.message)
        }
    }

    useEffect(() => {
        if (session) {
            setUser(session.user);
            fetchCart(session.user?.email as string);
            fetchFavorite(session.user?.email as string)
        }
    }, [session])

    const capitalizeAndLimit = (text: string, length: number) => {
        if (!text) return;

        const capText = text.slice(0, 1).toUpperCase() + text.slice(1, text.length)

        if (capText.length > length) {
            return capText.slice(0, length) + "..."
        }

        return capText
    }

    if (status == "loading") return <div className='fixed w-full h-full bg-white top-0 left-0 flex justify-center items-center z-50'>
        <FontAwesomeIcon icon={faCircleNotch} className='text-pink-700 animate-spin text-5xl' />
    </div>

    return (
        <>
            {/* Main Nav Bar */}
            <div className="flex justify-between px-7 md:px-14 sm:px-7 py-5 border-b-[1px]">
                <Image src={logo} alt='LOGO' className='flex w-14 sm:w-20 cursor-pointer' onClick={() => route.push('/')} />

                {/* No User */}
                <div className={`hidden ${user ? 'hidden' : 'sm:flex'} gap-3`}>
                    <button className='text-pink-500 px-4 my-auto' onClick={() => route.push('/sign-in')}>Sign In</button>
                    <button className='rounded-lg bg-pink-500 hover:bg-pink-700 active:scale-95 duration-200 px-3 sm:px-4 py-2 text-white text-sm sm:text-base' onClick={() => route.push('/sign-up')}>Sign Up</button>
                </div>

                {/* Have User */}
                <div className={`hidden ${user ? 'sm:flex' : 'hidden'} justify-center items-center text-2xl text-gray-500 gap-7`}>
                    <div className='hover:text-pink-500 duration-200 active:scale-95 hover:scale-105 cursor-pointer' onClick={() => setUserDetail(!userDetail)}>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className=' hover:text-yellow-500 duration-200 active:scale-95 hover:scale-105 relative cursor-pointer' onClick={() => route.push('/favorite')}>
                        <FontAwesomeIcon icon={faStar} />
                        <div className={`${favorite.favoriteLength == 0 ? 'hidden' : 'flex'} justify-center items-center text-sm bg-red-500 rounded-full absolute text-white w-5 h-5 top-[-10px] right-[-10px]`}>
                            {favorite.favoriteLength}
                        </div>
                    </div>
                    <div className=' hover:text-blue-500 duration-200 active:scale-95 hover:scale-105 relative cursor-pointer' onClick={() => route.push('/cart')}>
                        <FontAwesomeIcon icon={faCartShopping} />
                        <div className={`${cart.cartLength == 0 ? 'hidden' : 'flex'} justify-center items-center text-sm bg-red-500 rounded-full absolute text-white w-5 h-5 top-[-10px] right-[-10px]`}>
                            {cart.cartLength}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sub Navbar ( Mobile ) */}
            <div className="fixed z-[30] bottom-0 w-full flex sm:hidden border-t-[1px] border-b-[1px] bg-white">
                {/* No User */}
                <div className={`${user ? 'hidden' : 'flex'} justify-center py-3 px-4 w-full gap-3`}>
                    <button className='rounded-lg bg-pink-500 w-full py-3 hover:bg-pink-700 active:scale-95 duration-200 text-white text-sm' onClick={() => route.push('/sign-in')}>Sign In</button>
                    <button className='rounded-lg bg-pink-500 w-full py-3 hover:bg-pink-700 active:scale-95 duration-200 text-white text-sm' onClick={() => route.push('/sign-up')}>Sign Up</button>
                </div>

                {/* Have User */}
                <div className={`${user ? 'flex' : 'hidden'} w-full justify-between px-20 py-3 items-center text-2xl text-gray-500 gap-7`}>
                    <div className='hover:text-pink-500 duration-200 active:scale-95 hover:scale-105' onClick={() => setUserDetail(!userDetail)}>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className=' hover:text-yellow-500 duration-200 active:scale-95 hover:scale-105 relative cursor-pointer' onClick={() => route.push('/favorite')}>
                        <FontAwesomeIcon icon={faStar} />
                        <div className={`${favorite.favoriteLength == 0 ? 'hidden' : 'flex'} justify-center items-center text-sm bg-red-500 rounded-full absolute text-white w-5 h-5 top-[-10px] right-[-10px]`}>
                            {favorite.favoriteLength}
                        </div>
                    </div>
                    <div className=' hover:text-blue-500 duration-200 active:scale-95 hover:scale-105 relative cursor-pointer' onClick={() => route.push('/cart')}>
                        <FontAwesomeIcon icon={faCartShopping} />
                        <div className={`${cart.cartLength == 0 ? 'hidden' : 'flex'} justify-center items-center text-sm bg-red-500 rounded-full absolute text-white w-5 h-5 top-[-10px] right-[-10px]`}>
                            {cart.cartLength}
                        </div>
                    </div>
                </div>
            </div>

            {/* User Button */}
            <div className={` bg-white border shadow-lg rounded-md z-40 fixed sm:absolute ${user && userDetail ? 'flex' : 'hidden'} flex-col gap-4 left-2 sm:left-auto bottom-16 sm:bottom-auto top-auto sm:top-36 right-auto sm:right-5 p-3`}>
                <div className='flex gap-3'>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt="" className='w-[35px] rounded-full' />
                    <span className='my-auto text-pink-800'>{capitalizeAndLimit(user?.username, 15)}</span>
                </div>
                <div className='flex items-center ml-0 gap-2 text-pink-700 cursor-pointer duration-200 hover:ml-2' onClick={() => toast.error("You can't do it for now this is just the demo!")}>
                    <FontAwesomeIcon icon={faPerson} />
                    Profile
                </div>
                <div className='flex items-center ml-0 gap-2 text-pink-700 cursor-pointer duration-200 hover:ml-2'onClick={() => toast.error("You can't do it for now this is just the demo!")}>
                    <FontAwesomeIcon icon={faCog} />
                    Settings
                </div>
                <button className='bg-red-500 rounded-md text-white text-sm py-2 duration-200 hover:bg-red-600 active:scale-95' onClick={() => signOut()}>Sign Out</button>
            </div>

            <ToastContainer />
        </>
    )
}
