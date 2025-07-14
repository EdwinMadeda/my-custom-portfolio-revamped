import BackButton from "@/components/back-button";
import ImageWithFallback from "@/components/image-with-fallback";
import SectionInnerContent from "@/components/section-inner-content";
import { Button } from "@/components/ui/custom-button";

import { ExternalLink } from "react-external-link";
import { TechStackSidebarSkeleton } from "./(components)/teck-stack-sidebar";
import { TechArticleSkeleton } from "./(components)/tech-article";
import { ProjectIntroSkeleton } from "./(components)/project-intro";

export const metadata = {
  title: "Project Details",
};

export default async function ProjectDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return (
    <>
      <section>
        <div className="flex h-full flex-col justify-center">
          {/* <ProjectIntro /> */}
          <ProjectIntroSkeleton />

          <SectionInnerContent>
            {/* Overall Image Strategy:
    
            Clear Documentation for Screenshots: The comments above each ImageWithFallback component explicitly detail how to capture screenshots using standard browser Developer Tools presets, including:
            - The intended device.
            - The recommended DevTools preset to select.
            - Its typical CSS viewport dimensions.
            - The Device Pixel Ratio (DPR) to use.
            - The resulting precise physical pixel dimensions for high-resolution screenshot capture.

            Optimized Code for Display Performance: The `src`, `width`, and `height` attributes on the ImageWithFallback components are set to smaller, optimized dimensions that align with your maximum CSS display widths. This ensures efficient loading without compromising the correct aspect ratio, as images are resized by the browser/CSS to fit the mockup frames.
          */}
            <div className="flex flex-wrap gap-8">
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
                    src={`https://picsum.photos/id/15/270/584`} // Optimized for max display width 270px, maintaining ~1:2.16 ratio
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
                  />
                </div>
                <figcaption className="p-6 leading-relaxed font-semibold">
                  On Mobile
                </figcaption>
              </figure>
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
                    src="https://picsum.photos/id/15/330/248" // Optimized for max display width 330px, maintaining 4:3 ratio (330 * 3 / 4)
                    alt="Tablet Mockup"
                    width={330} // Matches max display width
                    height={248} // Derived from 330px width to maintain 4:3 aspect ratio
                  />
                </div>
                <figcaption className="p-6 leading-relaxed font-semibold">
                  On Tablet
                </figcaption>
              </figure>
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
                    src="https://picsum.photos/id/15/576/324" // Optimized for max display width 576px
                    alt="Standard Desktop Mockup"
                    width={576} // Matches max display width
                    height={324} // Derived from 576px width to maintain 16:9 aspect ratio
                  />
                </div>
                <figcaption className="p-6 leading-relaxed font-semibold">
                  On Desktop (Standard)
                </figcaption>
              </figure>

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
                    src="https://picsum.photos/id/15/756/324" // Optimized for max display width 756px (324 * 21/9)
                    alt="Ultrawide Desktop Mockup"
                    width={756} // Matches max display width
                    height={324} // Derived from 756px width to maintain 21:9 aspect ratio
                  />
                </div>
                <figcaption className="p-6 leading-relaxed font-semibold">
                  On Desktop (Ultrawide)
                </figcaption>
              </figure>
            </div>
          </SectionInnerContent>

          <div className="my-10 flex flex-wrap gap-4">
            <div className="w-full sm:w-fit">
              <BackButton href="/#works">Back to Works</BackButton>
            </div>
            <Button asChild className="w-full max-w-xs sm:w-fit">
              <ExternalLink href="https://example.com">
                View Repository
              </ExternalLink>
            </Button>
            <Button asChild className="w-full max-w-xs sm:w-fit">
              <ExternalLink href="https://example.com">Visit Site</ExternalLink>
            </Button>
          </div>
        </div>
      </section>

      <section>
        <div className="flex w-full flex-col md:flex-row-reverse md:items-start md:justify-center md:gap-x-16 lg:gap-x-24">
          {/* <TechStackSidebar /> */}
          <TechStackSidebarSkeleton />
          <div className="md:flex md:flex-grow">
            <TechArticleSkeleton />
          </div>
        </div>
      </section>
    </>
  );
}
