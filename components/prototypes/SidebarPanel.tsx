"use client";

export function SidebarPanel() {
  return (
    <div className="h-full bg-[#252526] text-[#cccccc] text-sm overflow-auto">
      {/* Explorer Section */}
      <div className="py-2">
        <div className="px-4 py-1 text-xs font-semibold text-[#858585] uppercase tracking-wide">
          Explorer
        </div>
        
        <div className="mt-1">
          <div className="px-4 py-1 hover:bg-[#2a2d2e] cursor-pointer flex items-center gap-2">
            <span className="text-xs">📁</span>
            <span>scorecard</span>
          </div>
          
          <div className="pl-6">
            <div className="px-4 py-1 hover:bg-[#2a2d2e] cursor-pointer flex items-center gap-2">
              <span className="text-xs">📁</span>
              <span>app</span>
            </div>
            
            <div className="pl-6">
              <div className="px-4 py-1 hover:bg-[#2a2d2e] cursor-pointer flex items-center gap-2">
                <span className="text-xs">📄</span>
                <span>page.tsx</span>
              </div>
              <div className="px-4 py-1 hover:bg-[#2a2d2e] cursor-pointer flex items-center gap-2">
                <span className="text-xs">📄</span>
                <span>layout.tsx</span>
              </div>
            </div>
            
            <div className="px-4 py-1 hover:bg-[#2a2d2e] cursor-pointer flex items-center gap-2">
              <span className="text-xs">📁</span>
              <span>components</span>
            </div>
            
            <div className="pl-6">
              <div className="px-4 py-1 hover:bg-[#2a2d2e] cursor-pointer flex items-center gap-2">
                <span className="text-xs">📁</span>
                <span>prototypes</span>
              </div>
              
              <div className="pl-6">
                <div className="px-4 py-1 bg-[#094771] cursor-pointer flex items-center gap-2">
                  <span className="text-xs">📄</span>
                  <span>IDEPrototype.tsx</span>
                </div>
                <div className="px-4 py-1 hover:bg-[#2a2d2e] cursor-pointer flex items-center gap-2">
                  <span className="text-xs">📄</span>
                  <span>HorizontalScorecardBar.tsx</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Golf Scorecard Section */}
      <div className="py-2 border-t border-[#3e3e42]">
        <div className="px-4 py-1 text-xs font-semibold text-[#858585] uppercase tracking-wide">
          Golf Scorecard
        </div>
        
        <div className="mt-1">
          <div className="px-4 py-1 hover:bg-[#2a2d2e] cursor-pointer flex items-center gap-2">
            <span className="text-xs">⛳</span>
            <span>Holes (18)</span>
          </div>
          <div className="px-4 py-1 hover:bg-[#2a2d2e] cursor-pointer flex items-center gap-2">
            <span className="text-xs">📊</span>
            <span>Progress: 45%</span>
          </div>
          <div className="px-4 py-1 hover:bg-[#2a2d2e] cursor-pointer flex items-center gap-2">
            <span className="text-xs">🎯</span>
            <span>Handicap: +2.3</span>
          </div>
        </div>
      </div>
    </div>
  );
}

