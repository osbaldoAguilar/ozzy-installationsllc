// components/Hero.tsx
import Image from "next/image";
import heroBg from "@/public/hero-background.jpg"; // Recommended: Static import for local assets

export default function Hero() {
  return (
    <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center text-white">
      {/* 1. Background Image Container */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroBg}
          alt="Descriptive alt text for your business"
          fill
          priority // Crucial for LCP performance
          sizes="100vw"
          className="object-cover object-center" // Ensures image behaves like background-size: cover
        />
        {/* Optional: Dark overlay to improve text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* 2. Hero Content Overlap */}
      <div className="container mx-auto px-4 text-center max-w-3xl z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          Your Catchy Headline Here
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200">
          A compelling subheadline that explains exactly what you do or offer.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition">
          Get Started
        </button>
      </div>
    </section>
  );
}
