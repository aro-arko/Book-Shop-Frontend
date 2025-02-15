import productLogo from "../../../assets/images/product.jpg"; // Adjust the path to your logo image
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <>
      <div className="bg-gray-100 py-10 px-4">
        <Link to="/admin/products">
          <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center">
            <img
              src={productLogo}
              alt="Product Logo"
              className="w-auto h-32 mb-6 border-gray-300"
            />
            <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
              Product Management
            </h1>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Product;
