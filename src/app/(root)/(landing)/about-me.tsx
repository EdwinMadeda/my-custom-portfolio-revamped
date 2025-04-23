import { navByName } from "@/config/site";

export default function AboutMe() {
  const {
    name,
    label: heading,
    longDescription: subHeading,
  } = navByName("about-me");

  return (
    <section
      id={name}
      className="content"
      aria-labelledby={name}
      aria-describedby={`${name}-desc`}
    >
      <h1 className="gradient-heading">{heading}</h1>
      <h2 className="sub-heading">{subHeading}</h2>
      <p>
        Expedita sed doloremque quod fuga minima rem aperiam! Dolorem dolores
        suscipit unde hic, qui repellat quos veritatis iste beatae iure? Magnam
        qui repudiandae, sint quo officiis ipsa dolorem culpa temporibus saepe
        deleniti assumenda. Culpa quo odit neque iure necessitatibus
        voluptatibus debitis molestias exercitationem, qui consectetur similique
        deserunt in nesciunt, eum nemo quibusdam atque accusamus ut! Eveniet,
        eligendi beatae ad aut eos nemo dolorem quasi, culpa repellat, at dolore
        maiores eius hic minus mollitia eaque tempora ipsum amet consequatur
        ipsa. Nulla, architecto adipisci. Rem consequatur aperiam quos
        repudiandae atque facere accusamus eveniet molestias? Facilis amet
        dolorem fugiat libero ipsa, commodi unde pariatur doloribus deleniti.
        Maiores, at laborum amet magnam dolore voluptatibus doloremque quos ipsa
        deserunt praesentium laboriosam totam, tempora quaerat repellendus earum
        dolorum tenetur eius beatae! Sapiente numquam dignissimos vero veniam
        temporibus. Cum animi in fugiat sequi deleniti quaerat voluptas.
        Corrupti, expedita ad? Libero distinctio, quod nemo eius tempore ab
        delectus! Nihil, debitis vitae iste dolore accusamus omnis a optio
        mollitia iusto nobis tenetur nostrum voluptates tempora nemo totam natus
        aperiam error! Quia non consequatur voluptates cumque debitis repellat
        exercitationem omnis, in, doloribus excepturi saepe totam id veniam esse
        ullam quisquam nemo atque, dolorum officiis voluptas impedit.
      </p>
    </section>
  );
}
