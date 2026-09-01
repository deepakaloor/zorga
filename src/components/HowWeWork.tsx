import { ways } from "@/data/content";
import { Ml } from "./Ml";

export function HowWeWork() {
  return (
    <section id="work" aria-labelledby="how-title">
      <div className="wrap">
        <div className="sec-bar">
          <span className="t-micro text-mute">Work with us</span>
        </div>
      </div>
      <div className="wrap pt-[clamp(2rem,5vh,3.5rem)] pb-[clamp(3rem,8vh,6rem)]">
        <h2 id="how-title" className="t-display" data-reveal="lines">
          <Ml>Four ways</Ml>
          <Ml>to build with Zorga<span className="text-blue">.</span></Ml>
        </h2>
        <ul className="mt-[clamp(2.5rem,6vh,4.5rem)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 border-t border-rule">
          {ways.map((w, i) => (
            <li key={w.name} className={`pt-8 lg:pr-10 ${i > 0 ? "lg:pl-10 lg:border-l lg:border-rule" : ""}`} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
              <h3 className="t-h3 uppercase">{w.name}</h3>
              <p className="t-body mt-4 max-w-[28ch]">{w.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
