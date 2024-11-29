"use client";
import { useEffect, useState } from "react"
import ProductItem from "./ProductItem"

export default function NewProducts() {
    const [products, setProducts] = useState<any[]>([])
    const [filterProducts, setFilterProducts] = useState<any[]>([])
    const [state, setState] = useState("All")

    const categories = [
        "ALL",
        "MOBILE",
        "AUDIO",
        "GAMING",
        "TV"
    ]

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://fakestoreapi.in/api/products');
            const data = await response.json();
            setProducts(data.products)
        };

        fetchProducts();
    }, [])

    useEffect(() => {
        setFilterProducts(products.slice(-4))
    }, [products])

    useEffect(() => {
        if (state == "ALL") {
            setFilterProducts(products.slice(-4))
            return
        }

        setFilterProducts(products.filter((e) => e.category == state.toLowerCase()).slice(-4))
    }, [state])

    return (
        <div className={`mt-5 px-4 md:px-7`}>
            {/* Container */}
            <div className="flex flex-col rounded-lg">
                {/* Header */}
                <div className="flex justify-between border-b-2 text-gray-700 font-semibold">
                    <h1 className="py-3 px-5 text-base sm:text-xl">New Products</h1>

                    {/* Settings */}
                    <div className="hidden sm:flex py-3 gap-12 md:gap-16 lg:gap-20 mr-7">
                        {
                            categories.map((c, index) => {
                                return <button key={index} className="active:scale-95 duration-200" onClick={() =>{  setState(c)}}>{c}</button>
                            })
                        }
                    </div>

                    <div className="flex sm:hidden text-sm">
                        <select name="category" className="text-center outline-none" value={state} onChange={(e) => setState(e.target.value)}>
                            <option value="ALL">ALL</option>
                            <option value="MOBILE">MOBILE</option>
                            <option value="AUDIO">AUDIO</option>
                            <option value="GAMING">GAMING</option>
                            <option value="TV">TV</option>
                        </select>
                    </div>
                </div>



                <div className="grid p-4 gap-4 grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] md:grid-cols-[repeat(auto-fit,_minmax(270px,_1fr))]">
                    {
                        products.length === 0 ?
                            // Loading...
                            <ProductItem />
                            :
                            filterProducts.map((p, index) => {
                                return <ProductItem key={index} product={p} />
                            })
                    }
                </div>
            </div>
        </div>
    )
}
