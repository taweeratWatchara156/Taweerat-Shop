"use client"

import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

export default function Navigation() {
    const [active, setActive] = useState(false)

    const items = [
        {
            name: "HOME",
            href: "/"
        },
        {
            name: "AUDIO",
            href: "/audio"
        },
        {
            name: "MOBILE",
            href: "/mobile"
        },
        {
            name: "GAMING",
            href: "/gaming"
        },
        {
            name: "TV",
            href: "/tv"
        }
    ]

    return (
        <>
            <div className="flex flex-col sm:hidden ">
                <FontAwesomeIcon icon={active ? faXmark : faBars} className="text-xl px-7 py-4 mr-auto text-gray-600 duration-200 active:scale-95" onClick={() => setActive(!active)} />

                <div className={`flex flex-col ${active ? 'h-[260px] mb-5' : 'h-0 mb-0'} overflow-y-hidden duration-300`}>
                    {
                        items.map((item, index) => {
                            return <Link key={index} href={item.href} className="text-center text-sm px-8 py-4 font-semibold text-gray-600 cursor-pointer hover:bg-pink-300 duration-200 hover:text-white">
                                {item.name}
                            </Link>
                        })
                    }
                </div>
            </div>

            <div className="flex justify-center">
                {
                    items.map((item, index) => {
                        return <Link key={index} href={item.href} className="hidden sm:block text-base px-8 py-4 font-semibold text-gray-600 cursor-pointer hover:bg-pink-300 duration-200 hover:text-white">
                            {item.name}
                        </Link>
                    })
                }
            </div>
        </>
    )
}
