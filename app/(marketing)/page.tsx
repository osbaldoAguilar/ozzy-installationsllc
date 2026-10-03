/**
 * homepage - logo, nav-bar, call to action, hero image/video
 */

import Landing from "@/components/marketing/Landing";
import Portfolio from '../../components/marketing/portfolio/Portfolio';
import Contact from "@/components/marketing/contact/Contact";
import Services from "@/components/marketing/services/Services";
import About from "@/components/marketing/about/About";

const homePage = () => {
  return <>
  <Landing />
  <Contact/>
  <Services/>
  <Portfolio />
  <About/>

  </>
};
export default homePage;
