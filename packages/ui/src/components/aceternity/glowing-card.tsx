import { cn } from "../../lib/utils";
import React from "react";

export const GlowingCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative group", className)}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-primary-light to-primary-lighter rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
      <div className="relative bg-primary-darkest/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        {children}
      </div>
    </div>
  );
};
