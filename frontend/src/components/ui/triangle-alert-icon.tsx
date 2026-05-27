import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const TriangleAlertIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      await animate(
        ".exclaim",
        { y: [0, -3, 0] },
        { duration: 0.5, ease: "easeInOut" },
      );
    };

    const stop = async () => {
      await animate(".exclaim", { y: 0 }, { duration: 0.2, ease: "easeInOut" });
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
        <path d="M12 3l8.5 14H3.5L12 3z" />
        <motion.path className="exclaim" d="M12 9v3" />
        <motion.path className="exclaim" d="M12 15h.01" />
      </motion.svg>
    );
  },
);

TriangleAlertIcon.displayName = "TriangleAlertIcon";

export default TriangleAlertIcon;
