import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataProvider";
import { Link } from "react-router-dom";

const ProfileInfo = () => {
  const { user } = useContext(DataContext);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="h-20 bg-white shadow px-10 flex items-center text-2xl font-bold">
        Profile Overview
      </div>

      {/* Main Content */}
      <div className="flex-grow px-10 py-8">
        <div className="w-full bg-white p-10 rounded-xl shadow-md h-full">
          <h2 className="text-3xl font-bold mb-8 border-b pb-4 text-gray-800">
            Your Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-gray-500 text-base">First Name</p>
              <p className="text-xl font-medium text-gray-800">{user?.addresses[0]?.firstName || "—"}</p>
            </div>
            <div>
              <p className="text-gray-500 text-base">Last Name</p>
              <p className="text-xl font-medium text-gray-800">{user?.addresses[0]?.lastName || "—"}</p>
            </div>
            <div>
              <p className="text-gray-500 text-base">Email</p>
              <p className="text-xl font-medium text-gray-800">{user?.email || "—"}</p>
            </div>
            <div>
              <p className="text-gray-500 text-base">Mobile</p>
              <p className="text-xl font-medium text-gray-800">{user?.addresses[0]?.phone || "—"}</p>
            </div>
            <div>
              <p className="text-gray-500 text-base">Gender</p>
              <p className="text-xl font-medium text-gray-800 capitalize">{user?.gender || "—"}</p>
            </div>
          </div>

          {/* Address Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Address</h3>
            {user?.addresses[0] && user.addresses[0].street ? (
              <div className="text-gray-700 space-y-1 text-lg">
                <p>{user.addresses[0].street}</p>
                <p>{user.addresses[0].city}, {user.addresses[0].state} - {user.addresses[0].zipcode}</p>
                <p>{user.addresses[0].country}</p>
              </div>
            ) : (
              <p className="text-base text-gray-500">
                No address provided.{" "}
                <Link to="/Myprofile/address" className="text-blue-600 underline">
                  Add now
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
