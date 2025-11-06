"use client";

export function TerminalPanel() {
  return (
    <div className="h-full bg-[#1e1e1e] text-[#cccccc] font-mono text-sm overflow-auto">
      {/* Terminal Tab Bar */}
      <div className="flex items-center bg-[#252526] border-b border-[#3e3e42]">
        <div className="px-4 py-2 bg-[#1e1e1e] border-r border-[#3e3e42]">
          <span className="text-xs">Terminal</span>
        </div>
        <div className="px-4 py-2 opacity-60">
          <span className="text-xs">Output</span>
        </div>
        <div className="px-4 py-2 opacity-60">
          <span className="text-xs">Problems</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-[#4ec9b0]">$</span>
          <span className="ml-2">npm run dev</span>
        </div>
        
        <div className="text-[#858585] mb-2">
          <div>✓ Ready in 1.2s</div>
          <div>○ Compiling /prototypes/ide-extension ...</div>
          <div>✓ Compiled /prototypes/ide-extension in 234ms</div>
        </div>

        <div className="mb-2">
          <span className="text-[#4ec9b0]">$</span>
          <span className="ml-2">git status</span>
        </div>
        
        <div className="text-[#858585] mb-2">
          <div>On branch main</div>
          <div>Your branch is up to date with 'origin/main'.</div>
          <div className="text-[#4ec9b0]">Changes not staged for commit:</div>
          <div className="pl-4">
            <div className="text-[#ce9178]">modified:   components/prototypes/IDEPrototype.tsx</div>
            <div className="text-[#ce9178]">modified:   app/prototypes/ide-extension/page.tsx</div>
          </div>
        </div>

        <div className="mt-4">
          <span className="text-[#4ec9b0]">$</span>
          <span className="ml-2 text-[#858585]">_</span>
        </div>
      </div>
    </div>
  );
}

