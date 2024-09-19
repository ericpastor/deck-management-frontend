import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Navbar() {
    const [scrollY, setScrollY] = useState<number>(0)
    const [isHamburger, setIsHamburger] = useState<boolean>(false)

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > scrollY) {
            setIsHamburger(true);
        } else {
            setIsHamburger(false);
        }

        setScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollY]);

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <>
            <nav className={` ${isHamburger ? 'hidden' : 'py-6 px-10 flex items-center fixed top-0 w-full justify-between align-baseline text-sea text-pretty z-40 text-2xl'}`}>
                <div className="flex flex-grow basis-0">
                    <Link to='/' > LOGO</Link >
                </div >
                <section className="flex flex-grow basis-0 justify-center ">
                    <ul className="text-sm text-white [&>li]:inline-block [&>li]:px-4 [&>li]:py-2 ">
                        <li><Link to='/crew'>Crew List</Link></li>
                        <li><Link to='/crew'>Trip List</Link></li>
                        <li><Link to='/crew'>LogBook </Link></li>
                    </ul>
                </section>
                <section className="flex flex-grow basis-0 justify-end ">
                    <ul className="flex text-sm text-white [&>li]:inline-block [&>li]:px-4 [&>li]:py-2">
                        <li className="self-center"><Link to='/register'>greatings</Link></li>
                        <li className="self-center"><Link to='/register'>Register</Link></li>
                        <li className="self-center">
                            <button onClick={() => { logout() }}>Logout</button>
                        </li>
                        <li><Link to='/login'>
                            <div className="w-10 h-10 rounded-full overflow-hidden  ring-2 ring-white"><img className='h-full w-full object-cover' src="./comic.jpg" alt="" /></div></Link>
                        </li>

                    </ul>
                </section>
            </nav >
            <nav className={` ${!isHamburger ? 'hidden' : 'z-50 py-6 px-14 top-0 right-0 fixed  w-fit align-baseline'}`}>


                <button className="bg-white p-1 w-10 h-10 rounded-full overflow-hidden  ring-2 ring-white"><img className="w-8 h-8" src="./menu.svg" alt="hamburguer menu" /></button>


            </nav>
            <nav className={` ${!isHamburger ? 'hidden' : 'z-50 py-8 px-10 top-0 left-0 fixed  w-fit align-baseline'}`}>
                <button className=" self-baseline text-sea text-2xl ">LOGO</button>
            </nav>
        </>

    )
}