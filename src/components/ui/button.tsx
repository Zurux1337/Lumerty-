"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-hot-magenta)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-oat-canvas)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-hot-magenta)] text-white hover:bg-[#E02684] active:scale-[0.98]",
        secondary:
          "bg-[var(--color-soft-ink)] text-white hover:bg-black active:scale-[0.98]",
        outline:
          "border border-[var(--color-charcoal)] bg-transparent text-[var(--color-soft-ink)] hover:border-[var(--color-hot-magenta)] hover:text-[var(--color-hot-magenta)] active:scale-[0.98]",
        ghost:
          "bg-transparent text-[var(--color-soft-ink)] hover:bg-[var(--color-warm-mist)] active:scale-[0.98]",
      },
      size: {
        default: "min-h-[52px] px-6 py-[14px]",
        sm: "min-h-[44px] px-5 py-2 text-sm",
        lg: "min-h-[58px] px-8 py-4 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }), "rounded-[99px]", className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
