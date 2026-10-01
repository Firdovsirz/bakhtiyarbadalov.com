"use client";

import { useState } from "react";
import { publications, themes, webName, type Theme } from "@/content/publications";
import s from "./Publications.module.css";

type Filter = Theme | "all";

export function PublicationList() {
  const [filter, setFilter] = useState<Filter>("all");
  const count = (t: Filter) => (t === "all" ? publications.length : publications.filter((p) => p.theme === t).length);
  const options: { id: Filter; label: string }[] = [{ id: "all", label: "All" }, ...themes];

  return (
    <>
      <div className={s.filters} role="group" aria-label="Filter publications by theme">
        {options.map((o) => (
          <button key={o.id} type="button" className={s.filter} aria-pressed={filter === o.id} onClick={() => setFilter(o.id)}>
            {o.label}
            <span>{count(o.id)}</span>
          </button>
        ))}
      </div>
      <ol className={s.list}>
        {publications.map((p) => (
          <li key={p.title} hidden={filter !== "all" && p.theme !== filter}>
            <span className={s.year}>{p.year}</span>
            <div>
              <p className={s.title}>{p.title}</p>
              <p className={s.authors}>
                {p.authors.map((a, i) => (
                  <span key={a.family}>
                    {i ? ", " : ""}
                    {a.self ? <strong>{webName(a)}</strong> : webName(a)}
                  </span>
                ))}
              </p>
              <p className={s.venue}>{p.venue ?? p.webNote}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
