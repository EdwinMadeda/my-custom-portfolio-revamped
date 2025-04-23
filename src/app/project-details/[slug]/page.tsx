export const metadata = {
  title: "Project Details",
};

export default async function ProjectDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return (
    <>
      <h1>Post: {slug}</h1>
      {/* <BackButton href="/#works" label="← Back to portfolio" /> */}
    </>
  );
}
