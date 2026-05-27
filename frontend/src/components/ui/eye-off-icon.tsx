import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const EyeOffIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      await animate(
        ".slash",
        { rotate: [0, -20, 0] },
        { duration: 0.5, ease: "easeInOut" },
      );
    };

    const stop = async () => {
      await animate(
        ".slash",
        { rotate: 0 },
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
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M2 12s3-7 10-7 10 7 10 7" />
        <motion.path className="slash" d="M3 3l18 18" />
        <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      </motion.svg>
    );
  },
);

EyeOffIcon.displayName = "EyeOffIcon";

export default EyeOffIcon;
