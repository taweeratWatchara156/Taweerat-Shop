import { faFacebookSquare, faInstagramSquare, faWhatsappSquare } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-700 p-7 px-15 lg:px-32 gap-10 lg:gap-20">
                {/* About */}
                <div className="flex flex-col gap-5 text-white w-full md:w-1/4 items-center md:items-start">
                    <h1 className="text-base w-fit">About
                        <hr className="w-[100%] md:w-[120%] border-2 rounded-full border-pink-500" />
                    </h1>
                    <span className="text-center md:text-start text-gray-400 text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit molestiae aspernatur eligendi laborum, sint quod labore fuga unde omnis mollitia ullam impedit expedita animi sed nihil ratione eos fugiat. Repudiandae.</span>
                </div>
                {/* Categories */}
                <div className="flex flex-col gap-5 text-white w-full md:w-1/4 items-center md:items-start">
                    <h1 className="text-base w-fit">Categories
                        <hr className="w-[100%] md:w-[120%] border-2 rounded-full border-pink-500" />
                    </h1>
                    <ul className="text-gray-400  text-sm text-center md:text-start"> 
                        <li><Link href={"/audio"}>Audio</Link></li>
                        <li><Link href={"/mobile"}>Mobile</Link></li>
                        <li><Link href={"/gaming"}>Gaming</Link></li>
                        <li><Link href={"/tv"}>Tv</Link></li>
                    </ul>
                </div>
                {/* Informations */}
                <div className="flex flex-col gap-5 text-white w-full md:w-1/4 items-center md:items-start">
                    <h1 className="text-base w-fit">Informations
                        <hr className="w-[100%] md:w-[120%] border-2 rounded-full border-pink-500" />
                    </h1>
                    <ul className="flex flex-col gap-2 text-gray-400 text-sm text-center md:text-start">
                        <li><Link href={""}>About Us</Link></li>
                        <li><Link href={""}>Contact Us</Link></li>
                        <li><Link href={""}>Term & Condition</Link></li>
                        <li><Link href={""}>Shipping & Delivery</Link></li>
                        <li><Link href={""}>Privacy Policy</Link></li>
                    </ul>
                </div>
                {/* Contact */}
                <div className="flex flex-col gap-5 text-white w-full md:w-1/4 items-center md:items-start">
                    <h1 className="text-base w-fit">Contact
                        <hr className="w-[100%] md:w-[120%] border-2 rounded-full border-pink-500" />
                    </h1>
                    <div className="flex flex-col text-gray-400  text-sm">
                        <div className="text-center md:text-start">
                            <FontAwesomeIcon icon={faLocationDot}/>
                            <span className="ml-2">Address : ABC, New Detail Thai Bangkok 10250 New Jersy</span>
                        </div>

                        <hr className="my-2 border-gray-400 border"/>
                        <span className="text-center md:text-start"><FontAwesomeIcon icon={faPhone} /> +6643 223 3214</span>
                        <span className="text-center md:text-start"><FontAwesomeIcon icon={faEnvelope} /> example1123@gmail.com</span>
                        <div className="flex text-2xl gap-2 md:justify-normal justify-center">
                            <Link href={"https://www.facebook.com/taweerat.poom/?locale=th_TH"}><FontAwesomeIcon icon={faFacebookSquare}/></Link>
                            <Link href={"https://www.instagram.com/taweeratzzz/"}><FontAwesomeIcon icon={faInstagramSquare}/></Link>
                            <Link href={"https://www.whatsapp.com/"}><FontAwesomeIcon icon={faWhatsappSquare}/></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex text-center text-sm p-6 bg-gray-800 text-gray-400 justify-center mb-14 sm:mb-0">
                Copyright &copy; All righs reserved | Taweerat Watcharamanokarn 2024
            </div>
        </div>
    )
}
