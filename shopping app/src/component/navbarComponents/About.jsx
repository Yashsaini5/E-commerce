import React from 'react'
import about1 from '../../assets/images/about1.jpg'
import about2 from '../../assets/images/about2.jpg'
import about3 from '../../assets/images/about3.jpg'

function About() {
  return (
    <div>
         <div className='h-16'>
         </div>
       <div className="bg-white min-h-screen py-12 px-6 md:px-20 lg:px-32 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">About Us</h1>

      {/* Hero Image Section */}
      <div className="mb-6">
        <img 
          src={about1} 
          alt="Team working together" 
          className="w-full h-[400px] object-cover rounded-lg shadow-md object-top"
        />
      </div>

      <p className="text-lg mb-6 leading-7">
        Welcome to <strong>YourStoreName</strong> – your one-stop destination for the latest and greatest in fashion, electronics, gadgets, home essentials, and more!
      </p>

      <p className="text-lg mb-6 leading-7">
        Our mission is simple: to deliver high-quality products at competitive prices, paired with a seamless shopping experience and top-notch customer service.
      </p>

      {/* Team or Vision Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-10">
        <div>
          <img 
            src={about2} 
            alt="Our team" 
            className="w-full h-[250px] object-cover rounded-md shadow object-bottom"
          />
        </div>
        <div>
          <p className="text-lg leading-7">
            We carefully curate our collections and work with trusted brands and suppliers to ensure quality in every product. Our passionate team is dedicated to staying ahead of trends and delivering an exceptional experience.
          </p>
        </div>
      </div>

      <p className="text-lg mb-6 leading-7">
        At <strong>YourStoreName</strong>, your satisfaction is our priority. We offer secure payments, fast delivery, and hassle-free returns for a smooth experience.
      </p>

      {/* Customer Experience Image */}
      <div className="my-10">
        <img 
          src={about3} 
          alt="Happy customers" 
          className="w-full h-[450px] object-cover rounded-md shadow object-center"
        />
      </div>

      <p className="text-lg leading-7">
        Thank you for choosing us. We look forward to serving you and making your online shopping journey enjoyable and rewarding.
      </p>

      <div className="mt-12 text-center">
        <p className="text-md text-gray-600">📦 Trusted by thousands of happy customers</p>
        <p className="text-md text-gray-600">💬 24/7 customer support available</p>
        <p className="text-md text-gray-600">🔒 Safe and secure checkout</p>
      </div>
    </div>
    </div>
  )
}

export default About
