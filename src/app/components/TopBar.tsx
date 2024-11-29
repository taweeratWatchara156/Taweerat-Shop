import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagramSquare, faWhatsappSquare } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link'

export default function TopBar() {
    const links = [
        {
            href: "http://facebook.com",
            icon: faFacebook,
            color: 'hover:bg-blue-500'
        },
        {
            href: "http://instagram.com",
            icon: faInstagramSquare,
            color: 'hover:bg-[#E1306C]'
        },
        {
            href: "http://whatsapp.com",
            icon: faWhatsappSquare,
            color: 'hover:bg-green-500'
        },
    ]

    return (
        <div className="border-b-[1px] py-2 sm:py-3 text-center relative">
            <span className="text-gray-500 text-xs sm:text-sm">
                FREE SHIPPING THIS WEEK ORDER NOW !
            </span>

            <div className="absolute top-3 left-14 hidden sm:flex gap-3">
                {
                    links.map((link, index) => {
                        return <Link href={link.href} key={index} className={`flex p-1 bg-gray-200 rounded-md text-gray-500 hover:text-white duration-200 ${link.color}`} target='_blank'>
                            <FontAwesomeIcon icon={link.icon} className='text-lg' />
                        </Link>
                    })
                }
            </div>
        </div>
    )
}
