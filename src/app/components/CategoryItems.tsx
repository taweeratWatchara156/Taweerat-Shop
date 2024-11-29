"use client"

import { faCaretRight, faGamepad, faMobileScreen, faTv, faVolumeHigh } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useEffect, useState } from "react"
import SmallProductItem from "./SmallProductItem"

export default function CategoryItems() {
    const [products, setProducts] = useState<any[]>([])
    const [onSale, setOnSale] = useState<any[]>([])
    const [popular, setPopular] = useState<any[]>([])
    const [newArrival, setNewArrival] = useState<any[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://fakestoreapi.in/api/products');
            const data = await response.json();
            setProducts(data.products)
        };

        fetchProducts();
    }, [])

    useEffect(() => {
        setOnSale(products.filter((e) => e?.onSale).slice(-4))
        setPopular(products.filter((e) => e?.popular).slice(-4))
        setNewArrival(products.slice(-4))

    }, [products])

    const categories = [
        {
            name: "MOBILE",
            icon: faMobileScreen,
            href: "/mobile"
        },
        {
            name: "AUDIO",
            icon: faVolumeHigh,
            href: "/audio"
        },
        {
            name: "GAMING",
            icon: faGamepad,
            href: "/gaming"
        },
        {
            name: "TV",
            icon: faTv,
            href: "/tv"
        },
    ]

    return (
        <div className="flex px-4 md:px-7 my-5">
            {/* Category */}
            <div className="hidden lg:flex flex-col border rounded-lg p-4 h-fit w-[300px] text-gray-700 mr-5">
                <h1 className="text-lg font-semibold">Category</h1>
                <div className="flex flex-col gap-6 mt-5">
                    {
                        categories.map((e, index) => {
                            return <Link key={index} href={e.href} className="flex justify-between">
                                <div>
                                    <FontAwesomeIcon icon={e.icon} className="mr-2" /> {e.name}
                                </div>

                                <FontAwesomeIcon icon={faCaretRight} />
                            </Link>
                        })
                    }
                </div>
            </div>

            <div className="w-full flex-col lg:flex-row flex gap-5">
                <div className="flex w-full flex-col">
                    <h1 className="text-xl font-semibold text-gray-700">On Sale</h1>
                    <hr className="my-5" />
                    {/* Items */}
                    <div className="flex flex-col gap-5">
                        {
                            onSale.length === 0 ?
                                // Loading...
                                <SmallProductItem />
                                :
                                onSale.map((p, index) => {
                                    return <SmallProductItem key={index} product={p} />
                                })
                        }
                    </div>
                </div>

                <div className="flex w-full flex-col">
                    <h1 className="text-xl font-semibold text-gray-700">Popular</h1>
                    <hr className="my-5" />
                    {/* Items */}
                    <div className="flex flex-col gap-5">
                        {
                            popular.length === 0 ?
                                // Loading...
                                <SmallProductItem />
                                :
                                popular.map((p, index) => {
                                    return <SmallProductItem key={index} product={p} />
                                })
                        }
                    </div>
                </div>

                <div className="flex w-full flex-col">
                    <h1 className="text-xl font-semibold text-gray-700">New Arrival</h1>
                    <hr className="my-5" />
                    {/* Items */}
                    <div className="flex flex-col gap-5">
                        {
                            newArrival.length === 0 ?
                                // Loading...
                                <SmallProductItem />
                                :
                                newArrival.map((p, index) => {
                                    return <SmallProductItem key={index} product={p} />
                                })
                        }
                    </div>
                </div>
            </div>


        </div>
    )
}
