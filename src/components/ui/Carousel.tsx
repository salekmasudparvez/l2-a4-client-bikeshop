import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';
import bike1 from '../../assets/carousel/1.jpg'
import bike2 from '../../assets/carousel/2.jpg'
import bike3 from '../../assets/carousel/3.jpg'
import bike4 from '../../assets/carousel/4.jpg'

export default function Carousel() {
  const motorbikes = [
    {
      name: "Yamaha YZF-R1",
      description: "The 2023 Yamaha YZF-R1 is a high-performance sports bike with an advanced engine and cutting-edge electronics.",
      imgUrl: bike1
    },
    {
      name: "Ducati Panigale V4",
      description: "The Ducati Panigale V4 is a stunning sportbike with a V4 engine, providing unmatched power and agility.",
      imgUrl: bike2
    },
    {
      name: "Kawasaki Ninja ZX-10R",
      description: "The Kawasaki Ninja ZX-10R is a championship-winning motorcycle built for speed and precision on the track.",
      imgUrl: bike3
    },
    {
      name: "Harley-Davidson FLRXSE CVO Road Glide SCREAMIN EAGLE",
      description: "A premium touring bike, the 2023 Harley-Davidson FLRXSE CVO Road Glide SCREAMIN EAGLE offers comfort, style, and power.",
      imgUrl: bike4
    }
  ];

  return (
    <div className='h-[400px] my-5'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-3xl"
      >
        {motorbikes?.map((moto, idx) => (

          <SwiperSlide key={idx}>
            <div className='flex justify-between items-center md:flex-row flex-col gap-4 px-2 bg-gray-400 rounded-3xl'>
              <div className='md:w-1/2  rounded-3xl md:flex hidden flex-col items-start backdrop-blur-lg w-full text-left px-6 text-white'>
                <h3 className='text-3xl font-bold'>{moto?.name}</h3>
                <p className='text-base text-gray-300'>{moto?.description}</p>
              </div>
              <div className='md:w-1/2'>
                <img className='w-full rounded-3xl h-[400px] ' src={moto?.imgUrl} alt="Bike" />
              </div>
            </div>
          </SwiperSlide>

        ))}
      </Swiper>
    </div>
  );
}
