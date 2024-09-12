import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Navbar: React.FC = () => {
    const router = useRouter();

    return (
        <nav className="bg-[#1b1b1b] p-4">
            <div className=" px-4 mx-auto flex justify-between items-center">
                <Link href="/">
                    <Image
                        src="https://i0.wp.com/wendor.in/wp-content/uploads/2020/01/web-logo.png"
                        alt="Wendor Logo"
                        className=""
                        height={200}
                        width={200}
                        objectFit='contain'
                    />
                </Link>

                <ul className="flex gap-6">
                    <li>
                        <Link href="/" passHref>
                            <div className={` ${router.pathname === '/' ? 'underline text-brandColor ' : 'text-white'}`}>
                                Home
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/inventory" passHref>
                            <div className={` ${router.pathname === '/inventory' ? 'underline text-brandColor' : 'text-white'}`}>
                                Inventory
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/cart" passHref>
                            <div className={` ${router.pathname === '/cart' ? 'underline text-brandColor' : 'text-white'}`}>
                                Cart
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
