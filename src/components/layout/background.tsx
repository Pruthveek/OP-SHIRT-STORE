"use client";

import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

// ====================================================================================
// 1. HOISTED UTILITY FUNCTIONS
// These are pure functions, so they live outside the component scope.
// ====================================================================================

const randomRange = (min: number, max: number): number =>
  min + Math.random() * (max - min);

const randomIndex = <T>(array: T[]): number =>
  Math.floor(randomRange(0, array.length));

const getRandomFromArray = <T>(array: T[]): T =>
  array[randomIndex(array)];

const removeFromArray = <T>(array: T[], i: number): T =>
  array.splice(i, 1)[0];

const removeItemFromArray = <T>(array: T[], item: T): T | undefined => {
  const i = array.indexOf(item);
  if (i > -1) {
    return removeFromArray(array, i);
  }
  return undefined;
};

const removeRandomFromArray = <T>(array: T[]): T =>
  removeFromArray(array, randomIndex(array));

// ====================================================================================
// 2. CONSOLIDATED TYPES & CLASSES
// A class is a great fit for Peep since it has its own state and methods.
// ====================================================================================

type PeepRect = [number, number, number, number]; // [sx, sy, sWidth, sHeight]

interface Stage {
  width: number;
  height: number;
}

class Peep {
  image: HTMLImageElement;
  rect: PeepRect;
  width: number;
  height: number;
  
  // Animation state
  x = 0;
  y = 0;
  anchorY = 0;
  scaleX = 1;
  walk: gsap.core.Timeline | null = null;

  constructor(image: HTMLImageElement, rect: PeepRect) {
    this.image = image;
    this.rect = rect;
    this.width = rect[2];
    this.height = rect[3];
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scaleX, 1);
    // Draw the specific sprite from the sheet
    ctx.drawImage(
      this.image,
      this.rect[0], this.rect[1], this.width, this.height,
      0, 0, this.width, this.height
    );
    ctx.restore();
  }
}

// ====================================================================================
// 3. REACT COMPONENT
// The component is now cleaner, focusing on orchestrating the animation.
// ====================================================================================

interface CrowdCanvasProps {
  src: string;
  rows?: number;
  cols?: number;
}

const CrowdCanvas: React.FC<CrowdCanvasProps> = ({ 
  src, 
  rows = 15, 
  cols = 7 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Use useRef to hold all non-React state related to the animation.
  // This object persists across renders without triggering them.
  const animationState = useRef({
    ctx: null as CanvasRenderingContext2D | null,
    stage: { width: 0, height: 0 } as Stage,
    allPeeps: [] as Peep[],
    availablePeeps: [] as Peep[],
    crowd: [] as Peep[],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const state = animationState.current;
    state.ctx = canvas.getContext("2d");
    if (!state.ctx) return;

    // --- ANIMATION LOGIC ---

    const resetPeep = (peep: Peep) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      // Fly-in animation ease
      const offsetY = 100 - 250 * gsap.parseEase("power2.in")(Math.random());
      const startY = state.stage.height - peep.height + offsetY;
      
      let startX: number;
      let endX: number;

      if (direction === 1) { // Walk from left to right
        startX = -peep.width;
        endX = state.stage.width;
        peep.scaleX = 1;
      } else { // Walk from right to left
        startX = state.stage.width + peep.width;
        endX = 0;
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return { startX, endX };
    };
    
    const normalWalk = (peep: Peep, { startX, endX }: { startX: number, endX: number }) => {
      const xDuration = 10;
      const yDuration = 0.25;

      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.5, 1.5));
      tl.to(peep, { duration: xDuration, x: endX, ease: "none" }, 0);
      tl.to(peep, { duration: yDuration, repeat: xDuration / yDuration, yoyo: true, y: peep.anchorY - 10 }, 0);

      return tl;
    };

    const walks = [normalWalk];

    const addPeepToCrowd = () => {
      const peep = removeRandomFromArray(state.availablePeeps);
      const walkProps = resetPeep(peep);
      
      const walk = getRandomFromArray(walks)(peep, walkProps)
        .eventCallback("onComplete", () => {
          removePeepFromCrowd(peep);
          addPeepToCrowd();
        });
        
      peep.walk = walk;
      state.crowd.push(peep);
      // Sort by y-position to create a pseudo-3D effect
      state.crowd.sort((a, b) => a.anchorY - b.anchorY);
    };

    const removePeepFromCrowd = (peep: Peep) => {
      removeItemFromArray(state.crowd, peep);
      state.availablePeeps.push(peep);
    };
    
    const initCrowd = () => {
      // Add peeps until the available pool is empty
      while (state.availablePeeps.length) {
        // Stagger their start times
        addPeepToCrowd();
      }
    };
    
    const render = () => {
      if (!canvas || !state.ctx) return;
      // Clear canvas for next frame
      state.ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Sort and render peeps
      state.crowd.forEach((peep) => peep.render(state.ctx!));
    };

    const resize = () => {
      if (!canvas) return;
      state.stage.width = canvas.clientWidth;
      state.stage.height = canvas.clientHeight;
      // Adjust for device pixel ratio for sharp rendering
      canvas.width = state.stage.width * devicePixelRatio;
      canvas.height = state.stage.height * devicePixelRatio;
      // Scale context to match pixel ratio
      state.ctx?.scale(devicePixelRatio, devicePixelRatio);

      // Kill all running animations and reset the crowd
      state.crowd.forEach((peep) => peep.walk?.kill());
      state.crowd.length = 0;
      state.availablePeeps.length = 0;
      state.availablePeeps.push(...state.allPeeps);
      
      initCrowd();
    };

    const init = (img: HTMLImageElement) => {
      // Create all peep instances from the sprite sheet
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      for (let i = 0; i < total; i++) {
        const rect: PeepRect = [
          (i % rows) * rectWidth,
          Math.floor(i / rows) * rectHeight,
          rectWidth,
          rectHeight,
        ];
        state.allPeeps.push(new Peep(img, rect));
      }

      // Initial setup
      resize();
      gsap.ticker.add(render);
      window.addEventListener("resize", resize);
    };

    // --- INITIALIZATION ---
    const img = new Image();
    img.onload = () => init(img);
    img.onerror = () => console.error("Failed to load crowd sprite sheet.");
    img.src = src;

    // --- CLEANUP ---
    return () => {
      window.removeEventListener("resize", resize);
      gsap.ticker.remove(render);
      state.crowd.forEach((peep) => peep.walk?.kill());
    };
  }, [src, rows, cols]); // Dependencies are crucial for re-initialization if props change

  return (
    <canvas 
      ref={canvasRef} 
      // Positioned to fill the bottom part of its container
      className="absolute bottom-0 left-0 h-full w-full" 
    />
  );
};

export { CrowdCanvas };