import Banner from "../components/PublicDashboard/Home/Banner";
import FeaturedProducts from "../components/PublicDashboard/Home/FeaturedProducts";
import PlatformOverview from "../components/PublicDashboard/Home/PlatformOverview";
import Testimonial from "../components/PublicDashboard/Home/Testimonial";
import WhyChooseUs from "../components/PublicDashboard/Home/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedProducts></FeaturedProducts>
      <WhyChooseUs />
      <Testimonial></Testimonial>
      <PlatformOverview />
    </div>
  );
};

export default Home;
