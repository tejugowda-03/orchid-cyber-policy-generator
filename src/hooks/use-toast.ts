import { toast as hotToast } from "react-hot-toast";

interface ToastProps {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

export function useToast() {
  const toast = ({ title, description, variant }: ToastProps) => {
    const message = description ? `${title}\n${description}` : title;
    
    if (variant === "destructive") {
      hotToast.error(message, {
        duration: 4000,
        style: {
          background: "oklch(0.10 0.02 285 / 0.95)",
          color: "oklch(0.98 0.02 320)",
          border: "1px solid oklch(0.55 0.25 25)",
        },
      });
    } else {
      hotToast.success(message, {
        duration: 4000,
        style: {
          background: "oklch(0.10 0.02 285 / 0.95)",
          color: "oklch(0.98 0.02 320)",
          border: "1px solid oklch(0.68 0.18 305)",
        },
      });
    }
  };

  return { toast };
}
