import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Alice Johnson",
    review:
      "Absolutely love this bookshop! The ordering process was seamless, and the books arrived in perfect condition.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Smith",
    review:
      "A fantastic collection of books! Customer service was very helpful, and delivery was quick.",
    image: "https://randomuser.me/api/portraits/men/47.jpg",
  },
  {
    name: "Sophia Lee",
    review:
      "Great experience! I found rare books at amazing prices. Highly recommend this shop to all book lovers.",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
  },
];

const Testimonial = () => {
  return (
    <div className="bg-gray-50 py-16 px-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
        What Our Customers Say
      </h2>
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-700 italic">"{testimonial.review}"</p>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {testimonial.name}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
