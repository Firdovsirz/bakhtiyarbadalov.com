import type { SVGProps } from "react";
import { B1, B2, MARK_STROKE, MARK_VIEWBOX } from "./geometry";

type Props = SVGProps<SVGSVGElement> & { title?: string };

/** The BB monogram. Inherits its colour from `color`. */
export function Monogram({ title, ...props }: Props) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      overflow="visible"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <MonogramStrokes />
    </svg>
  );
}

/** Just the two woven strokes, for embedding inside another SVG. */
export function MonogramStrokes({ stroke = "currentColor" }: { stroke?: string }) {
  return (
    <g fill="none" stroke={stroke} strokeWidth={MARK_STROKE} strokeLinejoin="miter" strokeMiterlimit={4}>
      <path d={B1} />
      <path d={B2} />
    </g>
  );
}
