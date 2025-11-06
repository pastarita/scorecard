"use client";

import { useState } from "react";
import type { ScorecardData } from "@/types/scorecard";
import { calculateTotals } from "@/types/scorecard";

interface TurnContemplationModalProps {
  data: ScorecardData;
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function TurnContemplationModal({
  data,
  isOpen,
  onClose,
  onComplete,
}: TurnContemplationModalProps) {
  const [acceptanceCriteria, setAcceptanceCriteria] = useState<string[]>([]);
  const [newCriterion, setNewCriterion] = useState("");

  const front9 = data.course.holes.slice(0, 9);
  const front9Totals = calculateTotals(front9);
  const completedHoles = front9.filter(h => h.status === "complete").length;

  if (!isOpen) return null;

  const handleAddCriterion = () => {
    if (newCriterion.trim()) {
      setAcceptanceCriteria([...acceptanceCriteria, newCriterion.trim()]);
      setNewCriterion("");
    }
  };

  const handleRemoveCriterion = (index: number) => {
    setAcceptanceCriteria(acceptanceCriteria.filter((_, i) => i !== index));
  };

  const handleComplete = () => {
    // Here you would save the acceptance criteria
    onComplete();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#faf8f3] border-2 border-[#8b956d] rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#c8e0c8] border-b-2 border-[#8b956d] px-6 py-4">
          <h2 className="scorecard-title text-xl font-bold text-[#3d4a21]">
            Toolchain Contemplation Tool
          </h2>
          <p className="text-sm text-[#556b2f] mt-1">
            <span className="font-semibold">Placeholder:</span> Review Front 9 completion and define acceptance criteria for Back 9
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Front 9 Summary */}
          <div className="bg-white border border-[#8b956d] rounded p-4">
            <h3 className="font-semibold text-[#3d4a21] mb-3">Front 9 Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-[#6b7a4a]">Holes Completed:</span>{" "}
                <span className="font-semibold text-[#3d4a21]">
                  {completedHoles}/9
                </span>
              </div>
              <div>
                <span className="text-[#6b7a4a]">Total Shots:</span>{" "}
                <span className="font-semibold text-[#3d4a21]">
                  {front9Totals.actual}
                </span>
              </div>
              <div>
                <span className="text-[#6b7a4a]">Par:</span>{" "}
                <span className="font-semibold text-[#3d4a21]">
                  {front9Totals.par}
                </span>
              </div>
              <div>
                <span className="text-[#6b7a4a]">Variance:</span>{" "}
                <span className={`font-semibold ${
                  front9Totals.variance <= 0 ? "text-[#4a7c2c]" : "text-[#cc5500]"
                }`}>
                  {front9Totals.variance > 0 ? "+" : ""}{front9Totals.variance}
                </span>
              </div>
            </div>
          </div>

          {/* Patterns Emerging */}
          <div className="bg-white border border-[#8b956d] rounded p-4">
            <h3 className="font-semibold text-[#3d4a21] mb-3">Patterns Emerging</h3>
            <ul className="space-y-2 text-sm text-[#556b2f]">
              <li>• Shot distribution analysis</li>
              <li>• Efficiency by archetype</li>
              <li>• Recovery rate: {front9.filter(h => h.shots.some(s => s.type === "recovery")).length} holes</li>
              <li>• Average confidence progression</li>
            </ul>
          </div>

          {/* Acceptance Criteria */}
          <div className="bg-white border border-[#8b956d] rounded p-4">
            <h3 className="font-semibold text-[#3d4a21] mb-3">
              Acceptance Criteria for Back 9
            </h3>
            <p className="text-sm text-[#6b7a4a] mb-3">
              Define what must be true before proceeding to Back 9 implementation
            </p>
            
            {/* Criteria List */}
            <div className="space-y-2 mb-3">
              {acceptanceCriteria.map((criterion, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-[#f0f8f0] border border-[#8b956d] rounded p-2"
                >
                  <span className="flex-1 text-sm text-[#3d4a21]">{criterion}</span>
                  <button
                    onClick={() => handleRemoveCriterion(index)}
                    className="text-[#cc5500] hover:text-[#8b0000] text-sm"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Add Criterion */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newCriterion}
                onChange={(e) => setNewCriterion(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddCriterion()}
                placeholder="Add acceptance criterion..."
                className="flex-1 px-3 py-2 border border-[#8b956d] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#556b2f]"
              />
              <button
                onClick={handleAddCriterion}
                className="px-4 py-2 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-sm font-medium"
              >
                Add
              </button>
            </div>
          </div>

          {/* Strategic Direction */}
          <div className="bg-white border border-[#8b956d] rounded p-4">
            <h3 className="font-semibold text-[#3d4a21] mb-3">Strategic Direction</h3>
            <textarea
              placeholder="Reflect on what you've learned and how it should inform Back 9 development..."
              className="w-full h-24 px-3 py-2 border border-[#8b956d] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#556b2f] resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#c8e0c8] border-t-2 border-[#8b956d] px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#8b956d] rounded text-[#3d4a21] hover:bg-white transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleComplete}
            className="px-4 py-2 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-sm font-medium"
          >
            Complete Turn & Proceed to Back 9
          </button>
        </div>
      </div>
    </div>
  );
}

