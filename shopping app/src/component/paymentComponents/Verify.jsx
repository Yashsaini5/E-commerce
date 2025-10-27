import React, { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const Verify = () => {
  const navigate = useNavigate();
  const { setCart } = useContext(DataContext);
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");

  useEffect(() => {
    if (success === "true") {
      setCart([]);
      const timer = setTimeout(() => navigate("/orders"), 2500);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => navigate("/cart"), 2500);
      return () => clearTimeout(timer);
    }
  }, [success, navigate, setCart]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-10 rounded-2xl shadow-xl flex flex-col items-center text-center max-w-md"
      >
        {success === "true" ? (
          <>
            <CheckCircle className="text-green-500 w-20 h-20 mb-4" />
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600">
              🎉 Your order has been placed successfully. Redirecting to your
              orders page...
            </p>
          </>
        ) : (
          <>
            <XCircle className="text-red-500 w-20 h-20 mb-4" />
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Payment Failed
            </h1>
            <p className="text-gray-600">
              😞 Something went wrong or payment was cancelled. Redirecting to
              cart...
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Verify;
