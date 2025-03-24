export default function LoginLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section className="flex flex-col items-center justify-center gap-4 h-full py-8 md:py-10 bg-[#1E1C1A] dark:bg-[#1a1a1a] font-garamond">
        <div className="inline-block max-w-lg text-center justify-center">
          {children}
        </div>
      </section>
    );
  }
  