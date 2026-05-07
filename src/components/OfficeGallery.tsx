import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
  location?: string;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power4.out',
  duration = 0.8,
  stagger = 0.1,
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false
}) => {
  // Adjusted to 4 columns max as requested ("make it as 4 rows" - interpreted as 4 columns in masonry context)
  const columns = useMedia(
    ['(min-width:1200px)', '(min-width:900px)', '(min-width:600px)'],
    [4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const { grid, gridWidth } = useMemo(() => {
    if (!width) return { grid: [], gridWidth: 0 };
    const colHeights = new Array(columns).fill(0);
    const gap = 24; // Increased gap for a more premium centered look
    const maxGridWidth = Math.min(width, 1400); // Constrain width for centering
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (maxGridWidth - totalGaps) / columns;
    const offset = (width - maxGridWidth) / 2; // Calculation for centering

    const layout = items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = offset + col * (columnWidth + gap);
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });

    return { grid: layout, gridWidth: maxGridWidth };
  }, [columns, items, width]);

  const totalHeight = useMemo(() => {
    if (!grid.length) return 0;
    return Math.max(...grid.map(item => item.y + item.h));
  }, [grid]);

  useLayoutEffect(() => {
    if (!imagesReady || !grid.length) return;

    // Create ScrollTriggered entrance animation
    const ctx = gsap.context(() => {
      grid.forEach((item, index) => {
        const selector = `[data-key="${item.id}"]`;
        
        // Random "pop" entrance
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            scale: 0.2,
            rotate: Math.random() * 20 - 10,
            y: 100,
            filter: blurToFocus ? 'blur(20px)' : 'none',
          },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            y: item.y,
            x: item.x,
            width: item.w,
            height: item.h,
            filter: 'blur(0px)',
            duration: duration,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: selector,
              start: "top 95%",
              toggleActions: "play none none none",
            },
            // Add a bit of random delay for the "pop up randomly" effect
            delay: Math.random() * 0.5
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [grid, imagesReady, blurToFocus, duration]);

  const handleMouseEnter = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
    
    const bg = element.querySelector('.gallery-bg') as HTMLElement;
    const text = element.querySelector('.location-overlay') as HTMLElement;
    
    if (bg) {
      gsap.to(bg, {
        filter: 'blur(8px) brightness(0.7)',
        duration: 0.4,
        ease: 'power2.out'
      });
    }
    
    if (text) {
      gsap.to(text, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'back.out(1.7)'
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
    }
  };

  const handleMouseLeave = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }

    const bg = element.querySelector('.gallery-bg') as HTMLElement;
    const text = element.querySelector('.location-overlay') as HTMLElement;

    if (bg) {
      gsap.to(bg, {
        filter: 'blur(0px) brightness(1)',
        duration: 0.4,
        ease: 'power2.out'
      });
    }

    if (text) {
      gsap.to(text, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.in'
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full overflow-visible" 
      style={{ height: totalHeight }}
      onClick={() => {
        if (selectedId) {
          const prevEl = document.querySelector(`[data-key="${selectedId}"]`) as HTMLElement;
          if (prevEl) handleMouseLeave(selectedId, prevEl);
          setSelectedId(null);
        }
      }}
    >
      {grid.map(item => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute box-content cursor-pointer"
          style={{ 
            width: item.w, 
            height: item.h, 
            left: 0, 
            top: 0,
            transform: `translate(${item.x}px, ${item.y}px)`,
            willChange: 'transform, opacity, scale',
            zIndex: selectedId === item.id ? 20 : 1
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (selectedId === item.id) {
              setSelectedId(null);
              handleMouseLeave(item.id, e.currentTarget);
            } else {
              if (selectedId) {
                const prevEl = document.querySelector(`[data-key="${selectedId}"]`) as HTMLElement;
                if (prevEl) handleMouseLeave(selectedId, prevEl);
              }
              setSelectedId(item.id);
              handleMouseEnter(item.id, e.currentTarget);
            }
          }}
          onMouseEnter={e => {
            if (window.matchMedia('(hover: hover)').matches) {
              handleMouseEnter(item.id, e.currentTarget);
            }
          }}
          onMouseLeave={e => {
            if (window.matchMedia('(hover: hover)').matches) {
              handleMouseLeave(item.id, e.currentTarget);
            }
          }}
        >
          <div
            className="relative w-full h-full rounded-[20px] shadow-[0px_20px_60px_-15px_rgba(0,0,0,0.3)] transition-shadow hover:shadow-2xl overflow-hidden"
          >
            <div 
              className="gallery-bg absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.img})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
            
            {item.location && (
              <div className="location-overlay absolute inset-0 flex items-center justify-center p-6 opacity-0 translate-y-5 pointer-events-none z-10">
                <div className="text-center">
                  <div className="h-px w-8 bg-brand-red mx-auto mb-4" />
                  <h3 className="text-white text-xl md:text-2xl font-display font-black uppercase tracking-widest">
                    {item.location}
                  </h3>
                  <div className="h-px w-8 bg-brand-red mx-auto mt-4" />
                </div>
              </div>
            )}

            {colorShiftOnHover && (
              <div className="color-overlay absolute inset-0 rounded-[20px] bg-gradient-to-tr from-brand-red/40 to-navy/40 opacity-0 pointer-events-none" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
