"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "oklch(0.10 0.02 285 / 0.95)",
          color: "oklch(0.98 0.02 320)",
          border: "1px solid oklch(0.20 0.04 290 / 0.3)",
        },
      }}
    />
  );
}
