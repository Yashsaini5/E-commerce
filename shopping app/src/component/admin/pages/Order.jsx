import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [statusUpdates, setStatusUpdates] = useState({});

     const apiUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
  apiUrl + '/api/order/orderList',
  { withCredentials: true } 
);
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setStatusUpdates(prev => ({ ...prev, [orderId]: newStatus }));
  };

  const updateOrderStatus = async (orderId) => {
    const newStatus = statusUpdates[orderId];
    if (!newStatus) return;

    try {
      const res = await axios.post( apiUrl + '/api/order/status', {
        orderId,
        status: newStatus,
      },{withCredentials:true});

      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
      alert('Order status updated!');
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg w-[95%]">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Orders</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-center">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">User</th>
              <th className="p-3 border">Total</th>
              <th className="p-3 border">Payment</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
         <tbody>
  {orders.map((order, index) => (
    <tr key={order._id} className="bg-white border-b hover:bg-gray-50">
      {/* Index */}
      <td className="px-4 py-3 text-center">{index + 1}</td>

      {/* User */}
      <td className="px-4 py-3 text-center">
        {order.user?.username || "Unknown"}
      </td>

      {/* Products */}
      <td className="px-4 py-3 text-center">
        {order.products.map((item, idx) => (
          <div key={idx} className="flex items-center justify-center gap-2 mb-2">
            <img
              src={item.image || "/placeholder.jpg"}
              alt={item.name}
              className="w-10 h-10 rounded object-cover"
            />
            <div className="text-left">
              <div>{item.name}</div>
              <div className="text-sm text-gray-600">Size: {item.size}</div>
              <div className="text-sm">₹{item.price} × {item.quantity}</div>
            </div>
          </div>
        ))}
      </td>

      {/* Total */}
      <td className="px-4 py-3 text-center font-semibold">
        ₹{order.totalAmount}
      </td>

      {/* Payment */}
      <td className="px-4 py-3 text-center">
        <div>{order.paymentDetails.method}</div>
        <div className={`text-sm font-medium ${
            order.paymentDetails.status === "paid" ? "text-green-600" :
            order.paymentDetails.status === "failed" ? "text-red-600" :
            "text-yellow-600"
        }`}>
          {order.paymentDetails.status}
        </div>
      </td>

      {/* Status */}
      <td className="px-4 py-3 text-center">
        <select
          value={statusUpdates[order._id] || order.status}
          onChange={(e) => handleStatusChange(order._id, e.target.value)}
          className="bg-gray-100 px-2 py-1 rounded text-sm mb-4"
        >
          <option>Order Placed</option>
          <option>Packing</option>
          <option>Shipped</option>
          <option>Out For Delivery</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
        <button
  onClick={() => updateOrderStatus(order._id)}
  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
>
  Save
</button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
