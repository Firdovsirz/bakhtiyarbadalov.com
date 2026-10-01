"use client";

import { PrintIcon } from "@/components/ui/icons";

export function PrintButton() {
  return (
    <button type="button" className="btn btn-soft btn-sm" onClick={() => window.print()}>
      <PrintIcon />
      Print
    </button>
  );
}
