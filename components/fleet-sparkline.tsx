// Tiny inline-SVG sparkline for fleet table rows.
// Deterministically renders a monochrome line from a series of non-negative
// numbers. Zero-length / all-zero series shows a flat baseline.

type Props = {
  values: number[];
  width?: number;
  height?: number;
  stroke?: string;
  className?: string;
};

export function FleetSparkline({
  values,
  width = 72,
  height = 18,
  stroke = "currentColor",
  className,
}: Props) {
  if (!values || values.length === 0) {
    return (
      <svg width={width} height={height} className={className} aria-hidden>
        <line
          x1={0}
          y1={height - 1}
          x2={width}
          y2={height - 1}
          stroke={stroke}
          strokeOpacity={0.35}
          strokeWidth={1}
        />
      </svg>
    );
  }
  const max = Math.max(...values, 1);
  const stepX = values.length > 1 ? width / (values.length - 1) : width;
  const points = values
    .map((v, i) => {
      const x = i * stepX;
      const y = height - 2 - (v / max) * (height - 4);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden
    >
      <polyline
        points={points}
        fill="none"
        stroke={stroke}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
