import { cn } from "../../lib/utils";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <motion.div
        initial={{ backgroundPosition: "0 50%" }}
        animate={{ backgroundPosition: ["0 50%", "100% 50%", "0 50%"] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        style={{ backgroundSize: "400% 400%" }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500",
          "bg-[radial-gradient(circle_at_0_100%,#0A7075,transparent),radial-gradient(circle_at_100%_0,#6BA3BE,transparent),radial-gradient(circle_at_100%_100%,#0C969C,transparent),radial-gradient(circle_at_0_0,#274D60,#032F30)]"
        )}
      />
      <motion.div
        initial={{ backgroundPosition: "0 50%" }}
        animate={{ backgroundPosition: ["0 50%", "100% 50%", "0 50%"] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        style={{ backgroundSize: "400% 400%" }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1]",
          "bg-[radial-gradient(circle_at_0_100%,#0A7075,transparent),radial-gradient(circle_at_100%_0,#6BA3BE,transparent),radial-gradient(circle_at_100%_100%,#0C969C,transparent),radial-gradient(circle_at_0_0,#274D60,#032F30)]"
        )}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
