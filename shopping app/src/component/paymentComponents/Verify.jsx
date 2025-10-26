import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { DataContext } from '../../context/DataProvider'
import axios from 'axios'

const Verify = () => {

    const navigate = useNavigate()
    const { setCart } = useContext(DataContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const session_id = searchParams.get('session_id')
    // console.log(success, orderId)

      const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const verifyPayment = async () => {

        try {
            const response = await axios.post( apiUrl + "/api/order/verifyStripe",{success, session_id }, {
                withCredentials: true,
              })

              if(response.data.success){
                setCart([])
                navigate("/Orders")
              }else {
                navigate("/cart")
              }
        } catch (err) {
            console.log("error ",err)
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [])

  return (
    <div>
      Verifying payment, please wait...
    </div>
  )
}

export default Verify
