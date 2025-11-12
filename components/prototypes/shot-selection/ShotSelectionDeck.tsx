"use client";

import { useState } from "react";
import type { ClubSpecification } from "@/types/shot-selection";

interface ShotSelectionDeckProps {
  clubs: ClubSpecification[];
}

function normalizeAngles(start: number, end: number) {
  const normalize = (angle: number) => {
    const normalized = angle % 360;
    return normalized < 0 ? normalized + 360 : normalized;
  };
  const startNorm = normalize(start);
  let sweep = end - start;
  if (sweep <= 0) {
    sweep = ((sweep % 360) + 360) % 360;
  }
  if (sweep === 0) {
    sweep = 360;
  }
  if (sweep > 360) {
    sweep = 360;
  }
  return { start: startNorm, sweep };
}

function buildArcPath(club: ClubSpecification) {
  const { accent } = club.motif;
  const width = club.bounds.x1 - club.bounds.x0;
  const height = club.bounds.y1 - club.bounds.y0;
  const { start, sweep } = normalizeAngles(accent.startAngleDeg, accent.endAngleDeg);
  const startRad = (start * Math.PI) / 180;
  const sweepRad = (sweep * Math.PI) / 180;
  const endRad = startRad + sweepRad;

  const cx = accent.centerX - club.bounds.x0;
  const cy = accent.centerY - club.bounds.y0;
  const radius = accent.radius;

  const startX = cx + radius * Math.cos(startRad);
  const startY = cy + radius * Math.sin(startRad);
  const endX = cx + radius * Math.cos(endRad);
  const endY = cy + radius * Math.sin(endRad);
  const largeArcFlag = sweep > 180 ? 1 : 0;

  return {
    viewBox: `0 0 ${width} ${height}`,
    path: `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
    center: { x: cx, y: cy },
  };
}

function ClubMotifCard({
  club,
  isActive,
  onSelect,
}: {
  club: ClubSpecification;
  isActive: boolean;
  onSelect: () => void;
}) {
  const arcShape = buildArcPath(club);
  const initials = club.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "group flex flex-col justify-between rounded-3xl border-2 p-6 text-left transition-all duration-300",
        "bg-white/85 backdrop-blur-sm shadow-[0_25px_60px_rgba(61,74,33,0.1)]",
        isActive
          ? "border-[#3d4a21] shadow-[0_25px_75px_rgba(61,74,33,0.16)]"
          : "border-[#cbd3ad] hover:border-[#556b2f] hover:shadow-[0_25px_70px_rgba(85,107,47,0.14)]",
      ].join(" ")}
      style={{ color: club.motif.textColor }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="scorecard-font-mono text-xs uppercase tracking-[0.3em]" style={{ color: club.motif.textColor }}>
            {club.shotType}
          </p>
          <h2 className="scorecard-title mt-2 text-2xl font-semibold" style={{ color: club.motif.textColor }}>
            {club.name}
          </h2>
          <p className="scorecard-font-serif text-sm" style={{ color: club.motif.textColor }}>
            {club.loft}
          </p>
        </div>
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold"
          style={{
            borderColor: club.motif.accentColor,
            color: club.motif.accentColor,
            backgroundColor: club.motif.backgroundColor,
          }}
        >
          {initials}
        </div>
      </div>

      <div
        className="relative mt-6 flex-1 rounded-2xl border border-dashed border-[#d8dcc5] p-4"
        style={{ backgroundColor: `${club.motif.backgroundColor}CC` }}
      >
        <svg
          viewBox={arcShape.viewBox}
          className="h-40 w-full"
          role="presentation"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`${club.id}-arc`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={club.motif.accentColor} stopOpacity={0.2} />
              <stop offset="100%" stopColor={club.motif.accentColor} stopOpacity={0.85} />
            </linearGradient>
          </defs>
          <path
            d={arcShape.path}
            stroke={`url(#${club.id}-arc)`}
            strokeWidth={club.motif.accent.strokeWidth}
            fill="none"
            strokeLinecap="round"
            className="transition-all duration-500 group-hover:opacity-90"
            style={{ opacity: isActive ? 0.95 : 0.65 }}
          />
          <circle
            cx={arcShape.center.x}
            cy={arcShape.center.y}
            r={4}
            fill={club.motif.accentColor}
            className="transition-transform duration-500 group-hover:scale-110"
          />
        </svg>
        <div
          className="mt-3 rounded-lg px-3 py-2 text-xs shadow-sm"
          style={{ backgroundColor: "rgba(255,255,255,0.85)", color: "#3d4a21" }}
        >
          {club.description}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-xs text-[#6b7a4a]">
        <span className="font-mono">source · segmentation</span>
        <span className="rounded-full bg-[#e6eddc] px-3 py-1 font-semibold text-[#3d4a21]">
          {isActive ? "Selected" : "Activate"}
        </span>
      </div>
    </button>
  );
}

export function ShotSelectionDeck({ clubs }: ShotSelectionDeckProps) {
  const [activeClubId, setActiveClubId] = useState(clubs[0]?.id ?? "");

  return (
    <section>
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {clubs.map((club) => (
          <ClubMotifCard
            key={club.id}
            club={club}
            isActive={club.id === activeClubId}
            onSelect={() => setActiveClubId(club.id)}
          />
        ))}
      </div>
    </section>
  );
}


