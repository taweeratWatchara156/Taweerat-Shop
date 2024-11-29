"use client"

import { useEffect, useState } from "react";
import { useCart } from "../components/contexts/CartContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Navigation from "../components/Navigation";
import ProductInCart from "../components/ProductInCart";
import TopBar from "../components/TopBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";

export default function page() {
    const { cart, setCart } = useCart()
    const [productIds, setProductIds] = useState<any>(null)
    const { data: session, status } = useSession()
    const [user, setUser] = useState<any>(null)
    const [total, setTotal] = useState(0)

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

    const getTotal = async () => {
        var total = 0;

        if (cart && productIds) {
            for (var i = 0; i < productIds.length; i++) {
                const id = productIds[i]

                const response = await fetch(`https://fakestoreapi.in/api/products/${id}`);
                const data = await response.json();

                total += data.product.price * cart.cart[id].amount
            }
        }

        setTotal(total)
    }

    useEffect(() => {
        if (session) {
            setUser(session.user);
            fetchCart(session.user?.email as string);
        }
    }, [session])

    useEffect(() => {
        if (cart.cart) {
            setProductIds(Object.keys(cart.cart))
            getTotal()
        }
    }, [cart.cart])

    if (productIds == null) return <div className='fixed w-full h-full bg-white top-0 left-0 flex justify-center items-center z-50'>
        <FontAwesomeIcon icon={faCircleNotch} className='text-pink-700 animate-spin text-5xl' />
    </div>


    return (
        <div className="h-auto lg:h-screen flex flex-col">
            <TopBar />
            <Navbar />
            <Navigation />
            <div className="flex flex-col lg:flex-row h-full border-t">
                {/* LEFT */}
                <div className="w-full lg:w-4/6 flex flex-col p-5 md:p-10 gap-10">
                    <div className="flex justify-between">
                        <h1 className="text-lg md:text-xl text-pink-700 font-semibold">Shopping Cart</h1>
                        <h1 className="text-sm md:text-base text-pink-700 font-semibold">{cart.cartLength} Item(s)</h1>
                    </div>

                    <hr />

                    <div className="flex flex-col gap-3 overflow-y-auto overflow-x-hidden">
                        {
                            productIds.map((id: any, index: any) => {
                                return <ProductInCart key={index} productId={id} />
                            })
                        }
                    </div>
                </div>
                {/* RIGHT */}
                <div className="w-full lg:w-2/6 flex flex-col bg-pink-50 last:p-5 md:p-10 gap-10">
                    <h1 className="text-lg md:text-xl text-pink-700 font-semibold">Order Summary</h1>
                    <hr />

                    <div className="flex flex-col gap-5 text-pink-700 text-sm md:text-base">
                        <div className="flex justify-between">
                            <span>Subtotal ( {cart.cartLength} Items )</span>
                            <span>${total}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>$0</span>
                        </div>

                        <div className="flex flex-col gap-3">
                            <span>Promo Code</span>
                            <input type="text" className="outline-none border rounded-md py-2 px-4" />
                            <button className="bg-pink-500 duration-200 text-white rounded-md py-2 hover:bg-pink-600">Apply</button>
                        </div>
                    </div>

                    <hr />
                    <div className="flex justify-between text-pink-700 font-bold text-sm md:text-base">
                        <span className="">Total</span>
                        <span>${total}</span>
                    </div>
                    <button className="bg-pink-500 duration-200 text-white rounded-md py-2 hover:bg-pink-600 text-sm md:text-base" onClick={() => toast.error("You can't checkout for now this is just the demo!")}>Checkout</button>
                </div>
            </div>
            <Footer />

            <ToastContainer/>
        </div>
    )
}
