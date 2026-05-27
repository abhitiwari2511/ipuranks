import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden">
      {/* Navbar */}
      <Navbar />

      <Hero />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
