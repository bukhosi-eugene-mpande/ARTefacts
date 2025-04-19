export default function ArtefactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full flex-col gap-4 bg-[#FEFCF4] px-4 md:py-10">
      {children}
    </section>
  );
}
