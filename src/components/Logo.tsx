import Image from "next/image";

/**
 * Official Zorga wordmark (vector, from the logo kit). Never redrawn.
 * Aspect ratio 6092 : 1798.
 */
export function Wordmark({ height = 22, className = "", light = false }: { height?: number; className?: string; light?: boolean }) {
  const width = Math.round(height * (6092 / 1798));
  return (
    <Image
      src={light ? "/logos/zorga-wordmark-light.svg" : "/logos/zorga-wordmark.svg"}
      alt="Zorga"
      width={width}
      height={height}
      priority
      unoptimized
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}

export function Icon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <Image src="/logos/zorga-icon.svg" alt="" aria-hidden width={size} height={size} unoptimized className={className} />
  );
}
