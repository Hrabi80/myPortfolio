import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const blockWrapperVariants = cva("w-full", {
  variants: {
    size: {
      none: "py-0",
      small: "py-8 md:py-10",
      medium: "py-12 md:py-16",
      high: "py-20 md:py-24",
      hero: "py-32 md:py-40",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export interface BlockWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof blockWrapperVariants> {
  asChild?: boolean;
}

const BlockWrapper = React.forwardRef<HTMLDivElement, BlockWrapperProps>(
  ({ className, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? "div" : "section"; // Default to section for semantic HTML
    return (
      <Comp
        className={cn(blockWrapperVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
BlockWrapper.displayName = "BlockWrapper";

export { BlockWrapper, blockWrapperVariants };
