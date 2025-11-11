"use client";

import { AudienceLevel } from "@/lib/base-comms/audience-content";

interface AudienceLevelPresentationProps {
  level: AudienceLevel;
}

export function AudienceLevelPresentation({
  level,
}: AudienceLevelPresentationProps) {
  return (
    <div className="bg-white border-2 border-[#8b956d] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="scorecard-header p-6">
        <div className="flex items-start gap-4">
          <div className="text-5xl">{level.icon}</div>
          <div className="flex-1">
            <h2 className="scorecard-title text-3xl mb-2">{level.name}</h2>
            <p className="text-lg text-[#3d4a21] scorecard-font-serif">
              {level.subtitle}
            </p>
            <p className="text-sm text-[#6b7a4a] mt-1 scorecard-font-mono">
              {level.contextLabel}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Overview */}
        <section>
          <h3 className="scorecard-font-serif font-semibold text-xl text-[#3d4a21] mb-3 border-b border-[#8b956d] pb-2">
            Overview
          </h3>
          <p className="text-[#556b2f] leading-relaxed">{level.overview}</p>
        </section>

        {/* Core Concepts */}
        <section>
          <h3 className="scorecard-font-serif font-semibold text-xl text-[#3d4a21] mb-3 border-b border-[#8b956d] pb-2">
            Core Concepts
          </h3>
          <div className="space-y-4">
            {level.concepts.map((concept, index) => (
              <div
                key={index}
                className="bg-[#faf8f3] border border-[#8b956d] rounded-lg p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{concept.icon}</div>
                  <div className="flex-1">
                    <h4 className="scorecard-font-serif font-semibold text-[#3d4a21] mb-2">
                      {concept.title}
                    </h4>
                    <p className="text-sm text-[#556b2f] mb-2">
                      {concept.description}
                    </p>
                    {concept.example && (
                      <div className="mt-2 p-3 bg-white border-l-4 border-[#556b2f] rounded">
                        <p className="text-xs scorecard-font-mono text-[#6b7a4a]">
                          <strong>Example:</strong> {concept.example}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Metaphors */}
        {level.metaphors && level.metaphors.length > 0 && (
          <section>
            <h3 className="scorecard-font-serif font-semibold text-xl text-[#3d4a21] mb-3 border-b border-[#8b956d] pb-2">
              Key Metaphors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {level.metaphors.map((metaphor, index) => (
                <div
                  key={index}
                  className="bg-[#d4e8d4] border border-[#556b2f] rounded-lg p-4"
                >
                  <div className="font-semibold text-[#3d4a21] mb-1 scorecard-font-serif">
                    {metaphor.from} → {metaphor.to}
                  </div>
                  <p className="text-sm text-[#556b2f]">{metaphor.explanation}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Practical Applications */}
        <section>
          <h3 className="scorecard-font-serif font-semibold text-xl text-[#3d4a21] mb-3 border-b border-[#8b956d] pb-2">
            Practical Applications
          </h3>
          <div className="space-y-3">
            {level.applications.map((app, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-[#faf8f3] rounded-lg"
              >
                <div className="text-xl flex-shrink-0">✓</div>
                <div>
                  <div className="font-semibold text-[#3d4a21] mb-1">
                    {app.title}
                  </div>
                  <p className="text-sm text-[#556b2f]">{app.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Details (for Advanced/Expert) */}
        {level.technicalDetails && level.technicalDetails.length > 0 && (
          <section>
            <h3 className="scorecard-font-serif font-semibold text-xl text-[#3d4a21] mb-3 border-b border-[#8b956d] pb-2">
              Technical Details
            </h3>
            <div className="space-y-3">
              {level.technicalDetails.map((detail, index) => (
                <div
                  key={index}
                  className="bg-[#f5f0e8] border border-[#8b956d] rounded-lg p-4"
                >
                  <h4 className="scorecard-font-mono font-semibold text-[#3d4a21] mb-2 text-sm">
                    {detail.title}
                  </h4>
                  <p className="text-sm text-[#556b2f] mb-2">
                    {detail.description}
                  </p>
                  {detail.formula && (
                    <div className="mt-2 p-3 bg-white border border-[#8b956d] rounded font-mono text-xs text-[#3d4a21]">
                      {detail.formula}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Takeaways */}
        <section className="bg-[#c8e0c8] border-2 border-[#556b2f] rounded-lg p-5">
          <h3 className="scorecard-font-serif font-semibold text-xl text-[#3d4a21] mb-3 flex items-center gap-2">
            <span>🎯</span>
            <span>Key Takeaways</span>
          </h3>
          <ul className="space-y-2">
            {level.keyTakeaways.map((takeaway, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-[#3d4a21]"
              >
                <span className="text-[#556b2f] font-bold">•</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Next Steps */}
        <section className="border-t-2 border-[#8b956d] pt-6">
          <h3 className="scorecard-font-serif font-semibold text-lg text-[#3d4a21] mb-3">
            Where to Go Next
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            {level.nextSteps.map((step, index) => (
              <div
                key={index}
                className="p-3 bg-[#faf8f3] border border-[#8b956d] rounded hover:bg-[#f5f0e8] transition-colors"
              >
                <div className="font-semibold text-[#556b2f] mb-1">
                  {step.action}
                </div>
                <p className="text-xs text-[#6b7a4a]">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
