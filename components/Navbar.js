import React, { useState } from 'react';
import { BiMenuAltRight } from "react-icons/bi";
import { BiDownArrow } from "react-icons/bi";
import { BiX } from "react-icons/bi";
import { BiExit } from "react-icons/bi";
import { motion } from 'framer-motion';
import  Link  from "next/link"

import { auth } from "../lib/firebase";

const Navbar = () => {

const [toggle, setToggle] = useState(false);
const [expanded, setExpanded] = useState(false);


function toggleDropdown() {
    var x = document.getElementById("mobile-menu");
    x.classList.toggle("hidden");
    setToggle(!toggle);
}

function toggleExpanded() {
    var x = document.getElementById("dropdownNavbar");
    x.classList.toggle("hidden");
    setExpanded(!expanded)
}

return (
    
    <nav className="absolute top-0 w-full z-50 px-6 sm:px-12 py-6 bg-transparent">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
            <Link href="/home" className="flex items-center">
                <span className="self-center text-xl font-semibold whitespace-nowrap text-gradient">AWS Revision</span>
            </Link>
            <button onClick={toggleDropdown} data-collapse-toggle="mobile-menu" type="button" className="inline-flex justify-center items-center ml-3 text-dark md:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-strong" aria-controls="mobile-menu-2" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                {toggle ? <BiX size={30} /> : <BiMenuAltRight size={30} /> }
            </motion.div>
            </button>
            <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul className="flex flex-col p-4 mt-4 backdrop-blur-lg  border border-dark md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
                <li>
                <Link href="/home" className="block py-2 pr-4 pl-3 text-white bg-dark  md:bg-transparent md:text-strong md:p-0" aria-current="page">Home</Link>
                </li>
                <li>
                    <button onClick={toggleExpanded} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex gap-2 justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-dark border border-transparent  hover:border-white md:hover:bg-transparent md:border-0 md:hover:text-strong md:p-0 md:w-auto">Modules 
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} >
                            <BiDownArrow className={expanded ? "rotate-90" : "rotate-0"} />
                        </motion.div>
                    </button>
                    {/* <!-- Dropdown menu --> */}
                    <div id="dropdownNavbar" className="hidden z-10 p-6 w-max font-normal bg-soft border border-dark divide-y divide-gray-100 shadow-2xl" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom" style={{ position: "absolute", inset: "auto 48px auto auto", margin: "0px", transform: "translate3d(0px, 11px, 0px)" }}>
                        <ul className="py-1 text-sm text-gray-700" aria-labelledby="dropdownLargeButton">
                        <li>
                            <Link href="module-1" className="block py-2 px-4 hover:bg-light ">1 - Cloud Concepts Overview</Link>
                        </li>
                        <li>
                            <Link href="module-2" className="block py-2 px-4 hover:bg-light">2 - Cloud Economics and Billing</Link>
                        </li>
                        <li>
                            <Link href="module-3" className="block py-2 px-4 hover:bg-light">3 - AWS Global Infrastructure Overview</Link>
                        </li>
                        <li>
                            <Link href="module-4" className="block py-2 px-4 hover:bg-light">4 - AWS Cloud Security</Link>
                        </li>
                        <li>
                            <Link href="module-5" className="block py-2 px-4 hover:bg-light">5 - Networking and Content Delivery</Link>
                        </li>
                        <li>
                            <Link href="module-6" className="block py-2 px-4 hover:bg-light">6 - Compute</Link>
                        </li>
                        <li>
                            <Link href="module-7" className="block py-2 px-4 hover:bg-light">7 - Storage</Link>
                        </li>
                        <li>
                            <Link href="module-8" className="block py-2 px-4 hover:bg-light">8 - Databases</Link>
                        </li>
                        <li>
                            <Link href="module-9" className="block py-2 px-4 hover:bg-light">9 - Cloud Architecture</Link>
                        </li>
                        <li>
                            <Link href="module-10" className="block py-2 px-4 hover:bg-light">10 - Auto Scaling and Monitoring</Link>
                        </li>
                        </ul>

                    </div>
                </li>
                <li>
                    <div className="py-2 pr-4 pl-3 text-dark text-opacity-50 flex flex-row justify-between items-center   md:bg-transparent md:text-dark md:text-opacity-30 md:gap-2 md:p-0" aria-current="page">
                        <p className='md:hidden'>Logout</p>
                        <SignOutButton />                    
                    </div>
                </li>
            </ul>
            </div>
        </div>
    </nav>

  )
}

function SignOutButton() {
    const handleSignOut = () => {
      localStorage.removeItem("userAuth");
      auth.signOut();
    }
      return (
        <motion.button onClick={handleSignOut} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><BiExit size={20} /></motion.button>
      )
  }

export default Navbar