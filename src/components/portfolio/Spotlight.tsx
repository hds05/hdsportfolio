import { forwardRef, useRef, type HTMLAttributes, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type SpotlightProps = HTMLAttributes<HTMLDivElement> & {
  glow?: string;
  size?: number;
  tilt?: boolean;
};

/**
 * A pointer-reactive surface. Tracks the mouse and exposes
 * `--mx` / `--my` CSS vars used by an overlay gradient. Optional
 * subtle 3D tilt for cards.
 */
export const Spotlight = forwardRef<HTMLDivElement, SpotlightProps>(function Spotlight(
  { className, children, glow = "oklch(0.88 0.11 82 / 0.22)", size = 420, tilt = false, style, ...rest },
  ref,
) {
  const innerRef = useRef<HTMLDivElement | null>(null);

  const setRef = (el: HTMLDivElement | null) => {
    innerRef.current = el;
    if (typeof ref === "function") ref(el);
    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--spot-opacity", "1");
    if (tilt) {
      const rx = ((y / rect.height) - 0.5) * -6;
      const ry = ((x / rect.width) - 0.5) * 6;
      el.style.setProperty("--rx", `${rx}deg`);
      el.style.setProperty("--ry", `${ry}deg`);
    }
  };

  const onLeave = () => {
    const el = innerRef.current;
    if (!el) return;
    el.style.setProperty("--spot-opacity", "0");
    if (tilt) {
      el.style.setProperty("--rx", `0deg`);
      el.style.setProperty("--ry", `0deg`);
    }
  };

  return (
    <div
      ref={setRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        ...style,
        ...(tilt
          ? {
              transform:
                "perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
              transformStyle: "preserve-3d",
            }
          : null),
      }}
      className={cn(
        "group/spot relative isolate overflow-hidden transition-[transform,box-shadow,border-color] duration-500 ease-out",
        "hover:shadow-[0_30px_80px_-30px_oklch(0.82_0.13_78_/_0.45)]",
        className,
      )}
      {...rest}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 opacity-[var(--spot-opacity,0)] transition-opacity duration-300"
        style={{
          background: `radial-gradient(${size}px circle at var(--mx,50%) var(--my,50%), ${glow}, transparent 60%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
});