"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { decode } from "blurhash";
import { Muted } from "./typography";
import { Skeleton } from "./ui/skeleton";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { SpinnerCircularFixed } from "spinners-react/lib/esm/SpinnerCircularFixed";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

interface ImageWithFallbackProps
  extends Omit<ImageProps, "placeholder" | "blurDataURL"> {
  aspectRatio?: number;
  fallbackMsg?: React.ReactNode;
  blurHash?: string | null;
  blurDataURL?: string | null;
}

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  aspectRatio,
  // fallbackMsg = <>No preview available</>,
  fallbackMsg,
  blurHash,
  blurDataURL,
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const calculatedAspectRatio =
    aspectRatio ?? (width && height ? Number(width) / Number(height) : 1);

  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);

    if (blurHash && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      const width = 32;
      const height = 32;
      const pixels = decode(blurHash, width, height);
      const imageData = ctx.createImageData(width, height);
      imageData.data.set(pixels);
      ctx.putImageData(imageData, 0, 0);
    }
  }, [src, blurHash]);

  if (hasError) {
    return (
      <ImageFallbackSkeleton
        width={width}
        height={height}
        aspectRatio={calculatedAspectRatio}
        className="animate-none"
      >
        <ImageOff className="text-muted-foreground mb-2 h-6 w-6" />
        {fallbackMsg && (
          <Muted className="text-center leading-5 font-bold break-words">
            {fallbackMsg}
          </Muted>
        )}
      </ImageFallbackSkeleton>
    );
  }

  return (
    <AspectRatio
      ratio={calculatedAspectRatio}
      style={{
        position: "relative",
        // aspectRatio: width && height ? `${width}/${height}` : "1/1",
      }}
      className="h-full w-full"
    >
      {!isLoaded && (
        <ImageFallbackSkeleton
          width={width}
          height={height}
          aspectRatio={calculatedAspectRatio}
        >
          {blurHash ? (
            <canvas
              ref={canvasRef}
              width={32}
              height={32}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "blur(10px)",
                transform: "scale(1.05)",
              }}
            />
          ) : (
            <SpinnerCircularFixed
              size={80}
              thickness={100}
              speed={120}
              color="#fff"
              secondaryColor="rgba(0,0,0,0.44)"
              className="h-10 w-10"
            />
          )}
        </ImageFallbackSkeleton>
      )}

      <Image
        {...props}
        src={src}
        alt={alt}
        width={width}
        height={height}
        // fill
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
        placeholder={blurDataURL ? "blur" : undefined}
        blurDataURL={blurDataURL ? blurDataURL : undefined}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease",
          position: "absolute",
          objectFit: "cover",
          top: 0,
          left: 0,
          ...props.style,
        }}
      />
    </AspectRatio>
  );
}

function ImageFallbackSkeleton({
  aspectRatio,
  children,
  className,
}: Pick<ImageProps, "width" | "height" | "children"> & {
  aspectRatio: number;
  className?: string;
}) {
  return (
    <AspectRatio
      ratio={aspectRatio}
      role="img"
      aria-live="assertive"
      className="relative w-full"
      // style={{
      //   aspectRatio: width && height ? `${width}/${height}` : "1/1",
      // }}
    >
      <Skeleton
        className={cn(
          "flex h-full w-full items-center justify-center gap-3 rounded",
          { "flex-col": aspectRatio < 1 },
          className,
        )}
      >
        <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
          {children}
        </div>
      </Skeleton>
    </AspectRatio>
  );
}
