import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const BANNERS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop', // Gaming setup
    title: 'Top Up Diamond Free Fire',
    subtitle: 'Murah dan Proses Instan'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=1974&auto=format&fit=crop', // Esports/Gaming
    title: 'Voucher Roblox Termurah',
    subtitle: 'Beli Robux Jadi Mudah'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop', // Tech/Gaming
    title: 'Mobile Legends Bang Bang',
    subtitle: 'Diamond Ready Stok 24 Jam'
  }
];

export default function BannerSlider() {
  return (
    <div className="relative group max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
          bulletClass: 'custom-bullet',
          bulletActiveClass: 'custom-bullet-active',
          renderBullet: (index, className) => {
            return `<span class="${className}"></span>`;
          },
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1.2,
          },
          1024: {
            slidesPerView: 1.5,
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="rounded-[2.5rem] overflow-hidden"
      >
        {BANNERS.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[2.5rem] group/item">
              <img 
                src={banner.image} 
                alt={banner.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
                <h2 className="text-2xl md:text-5xl font-display font-black text-white mb-2">{banner.title}</h2>
                <div className="inline-block px-4 py-1 bg-primary text-dark font-black text-xs md:text-sm uppercase tracking-widest rounded-full self-start">
                  {banner.subtitle}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Arrows */}
      <button className="swiper-button-prev-custom absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-dark/60 backdrop-blur-md rounded-2xl border border-white/10 text-white hover:bg-primary hover:text-dark transition-all opacity-0 group-hover:opacity-100 hidden md:flex">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button className="swiper-button-next-custom absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-dark/60 backdrop-blur-md rounded-2xl border border-white/10 text-white hover:bg-primary hover:text-dark transition-all opacity-0 group-hover:opacity-100 hidden md:flex">
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Custom Pagination Container */}
      <div className="flex justify-center mt-6">
        <div className="custom-pagination flex items-center gap-2 px-6 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10"></div>
      </div>

      <style>{`
        .custom-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .custom-bullet-active {
          width: 32px;
          background: #FFB800;
          box-shadow: 0 0 15px rgba(255, 184, 0, 0.4);
        }
      `}</style>
    </div>
  );
}
