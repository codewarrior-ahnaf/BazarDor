"use client";

import { useEffect } from "react";

export default function DragGuard() {
  useEffect(() => {
    const preventDrag = (event: DragEvent) => {
      event.preventDefault();
    };

    document.addEventListener("dragstart", preventDrag, true);
    return () => document.removeEventListener("dragstart", preventDrag, true);
  }, []);

  return null;
}
