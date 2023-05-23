import React, { useState } from "react";
import logo from "../assest/logo.png";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = ()=>{
    setShowMenu(preve => !preve)
  }
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/* For Desktop */}

      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-10">
            <img src={logo} alt="logo" className="h-full" />
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-7 ">
          <nav className="flex gap-4 md:gap-6 text-base md:text-lg">
            <Link to={""}>Home</Link>
            <Link to={"menu"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative">
            <BsCartFill />
            <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 m-0 p-0 rounded-full text-sm text-center">
              0
            </div>
          </div>
          <div className="text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer" >
              <HiOutlineUserCircle />
            </div>
            {showMenu && (
              <div className="flex flex-col absolute right-2 bg-white p-2 shadow drop-shadow-md">
                <Link to={'newproduct'}  className="whitespace-nowrap cursor-pointer">New Product</Link>
                <Link to={'login'} className="whitespace-nowrap cursor-pointer">Login</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* For Mobile */}
    </header>
  );
};

export default Header;