import { faAngleRight, faCaretRight, faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import React from "react"

export default function Breadcrum({ product }: { product: any }) {

    const capitalize = (text: string) => {
        return text.slice(0, 1).toUpperCase() + text.slice(1, text.length)
    }

    if (!product || !product.category || !product.title) return <div className="flex items-center gap-2 p-5 text-gray-700">
        <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" /> Loading
    </div>;

    return (
        <div className="flex flex-col md:flex-row text-sm lg:text-base justify-center md:justify-start items-start md:items-center gap-1 md:gap-2 p-5 text-gray-700">
            <div className="flex gap-2 items-center">
                <Link href={'/'} className="hover:underline">Home</Link>
                <FontAwesomeIcon icon={faAngleRight} className="text-base lg:text-lg" />
                <Link href={`/${product.category}`} className="hover:underline">{capitalize(product.category)}</Link>
                <FontAwesomeIcon icon={faAngleRight} className="text-base lg:text-lg" />
            </div>
            <Link href={`/${product.category}/${product.id}`} className="hover:underline">{capitalize(product.title)}</Link>
        </div>
    )
}
