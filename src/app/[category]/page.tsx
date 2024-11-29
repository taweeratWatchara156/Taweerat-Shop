"use client"

import React, { useEffect, useState } from "react"
import TopBar from "../components/TopBar"
import Navbar from "../components/Navbar"
import Navigation from "../components/Navigation"
import ProductItem from "../components/ProductItem"
import NewProducts from "../components/NewProducts"
import Footer from "../components/Footer"

export default function page({ params }: { params: any }) {
    const [products, setProducts] = useState<any[]>([])
    const { category }: { category: string } = React.use(params)
    const capitalize = (text: string) => {
        return text.slice(0, 1).toUpperCase() + text.slice(1, text.length)
    }

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://fakestoreapi.in/api/products');
            const data = await response.json();
            setProducts(data.products.filter((p: any) => p.category == category))
        };

        fetchProducts();
    }, [])

    return (
        <div>
            <TopBar />
            <Navbar />
            <Navigation />
            {/* Description */}
            <div className="flex flex-col border-t p-5 md:p-7 py-16 md:py-20">
                <h1 className="text-lg md:text-xl text-gray-700 font-semibold text-center">{capitalize(category)}</h1>
                <span className="w-3/4 md:w-1/2 mx-auto text-gray-700 text-center mt-2 text-sm md:text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi et saepe minus ratione ducimus vero fugiat, modi minima accusantium. Dolore cum praesentium odit nostrum eius accusantium laborum velit deleniti numquam.</span>
            </div>

            {/* Products Item */}
            <div className="grid p-4 gap-4 grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] md:grid-cols-[repeat(auto-fit,_minmax(270px,_1fr))]">
                {
                    products.length === 0 ?
                        // Loading...
                        <ProductItem />
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
