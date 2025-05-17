import Home from "./home";
import AboutMe from "./about-me";
import SkillsAndTools from "./skills-and-tools";
import Works from "./works";
import Testimonials from "./testimonials";
import Contact from "./contact";

export default function Landing() {
  return (
    <>
      <Home />
      <AboutMe />
      <SkillsAndTools />
      <Works />
      <Testimonials />
      <Contact />
    </>
  );
}

function FontsReminder() {
  return (
    <>
      <h1 className="font-lemonJelly text-5xl">Brand Title</h1>
      <h2 className="font-roadBlast text-4xl tracking-wide uppercase">
        Featured
      </h2>
      <p className="font-rainbowBridge text-xl">Experience the magic</p>
    </>
  );
}
