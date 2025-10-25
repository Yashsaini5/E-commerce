import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";
import ProfileInfo from "../myProfileComponents/ProfileInfo";
import ManageAddress from "../myProfileComponents/ManageAddress";
import GiftCards from "../myProfileComponents/GiftCards";
import SavedUpi from "../myProfileComponents/SavedUpi";
import SavedCards from "../myProfileComponents/SavedCards";

const MyProfile = () => {
  const { user, setUser } = useContext(DataContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
     try {
       await signOut(auth);
     } catch (error) {
        console.warn("Firebase sign-out skipped or failed:", error.message);
     }
 
     document.cookie = "token=; path=/; max-age=0";
     setUser(null);
     navigate("/");
   };

  return (
    <>
      <div className="h-16"></div>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-72 bg-white shadow-xl p-6 rounded-lg">
          {/* Profile Block */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-600 text-white rounded-full mx-auto flex items-center justify-center text-4xl font-semibold">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <h2 className="mt-3 text-lg text-gray-600">Hello,</h2>
            <p className="text-xl font-semibold text-gray-800">
              {user?.username}
              {/* {user?.firstName} {user?.lastName} */}
            </p>
          </div>

          {/* Sidebar Sections */}
          <div className="text-sm text-gray-700">
            {/* Account Settings */}
            <div className="py-3">
              <p className="font-bold text-gray-900 mb-2 pl-2">
                ACCOUNT SETTINGS
              </p>
              <ul className="space-y-2 pl-4">
                <li>
                  <NavLink
                    to=""
                    end
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 font-semibold"
                        : "hover:text-blue-600"
                    }
                  >
                    Profile Information
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="address"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 font-semibold"
                        : "hover:text-blue-600"
                    }
                  >
                    Manage Addresses
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Payments */}
            <div className="py-3">
              <p className="font-bold text-gray-900 mb-2 pl-2">PAYMENTS</p>
              <ul className="space-y-2 pl-4">
                <li className="flex justify-between items-center">
                  <NavLink
                    to="giftcards"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 font-semibold"
                        : "hover:text-blue-600"
                    }
                  >
                    Gift Cards
                  </NavLink>
                  <span className="text-green-600 font-semibold">₹0</span>
                </li>
                <li>
                  <NavLink
                    to="upi"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 font-semibold"
                        : "hover:text-blue-600"
                    }
                  >
                    Saved UPI
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="cards"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 font-semibold"
                        : "hover:text-blue-600"
                    }
                  >
                    Saved Cards
                  </NavLink>
                </li>
              </ul>
            </div>
            {user?.role === "admin" ? <div>
              <p
                className="py-3 pl-2 font-bold text-gray-900 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/admin")}
              >
                ADMIN PANEL
              </p>
            </div> : <></>}
             
            {/* Orders */}
            <div>
              <p
                className="py-3 pl-2 font-bold text-gray-900 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/orders")}
              >
                MY ORDERS
              </p>
            </div>
            <div>
              <p
                className="py-3 pl-2 font-bold text-gray-900 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/cart")}
              >
                MY CART
              </p>
            </div>
            <div>
              <p
                className="py-3 pl-2 font-bold text-gray-900 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/wishlist")}
              >
                MY WISHLIST
              </p>
            </div>
            <div>
              <p
                className="py-3 pl-2 font-bold text-gray-900 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                LOGOUT
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
         <div className="flex-grow bg-gray-100 p-6">
        <Routes>
          {/* Account Settings */}
          <Route path="" element={<ProfileInfo />} />
          <Route path="address" element={<ManageAddress />} />

          {/* Payments */}
          <Route path="giftcards" element={<GiftCards />} />
          <Route path="upi" element={<SavedUpi />} />
          <Route path="cards" element={<SavedCards />} />
        </Routes>
        </div>
      </div>
    </>
  );
};

export default MyProfile;