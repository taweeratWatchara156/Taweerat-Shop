import Image from "next/image";
import Link from "next/link";
import bannerImageLeft from '../../../public/bannerImageLeft.png'
import bannerImageRight from '../../../public/bannerImageRight.png'

export default function Banner() {
  return (
    <div className="px-4 md:px-7">
        <div className="flex flex-wrap justify-center items-center bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-lg">
          <div className="p-4 text-center" style={{flex: "1 1 250px"}}>
            <Image src={bannerImageRight} alt="banner" className="mx-auto sm:mx-0 w-[80%]"></Image>
          </div>
          <div className="pb-10 sm:pb-0 flex flex-col gap-1 sm:gap-3 text-center uppercase p-3 text-white" style={{flex: "1 1 250px"}}>
            <span className="text-lg sm:text-xl lg:text-3xl">upto</span>
            <h1 className="text-xl sm:text-3xl lg:text-5xl font-bold">50% off</h1>
            <p className="text-lg sm:text-xl lg:text-3xl">Lorem ipsum dolor sit amet.</p>
            <Link href={'#'} className="flex bg-white text-pink-500 py-3 px-5 w-fit mx-auto rounded-lg text-sm sm:text-base lg:text-xl hover:bg-gray-200 duration-200 active:scale-95">SHOP NOW</Link>
          </div>
          <div className="hidden lg:block p-4 "  style={{flex: "1 1 250px"}}>
            <Image src={bannerImageLeft} alt="banner"></Image>
          </div>
        </div>
    </div>
  )
}
