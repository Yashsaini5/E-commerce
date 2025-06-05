import React, { useContext } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import AddItem from "./pages/AddItem";
import ItemList from "./pages/ItemList";
import Order from "./pages/Order";
import AddCategory from "./pages/AddCategory";
import EditProduct from "./pages/EditProduct";

const AdminPage = () => {
  const { user } = useContext(DataContext)
  const navigate = useNavigate();
  console.log(user?.role)
  if (user?.role !== "admin" ){navigate("/")}
    return (
      <div className="h-screen w-screen overflow-hidden">
        <div className="fixed top-0 left-0 right-0 h-16 bg-black flex items-center justify-between px-8 z-50">
          <div className="text-white font-bold text-3xl flex">
            ShopEase's
            <div className="text-white font-semibold text-base pl-2 pt-3">
              Admin Panel
            </div>
          </div>
          <div className="flex gap-3">
            <div
              className="text-white font-semibold text-lg bg-stone-600 rounded-full py-1 px-6 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </div>
            <div className="text-white font-semibold text-lg bg-gray-700 rounded-full py-1 px-6 cursor-pointer">
              Logout
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="fixed top-16 left-0 h-[calc(100%-4rem)] w-1/5 bg-stone-800 flex flex-col items-end z-40">
          <NavLink
            className="w-2/3 text-white border-2 border-amber-900 bg-amber-700 py-2 pr-2 font-semibold text-lg my-5 text-end rounded-l-lg"
            to=""
          >
            <div>Add Item</div>
          </NavLink>
          <NavLink
            className="w-2/3 text-white border-2 border-amber-900 bg-amber-700 py-2 pr-2 font-semibold text-lg my-5 text-end rounded-l-lg"
            to="list"
          >
            <div>Item List</div>
          </NavLink>
          <NavLink
            className="w-2/3 text-white border-2 border-amber-900 bg-amber-700 py-2 pr-2 font-semibold text-lg my-5 text-end rounded-l-lg"
            to="order"
          >
            <div>Order</div>
          </NavLink>
        </div>

        {/* Main Content */}
        <div className="ml-[20%] mt-16 h-[calc(100%-4rem)] overflow-y-auto bg-slate-100 p-8">
          <Routes>
            <Route path="" element={<AddItem />} />
            <Route path="list" element={<ItemList />} />
            <Route path="order" element={<Order />} />
            <Route path="addCategory" element={<AddCategory />} />
            <Route path="/products/:id" element={<EditProduct />} />
          </Routes>
        </div>
      </div>
    );
};

export default AdminPage;
