import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-3">ShopEase</h2>
          <p className="text-sm">
            Your one-stop shop for the latest trends, best deals, and fast delivery.
            We bring the best products to your doorstep with care.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/shop" className="hover:underline">Shop</a></li>
            <li><a href="/profile" className="hover:underline">My Account</a></li>
            <li><a href="/orders" className="hover:underline">Orders</a></li>
            <li><a href="/cart" className="hover:underline">Cart</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:underline">FAQs</a></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            <li><a href="/return-policy" className="hover:underline">Return Policy</a></li>
            <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Join Our Newsletter</h3>
          <p className="text-sm mb-3">Get updates about new products and special offers.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded text-black"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center text-sm py-4 mt-4">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
