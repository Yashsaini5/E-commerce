import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { useNavigate, useLocation} from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();

  const loadOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/order/userOrders",
        { withCredentials: true }
      );
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Order fetching error:", error);
    }
  };

  useEffect(() => {
    if (user == null) {
      localStorage.setItem("redirectAfterLogin", location.pathname);
      navigate("/login", { replace: true });
    } else {
      loadOrders();
    }
  }, [user, navigate, location]);

  return (
    <div>
      <div className="h-16"></div>
      <div className="p-10 bg-gray-200 flex flex-col min-h-screen">
        <div className="max-w-full h-fit bg-white shadow-lg rounded-lg p-8  grid">
          <p className="text-2xl w-full h-12 font-semibold border-b-4 border-gray-500">
            My Orders
          </p>
          {orders.length === 0 ? (
            <p className="text-center text-gray-500 text-lg mt-10">
              No orders found.
            </p>
          ) : (
            orders
              .slice()
              .reverse()
              .map((order) =>
                order.products.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row justify-between border border-gray-200 rounded-xl p-4 mb-4 shadow-sm hover:shadow-md transition-all bg-white"
                  >
                    {/* Left: Product Image */}
                    <Link to={`/product/${item?.product}`}>
                      <div className="w-full sm:w-28 h-28 flex-shrink-0 overflow-hidden rounded-lg mb-3 sm:mb-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </Link>

                    {/* Middle: Product Details */}
                    <div className="flex-1 sm:px-5 space-y-1 text-sm text-gray-700">
                      <Link to={`/product/${item?.product}`}>
                        <h2 className="text-lg font-medium text-gray-800 hover:underline">
                          {item.name?.length > 60
                            ? item.name.substring(0, 60) + "..."
                            : item.name}
                        </h2>
                      </Link>
                      <p>
                        ₹{item.price} &nbsp; • &nbsp; Quantity: {item.quantity}{" "}
                        &nbsp; • &nbsp; Size: {item.size}
                      </p>
                      <p>
                        Placed on:{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p>Payment: {order.paymentDetails.method}</p>
                    </div>

                    <div
                      className={`inline-flex items-center font-semibold sm:px-40 space-y-1 ${
                        order.status === "Out for Delivery"
                          ? "text-green-600"
                          : order.status === "Order Placed"
                          ? "text-yellow-600"
                          : "text-gray-600"
                      }`}
                    >
                      <span className="w-2 h-2 bg-current rounded-full inline-block mr-2" />
                      {order.status}
                    </div>

                    {/* Right: Address + Status */}
                    <div className="mt-4 sm:mt-0 sm:w-64 space-y-2 text-sm">
                      <div>
                        <p className="font-medium text-gray-800">
                          Shipping Address
                        </p>
                        <div className="flex gap-2">
                          <p>{order.shippingAddress.firstName}</p>
                          <p>{order.shippingAddress.lastName}</p>
                        </div>
                        <p>{order.shippingAddress.street}</p>
                        <p>
                          {order.shippingAddress.city},{" "}
                          {order.shippingAddress.state}
                        </p>
                        <p>
                          {order.shippingAddress.country} -{" "}
                          {order.shippingAddress.zipcode}
                        </p>
                        <p>{order.shippingAddress.phone}</p>
                      </div>
                    </div>
                  </div>
                ))
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
