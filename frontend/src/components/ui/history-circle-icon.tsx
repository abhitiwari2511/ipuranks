import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const HistoryCircleIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      await animate(
        ".arrow",
        { rotate: [0, 360] },
        { duration: 0.8, ease: "linear" },
      );
    };

    const stop = async () => {
      await animate(
        ".arrow",
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
        <circle cx="12" cy="12" r="8" />
        <motion.path
          className="arrow"
          d="M12 8v4l3 1"
          style={{ originX: "12px", originY: "12px" }}
        />
      </motion.svg>
    );
  },
);

HistoryCircleIcon.displayName = "HistoryCircleIcon";

export default HistoryCircleIcon;
