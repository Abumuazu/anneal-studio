/** The site's mark: its initial on a rounded tile. Decorative; pair it with the name. */
export function Mark({ name, size }: { name: string; size: number }) {
  return (
    <span className="brand-mark" style={{ fontSize: size }} aria-hidden="true">
      <span>{name.charAt(0)}</span>
    </span>
  );
}
