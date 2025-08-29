import { useEffect, useRef } from "react";

export default function Terminal() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.WebTUI && ref.current) {
      window.WebTUI.mount(ref.current, { /* options if needed */ });
    }
    // Optional: cleanup
    return () => {
      if (window.WebTUI && ref.current) {
        window.WebTUI.unmount(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ width: "100%", height: "400px", background: "#111", borderRadius: "8px" }}
    />
  );
}