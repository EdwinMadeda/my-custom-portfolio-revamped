"use client";
import React, { useState } from "react";

import { Button } from "./ui/custom-button";
import { ExternalLink } from "react-external-link";
import clsx from "clsx";

import { AnimatePresence, motion } from "framer-motion";
import { IconType } from "react-icons";

interface ExpandingButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  icon: IconType;
  url: string;
  label: string;
  download?: boolean;
}

export function ExpandingButton({
  icon: Icon,
  url,
  label,
  download = false,
  className,
  ...props
}: ExpandingButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() =>
        setTimeout(() => {
          setHovered(false);
        }, 500)
      }
      animate={{ width: hovered ? 150 : 36 }}
      initial={{ width: 36 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={clsx("h-9 overflow-hidden", className)}
    >
      <Button
        asChild
        className={clsx(
          "group h-full w-full justify-center transition-all duration-300 ease-in-out",
          hovered ? "justify-start" : "justify-center",
        )}
        {...props}
      >
        <ExternalLink
          href={url}
          download={download}
          className="flex items-center"
        >
          {/* Always render the fixed icon/content part, if any */}
          {/* For example, if you have an icon that always stays visible */}
          {/* <YourIconComponent /> */}

          {/* Animate the children's visibility */}
          <Icon />
          <AnimatePresence mode="wait">
            {hovered && (
              <motion.span
                key="children-content"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="ml-2 whitespace-nowrap"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </ExternalLink>
      </Button>
    </motion.div>
  );
}
