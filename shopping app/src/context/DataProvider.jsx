import React, { useCallback, createContext, useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const url = "http://localhost:5000/api"
  // const navigate = useNavigate()
  const [data, setData] = useState(); //stores product data
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [user, setUser] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

// Fetch user Id when compIdonent mounts
useEffect(() => {
  const fetchUser = async () => {

    try {
      const res = await axios.get(`${url}/user/me`, { withCredentials: true });
      if (!res.data) return;

      // Only update if data actually changed
      setUser(prev => {
        if (JSON.stringify(prev) !== JSON.stringify(res.data)) {
          return res.data;
        }
        return prev;
      });
    } catch (err) {
      console.log("Error fetching user:", err.message);
    }
  };
  fetchUser();
}, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/products`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  
  //fetch cart item for user
   const fetchCart = async () => {
      try{
        const response = await axios.get(`${url}/cart`,{
          withCredentials: "true",
        })
        // if (!user || user == null ) return navigate("/login");
        if (!response.data || !Array.isArray(response.data)) {
          console.error("Invalid cart data:", response.data);
          return setCart([]);
      }
        setCart(response.data)
      }catch(error){
        console.log("error fetching cart:", error.response?.data || error.message)
      }
    }
  
//  useEffect(() => {
//   let didRun = false;

//   const runOnce = async () => {
//     if (didRun) return;
//     didRun = true;
//     await fetchCart();
//   };

//   runOnce();
// }, []); 

  //   useEffect(() => {
    

  //   fetchWishlist()
  // }, [])
    
  //   useEffect(() => {
  //      if (user) {
  //     fetchCart();
  //     fetchWishlist();
  //   } else {
  //     setCart([]);
  //     setWishlist([]);
  //   }
  // }, [user])

  const updatedCartQuantity = async (productId, newQuantity, size) => {
    try{
      const response = await axios.patch(`${url}/cart/update`,
        {productId,quantity:newQuantity, size},
        {withCredentials:"true"}
      )
      setCart(response.data)
    }catch(error){
      console.error("Error updating quantity:", error);
    }
  }

  const removeFromCart = async (productId, size) => {
    try{
      const response = await axios.delete(`${url}/cart/remove?productId=${productId}&size=${size}`,
        {withCredentials:"true"}
      )
      setCart(response.data)
    }catch(error){
      console.log("Error deleting item",error)
    }
  }

  const addToCart = async (productId, quantity = 1, size, newPrice, oldPrice) => {
    // not catching proper errors adding to cart without login
    // console.log(productId,size,newPrice)
    try {
      const response = await axios.post(`${url}/cart`, {
        productId,
        quantity,
          size,
          newPrice,
          oldPrice,
      },
        {withCredentials: true}
      );
      
      setCart(response.data); // Update cart state
      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized! Redirecting to login...");
        // navigate("/login");
      }
    }
    // console.log(cart);
    
  };

//wishlist

 const fetchWishlist = async () => {
    try{
      const response = await axios.get(`${url}/wishlist`,{
        withCredentials:"true",
      })
      // if (!user || user == null ) return navigate("/login");
      if (!response.data || !Array.isArray(response.data)) {
        console.error("Invalid wishlist data:", response.data);
        return setWishlist([]);
    }
    setWishlist(response?.data)
    }catch(error){
      console.log("error fetching wishlist: ",error.response?.data || error.message)
    }
  }

  const removeFromWishlist = async (productId) => {
    try{
      const response = await axios.delete(`${url}/wishlist/remove?productId=${productId}`,
        {withCredentials:"true"})
        setWishlist(response.data)
    }catch(error){
      console.log("error deleting wishlist: ",error);
      
    }
  }

  const addToWishlist = async (productId) => {
    try{
      const response = await axios.post(`${url}/wishlist`,
        {productId},{withCredentials:"true"})

        setWishlist(response.data)
    }catch(error){
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized! Redirecting to login...");
        // navigate("/login");
      }
    }
  }

// data provider -> auth, cart, wishlist and other (differnt context for every page)
  return (
    <DataContext.Provider value={{data, setData, cart, setCart, addToCart, user , setUser, fetchCart, updatedCartQuantity, removeFromCart, wishlist, fetchWishlist, addToWishlist, removeFromWishlist, selectedAddress, setSelectedAddress}}> 
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

