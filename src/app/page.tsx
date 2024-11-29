import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Navigation from "./components/Navigation";
import NewProducts from "./components/NewProducts";
import CategoryItems from "./components/CategoryItems";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <TopBar/>
      <Navbar/>
      <Navigation/>
      <Banner/>
      <NewProducts/>
      <CategoryItems/>
      <Footer/>
    </div>
  );
}
