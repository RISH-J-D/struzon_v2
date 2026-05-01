import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Card {
  text: string;
  desc: string;
  image: string;
}

interface AdvantageCarouselProps {
  items: Card[];
}

export default function AdvantageCarousel({ items }: AdvantageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(next, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, next]);

  const getCardStatus = (index: number) => {
    const diff = (index - currentIndex + items.length) % items.length;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === 2) return "far-right";
    if (diff === items.length - 1) return "left";
    if (diff === items.length - 2) return "far-left";
    return "hidden";
  };

  return (
    <div
      className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="relative w-full max-w-5xl h-full flex items-center justify-center perspective-1000">
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((item, index) => {
            const status = getCardStatus(index);
            if (status === "hidden") return null;

            return (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, scale: 0.8, x: 0 }}
                animate={{
                  opacity: status === "center" ? 1 : status.includes("far") ? 0.15 : 0.4,
                  scale: status === "center" ? 1 : status.includes("far") ? 0.65 : 0.8,
                  x: status === "center" ? 0 :
                    status === "right" ? "70%" :
                      status === "far-right" ? "120%" :
                        status === "left" ? "-70%" : "-120%",
                  z: status === "center" ? 0 : status.includes("far") ? -600 : -300,
                  rotateY: status === "center" ? 0 : status.includes("right") ? -30 : 30,
                  filter: status === "center" ? "blur(0px)" : status.includes("far") ? "blur(16px)" : "blur(8px)",
                  zIndex: status === "center" ? 40 : status.includes("far") ? 10 : 20,
                }}
                exit={{ opacity: 0, scale: 0.5, z: -100 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1], // Custom spring-like cubic-bezier for maximum smoothness
                  opacity: { duration: 0.4 }
                }}
                className={cn(
                  "absolute w-[280px] sm:w-[320px] md:w-[400px] aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl transition-shadow duration-500",
                  status === "center" ? "cursor-default" : "cursor-pointer"
                )}
                onClick={() => {
                  if (status.includes("right")) next();
                  if (status.includes("left")) prev();
                }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={item.image}
                    alt={item.text}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <h3 className="text-xl md:text-2xl font-display font-bold uppercase mb-3 leading-tight tracking-tight text-white drop-shadow-lg">
                    {item.text}
                  </h3>
                  <p className="text-sm md:text-base text-white/80 leading-relaxed font-medium drop-shadow-md">
                    {item.desc}
                  </p>
                </div>

                {/* Glass Overlay for highlight */}
                {status === "center" && (
                  <div className="absolute inset-0 border-2 border-white/20 rounded-2xl pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentIndex === i ? "bg-brand-red w-6" : "bg-white/30"
            )}
          />
        ))}
      </div>
    </div>
  );
}
