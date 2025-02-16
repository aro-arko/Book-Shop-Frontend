import { Outlet } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Footer from "./components/PublicDashboard/Footer";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
      <Footer></Footer>
    </>
  );
}

export default App;
