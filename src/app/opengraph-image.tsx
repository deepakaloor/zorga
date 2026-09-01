import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = "Zorga. We design what industries gather around.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const svg = await readFile(join(process.cwd(), "public/logos/zorga-wordmark.svg"), "utf8");
  const logo = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#ffffff",
          color: "#121212",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <img src={logo} alt="" width={176} height={52} />
          <div style={{ fontSize: 18, letterSpacing: 4, textTransform: "uppercase", color: "#414143" }}>{site.tagline}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, lineHeight: 0.94, letterSpacing: -3, textTransform: "uppercase", fontWeight: 700 }}>
          <span>We design what</span>
          <span>industries</span>
          <span>gather around.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, letterSpacing: 4, textTransform: "uppercase", color: "#414143" }}>
          <span>{site.domain}</span>
          <span>{site.region}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
