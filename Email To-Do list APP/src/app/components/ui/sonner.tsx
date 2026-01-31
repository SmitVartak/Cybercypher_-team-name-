"use client";

import * as React from "react";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "bg-white border text-black border-slate-200 shadow-xl font-medium",
          description: "text-slate-600 font-normal",
          actionButton: "bg-slate-900 text-white",
          cancelButton: "bg-neutral-100 text-slate-500",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };