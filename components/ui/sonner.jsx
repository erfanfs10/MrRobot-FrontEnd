"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      dir="rtl"
      richColors
      theme={theme}
      className="toaster group text-base lg:text-lg font-semibold font-(family-name:--custom-font)"
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--font-family": "var(--custom-font)",
      }}
      {...props}
    />
  );
};

export { Toaster };
