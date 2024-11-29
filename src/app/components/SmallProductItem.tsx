import { faCartShopping, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function SmallProductItem({ product }: { product?: any }) {
    const route = useRouter()
    const discount = product?.discount;
    const textLimit = (text:string) => {
        if(text.length >= 40){
            return text.slice(0,40) + "..."
        }

        return text;
    }

    const capitalize = (text:string) => {
        return text.slice(0, 1).toUpperCase() + text.slice(1, text.length)
    }

    if(!product) return <div className="flex justify-center items-center py-2">
            <FontAwesomeIcon icon={faCircleNotch} className="animate-spin text-3xl text-pink-700"/>
        </div>
    

    return (
        <div className="flex border items-center p-4 rounded-lg duration-200 active:scale-100 hover:scale-[102%] cursor-pointer" onClick={() => route.push(`/${product.category}/${product.id}`)}>
            <div className='flex justify-center items-center w-[100px] h-[100px]'>
                <img src={product.image} alt='Product Image' className='mr-3' />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <span className=' text-gray-700 text-sm md:text-base'>{textLimit(product.title)}</span>
                <span className="text-sm text-gray-500">{capitalize(product.category)}</span>
                <div className="flex justify-between">
                    <span className='font-bold my-auto text-gray-800 text-xs md:text-sm'>${product.price} &nbsp;{discount ? <span className='line-through text-gray-400'>${product.price + discount}</span> : <></>}</span>
                    <button className="h-fit rounded-full py-2 px-3 bg-yellow-600 font-semibold text-white text-xs md:text-sm hover:bg-yellow-700 duration-200 active:scale-95"><FontAwesomeIcon icon={faCartShopping}/></button>
                </div>
            </div>

            <ToastContainer/>
        </div>
    )
}
