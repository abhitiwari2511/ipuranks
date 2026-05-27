import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LayoutDashboardIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      await animate(
        ".cell",
        { scale: [0.95, 1.05, 1] },
        { duration: 0.5, delay: 0, ease: "easeInOut" },
      );
    };

    const stop = async () => {
      await animate(
        ".cell",
        { scale: 1 },
        { duration: 0.2, ease: "easeInOut" },
      );
    };

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`cursor-pointer ${className}`}
        onHoverStart={start}
        onHoverEnd={stop}
      >
        <rect x="3" y="3" width="8" height="8" className="cell" />
        <rect x="13" y="3" width="8" height="8" className="cell" />
        <rect x="3" y="13" width="8" height="8" className="cell" />
        <rect x="13" y="13" width="8" height="8" className="cell" />
      </motion.svg>
    );
  },
);

LayoutDashboardIcon.displayName = "LayoutDashboardIcon";

export default LayoutDashboardIcon;
