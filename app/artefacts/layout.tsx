export default function ArtefactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col px-4 w-full gap-4 md:py-10">
      {children}
    </section>
  );
}
