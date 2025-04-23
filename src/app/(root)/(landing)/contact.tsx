import { navByName } from "@/config/site";

export default function Contact() {
  const {
    name,
    label: heading,
    longDescription: subHeading,
  } = navByName("contact");

  return (
    <section
      id={name}
      className="content"
      aria-labelledby={name}
      aria-describedby={`${name}-desc`}
    >
      <h1 className="gradient-heading">{heading}</h1>
      <h2 className="sub-heading">{subHeading}</h2>
    </section>
  );
}
