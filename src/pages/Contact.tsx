import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (name && email && message) {
      setSuccessMessage(
        "Thank you for your message! We will get back to you soon."
      );
      setErrorMessage("");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setErrorMessage("Please fill in all fields.");
      setSuccessMessage("");
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const successMessageVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-0">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-3xl font-extrabold text-gray-900 mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className=" text-gray-600 max-w-2xl mx-auto"
          >
            We'd love to hear from you! Reach out to us for any questions,
            feedback, or inquiries.
          </motion.p>
        </motion.div>

        {/* Contact Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {/* Contact Form */}
          <motion.div
            variants={fadeInUp}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 lg:h-40"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition duration-300"
              >
                Send Message
              </button>
              {/* Success Message */}
              <AnimatePresence>
                {successMessage && (
                  <motion.div
                    variants={successMessageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg flex items-center space-x-3"
                  >
                    <FaCheckCircle className="text-2xl text-green-500" />
                    <p className="text-green-700">{successMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>
              {errorMessage && (
                <p className="text-red-500 mt-4">{errorMessage}</p>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={fadeInUp} className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <span className="text-2xl text-blue-600">
                    <FaMapMarkerAlt />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Address
                    </h3>
                    <p className="text-gray-600">
                      123 Book Street, Knowledge City
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="text-2xl text-blue-600">
                    <FaPhone />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Phone
                    </h3>
                    <p className="text-gray-600">+123 456 7890</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="text-2xl text-blue-600">
                    <FaEnvelope />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Email
                    </h3>
                    <p className="text-gray-600">support@bookshop.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Our Location
              </h2>
              <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  title="BookShop Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15927.373680271358!2d101.73595205639647!3d3.074198939530305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc3626d12b214b%3A0x81bdf1526e8ea91b!2sUCSI%20University%20Kuala%20Lumpur%20Campus!5e0!3m2!1sen!2smy!4v1708170000000!5m2!1sen!2smy"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
