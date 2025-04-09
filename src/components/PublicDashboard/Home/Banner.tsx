import { Link } from "react-router-dom";
import bannerImg from "../../../assets/images/banner.png";
import { Button } from "../../ui/button";

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-0 py-20">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Welcome to BookShop
          </h1>
          <p className="text-lg mb-8 text-gray-600">
            Discover a wide variety of books and enjoy reading your favorites.
          </p>
          <Link to="/books">
            <Button className="cursor-pointer font-semibold py-2 px-4 rounded-lg">
              Shop Now
            </Button>
          </Link>
        </div>
        <div className="md:w-1/2">
          <img
            src={bannerImg}
            alt="Banner"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
