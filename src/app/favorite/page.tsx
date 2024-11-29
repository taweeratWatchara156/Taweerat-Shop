"use client"

import React, { useEffect, useState } from "react"
import TopBar from "../components/TopBar"
import Navbar from "../components/Navbar"
import Navigation from "../components/Navigation"
import ProductItem from "../components/ProductItem"
import NewProducts from "../components/NewProducts"
import Footer from "../components/Footer"
import { useFavorite } from "../components/contexts/FavoriteContext"
import { toast } from "react-toastify"
import { useSession } from "next-auth/react"

export default function page({ params }: { params: any }) {
    const [products, setProducts] = useState<any[]>([])
    const { category }: { category: string } = React.use(params)
    const { data: session, status } = useSession()
    const [user, setUser] = useState<any>(null)
    const { favorite, setFavorite } = useFavorite();

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
            fetchFavorite(session.user?.email as string)
        }
    }, [session])

    const capitalize = (text: string) => {
        return text.slice(0, 1).toUpperCase() + text.slice(1, text.length)
    }

    useEffect(() => {
        const fetchProducts = async () => {
            if (!favorite.favorite || Object.keys(favorite.favorite).length === 0) return;
    
            try {
                const response = await fetch("https://fakestoreapi.in/api/products");
                const data = await response.json();
    
                const filteredProducts = data.products.filter((p: any) =>
                    Boolean(favorite.favorite[String(p.id)])
                );
    
                setProducts(filteredProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
    
        fetchProducts();
    }, [Object.keys(favorite.favorite || {}).join(",")]);

    return (
        <div>
            <TopBar />
            <Navbar />
            <Navigation />
            {/* Description */}
            <div className="flex flex-col border-t p-5">
                <h1 className="text-lg md:text-xl text-gray-700 font-semibold text-center">Favorite</h1>
            </div>

            {/* Products Item */}
            <div className="grid pt-0 p-4 gap-4 grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] md:grid-cols-[repeat(auto-fit,_minmax(270px,_1fr))]">
                {
                    products.length === 0 ?
                        // Loading...
                        <div className="flex items-center justify-center">
                            <h1>No Favorite product ! </h1>
                        </div>
                        :
                        products.map((p, index) => {
                            return <ProductItem key={index} product={p} />
                        })
                }
            </div>

            <NewProducts />
            <Footer />
        </div>
    )
}
