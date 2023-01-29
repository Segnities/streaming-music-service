import { useState } from "react";

export function useResizeObserver() {
  const element = document.getElementById("root");
  const [clientWidth, setClientWidth] = useState(0);

  const ReziseObserver = new ResizeObserver((entries) => {
    setClientWidth(entries[0]?.contentRect?.width);
  });
  ReziseObserver.observe(element as HTMLElement);

  return {
    xs: clientWidth <= 640,
    sm: clientWidth > 640,
    md: clientWidth > 768,
    lg: clientWidth > 1024,
    xl: clientWidth > 1280,
    "2xl": clientWidth >= 1536,
  };
}
