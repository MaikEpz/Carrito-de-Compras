import { HeroSection } from "@/components/store/HeroSection";
import { AboutUs } from "@/components/store/AboutUs";
import {OurDesigners} from "@/components/store/OurDesigners";


export function Home() {
  return (
    <>
      <HeroSection />
      <AboutUs />
      <OurDesigners />
    </>
  )
}
