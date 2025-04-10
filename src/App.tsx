import { Outlet } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Footer from "./components/PublicDashboard/Footer";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>BookShop</title>
        <meta name="description" content="This is bookshop home page" />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
