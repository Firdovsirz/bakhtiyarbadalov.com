"use client";

import { useState } from "react";
import { MonogramStrokes } from "@/components/brand/Monogram";
import { CROSSINGS, GRID } from "@/components/brand/geometry";
import s from "./Colophon.module.css";

/** The monogram with a toggle that reveals its construction grid and woven crossings. */
export function ConstructionFigure() {
  const [show, setShow] = useState(false);
  return (
    <div className={s.figureCol}>
      <div className={`${s.figure} ${show ? s.show : ""}`}>
        <svg viewBox="-34 -62 164 214" role="img" aria-label="The BB monogram with its construction grid">
          <MonogramStrokes />
          <g className={s.grid}>
            {GRID.columns.map((x) => (
              <line key={`c${x}`} x1={x} y1={-54} x2={x} y2={142} />
            ))}
            {GRID.rows.map((y) => (
              <line key={`r${y}`} x1={-22} y1={y} x2={118} y2={y} />
            ))}
            <line x1={40} y1={-12} x2={76} y2={24} />
            <line x1={72} y1={-44} x2={108} y2={-8} />
          </g>
          <g className={s.cross}>
            {CROSSINGS.map((c) => (
              <g key={`${c.x}-${c.y}`}>
                <circle cx={c.x} cy={c.y} r={10} />
                <text x={c.x + 13} y={c.y - 9}>
                  {c.b1}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
      <button type="button" className={`btn btn-soft ${s.toggle}`} aria-pressed={show} onClick={() => setShow((v) => !v)}>
        {show ? "Hide construction" : "Show construction"}
      </button>
    </div>
  );
}
