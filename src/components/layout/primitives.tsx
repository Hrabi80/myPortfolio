import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return <Comp className={cn(className)} ref={ref} {...props} />;
  }
);
Box.displayName = "Box";

export interface FlexProps extends BoxProps {
  direction?: "row" | "col" | "row-reverse" | "col-reverse";
  align?: "start" | "center" | "end" | "baseline" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: number | string;
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, direction = "row", align, justify, wrap, gap, style, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn(
          "flex",
          {
            "flex-row": direction === "row",
            "flex-col": direction === "col",
            "flex-row-reverse": direction === "row-reverse",
            "flex-col-reverse": direction === "col-reverse",
            "items-start": align === "start",
            "items-center": align === "center",
            "items-end": align === "end",
            "items-baseline": align === "baseline",
            "items-stretch": align === "stretch",
            "justify-start": justify === "start",
            "justify-center": justify === "center",
            "justify-end": justify === "end",
            "justify-between": justify === "between",
            "justify-around": justify === "around",
            "justify-evenly": justify === "evenly",
            "flex-nowrap": wrap === "nowrap",
            "flex-wrap": wrap === "wrap",
            "flex-wrap-reverse": wrap === "wrap-reverse",
          },
          className
        )}
        style={{ gap, ...style }}
        {...props}
      />
    );
  }
);
Flex.displayName = "Flex";

export interface GridProps extends BoxProps {
  columns?: number | string;
  rows?: number | string;
  gap?: number | string;
  flow?: "row" | "col" | "dense" | "row-dense" | "col-dense";
  align?: "start" | "center" | "end" | "baseline" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, columns, rows, gap, flow, align, justify, style, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn(
          "grid",
          {
            "grid-flow-row": flow === "row",
            "grid-flow-col": flow === "col",
            "grid-flow-dense": flow === "dense",
            "grid-flow-row-dense": flow === "row-dense",
            "grid-flow-col-dense": flow === "col-dense",
            "items-start": align === "start",
            "items-center": align === "center",
            "items-end": align === "end",
            "items-baseline": align === "baseline",
            "items-stretch": align === "stretch",
            "justify-start": justify === "start",
            "justify-center": justify === "center",
            "justify-end": justify === "end",
            "justify-between": justify === "between",
            "justify-around": justify === "around",
            "justify-evenly": justify === "evenly",
          },
          className
        )}
        style={{
          gridTemplateColumns: typeof columns === "number" ? `repeat(${columns}, minmax(0, 1fr))` : columns,
          gridTemplateRows: typeof rows === "number" ? `repeat(${rows}, minmax(0, 1fr))` : rows,
          gap,
          ...style,
        }}
        {...props}
      />
    );
  }
);
Grid.displayName = "Grid";

export interface ContainerProps extends BoxProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "lg", ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn(
          "mx-auto w-full px-4 md:px-6",
          {
            "max-w-screen-sm": size === "sm",
            "max-w-screen-md": size === "md",
            "max-w-screen-lg": size === "lg",
            "max-w-screen-xl": size === "xl",
            "max-w-screen-2xl": size === "2xl",
            "max-w-full": size === "full",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Container.displayName = "Container";

export { Box, Flex, Grid, Container };
