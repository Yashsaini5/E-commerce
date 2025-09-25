import s24ultra from "../../assets/videos/s24ultra.mp4";
import fashionBanner from "../../assets/videos/fashionBanner.mp4";
import macbook from "../../assets/videos/macbook.mp4";
import ps5 from "../../assets/videos/ps5.mp4";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

function HeroBanner() {

  const videos = [
    {
      src: s24ultra,
      title: "SAMSUNG",
      description: " Galaxy S24 Ultra",
      feature: "Galaxy AI is here",
      offer: "Avail benefits worth ₹12999*",
    },
    {
      src: fashionBanner,
      title: "H&M",
      description: "Mens | Womens | Kids",
      feature: `Fashion and Quality at the Best Price`,
      offer: "Avail benefits worth ₹3000*",
    },
    {
      src: macbook,
      title: "APPLE",
      description: "MacBook Air 13",
      feature: "Designed to go places.",
      offer: "MacBook Air with M2 from ₹99900*",
    },
    {
      src: ps5,
      title: "PlayStation®5",
      description: "Play like never before",
      feature: "The Ultimate Gaming Machine",
      offer: "Avail benefits worth ₹1200*",
    },
  ];


  return (
    <>
      <div className="h-16"></div>
      <div className="h-[65vh] w-full relative  overflow-hidden bg-black">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false, 
          }}
        >
            {videos.map((video, index) => (
              <SwiperSlide key={index}>
                <div key={index} className="w-full h-[65vh] bg-black relative">
                  <video
                    src={video.src}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-fill opacity-60"
                  />
                  <p className="absolute text-white font-normal text-5xl top-6 left-10">
                    {video.title}
                  </p>
                  <p className="absolute text-white font-normal text-4xl top-20 left-10">
                    {video.description}
                  </p>
                  <p className="absolute text-white font-normal text-2xl right-10 bottom-16">
                    {video.feature}
                  </p>
                  <p className="absolute text-white font-normal text-xl right-10 bottom-10">
                    {video.offer}
                  </p>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
}
export default HeroBanner;
