import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col relative overflow-hidden">

      <div className="absolute inset-0 w-full h-full bg-zinc-950">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-[20%] right-[20%] w-72 h-72 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Navbar */}
      <Navbar />

<Hero />
     

      {/* Footer */}
      <Footer />
    </div>
  );
};



export default HomePage;
