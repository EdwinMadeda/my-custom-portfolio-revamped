import SectionContent from "@/components/section-content";
import { GradientHeading, SubHeading } from "@/components/typography";
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
      <GradientHeading>{heading}</GradientHeading>
      <SubHeading>{subHeading}</SubHeading>
      <SectionContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non officia
        repellendus mollitia inventore labore laboriosam sint reiciendis magni
        quisquam consequatur placeat veniam voluptate tenetur quasi obcaecati,
        doloribus molestias dolore ipsa cumque nemo ut. A voluptas qui
        consequatur magni ea sapiente vel sint et iusto voluptatem ut
        dignissimos ex atque amet ab nihil reprehenderit vitae vero autem
        nesciunt quae, aperiam libero quo exercitationem. Id eum delectus cum
        temporibus reprehenderit aut asperiores velit soluta, beatae, nemo,
        voluptatem odit architecto itaque quia ratione consequatur ipsam
        nesciunt. Laboriosam rerum cum sequi. Aut, nostrum a! Ab suscipit
        necessitatibus, blanditiis reiciendis libero nihil nisi doloribus beatae
        qui temporibus autem, atque minus natus repellendus tempore minima
        eveniet fuga consectetur soluta, molestiae unde. Eius, eos molestias
        omnis cupiditate quod, est quaerat excepturi neque enim nulla aliquam
        inventore praesentium. Culpa impedit optio suscipit voluptatem facere
        nam possimus eos, autem est amet animi laborum dolorum voluptas ad ea
        nihil quam natus cupiditate laboriosam eaque fuga porro ullam non? Eum
        at ullam molestiae est iste voluptatum non harum aspernatur, ab
        voluptate nesciunt magni laboriosam ad inventore sequi vel tenetur
        corporis similique ea quod! Voluptates maiores esse animi corporis qui
        in doloremque eligendi iste commodi deserunt beatae quisquam, dolorem
        rem ipsa, quas dolores. Ut autem eaque aperiam tempora voluptatibus
        adipisci modi quia voluptates nobis dolores rem obcaecati numquam a
        accusantium odio consectetur, officia voluptatem soluta tempore magnam
        error facilis perferendis illo. Necessitatibus maxime atque maiores,
        nobis nam nesciunt, tempore quas nisi, suscipit voluptatibus temporibus
        dicta ad dolor dolorum perspiciatis nihil. Debitis cupiditate alias
        nihil, pariatur ut quae numquam id quasi velit delectus quos veniam
        aspernatur molestias sunt voluptatum! Possimus, esse dolorem beatae illo
        ipsum excepturi iusto, aperiam vero adipisci ex numquam quo repellat
        placeat dignissimos fuga? Laborum qui obcaecati repellat neque, commodi
        nesciunt sint id, alias animi officiis magnam, quaerat corporis debitis!
      </SectionContent>
    </section>
  );
}
