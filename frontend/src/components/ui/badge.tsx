import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-indigo-500 focus-visible:ring-indigo-500/50 focus-visible:ring-[3px] aria-invalid:ring-red-500/40 aria-invalid:border-red-500 transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-indigo-500 text-white [a&]:hover:bg-indigo-600",
        secondary: "bg-zinc-800 text-zinc-300 [a&]:hover:bg-zinc-700",
        destructive:
          "bg-red-500/60 text-white [a&]:hover:bg-red-500/80 focus-visible:ring-red-500/40",
        outline:
          "border-zinc-700 text-zinc-300 [a&]:hover:bg-zinc-800 [a&]:hover:text-zinc-100",
        ghost: "[a&]:hover:bg-zinc-800 [a&]:hover:text-zinc-100",
        link: "text-indigo-400 underline-offset-4 [a&]:hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
