import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const TrophyIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      await animate(
        ".cup",
        { scale: [0.9, 1.05, 1] },
        { duration: 0.6, ease: "easeInOut" },
      );
    };

    const stop = async () => {
      await animate(".cup", { scale: 1 }, { duration: 0.2, ease: "easeInOut" });
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
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <motion.path d="M8 7v2a4 4 0 0 0 8 0V7" className="cup" />
        <path d="M6 7a2 2 0 0 0 -2 2v1a4 4 0 0 0 4 4h0" />
        <path d="M18 7a2 2 0 0 1 2 2v1a4 4 0 0 1 -4 4h0" />
        <path d="M8 21h8" />
        <path d="M12 21v-4" />
      </motion.svg>
    );
  },
);

TrophyIcon.displayName = "TrophyIcon";

export default TrophyIcon;
