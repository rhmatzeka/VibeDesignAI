"use client";

import { useEffect, useState } from "react";

type PixelBlastComponent = typeof import("./PixelBlast").default;

export function PixelBlastLayer() {
  const [PixelBlast, setPixelBlast] = useState<PixelBlastComponent | null>(null);

  useEffect(() => {
    let mounted = true;
    import("./PixelBlast").then((mod) => {
      if (mounted) setPixelBlast(() => mod.default);
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (!PixelBlast) {
    return (
      <div className="pixel-blast-fallback" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    );
  }

  return (
    <PixelBlast
      variant="circle"
      pixelSize={7}
      color="#00d4a4"
      patternScale={2.4}
      patternDensity={1.55}
      pixelSizeJitter={0.7}
      enableRipples
      rippleSpeed={0.42}
      rippleThickness={0.16}
      rippleIntensityScale={2.1}
      liquid
      liquidStrength={0.11}
      liquidRadius={1.25}
      liquidWobbleSpeed={5.2}
      speed={0.62}
      edgeFade={0.18}
      noiseAmount={0.025}
      transparent
    />
  );
}
