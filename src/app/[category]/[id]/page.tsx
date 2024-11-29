"use client";
import Breadcrum from "@/app/components/Breadcrum"
import { useCart } from "@/app/components/contexts/CartContext";
import Footer from "@/app/components/Footer"
import Navbar from "@/app/components/Navbar"
import Navigation from "@/app/components/Navigation"
import NewProducts from "@/app/components/NewProducts"
import TopBar from "@/app/components/TopBar"
import { faCartShopping, faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify";

export default function page({ params }: { params: any }) {
    const {cart, setCart} = useCart()
    const { id }: { id: string } = React.use(params)
    const [product, setProduct] = useState<any>({})
    const [amount, setAmount] = useState(1)
    const { data: session } = useSession()
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        if (session) setUser(session.user);
    }, [session])

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`https://fakestoreapi.in/api/products/${id}`);
            const data = await response.json();
            setProduct(data.product)
        };

        fetchProducts();
    }, [])

    
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

    const handleAddToCart = async () => {
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
        } catch (error: any) {
            return toast.error(error.message)
        }
    }

    const capitalize = (text: string) => {
        return text.slice(0, 1).toUpperCase() + text.slice(1, text.length)
    }

    if (!product || !product.category || !product.title || !product.image || !product.description || !product.price) return <div className="flex w-full h-dvh justify-center items-center">
        <FontAwesomeIcon icon={faCircleNotch} className="text-pink-700 text-5xl animate-spin" />
    </div>

    const discount = product?.discount;
    return (
        <div>
            <TopBar />
            <Navbar />
            <Navigation />
            <Breadcrum product={product} />

            {/* Product Container */}
            <div className="flex flex-col lg:flex-row justify-between w-fit px-10 md:px-16 py-10 gap-5">
                {/* Product Image */}
                <div className="w-full lg:w-1/2 flex flex-col gap-2 justify-center">
                    {/* Main Image */}
                    <div className="flex justify-center items-center">
                        <img src={product.image} alt="" className="border-2 rounded-lg p-5" />
                    </div>
                    <div className="grid grid-cols-5 gap-2 md:gap-5">
                        <img src={product.image} alt="" className="cursor-pointer border-2 rounded-lg p-2" />
                        <img src={product.image} alt="" className="cursor-pointer border-2 rounded-lg p-2" />
                        <img src={product.image} alt="" className="cursor-pointer border-2 rounded-lg p-2" />
                        <img src={product.image} alt="" className="cursor-pointer border-2 rounded-lg p-2" />
                        <img src={product.image} alt="" className="cursor-pointer border-2 rounded-lg p-2" />
                    </div>
                </div>

                {/* Product Detail */}
                <div className="flex flex-col justify-between w-full lg:w-1/2">
                    <div className="flex flex-col gap-5">
                        <h1 className="text-xl lg:text-2xl font-bold text-gray-700">{product.title}</h1>
                        <span className="text-base lg:text-lg text-gray-500">{capitalize(product.model)}</span>
                        <p className="text-sm lg:text-base text-gray-700">{product.description}</p>
                        <span className="text-sm lg:text-base font-bold">Category : {capitalize(product.category)}</span>
                    </div>




                    <div className="flex flex-col gap-3 mt-5">
                        <div className="flex gap-2 text-lg lg:text-2xl">
                            <div className={`${!discount ? 'hidden' : 'block'} line-through text-gray-500`}>
                                ${product.price + discount}
                            </div>
                            <div className="text-yellow-600 font-bold">
                                ${product.price}
                            </div>
                        </div>


                        <div className="flex gap-3">
                            <div className="w-fit flex gap-10 border p-2 lg:p-3 rounded-lg text-base lg:text-lg text-gray-700">
                                <div className="text-lg lg:text-xl cursor-pointer" onClick={() => amount > 1 ? setAmount(amount - 1) : ''}>
                                    -
                                </div>
                                <div>
                                    {amount}
                                </div>
                                <div className="text-lg lg:text-xl cursor-pointer" onClick={() => setAmount(amount + 1)}>
                                    +
                                </div>
                            </div>
                            <button className="bg-orange-500 text-white w-full rounded-lg hover:bg-orange-600 duration-200 active:scale-[99%]" onClick={() => handleAddToCart()}><FontAwesomeIcon icon={faCartShopping}/> Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>


            <NewProducts />
            <Footer />
            <ToastContainer />
        </div>
    )
}
