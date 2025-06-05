import React,{ useRef, useState} from 'react'
import s24ultra from '../../assets/videos/s24ultra.mp4'; 
import fashionBanner from '../../assets/videos/fashionBanner.mp4'
import macbook from '../../assets/videos/macbook.mp4'
import ps5 from '../../assets/videos/ps5.mp4'
import gsap, { Expo } from 'gsap';
import { useGSAP } from '@gsap/react';

function HeroBanner() {
    // const gsapopacity = useRef()
    const gsapbanner1 = useRef()

    // video source
    const videos = [
      { src: ps5, title: "PlayStation®5", description: "Play like never before",feature: "The Ultimate Gaming Machine", offer: "Avail benefits worth ₹4000*" }, // Duplicate of last slide
      { src: s24ultra, title: "SAMSUNG", description: " Galaxy S24 Ultra",feature: "Galaxy AI is here", offer: "Avail benefits worth ₹12999*" },
      { src: fashionBanner, title: "H&M", description: "Mens | Womens | Kids",feature: `Fashion and Quality at the Best Price`, offer: "Avail benefits worth ₹3000*" },
      { src: macbook, title: "APPLE", description: "MacBook Air 13",feature: "Designed to go places.", offer: "MacBook Air with M2 from ₹99900*" },
      { src: ps5, title: "PlayStation®5", description: "Play like never before",feature: "The Ultimate Gaming Machine", offer: "Avail benefits worth ₹1200*" },
      { src: s24ultra, title: "SAMSUNG", description: "Galaxy S24 Ultra",feature: "Galaxy AI is here", offer: "Avail benefits worth ₹12999*" }, // Duplicate of first slide
    ];
  
const [Xvalue, setXvalue] = useState(100);

function nextpage() {
    setXvalue(prev => (prev >= 500 ? 100 : prev + 100));
}
function prepage() {
    setXvalue(prev => (prev <= 0 ? 400 : prev - 100));
}

useGSAP(() => {
    // Trigger gsap animation when `Xvalue` updates
    gsap.to(gsapbanner1.current, {
        left: `-${Xvalue}%`, // Use computed `Xvalue` directly
        duration: 0.5,
        ease: "sine.inOut",
        onComplete: () => {
            if (Xvalue === 500) {
                // Reset to start if we go beyond 500 in forward direction
                setXvalue(100);
                gsap.set(gsapbanner1.current, { left: "-100%" });
            } else if (Xvalue === 0) {
                // Reset to end if we go below 100 in backward direction
                setXvalue(400);
                gsap.set(gsapbanner1.current, { left: "-400%" });
            }
        }
    });
}, [Xvalue]);

  return (
    <>
    <div className='h-16'></div>
    <button className='bg-gray-900 rounded-md text-white text-3xl h-16 w-8 z-10 absolute right-0 top-[30%] opacity-50 hover:opacity-100' onClick={nextpage}><i className="ri-arrow-right-s-fill"></i></button>
    <button className='bg-gray-900 rounded-md text-white text-3xl h-16 w-8 z-10 absolute left-0 top-[30%] opacity-50 hover:opacity-100' onClick={prepage}><i className="ri-arrow-left-s-fill"></i></button>
    <div  className='h-[65vh] w-full relative  overflow-hidden bg-black'>
    {/* <div  ref={gsapopacity} className='h-[91vh] w-full relative  overflow-x-hidden opacity-1'> */}
    <div ref={gsapbanner1} className="flex w-[600%] h-[65vh] absolute -left-[100%]">
          {videos.map((video, index) => (
            <div key={index} className="w-full h-full bg-black relative">
              <video src={video.src} autoPlay loop muted className="w-full h-full object-fill opacity-60" />
              <p className="absolute text-white font-normal text-5xl top-6 left-10">{video.title}</p>
              <p className="absolute text-white font-normal text-4xl top-20 left-10">{video.description}</p>
              <p className="absolute text-white font-normal text-2xl right-10 bottom-16">{video.feature}</p>
              <p className="absolute text-white font-normal text-xl right-10 bottom-10">{video.offer}</p>
            </div>
          ))}
        </div>
    </div>
    {/* </div> */}
    </>
  )}
export default HeroBanner