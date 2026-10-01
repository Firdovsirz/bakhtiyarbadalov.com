/**
 * The BB monogram: two B's (Bakhtiyar, Badalov) interlocked like chain links.
 * B1 is upright; B2 is the same letter shifted right and one step higher.
 * The strokes are woven: each B passes over the other twice and under it twice,
 * so the "under" strand is drawn with a gap at those crossings.
 * Corners are cut at 45°, the angle of the Azerbaijani eight-pointed star.
 *
 * Units: 12-unit stroke on a 32-unit grid. Columns x = 0, 32, 64, 96;
 * rows y = -32, 0, 28, 60, 88, 120. The numbers live in monogram.json so the
 * asset scripts in /scripts draw exactly the same mark.
 */
import mark from "./monogram.json";

export const MARK_STROKE = mark.stroke;
/** First B, with gaps where it passes under the second. */
export const B1 = mark.b1;
/** Second B, with gaps where it passes under the first. */
export const B2 = mark.b2;
/** Tight box around the stroked mark (portrait). */
export const MARK_VIEWBOX = mark.viewBox;
/** Centre of the mark in its own units. */
export const MARK_CENTER = mark.center;
/** Crossings, from the first B's point of view. */
export const CROSSINGS = mark.crossings;
export const GRID = mark.grid;

/** Point on a circle, 0° = north, clockwise. */
export function polar(deg: number, r: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [round(Math.cos(a) * r), round(Math.sin(a) * r)];
}

export const round = (n: number, d = 2) => Math.round(n * 10 ** d) / 10 ** d;

/** Two overlapping squares: the eight-pointed star. */
export function octagramPaths(halfSide: number) {
  const a = halfSide;
  const v = round(a * Math.SQRT2);
  return {
    square: `M${-a} ${-a}H${a}V${a}H${-a}Z`,
    diamond: `M0 ${-v}L${v} 0L0 ${v}L${-v} 0Z`,
  };
}
