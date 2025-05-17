"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";
import { Muted, Paragraph } from "./typography";

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
      <div
        role="img"
        aria-live="assertive"
        className="text-muted-foreground bg-image-bg-fallback relative flex w-full items-center justify-center rounded text-center text-sm font-bold"
        style={{
          aspectRatio: width && height ? `${width}/${height}` : "16/9",
        }}
      >
        <Muted className="leading-5">{fallbackMsg}</Muted>
      </div>
    );
  }

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
