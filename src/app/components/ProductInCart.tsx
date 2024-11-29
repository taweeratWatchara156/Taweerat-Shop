import { faCartShopping, faCircleNotch, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./contexts/CartContext";
import { toast, ToastContainer } from "react-toastify";
import { useSession } from "next-auth/react";

export default function ProductInCart({ productId }: { productId?: any }) {
    const { cart, setCart } = useCart();
    const [product, setProduct] = useState<any>(null)
    const { data: session } = useSession()
    const [user, setUser] = useState<any>(null)
    useEffect(() => {
        if (session) setUser(session.user);
    }, [session])
    const cartProduct = cart.cart[String(productId)]

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`https://fakestoreapi.in/api/products/${productId}`);
            const data = await response.json();
            setProduct(data.product)
        };

        fetchProducts();
    }, [])

    const route = useRouter()

    const textLimit = (text: string, length: number) => {
        if (text.length >= length) {
            return text.slice(0, length) + "..."
        }

        return text;
    }

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

    const handleAddToCart = async (amount: number) => {
        if (!user) return toast.error("Please sign in first!")

        try {
            const res = await fetch('/api/cart/add', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user?.email, productId: String(product.id), amount: amount })
            })

            const data = await res.json();

            if (!data.success) return toast.error(data.message)

            fetchCart(user.email)

            if (amount == -1 && cartProduct.amount == 1) {
                window.location.reload()
            }
        } catch (error: any) {
            return toast.error(error.message)
        }
    }

    const capitalize = (text: string) => {
        return text.slice(0, 1).toUpperCase() + text.slice(1, text.length)
    }

    if (!product) return <div className="flex justify-center items-center py-2">
        <FontAwesomeIcon icon={faCircleNotch} className="animate-spin text-3xl text-pink-700" />
    </div>

    return (
        <div className="flex border flex-col items-center p-4 rounded-lg duration-200 relative">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute top-2 left-2 z-10 text-sm text-pink-700 cursor-pointer" />

            <div className="flex gap-2 w-full justify-between relative">
                <div className='flex justify-center items-center'>
                    <img src={product.image} alt='Product Image' className='mx-auto w-[100px] mr-2' />

                    <div className="flex flex-col gap-10 sm:gap-3">
                        <span className=' text-gray-700 text-xs md:text-base'>{textLimit(product.title, 30)}</span>
                        <span className="hidden sm:block text-xs md:text-sm text-gray-500" >{capitalize(product.model)}</span>
                        <span className="hidden sm:block text-xs md:text-sm text-gray-500">{capitalize(product.category)}</span>
                        <span className='block sm:hidden font-bold my-auto text-gray-800 text-xs md:text-sm'>${product.price * cartProduct.amount}</span>
                    </div>
                </div>

                <div className="hidden sm:flex flex-col">
                    <span className="text-xs md:text-sm text-pink-700">Price</span>
                    <span className='font-bold my-auto text-gray-800 text-xs md:text-sm'>${product.price}</span>
                </div>

                <div className="hidden sm:flex flex-col">
                    <span className=" text-xs md:text-sm text-pink-700">Total</span>
                    <span className='font-bold my-auto text-gray-800 text-xs md:text-sm'>${product.price * cartProduct.amount}</span>
                </div>

                <div className="hidden sm:flex my-auto items-center gap-2">
                    <span className="text-xl md:text-2xl cursor-pointer duration-200 hover:scale-105 active:scale-100" onClick={() => handleAddToCart(-1)}>-</span>
                    <span className="text-sm md:text-base border rounded-lg px-4 md:px-5 py-1">{cartProduct.amount}</span>
                    <span className="text-xl md:text-2xl cursor-pointer duration-200 hover:scale-105 active:scale-100" onClick={() => handleAddToCart(1)}>+</span>
                </div>

                <div className="flex sm:hidden absolute items-center gap-2 bottom-0 right-0">
                    <span className="text-xl md:text-2xl cursor-pointer duration-200 hover:scale-105 active:scale-100" onClick={() => handleAddToCart(-1)}>-</span>
                    <span className="text-sm md:text-base border bg-white rounded-lg px-4 md:px-5 py-1">{cartProduct.amount}</span>
                    <span className="text-xl md:text-2xl cursor-pointer duration-200 hover:scale-105 active:scale-100" onClick={() => handleAddToCart(1)}>+</span>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}
