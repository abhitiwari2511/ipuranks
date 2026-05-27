import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-indigo-500 focus-visible:ring-indigo-500/50 focus-visible:ring-[3px] aria-invalid:ring-red-500/40 aria-invalid:border-red-500 transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-indigo-500 text-white [a&]:hover:bg-indigo-400",
        secondary: "bg-slate-800 text-slate-200 [a&]:hover:bg-slate-700",
        destructive:
          "bg-red-500/20 text-red-200 [a&]:hover:bg-red-500/30 focus-visible:ring-red-500/40",
        outline:
          "border-slate-700 text-slate-300 [a&]:hover:bg-slate-800 [a&]:hover:text-slate-100",
        ghost: "[a&]:hover:bg-slate-800 [a&]:hover:text-slate-100",
        link: "text-indigo-300 underline-offset-4 [a&]:hover:underline",
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
