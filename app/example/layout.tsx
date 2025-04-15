export default function ArtifactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 md:py-10">
      <div className="inline-block max-w-full justify-center text-center">
        {children}
      </div>
    </section>
  );
}
