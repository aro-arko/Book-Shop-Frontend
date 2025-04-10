import { Link } from "react-router-dom";
import bookReading from "../assets/images/bookIllustartion.jpeg";
import { Button } from "../components/ui/button";

const About = () => {
  return (
    <div className=" min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-0">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-4xl font-bold text-gray-800">
            About Us
          </h1>
          <p className="mt-4 text-xl text-gray-700 max-w-xl mx-auto">
            Discover the story behind our BookShop and our passion for reading.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Introduction */}
          <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-md hover:shadow-3xl transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to{" "}
              <span className="font-bold bg-blue-600 bg-clip-text text-transparent">
                BookShop
              </span>
              , your ultimate destination for books across all genres. Whether
              you’re looking for bestsellers, timeless classics, or rare finds,
              we aim to provide a curated collection that caters to every
              reader’s taste.
            </p>
          </div>

          {/* Illustration */}
          <div className=" p-4 rounded-xl shadow-md flex items-center justify-center border border-gray-100">
            <img
              src={bookReading}
              alt="Books Illustration"
              className="w-full h-[200px] object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-12 border border-gray-100 p-8 rounded-xl shadow-md text-gray-800">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-800 leading-relaxed">
            At <span className="font-bold">BookShop</span>, we believe in the
            power of books to educate, inspire, and transform lives. Our mission
            is to make quality books accessible to everyone while fostering a
            love for reading and knowledge.
          </p>
        </div>

        {/* Unique Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: "📚",
              title: "Wide Collection",
              text: "From fiction to academic books, we have it all.",
            },
            {
              icon: "🚀",
              title: "Fast Shipping",
              text: "Get your favorite books delivered quickly.",
            },
            {
              icon: "💬",
              title: "Support",
              text: "We're here to help with recommendations.",
            },
            {
              icon: "🎁",
              title: "Discounts",
              text: "Exclusive offers for loyal customers.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2">{feature.text}</p>
            </div>
          ))}
        </div>

        {/* Customer Commitment */}
        <div className="mt-12 bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our Commitment
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We prioritize our customers by offering a seamless shopping
            experience. Your satisfaction is our top priority, and we
            continuously strive to bring the best books and services to book
            lovers worldwide.
          </p>
        </div>

        {/* Call-to-Action */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Start Your Reading Journey With Us!
          </h2>
          <p className="text-gray-600 mb-6">
            Explore our collection and find your next favorite book today.
          </p>

          <Link to="/books">
            <Button className="bg-primary font-semibold">Browse Books</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
