import { Swiper, SwiperSlide } from "swiper/react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css";

const testimonials = [
  {
    name: "Alice Johnson",
    review:
      "Absolutely love this bookshop! The ordering process was seamless, and the books arrived in perfect condition.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    name: "Michael Smith",
    review:
      "A fantastic collection of books! Customer service was very helpful, and delivery was quick.",
    image: "https://randomuser.me/api/portraits/men/47.jpg",
    rating: 4,
  },
  {
    name: "Sophia Lee",
    review:
      "Great experience! I found rare books at amazing prices. Highly recommend this shop to all book lovers.",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    rating: 5,
  },
  {
    name: "David Wilson",
    review:
      "Impressive selection and quality service. The books were carefully packaged and arrived in pristine condition. Will be my go-to bookshop from now on.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
];

const Testimonial = () => {
  return (
    <div className="">
      <div className="py-16 px-4 lg:px-0 mx-auto max-w-7xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
          Success Stories
        </h2>

        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div className="bg-white shadow-md border border-gray-100 rounded-xl p-6 text-center flex flex-col justify-between space-y-2 h-auto max-h-full">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {testimonial.name}
                </h3>
                <p className="text-gray-700 italic">"{testimonial.review}"</p>
                {/* Rating stars */}
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
