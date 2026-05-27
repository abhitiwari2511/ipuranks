import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const MapPinIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      await animate(
        ".pin",
        { y: [-2, 2, 0] },
        { duration: 0.6, ease: "easeInOut" },
      );
    };

    const stop = async () => {
      await animate(".pin", { y: 0 }, { duration: 0.2, ease: "easeInOut" });
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
        <motion.path
          className="pin"
          d="M12 3c3.866 0 7 3.134 7 7a7 7 0 0 1-14 0c0-3.866 3.134-7 7-7z"
        />
        <circle cx="12" cy="10" r="2" />
      </motion.svg>
    );
  },
);

MapPinIcon.displayName = "MapPinIcon";

export default MapPinIcon;
