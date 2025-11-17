"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

/**
 * New Home Lander Tests
 *
 * Route: /new-home-lander-tests
 *
 * Purpose: Test variations of sparse gradient overlays using CSS layers (@layer)
 * to create composable, latent gradient covers that preserve golfer and vortex
 * visibility while maintaining text readability.
 *
 * Approach: Use CSS @layer to define multiple sparse gradient overlays that can
 * be combined without heavy stacking, creating a more elegant composition system.
 */
export default function NewHomeLanderTestsPage() {
  const [activeVariant, setActiveVariant] = useState<string>("variant-1");

  const variants = [
    {
      id: "variant-1",
      name: "Sparse Radial Layers",
      description: "Multiple sparse radial gradients using CSS layers",
    },
    {
      id: "variant-2",
      name: "Asymmetric Sparse Mask",
      description: "Sparse mask with asymmetric falloff preserving edges",
    },
    {
      id: "variant-3",
      name: "Latent Composition",
      description: "Three latent layers: text, golfer, vortex preservation",
    },
    {
      id: "variant-4",
      name: "Minimal Sparse Overlay",
      description: "Single sparse overlay with strategic opacity stops",
    },
    {
      id: "variant-5",
      name: "Multi-Point Radial",
      description: "Multiple radial gradients from different focal points",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1f2a10]">
      {/* Variant Selector */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#c5bfa8] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-[#2d3b16] mb-4 scorecard-title">
            Background Overlay Tests
          </h1>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setActiveVariant(variant.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeVariant === variant.id
                    ? "bg-[#556b2f] text-white"
                    : "bg-[#eae3d3] text-[#2d3b16] hover:bg-[#d4ccb4]"
                }`}
              >
                {variant.name}
              </button>
            ))}
          </div>
          <p className="text-sm text-[#6b7a4a] mt-2">
            {variants.find((v) => v.id === activeVariant)?.description}
          </p>
        </div>
      </div>

      {/* Test Hero Sections */}
      <div className="space-y-8 py-8">
        {/* Variant 1: Sparse Radial Layers */}
        {activeVariant === "variant-1" && (
          <Variant1SparseRadialLayers />
        )}

        {/* Variant 2: Asymmetric Sparse Mask */}
        {activeVariant === "variant-2" && (
          <Variant2AsymmetricSparseMask />
        )}

        {/* Variant 3: Latent Composition */}
        {activeVariant === "variant-3" && (
          <Variant3LatentComposition />
        )}

        {/* Variant 4: Minimal Sparse Overlay */}
        {activeVariant === "variant-4" && (
          <Variant4MinimalSparseOverlay />
        )}

        {/* Variant 5: Multi-Point Radial */}
        {activeVariant === "variant-5" && (
          <Variant5MultiPointRadial />
        )}
      </div>

      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link
          href="/new-home"
          className="inline-flex items-center gap-2 text-[#556b2f] hover:text-[#3d4a21] font-medium"
        >
          ← Back to New Home
        </Link>
      </div>
    </div>
  );
}

/**
 * Variant 1: Sparse Radial Layers
 * Uses CSS @layer to define multiple sparse radial gradients that compose naturally
 */
function Variant1SparseRadialLayers() {
  return (
    <>
      <style>{`
        @layer sparse-overlays {
          .sparse-text-layer {
            background: radial-gradient(
              ellipse 60% 80% at 25% 50%,
              rgba(234, 227, 211, 0.75) 0%,
              rgba(234, 227, 211, 0.45) 30%,
              rgba(234, 227, 211, 0.15) 50%,
              transparent 70%
            );
          }
          .sparse-golfer-layer {
            background: radial-gradient(
              ellipse 40% 60% at 20% 60%,
              transparent 0%,
              transparent 40%,
              rgba(234, 227, 211, 0.2) 60%,
              transparent 80%
            );
          }
          .sparse-vortex-layer {
            background: radial-gradient(
              ellipse 50% 70% at 75% 50%,
              transparent 0%,
              transparent 50%,
              rgba(234, 227, 211, 0.1) 70%,
              transparent 90%
            );
          }
        }
      `}</style>
      <div className="relative overflow-hidden bg-[#eae3d3] min-h-[700px] md:min-h-[800px] lg:min-h-[900px]">

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/composed.png"
          alt="Golfer in mid-swing aiming towards a cosmic vortex"
          fill
          className="object-cover object-left md:object-center lg:object-right"
          priority
        />
        {/* Sparse layered overlays */}
        <div className="absolute inset-0 sparse-text-layer" />
        <div className="absolute inset-0 sparse-golfer-layer" />
        <div className="absolute inset-0 sparse-vortex-layer" />
      </div>

      {/* Content */}
      <HeroContent />
      </div>
    </>
  );
}

/**
 * Variant 2: Asymmetric Sparse Mask
 * Uses CSS mask-image for asymmetric falloff that preserves golfer and vortex
 */
function Variant2AsymmetricSparseMask() {
  return (
    <>
      <style>{`
        .asymmetric-mask {
          background: #eae3d3;
          mask-image: radial-gradient(
            ellipse 70% 90% at 30% 50%,
            black 0%,
            black 20%,
            rgba(0, 0, 0, 0.6) 35%,
            rgba(0, 0, 0, 0.3) 50%,
            transparent 70%
          );
          -webkit-mask-image: radial-gradient(
            ellipse 70% 90% at 30% 50%,
            black 0%,
            black 20%,
            rgba(0, 0, 0, 0.6) 35%,
            rgba(0, 0, 0, 0.3) 50%,
            transparent 70%
          );
        }
      `}</style>
      <div className="relative overflow-hidden bg-[#eae3d3] min-h-[700px] md:min-h-[800px] lg:min-h-[900px]">

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/composed.png"
          alt="Golfer in mid-swing aiming towards a cosmic vortex"
          fill
          className="object-cover object-left md:object-center lg:object-right"
          priority
        />
        {/* Asymmetric mask overlay */}
        <div className="absolute inset-0 asymmetric-mask" />
      </div>

      {/* Content */}
      <HeroContent />
      </div>
    </>
  );
}

/**
 * Variant 3: Latent Composition
 * Three distinct latent layers using CSS @layer for text, golfer, and vortex
 */
function Variant3LatentComposition() {
  return (
    <>
      <style>{`
        @layer latent-text, latent-golfer, latent-vortex;
        
        @layer latent-text {
          .latent-text {
            background: linear-gradient(
              to right,
              rgba(234, 227, 211, 0.65) 0%,
              rgba(234, 227, 211, 0.4) 25%,
              rgba(234, 227, 211, 0.15) 40%,
              transparent 55%
            );
          }
        }
        
        @layer latent-golfer {
          .latent-golfer {
            background: radial-gradient(
              ellipse 35% 50% at 15% 55%,
              transparent 0%,
              transparent 45%,
              rgba(234, 227, 211, 0.25) 65%,
              transparent 85%
            );
          }
        }
        
        @layer latent-vortex {
          .latent-vortex {
            background: radial-gradient(
              ellipse 45% 65% at 80% 50%,
              transparent 0%,
              transparent 60%,
              rgba(234, 227, 211, 0.12) 75%,
              transparent 90%
            );
          }
        }
      `}</style>
      <div className="relative overflow-hidden bg-[#eae3d3] min-h-[700px] md:min-h-[800px] lg:min-h-[900px]">

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/composed.png"
          alt="Golfer in mid-swing aiming towards a cosmic vortex"
          fill
          className="object-cover object-left md:object-center lg:object-right"
          priority
        />
        {/* Latent composition layers */}
        <div className="absolute inset-0 latent-text" />
        <div className="absolute inset-0 latent-golfer" />
        <div className="absolute inset-0 latent-vortex" />
      </div>

      {/* Content */}
      <HeroContent />
      </div>
    </>
  );
}

/**
 * Variant 4: Minimal Sparse Overlay
 * Single sparse overlay with strategic opacity stops
 */
function Variant4MinimalSparseOverlay() {
  return (
    <>
      <style>{`
        .minimal-sparse {
          background: radial-gradient(
            ellipse 65% 85% at 28% 50%,
            rgba(234, 227, 211, 0.7) 0%,
            rgba(234, 227, 211, 0.5) 18%,
            rgba(234, 227, 211, 0.25) 35%,
            rgba(234, 227, 211, 0.1) 50%,
            transparent 70%
          );
        }
      `}</style>
      <div className="relative overflow-hidden bg-[#eae3d3] min-h-[700px] md:min-h-[800px] lg:min-h-[900px]">

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/composed.png"
          alt="Golfer in mid-swing aiming towards a cosmic vortex"
          fill
          className="object-cover object-left md:object-center lg:object-right"
          priority
        />
        {/* Minimal sparse overlay */}
        <div className="absolute inset-0 minimal-sparse" />
      </div>

      {/* Content */}
      <HeroContent />
      </div>
    </>
  );
}

/**
 * Variant 5: Multi-Point Radial
 * Multiple radial gradients from different focal points
 */
function Variant5MultiPointRadial() {
  return (
    <>
      <style>{`
        @layer multi-point {
          .multi-point-1 {
            background: radial-gradient(
              ellipse 50% 70% at 25% 50%,
              rgba(234, 227, 211, 0.6) 0%,
              rgba(234, 227, 211, 0.3) 30%,
              transparent 60%
            );
          }
          .multi-point-2 {
            background: radial-gradient(
              circle 30% at 20% 60%,
              transparent 0%,
              rgba(234, 227, 211, 0.2) 50%,
              transparent 80%
            );
          }
          .multi-point-3 {
            background: radial-gradient(
              ellipse 40% 60% at 75% 45%,
              transparent 0%,
              rgba(234, 227, 211, 0.15) 50%,
              transparent 80%
            );
          }
        }
      `}</style>
      <div className="relative overflow-hidden bg-[#eae3d3] min-h-[700px] md:min-h-[800px] lg:min-h-[900px]">

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/composed.png"
          alt="Golfer in mid-swing aiming towards a cosmic vortex"
          fill
          className="object-cover object-left md:object-center lg:object-right"
          priority
        />
        {/* Multi-point radial overlays */}
        <div className="absolute inset-0 multi-point-1" />
        <div className="absolute inset-0 multi-point-2" />
        <div className="absolute inset-0 multi-point-3" />
      </div>

      {/* Content */}
      <HeroContent />
      </div>
    </>
  );
}

/**
 * Reusable Hero Content Component
 */
function HeroContent() {
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20 lg:py-24 xl:py-28">
      <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-[#6b7a4a] scorecard-font-mono mb-4 drop-shadow-sm">
          Hyperdimensional Vector Space Golf
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold scorecard-title text-[#2d3b16] leading-tight mb-6 drop-shadow-lg">
          An Ontological Framework for
          <br />
          <span className="text-[#556b2f]">AI Development</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-[#4b5b28] scorecard-font-serif mb-8 drop-shadow-md max-w-2xl">
          Where golf practices, mathematical structures, and LLM development converge
          through semantic navigation and meditative strategy.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/base-comms"
            className="inline-flex items-center gap-2 rounded-full bg-[#556b2f] px-6 py-3 text-white text-base font-medium hover:bg-[#3d4a21] transition-colors shadow-lg backdrop-blur-sm bg-opacity-95"
          >
            <span>📡</span>
            <span>Start Your Journey</span>
          </Link>
          <Link
            href="/llm-instructions"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#556b2f] px-6 py-3 text-base font-medium text-[#2d3b16] hover:bg-[#556b2f] hover:text-white transition-colors backdrop-blur-sm bg-white/90 shadow-md"
          >
            <span>📋</span>
            <span>LLM Instructions</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

