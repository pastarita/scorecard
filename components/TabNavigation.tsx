"use client";

import { useState } from "react";

export interface Tab {
  id: string;
  label: string;
  icon?: string;
  description?: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

/**
 * TabNavigation styled to match traditional golf scorecard aesthetic
 * Uses olive-green colors, serif fonts for labels, and scorecard-style borders
 */
export function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="border-b-2 border-[#8b956d] bg-[#faf8f3]">
      <nav className="flex gap-1 px-4 overflow-x-auto" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-3 text-sm font-medium
                border-b-2 transition-all whitespace-nowrap
                ${
                  isActive
                    ? "border-[#556b2f] text-[#3d4a21] bg-[#d4e8d4] font-semibold"
                    : "border-transparent text-[#6b7a4a] hover:text-[#3d4a21] hover:bg-[#f5f0e8] hover:border-[#8b956d]"
                }
              `}
              aria-current={isActive ? "page" : undefined}
              title={tab.description}
            >
              {tab.icon && <span className="text-lg">{tab.icon}</span>}
              <span className="scorecard-font-serif">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export function useTabs(initialTab: string) {
  const [activeTab, setActiveTab] = useState(initialTab);
  return { activeTab, setActiveTab };
}

