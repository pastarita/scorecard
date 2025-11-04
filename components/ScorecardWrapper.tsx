"use client";

import type { ReactNode } from "react";
import type { ScorecardData } from "@/types/scorecard";

interface ScorecardWrapperProps {
  children: ReactNode;
  data: ScorecardData;
}

/**
 * ScorecardWrapper - Higher-level wrapper component
 * 
 * Provides consistent traditional golf scorecard styling across the application.
 * Wraps the entire scorecard interface with the traditional aesthetic.
 */
export function ScorecardWrapper({ children, data }: ScorecardWrapperProps) {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Scorecard Container */}
      <div className="scorecard-container">
        {children}
      </div>
    </div>
  );
}

