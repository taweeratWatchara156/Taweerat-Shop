"use client";
import { faCartShopping, faCircleNotch, faMagnifyingGlass, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import { useCart } from "./contexts/CartContext";
import { useFavorite } from "./contexts/FavoriteContext";

export default function ProductItem({ product }: { product?: any }) {
    const { setCart } = useCart()
    const { favorite, setFavorite } = useFavorite()
    const [isFavorite, setIsFavorite] = useState(false)
    const route = useRouter();
    const discount = product?.discount;
    const { data: session } = useSession()
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        if (session) setUser(session.user);
    }, [session])

    useEffect(() => {
        if(favorite.favorite && user){
            fetchFavorite(user?.email)

            if(product?.id){
                if(favorite.favorite[product.id]){
                    setIsFavorite(true)
                }else{
                    setIsFavorite(false)
                }
            }
        }
    }, [product])

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

    const handleAddToCart = async () => {
        if (!user) return toast.error("Please sign in first!")

        try {
            const res = await fetch('/api/cart/add', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user?.email, productId: String(product.id), amount: 1 })
            })

            const data = await res.json();

            if (!data.success) return toast.error(data.message)

            fetchCart(user.email)
        } catch (error: any) {
            return toast.error(error.message)
        }
    }

    const handleAddToFavorite = async () => {
        if (!user) return toast.error("Please sign in first!")

        try {
            const res = await fetch('/api/favorite/add', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user?.email, productId: String(product.id), amount: isFavorite ? -1 : 1 })
            })

            const data = await res.json();

            if (!data.success) return toast.error(data.message)

            if(isFavorite) setIsFavorite(false)
            else setIsFavorite(true)

            fetchFavorite(user.email)
        } catch (error: any) {
            return toast.error(error.message)
        }
    }


    if (!product)
        return <div className="flex flex-col justify-center items-center py-[50px] px-[20px] duration-200 hover:scale-105 border rounded-lg p-4">
            <FontAwesomeIcon icon={faCircleNotch} className="animate-spin text-3xl text-pink-700" />
        </div>

    return (
        <div className='flex flex-col border rounded-lg p-4 relative duration-200'>
            <div className="flex justify-between absolute right-0 top-0 w-full p-2">
                <FontAwesomeIcon className="text-gray-500 text-base duration-200 hover:scale-105 cursor-pointer active:scale-95" icon={faMagnifyingGlass} onClick={() => route.push(`/${product.category}/${product.id}`)} />
                <FontAwesomeIcon className={`${isFavorite ? 'text-yellow-500' : 'text-gray-500'} text-base cursor-pointer duration-200 hover:scale-105 active:scale-95`} icon={faStar} onClick={() => handleAddToFavorite()} />
            </div>

            <div className='flex justify-center items-center w-[200px] h-[200px] md:w-[250px] md:h-[250px] mx-auto'>
                <img src={product.image} alt='Product Image' className='' />
            </div>

            <span className='mb-20 text-gray-700 text-center text-sm md:text-base'>{product.title}</span>

            <div className="flex mt-auto justify-between">
                <span className='font-bold text-gray-800 my-auto  text-sm md:text-base'>${product.price} &nbsp;{discount ? <span className='line-through text-gray-400'>${product.price + discount}</span> : <></>}</span>
                <button className="py-2 px-3 bg-yellow-600 rounded-lg font-semibold text-white text-xs md:text-sm hover:bg-yellow-700 duration-200 active:scale-95" onClick={() => handleAddToCart()}><FontAwesomeIcon icon={faCartShopping} />&nbsp; Add To Cart</button>
            </div>

            <ToastContainer />
        </div>
    )
}
