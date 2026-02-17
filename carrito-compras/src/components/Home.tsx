import { useEffect } from "react";
import { HeroSection } from "@/components/store/HeroSection";
import { AboutUs } from "@/components/store/AboutUs";
import {OurDesigners} from "@/components/store/OurDesigners";


export function Home() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <>
      <HeroSection />
      <AboutUs />
      <OurDesigners />
    </>
  )
}
