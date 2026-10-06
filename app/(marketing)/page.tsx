/**
 * homepage - hero, trust band, services, process, work, reviews, builders, about, CTA
 */

import Landing from "@/components/marketing/Landing";
import TrustBand from "@/components/marketing/TrustBand";
import Services from "@/components/marketing/services/Services";
import HowItWorks from "@/components/marketing/HowItWorks";
import Portfolio from "@/components/marketing/portfolio/Portfolio";
import Reviews from "@/components/marketing/Reviews";
import Builders from "@/components/marketing/Builders";
import About from "@/components/marketing/about/About";
import Contact from "@/components/marketing/contact/Contact";

const homePage = () => {
  return <>
  <Landing />
  <TrustBand />
  <Services />
  <HowItWorks />
  <Portfolio />
  <Reviews />
  <Builders />
  <About />
  <Contact />
  </>
};
export default homePage;
