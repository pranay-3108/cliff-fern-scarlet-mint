export function Mark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="12" className="fill-ink" />
      <rect x="8" y="11" width="24" height="16" rx="3" className="fill-bg" />
      <rect x="12" y="29" width="16" height="2.5" rx="1.25" className="fill-clay" />
    </svg>
  );
}
