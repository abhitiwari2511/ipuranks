import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RightChevron from "@/components/ui/right-chevron";
import ChartBarIcon from "@/components/ui/chart-bar-icon";
import ChartLineIcon from "@/components/ui/chart-line-icon";
import ShieldCheck from "@/components/ui/shield-check";

const FeatureCard = ({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="p-7 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 group"
  >
    <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-indigo-500/20 transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-slate-100 mb-2 tracking-tight">
      {title}
    </h3>
    <p className="text-slate-400 leading-relaxed text-[0.9rem]">
      {description}
    </p>
  </motion.div>
);

const Hero = () => {
  return (
    <div>
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-24">
        {/* Soft decorative gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-35%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-15%] right-[-5%] w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute top-[30%] right-[15%] w-[300px] h-[300px] bg-sky-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950/70 border border-slate-800/80 shadow-sm shadow-black/30"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400"></span>
            </span>
            <span className="text-sm text-slate-300 font-medium">
              Real-time Result Analytics
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-slate-100 leading-[1.08]"
          >
            <span className="font-display italic">Supercharge</span> Your
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Academic Potential
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Empowering GGSIPU students with beautifully crafted analytics.
            Understand your SGPA and CGPA trends, pinpoint strengths, and plan
            your next big win.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link to="/login">
              <Button
                size="lg"
                className="h-12 px-6 text-lg rounded-full bg-indigo-500 text-white hover:bg-indigo-400 transition-all font-semibold group shadow-xl shadow-indigo-500/30 cursor-pointer"
              >
                Get Your Results
                <RightChevron
                  size={20}
                  className="ml-2 w-5 text-white transition-transform group-hover:translate-x-1"
                />
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-24 w-full relative">
          <FeatureCard
            icon={<ChartBarIcon size={22} className="text-indigo-300" />}
            title="Actionable Insights"
            description="Deep dive into subject-wise metrics through brilliant visualizations."
            delay={0.4}
          />
          <FeatureCard
            icon={<ChartLineIcon size={22} className="text-violet-300" />}
            title="Performance Trends"
            description="Keep track of your trajectory with our precise SGPA and CGPA calculators."
            delay={0.5}
          />
          <FeatureCard
            icon={<ShieldCheck size={22} className="text-emerald-300" />}
            title="Privacy First"
            description="Your academic data remains solely on your device during analysis."
            delay={0.6}
          />
        </div>
      </main>
    </div>
  );
};

export default Hero;
