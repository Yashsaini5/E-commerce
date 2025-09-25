import React, { useRef, useState, useEffect, useContext } from "react";
import gsap from "gsap";
import { NavLink } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import SearchComponent from "./SearchComponent";

const Navbar = ({}) => {
  const { user, setUser, cart, fetchCart} = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);
  let cartItemCount = null
  let userIcon = "";

  if (user) {
    userIcon = user.username.toUpperCase().substring(0, 1);
    fetchCart(user)
    cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  }

  const gsapLogoOpacity = useRef();
  const gsapHomeOpacity = useRef();
  const gsapCategoryOpacity = useRef();
  const gsapAboutOpacity = useRef();
  const gsapicon1Opacity = useRef();
  const gsapicon2Opacity = useRef();
  const gsapicon3Opacity = useRef();
  const gsapicon4Opacity = useRef();

  const navList = [
    {
      Name: "Home",
      path: "/",
      ref: gsapHomeOpacity
    },{
      Name: "Categories",
      path: "/Categories",
      ref: gsapCategoryOpacity
    },{
      Name: "About Us",
      path: "/About",
      ref: gsapAboutOpacity
    }]

  useEffect(() => {
    // Create a GSAP timeline
    const tl = gsap.timeline({
      defaults: { duration: 0.3, opacity: 1, ease: "power1.inOut" },
    });

    // Add animations to the timeline in sequence
    tl.to(gsapLogoOpacity.current, { opacity: 1, duration: 0.6 })
      .to(gsapHomeOpacity.current, { opacity: 1, duration: 0.2 })
      .to(gsapCategoryOpacity.current, { opacity: 1, duration: 0.2 })
      .to(gsapAboutOpacity.current, { opacity: 1, duration: 0.2 })
      .to(gsapicon1Opacity.current, { x: -45, duration: 0.2 })
      .to(gsapicon2Opacity.current, { x: -45, duration: 0.2 })
      .to(gsapicon3Opacity.current, { x: -45, duration: 0.2 })
      .to(gsapicon4Opacity.current, { x: -45, duration: 0.2 });
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0";
    setUser(null);
  };

  return (
    <header className="text-white fixed z-50">
      <div className="w-[100vw] h-16 bg-black flex items-center justify-between pl-10">
        <div ref={gsapLogoOpacity} className="font-bold text-3xl opacity-0">
          <NavLink to={"/"}> ShopEase</NavLink>
        </div>
        <div className="flex gap-8">
          {navList.map((list, index) => (
            <div key={index} ref={list.ref} className="font-medium opacity-0">
            <NavLink to={list.path}> {list.Name}</NavLink>
          </div>
          ))}

        </div>
        <div className="h-full max-w-48 flex items-center gap-4">

          <div
            ref={gsapicon1Opacity}
            className="cursor-pointer flex items-center justify-center h-full w-12 opacity-0"
          >
            <SearchComponent />
          </div>

          <div
            ref={gsapicon2Opacity}
            className="flex items-center justify-center h-full w-12 opacity-0"
          >
            <NavLink to={"/Wishlist"}>
              <i className="ri-heart-fill hover:text-2xl"></i>
            </NavLink>
          </div>
          <div
            ref={gsapicon3Opacity}
            className="flex items-center justify-center h-full w-12 opacity-0"
          >
            <NavLink to={`/Cart`}>
              <i className="ri-shopping-cart-2-fill hover:text-2xl">
                {cartItemCount > 0 && (
                  <span className="absolute right-1 bottom-4 bg-red-600 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </i>
            </NavLink>
          </div>
          <div
            ref={gsapicon4Opacity}
            className="flex items-center justify-center h-full w-12 opacity-0"
          >
            {user ? (
              <>
                <div
                  className="w-10 h-10 absolute flex justify-center items-center cursor-pointer"
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                >
                  <div className="bg-indigo-400 w-7 h-7 rounded-full flex justify-center items-center cursor-pointer">
                    {userIcon}
                  </div>
                </div>
                {isOpen && (
                  <div
                    className="dropdown absolute -bottom-32 -right-2 -mt-2 w-40 h-36 bg-gray-200 rounded-lg shadow-2xl"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                  >
                    <NavLink to={"/MyProfile"}>
                      <div className="px-3 py-3 border-b border-gray-400 hover:bg-gray-300 cursor-pointer text-black rounded-t-lg flex items-center gap-3">
                        <div className="w-5 h-5 border-black border rounded-full flex items-center justify-center">
                          <i className="ri-user-line mt-1"></i>
                        </div>
                        My Profile
                      </div>
                    </NavLink>
                    <NavLink to={"/Orders"}>
                      <div className="px-3 py-3 border-b border-gray-400 hover:bg-gray-300 cursor-pointer text-black flex items-center gap-3">
                        <i className="ri-box-3-line"></i>Orders
                      </div>
                    </NavLink>
                    <div
                      className="px-3 py-3 hover:bg-gray-300 cursor-pointer text-black rounded-b-lg flex items-center gap-3"
                      onClick={handleLogout}
                    >
                      <i className="ri-logout-box-r-line"></i>Logout
                    </div>
                  </div>
                )}
              </>
            ) : (
              <NavLink to={"/LogIn"}>
                <i className="ri-user-fill hover:text-2xl"></i>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
  // }
};

export default Navbar;
