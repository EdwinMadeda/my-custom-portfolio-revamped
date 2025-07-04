"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";
import { Muted } from "./typography";
import { Skeleton } from "./ui/skeleton";
import { ImageOff } from "lucide-react";
import { SpinnerCircularFixed } from "spinners-react";
import { cn } from "@/lib/utils";

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fallbackMsg = <>No preview available</>,
  ...props
}: ImageProps & { fallbackMsg?: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  if (hasError) {
    return (
      <ImageFallbackSkeleton
        width={width}
        height={height}
        className="animate-none"
      >
        <ImageOff className="text-muted-foreground mb-2 h-6 w-6" />
        <Muted className="text-center leading-5 font-bold break-words">
          {fallbackMsg}
        </Muted>
      </ImageFallbackSkeleton>
    );
  }

  // if (!isLoaded) {
  //   return (
  //     <ImageFallbackSkeleton width={width} height={height}>
  //       <SpinnerCircularFixed
  //         size={80}
  //         thickness={100}
  //         speed={120}
  //         color="#fff"
  //         secondaryColor="rgba(0,0,0,0.44)"
  //         className="h-10 w-10"
  //       />
  //     </ImageFallbackSkeleton>
  //   );
  // }

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      width={width}
      height={height}
      onError={() => setHasError(true)}
      onLoad={() => setIsLoaded(true)}
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: "opacity 0.3s ease",
        ...props.style,
      }}
    />
  );
}

function ImageFallbackSkeleton({
  width,
  height,
  children,
  className,
}: Pick<ImageProps, "width" | "height" | "children"> & { className?: string }) {
  return (
    <div
      role="img"
      aria-live="assertive"
      className="relative w-full"
      style={{
        aspectRatio: width && height ? `${width}/${height}` : "16/9",
      }}
    >
      <Skeleton
        className={cn(
          "flex h-full w-full items-center justify-center gap-3 rounded",
          { "flex-col": width && height && Number(width) / Number(height) < 1 },
          className,
        )}
      >
        <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
          {children}
        </div>
      </Skeleton>
    </div>
  );
}
