import React, { useState, useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import axios from "axios";

const ManageAddress = () => {
  const { user, setUser, selectedAddress, setSelectedAddress } = useContext(DataContext);

  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};

    if (!newAddress.firstName.trim()) errs.firstName = "First name is required";
    if (!newAddress.lastName.trim()) errs.lastName = "Last name is required";

    if (!/^[6-9]\d{9}$/.test(newAddress.phone)) {
      errs.phone = "Enter a valid 10-digit Indian phone number";
    }

    if (!newAddress.street.trim()) errs.street = "Street address is required";
    if (!newAddress.city.trim()) errs.city = "City is required";
    if (!newAddress.state.trim()) errs.state = "State is required";
    if (!/^\d{6}$/.test(newAddress.zipcode)) {
      errs.zipcode = "Enter a valid 6-digit Zip Code";
    }

    if (!newAddress.country.trim()) errs.country = "Country is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddAddress = async () => {
    if (!validate()) return;

    try {
      const { data } = await axios.put("http://localhost:5000/api/user/add-address",newAddress, { withCredentials: true });
      setUser(data);
      setNewAddress({
        firstName: "",
        lastName: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Failed to add address", error);
      alert("Something went wrong!");
    }
  };

  const handleDelete = async (index) => {
    try {
      const { data } = await axios.put("http://localhost:5000/api/user/delete-address", { index } ,{ withCredentials: true });
      setUser(data);
    } catch (error) {
      console.error("Delete failed", error);
      alert("Could not delete address");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Addresses</h2>

      {/* Address Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {user?.addresses?.map((addr, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-md relative space-y-2">
            <button
              className="absolute top-2 right-2 text-red-600 text-sm"
              onClick={() => handleDelete(i)}
            >
              Delete
            </button>
            <h4 className="text-lg font-semibold">
              {addr.firstName} {addr.lastName}
            </h4>
            <p className="text-sm text-gray-700">{addr.phone}</p>
            <p className="text-sm text-gray-700">{addr.street}</p>
            <p className="text-sm text-gray-700">
              {addr.city}, {addr.state} - {addr.zipcode}
            </p>
            <p className="text-sm text-gray-700">{addr.country}</p>
          </div>
        ))}
      </div>

      {/* Add New Address Form */}
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Add New Address</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="firstName"
              value={newAddress.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-2 border rounded"
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              value={newAddress.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-2 border rounded"
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <input
            type="Number"
            name="phone"
            value={newAddress.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-2 border rounded"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <input
          type="text"
          name="street"
          value={newAddress.street}
          onChange={handleChange}
          placeholder="Street Address"
          className="w-full p-2 border rounded"
        />
        {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              name="city"
              value={newAddress.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full p-2 border rounded"
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>
          <div>
            <input
              type="text"
              name="state"
              value={newAddress.state}
              onChange={handleChange}
              placeholder="State"
              className="w-full p-2 border rounded"
            />
            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
          </div>
          <div>
            <input
              type="text"
              name="zipcode"
              value={newAddress.zipcode}
              onChange={handleChange}
              placeholder="Zip Code"
              className="w-full p-2 border rounded"
            />
            {errors.zipcode && <p className="text-red-500 text-sm">{errors.zipcode}</p>}
          </div>
        </div>

        <input
          type="text"
          name="country"
          value={newAddress.country}
          onChange={handleChange}
          placeholder="Country"
          className="w-full p-2 border rounded"
        />
        {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}

        <button
          onClick={handleAddAddress}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Address
        </button>
      </div>
    </div>
  );
};

export default ManageAddress;
