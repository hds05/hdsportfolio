import { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
}

function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor;
}

export function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const dotRef = useRef<Point>({ x: -100, y: -100 });
  const ringRef = useRef<Point>({ x: -100, y: -100 });
  const targetRef = useRef<Point>({ x: -100, y: -100 });

  const dotEl = useRef<HTMLDivElement>(null);
  const ringEl = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    if (mq.matches) {
      setIsTouch(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    const loop = () => {
      dotRef.current.x = lerp(dotRef.current.x, targetRef.current.x, 0.25);
      dotRef.current.y = lerp(dotRef.current.y, targetRef.current.y, 0.25);
      ringRef.current.x = lerp(ringRef.current.x, targetRef.current.x, 0.12);
      ringRef.current.y = lerp(ringRef.current.y, targetRef.current.y, 0.12);

      if (dotEl.current) {
        dotEl.current.style.transform = `translate(${dotRef.current.x}px, ${dotRef.current.y}px) translate(-50%, -50%)`;
      }
      if (ringEl.current) {
        ringEl.current.style.transform = `translate(${ringRef.current.x}px, ${ringRef.current.y}px) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (
        el.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]")
      ) {
        setIsHovering(true);
      }
    };

    const onOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (
        el.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]")
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={ringEl}
        className="custom-cursor-ring pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: isHovering ? 48 : 36,
          height: isHovering ? 48 : 36,
          borderRadius: "50%",
          border: `1.5px solid ${isHovering ? "oklch(0.82 0.13 78)" : "oklch(0.82 0.13 78 / 0.55)"}`,
          backgroundColor: isHovering
            ? "oklch(0.82 0.13 78 / 0.08)"
            : "transparent",
          transition: "width 0.35s ease, height 0.35s ease, border-color 0.35s ease, background-color 0.35s ease",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={dotEl}
        className="custom-cursor-dot pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: isClicking ? 4 : isHovering ? 6 : 5,
          height: isClicking ? 4 : isHovering ? 6 : 5,
          borderRadius: "50%",
          backgroundColor: isHovering
            ? "oklch(0.82 0.13 78)"
            : "oklch(0.82 0.13 78 / 0.9)",
          transition: "width 0.15s ease, height 0.15s ease, background-color 0.15s ease",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
