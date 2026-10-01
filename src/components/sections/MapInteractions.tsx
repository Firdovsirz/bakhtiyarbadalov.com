"use client";

import { useEffect } from "react";

/**
 * Links the map and the list of places: hovering or focusing a place highlights its
 * route on the map; hovering or tapping a dot shows a tooltip. The markup is rendered
 * on the server; this only adds behaviour, so the page works without JavaScript.
 */
export function MapInteractions({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    const focusClass = root.dataset.focusClass ?? "";
    const onClass = root.dataset.onClass ?? "";
    const svg = root.querySelector("svg");
    const tip = root.querySelector<HTMLElement>("[data-map-tip]");
    const cities = Array.from(root.querySelectorAll<SVGGElement>("svg [data-id]"));
    const items = Array.from(root.querySelectorAll<HTMLElement>("li[data-id]"));
    if (!svg || !tip) return;
    const mapBox = tip.parentElement as HTMLElement;

    const show = (id: string | null, withTip: boolean) => {
      root.classList.toggle(focusClass, Boolean(id));
      cities.forEach((g) => g.classList.toggle(onClass, g.dataset.id === id));
      items.forEach((li) => li.classList.toggle(onClass, li.dataset.id === id));
      if (!id || !withTip) {
        tip.hidden = true;
        return;
      }
      const li = items.find((x) => x.dataset.id === id);
      const dot = cities.find((g) => g.dataset.id === id)?.querySelector("circle");
      if (!li || !dot) return;
      const vb = svg.viewBox.baseVal;
      const box = svg.getBoundingClientRect();
      const host = mapBox.getBoundingClientRect();
      const x = ((dot.cx.baseVal.value - vb.x) / vb.width) * box.width + box.left - host.left;
      const y = ((dot.cy.baseVal.value - vb.y) / vb.height) * box.height + box.top - host.top;
      const name = document.createElement("b");
      name.textContent = li.querySelector("b")?.textContent ?? "";
      const where = document.createElement("span");
      where.textContent = li.querySelector("span")?.textContent ?? "";
      const what = document.createElement("p");
      what.textContent = li.querySelector("p")?.textContent ?? "";
      tip.replaceChildren(name, where, what);
      tip.style.left = `${Math.max(130, Math.min(host.width - 130, x))}px`;
      tip.style.top = `${y}px`;
      tip.hidden = false;
    };

    const off: Array<() => void> = [];
    const on = (el: Element, type: string, fn: EventListener) => {
      el.addEventListener(type, fn);
      off.push(() => el.removeEventListener(type, fn));
    };
    cities.forEach((g) => {
      const id = g.dataset.id ?? null;
      on(g, "mouseenter", () => show(id, true));
      on(g, "mouseleave", () => show(null, false));
      on(g, "click", () => show(id, true));
    });
    items.forEach((li) => {
      const id = li.dataset.id ?? null;
      on(li, "mouseenter", () => show(id, false));
      on(li, "mouseleave", () => show(null, false));
      on(li, "focus", () => show(id, false));
      on(li, "blur", () => show(null, false));
    });
    return () => off.forEach((fn) => fn());
  }, [rootId]);

  return null;
}
