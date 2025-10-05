"use client";
/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const images = [
    "/images/family_by_fireplace-min.png",
    "/images/family_in_sofa-min.png",
    "/images/grandson_and_grandmother-min.png"
  ];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);

    // Auto-play carousel
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => {
      clearInterval(autoplay);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative min-h-screen flex justify-center items-center overflow-hidden -mt-16 pt-16">
      {/* Full-screen carousel background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="embla overflow-hidden w-full h-full" ref={emblaRef}>
          <div className="embla__container flex w-full h-full">
            {images.map((src, index) => (
              <div key={index} className="embla__slide flex-[0_0_100%] min-w-0 relative">
                <img
                  src={src}
                  alt={`Family moment ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${index === selectedIndex ? "bg-white" : "bg-white/50"
                }`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      </div>

      {/* Content overlay */}
      <section className="relative z-10 max-w-(--breakpoint-xl) mx-auto px-4 py-28 gap-12 md:px-8 flex flex-col justify-center items-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{ duration: 0.6, type: "spring", bounce: 0 }}
          className="flex flex-col justify-center items-center space-y-5 max-w-4xl mx-auto text-center"
        >

          <h1 className="text-4xl font-medium tracking-tighter mx-auto md:text-6xl text-pretty text-white drop-shadow-lg">
            Talk With Your Loved Ones How They Want To Be Remembered
          </h1>
          <p className="max-w-2xl text-lg mx-auto text-white/90 text-balance drop-shadow-md">
            Create AI avatars of your loved ones easily anytime. Join the waitlist today to receive early access and 50% launch discount.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0"
          >
            <Button className="shadow-lg bg-white text-black hover:bg-white/90">Secure Your Spot Now</Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
