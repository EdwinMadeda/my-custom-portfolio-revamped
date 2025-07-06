import Home from "./(sections)/home";
import AboutMe from "./(sections)/about-me";
import SkillsAndTools from "./(sections)/skills-and-tools";
import Works from "./(sections)/works";
import Testimonials from "./(sections)/testimonials";
import Contact from "./(sections)/contact";
import { getDefaultProfile } from "@/lib/sanity";

export default async function Landing() {
  const profile = await getDefaultProfile();

  console.log(profile);

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
