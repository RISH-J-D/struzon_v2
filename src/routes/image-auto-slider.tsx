import React from 'react';

// Get all images from the upcoming folder using Vite's glob import
const upcomingImages = Object.values(
  import.meta.glob('@/assets/upcoming/*.{jpg,jpeg,png}', { eager: true, import: 'default' })
) as string[];

export const ImageAutoSlider = () => {
  const [isPaused, setIsPaused] = React.useState(false);

  // Use the local images or fallback to the provided ones if folder is empty (it shouldn't be)
  const images = upcomingImages.length > 0 ? upcomingImages : [
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2152&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <>
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll-container {
          overflow: hidden;
          padding: 2rem 0;
          position: relative;
          width: 100%;
        }

        .infinite-scroll-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: scroll-left 60s linear infinite;
        }

        .infinite-scroll-track.paused,
        .infinite-scroll-track:hover {
          animation-play-state: paused;
        }

        .scroll-mask {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 15%,
            black 85%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 15%,
            black 85%,
            transparent 100%
          );
        }

        .slider-image-item {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          filter: grayscale(0.5) contrast(1.1);
        }

        .slider-image-item:hover {
          transform: scale(1.05) translateY(-5px);
          filter: grayscale(0) contrast(1);
          box-shadow: 0 25px 50px -12px rgba(185, 28, 28, 0.3);
        }
      `}</style>

      <div className="w-full bg-white pt-4 pb-20 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#b91c1c_0%,transparent_50%)]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 mb-12 relative z-10 text-center md:text-left">
          <div className="inline-block px-3 py-1 bg-brand-red/10 border border-brand-red/20 rounded-full mb-4">
            <span className="text-[10px] font-black uppercase text-brand-red tracking-[0.2em]">Future Vision</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-navy uppercase tracking-tighter mb-4">Upcoming Projects</h2>
          <p className="text-navy/60 text-xs md:text-sm max-w-2xl uppercase tracking-widest font-bold">
            A sneak peek into the major structural developments currently in our pipeline. LOD-400 modeling in progress.
          </p>
        </div>

        {/* Scrolling images container */}
        <div
          className="relative z-10 w-full scroll-mask"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="infinite-scroll-container">
            <div className={`infinite-scroll-track ${isPaused ? 'paused' : ''}`}>
              {duplicatedImages.map((image, index) => (
                <div
                  key={index}
                  className="slider-image-item flex-shrink-0 w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-slate-100"
                >
                  <img
                    src={image}
                    alt={`Upcoming project ${(index % images.length) + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Footer */}
        <div className="mt-12 mx-auto max-w-7xl px-6 flex justify-between items-center opacity-30">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-navy/20 to-transparent" />
          <div className="px-6 text-[8px] font-mono text-navy uppercase tracking-[0.5em]">System Status: Pipeline Active</div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-navy/20 to-transparent" />
        </div>
      </div>
    </>
  );
};
