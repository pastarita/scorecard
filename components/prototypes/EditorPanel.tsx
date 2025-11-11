"use client";

export function EditorPanel() {
  const codeExample = `// Example TypeScript file
import { useState, useEffect } from 'react';

interface ScorecardData {
  holes: Hole[];
  project: Project;
}

export function ScorecardComponent({ data }: { data: ScorecardData }) {
  const [selectedHole, setSelectedHole] = useState<number | null>(null);
  
  useEffect(() => {
    // Track hole selection
    console.log('Selected hole:', selectedHole);
  }, [selectedHole]);

  return (
    <div className="scorecard-container">
      {data.holes.map(hole => (
        <HoleView
          key={hole.number}
          hole={hole}
          isSelected={hole.number === selectedHole}
          onSelect={() => setSelectedHole(hole.number)}
        />
      ))}
    </div>
  );
}`;

  return (
    <div className="h-full bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm overflow-auto">
      {/* Tab Bar */}
      <div className="flex items-center bg-[#252526] border-b border-[#3e3e42]">
        <div className="px-4 py-2 bg-[#1e1e1e] border-r border-[#3e3e42]">
          <span className="text-xs">ScorecardComponent.tsx</span>
        </div>
        <div className="px-4 py-2 opacity-60">
          <span className="text-xs">HorizontalScorecardBar.tsx</span>
        </div>
        <div className="px-4 py-2 opacity-60">
          <span className="text-xs">IDEPrototype.tsx</span>
        </div>
      </div>

      {/* Line Numbers and Code */}
      <div className="flex">
        {/* Line Numbers */}
        <div className="bg-[#252526] text-[#858585] text-right pr-4 py-2 select-none border-r border-[#3e3e42]">
          {codeExample.split('\n').map((_, i) => (
            <div key={i} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code Content */}
        <div className="flex-1 px-4 py-2">
          <pre className="leading-6">
            <code>{codeExample}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

