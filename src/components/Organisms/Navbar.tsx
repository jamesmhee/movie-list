'use client'
import { useState } from 'react'
import Button from '../Atoms/Button'
import SwitchTheme from '../Atoms/SwitchTheme'
import { RiNetflixFill } from 'react-icons/ri'
import Link from 'next/link'

const Navbar = () => {
    const [isShow, setIsShow] = useState(false)
    return (
        <nav className="px-5! py-3! navbar  bg-gradient-to-r from-red-700 from-30% to-red-900 to-100% justify-between sticky top-0 z-[99999999]!">
            <div className="inline-flex items-center">
                <RiNetflixFill className="text-4xl text-white" />
                <h2 className="text-3xl font-semibold text-zinc-950 line-through">ETFLICK</h2>
            </div>
            <div className="flex-none md:hidden">
                <Button
                    onClick={() => setIsShow(!isShow)}
                    className="btn btn-square btn-ghost text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-5 w-5 stroke-current"
                    >
                        {' '}
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>{' '}
                    </svg>
                </Button>
            </div>
            <div
            onClick={()=>setIsShow(false)}
            className={`z-20 fixed top-0 left-0 h-full w-full bg-base-100/50 shadow-lg transform ${isShow ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out md:relative md:transform-none md:w-auto md:bg-transparent md:shadow-none md:flex items-center gap-2`}
            >
            </div>
            <div
                className={`z-20 fixed top-0 right-[-2px] h-full w-64 bg-base-300 shadow-lg transform ${isShow ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out md:relative md:transform-none md:w-auto md:bg-transparent md:shadow-none md:flex items-center gap-2`}
            >
                <Button
                    onClick={() => setIsShow(false)}
                    className="md:hidden absolute top-5 right-5 p-2! btn-ghost"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </Button>
                <ul className="flex gap-5 flex-col md:flex-row m-4! md:m-0!">
                    <li>
                        <Link href="/">
                            <Button className="p-2! btn btn-link no-underline text-black dark:text-zinc-300 md:text-white">
                                Home
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link href="/add">
                            <Button className="p-2! btn btn-link no-underline text-black dark:text-zinc-300 md:text-white">
                                Add Movie
                            </Button>
                        </Link>
                    </li>
                    <SwitchTheme />
                </ul>
            </div>
        </nav>
    )
}
export default Navbar
