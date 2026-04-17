"use client";

import { useEffect, useState } from "react";

export function StatusBar() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")} ${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}:${String(d.getUTCSeconds()).padStart(2, "0")}Z`
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="border-b border-[color:var(--border)] bg-[color:var(--surface)] relative z-10">
      <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between mono text-[10px] text-[color:var(--muted)] tracking-wider">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span className="pip pip-ok scan-pulse" />
            SYS.ONLINE
          </span>
          <span className="hidden sm:inline">OPERATOR // v0.1.0 // PRE-ALPHA</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden md:inline">UTC {time}</span>
          <span>NODE // OPERATOR-PRIMARY</span>
        </div>
      </div>
    </div>
  );
}
