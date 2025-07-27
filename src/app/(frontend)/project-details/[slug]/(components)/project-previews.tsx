"use client";
import React, { Fragment, useState } from "react";
import {
  SanityImageMetadata,
  SINGLE_PROJECT_QUERYResult,
} from "../../../../../../sanity.types";
import ImageWithFallback from "@/components/image-with-fallback";
import { urlFor } from "@/sanity/lib/image";
import { Heading6 } from "@/components/typography";
import clsx from "clsx";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectPreviewsProps {
  projectPreviewImages: ProjectPreviewImages;
}
export default function ProjectPreviews({
  projectPreviewImages,
}: ProjectPreviewsProps) {
  const groupedPreviews = Object.entries(
    groupPreviewsByTitle(projectPreviewImages as ProjectPreviewImages),
  );

  const [activePreviewIndex, setActivePreviewIndex] = useState("0");
  return (
    <>
      {/* Overall Image Strategy:
        Clear Documentation for Screenshots: The comments above each ImageWithFallback component explicitly detail how to capture screenshots using standard browser Developer Tools presets, including:
        - The intended device.
        - The recommended DevTools preset to select.
        - Its typical CSS viewport dimensions.
        - The Device Pixel Ratio (DPR) to use.
        - The resulting precise physical pixel dimensions for high-resolution screenshot capture.

        Optimized Code for Display Performance: The `src`, `width`, and `height` attributes on the ImageWithFallback components are set to smaller, optimized dimensions that align with your maximum CSS display widths. This ensures efficient loading without compromising the correct aspect ratio, as images are resized by the browser/CSS to fit the mockup frames.
    */}
      <div className="relative h-max">
        {groupedPreviews.map(
          ([previewName, { mobileView, tabletView, desktopView }], index) => (
            <div
              key={previewName}
              className={clsx(
                index === Number(activePreviewIndex)
                  ? "relative opacity-100"
                  : "absolute top-0 left-0 opacity-0",
                "transition-opacity duration-150 ease-in-out",
                "flex flex-col gap-6",
              )}
            >
              <Select
                defaultValue="0"
                value={activePreviewIndex}
                onValueChange={setActivePreviewIndex}
              >
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Select a Preview" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {groupedPreviews.map(([previewName], index) => (
                      <SelectItem key={index} value={String(index)}>
                        <Heading6>{previewName}</Heading6>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-8">
                {mobileView && (
                  <figure className="flex flex-col items-center justify-end">
                    <div className="flex w-[225px] items-end justify-center md:w-[270px]">
                      {/* Device: Mobile (Smartphone)
                                  DevTools Preset: iPhone 12 Pro (or similar modern iPhone)
                                  CSS Viewport: 390px (W) x 844px (H)
                                  DPR: 3.0x
                                  
                                  For High-Resolution Screenshot Capture:
                                  - Physical Pixel Dimensions: 1170px (W) x 2532px (H)
                                  - Aspect Ratio: ~1:2.16 (width:height)
                                  
                                  Image `src` and `width`/`height` below are optimized for efficient display 
                                  within the CSS container, maintaining the ~1:2.16 aspect ratio.
                              */}
                      <ImageWithFallback
                        className="h-auto w-full rounded-lg"
                        // src={`https://picsum.photos/id/15/270/584`} // Optimized for max display width 270px, maintaining ~1:2.16 ratio
                        src={`${urlFor(mobileView.image).url()}`}
                        alt="Phone Mockup"
                        width={270} // Matches max display width
                        height={584} // Derived from 270px width to maintain ~1:2.16 aspect ratio (270 * 2532 / 1170)
                        fallbackMsg={
                          <>
                            No <br />
                            preview <br />
                            available
                          </>
                        }
                        aspectRatio={
                          mobileView.image.asset.metadata.dimensions
                            ?.aspectRatio
                        }
                        blurHash={mobileView.image.asset.metadata.blurHash}
                        blurDataURL={mobileView.image.asset.metadata.lqip}
                      />
                    </div>

                    <figcaption className="p-6 leading-relaxed font-semibold">
                      On Mobile
                    </figcaption>
                  </figure>
                )}

                {tabletView && (
                  <figure className="flex flex-col items-center justify-end">
                    <div className="flex w-[270px] items-end justify-center md:w-[330px]">
                      {/* Device: Tablet
                                  DevTools Preset: iPad (7th/8th/9th Gen) - *ensure Landscape orientation*
                                  CSS Viewport (Landscape): 1080px (W) x 810px (H)
                                  DPR: 2.0x
                                  
                                  For High-Resolution Screenshot Capture:
                                  - Physical Pixel Dimensions: 2160px (W) x 1620px (H)
                                  - Aspect Ratio: 4:3 (width:height)
                                  
                                  Image `src` and `width`/`height` below are optimized for efficient display 
                                  within the CSS container, maintaining the 4:3 aspect ratio.
                              */}
                      <ImageWithFallback
                        className="h-auto w-full rounded-lg"
                        // src="https://picsum.photos/id/15/330/248" // Optimized for max display width 330px, maintaining 4:3 ratio (330 * 3 / 4)
                        src={`${urlFor(tabletView.image).url()}`}
                        alt="Tablet Mockup"
                        width={330} // Matches max display width
                        height={248} // Derived from 330px width to maintain 4:3 aspect ratio
                        aspectRatio={
                          tabletView.image.asset.metadata.dimensions
                            ?.aspectRatio
                        }
                        blurHash={tabletView.image.asset.metadata.blurHash}
                        blurDataURL={tabletView.image.asset.metadata.lqip}
                      />
                    </div>
                    <figcaption className="p-6 leading-relaxed font-semibold">
                      On Tablet
                    </figcaption>
                  </figure>
                )}

                {desktopView && (
                  <>
                    {desktopView.variant === "standard" ? (
                      <figure className="flex flex-col items-center justify-end">
                        <div className="flex w-full items-end justify-center sm:w-[480px] md:w-[576px]">
                          {/* Device: Desktop Monitor / Laptop (Standard)
                                DevTools Preset: Custom Responsive Setting
                                
                                For High-Resolution Screenshot Capture:
                                - CSS Viewport: 1920px (W) x 1080px (H)
                                - DPR: 1.0x
                                - Resulting Physical Dimensions: 1920px (W) x 1080px (H)
                                - Aspect Ratio: 16:9 (width:height)
                                
                                Image `src` and `width`/`height` below are optimized for efficient display 
                                within the CSS container, maintaining the 16:9 aspect ratio.
                            */}
                          <ImageWithFallback
                            className="h-auto w-full rounded-lg"
                            // src="https://picsum.photos/id/15/576/324" // Optimized for max display width 576px
                            src={`${urlFor(desktopView.image).url()}`}
                            alt="Standard Desktop Mockup"
                            width={576} // Matches max display width
                            height={324} // Derived from 576px width to maintain 16:9 aspect ratio
                            aspectRatio={
                              desktopView.image.asset.metadata.dimensions
                                ?.aspectRatio
                            }
                            blurHash={desktopView.image.asset.metadata.blurHash}
                            blurDataURL={desktopView.image.asset.metadata.lqip}
                          />
                        </div>
                        <figcaption className="p-6 leading-relaxed font-semibold">
                          On Desktop (Standard)
                        </figcaption>
                      </figure>
                    ) : (
                      <figure className="flex flex-col items-center justify-end">
                        <div className="flex w-full items-end justify-center sm:w-[600px] md:w-[756px]">
                          {/* Device: Desktop Monitor / Laptop (Ultrawide)
                                DevTools Preset: Custom Responsive Setting
                                
                                For High-Resolution Screenshot Capture:
                                - CSS Viewport: 2560px (W) x 1080px (H)
                                - DPR: 1.0x
                                - Resulting Physical Dimensions: 2560px (W) x 1080px (H)
                                - Aspect Ratio: 21:9 (width:height)
                                
                                Image `src` and `width`/`height` below are optimized for efficient display 
                                within the CSS container, maintaining the 21:9 aspect ratio.
                            */}
                          <ImageWithFallback
                            className="h-auto w-full rounded-lg"
                            // src="https://picsum.photos/id/15/756/324" // Optimized for max display width 756px (324 * 21/9)
                            src={`${urlFor(desktopView.image).url()}`}
                            alt="Ultrawide Desktop Mockup"
                            width={756} // Matches max display width
                            height={324} // Derived from 756px width to maintain 21:9 aspect ratio
                            aspectRatio={
                              desktopView.image.asset.metadata.dimensions
                                ?.aspectRatio
                            }
                            blurHash={desktopView.image.asset.metadata.blurHash}
                            blurDataURL={desktopView.image.asset.metadata.lqip}
                          />
                        </div>
                        <figcaption className="p-6 leading-relaxed font-semibold">
                          On Desktop (Ultrawide)
                        </figcaption>
                      </figure>
                    )}
                  </>
                )}
              </div>
            </div>
          ),
        )}
      </div>
    </>
  );
}

type ProjectPreviewImagesRaw = NonNullable<
  NonNullable<SINGLE_PROJECT_QUERYResult>["projectPreviewImages"]
>;

type ViewType = keyof ProjectPreviewImagesRaw;

interface ScreenshotViewItem {
  _id: string;
  title: string;
  slug: string;
}

interface PreviewImage {
  image: {
    asset: {
      _id: string;
      url: string;
      metadata: SanityImageMetadata;
    };
  };
  primaryDisplay: boolean;
  variant: "standard" | "ultraWide";
  screenshotViewItem: ScreenshotViewItem;
}

export type ProjectPreviewImages = Record<ViewType, PreviewImage[]>;

type GroupedPreview = Record<string, Partial<Record<ViewType, PreviewImage>>>;

function groupPreviewsByTitle(previews: ProjectPreviewImages) {
  return Object.entries(previews).reduce<GroupedPreview>(
    (acc, [viewType, items]) => {
      items.forEach((item) => {
        const title = item.screenshotViewItem.title;
        if (!acc[title]) {
          acc[title] = {};
        }
        acc[title][viewType as ViewType] = item;
      });
      return acc;
    },
    {},
  );
}
