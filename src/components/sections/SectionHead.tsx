import type { ReactNode } from "react";

type Props = { id: string; eyebrow: string; title: ReactNode; children?: ReactNode };

/** Eyebrow + heading on the left, introduction on the right. */
export function SectionHead({ id, eyebrow, title, children }: Props) {
  return (
    <div className="sec-head">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
      </div>
      {children ? <div className="intro">{children}</div> : null}
    </div>
  );
}
