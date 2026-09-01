import Image from "next/image";
import { Ml } from "./Ml";

/**
 * One editorial object between the thinking and the evidence: an isolated
 * architectural model of an open forum, directly on the white page. A single
 * statement above it — no paragraph, no container, no motion.
 */
export function EditorialImage() {
  return (
    <figure className="border-t border-rule">
      <div className="wrap pt-[clamp(3.5rem,10vh,7rem)] pb-[clamp(4rem,12vh,9rem)]">
        <figcaption>
          <h2 className="t-h2" data-reveal="lines">
            <Ml>A platform starts</Ml>
            <Ml>before the room fills<span className="text-blue">.</span></Ml>
          </h2>
        </figcaption>
        <div className="grid12 mt-[clamp(2.5rem,7vh,5rem)]">
          <div className="col-span-12 sm:col-span-11 sm:col-start-2 lg:col-span-8 lg:col-start-5" data-reveal="fade">
            <Image
              src="/assets/zorga-forum.png"
              alt="White architectural model of an open forum pavilion. A thin roof on slender columns over an open central space, empty and waiting to be occupied."
              width={1684}
              height={1047}
              sizes="(max-width: 1023px) 92vw, 60vw"
              quality={85}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </figure>
  );
}
