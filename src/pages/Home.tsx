
import React from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </Layout>
  );
};

export default Home;
