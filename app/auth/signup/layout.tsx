export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-full max-h-screen flex-col items-center justify-center gap-4 bg-[#141313]">
      {/* <Image
          src={background} // Make sure this image is inside the 'public/' folder
          alt="Background"
          layout="fill" // Makes it cover the entire div
          objectFit="cover" // Ensures it covers the whole space
          priority // Loads the image quickly
          className="absolute inset-0 bg-opacity-90 " // Puts it behind everything
        /> */}
      <div className="inline-block max-w-lg justify-center text-center">
        {children}
        {/* Background Image (absolute and covers the entire screen) */}
      </div>
    </section>
  );
}
