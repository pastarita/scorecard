/**
 * Perspective Transformation Language
 * 
 * A declarative language for describing perspective transformations on golf course plans.
 * This provides a vocabulary and syntax for referring to different types of perspective
 * operations and their effects.
 * 
 * The language allows developers to describe transformations in terms of:
 * - View types (isometric, trimetric, etc.)
 * - Depth effects (receding, rising, flat)
 * - Orientation (diagonal up-right, vertical, horizontal)
 * - Zone transformations (layered zones with different depths)
 */

import type { PerspectiveConfig } from './perspectiveTransform';
import { createPerspectivePreset, createDepthProgression } from './perspectiveTransform';

/**
 * View orientation descriptors
 */
export type ViewOrientation =
  | 'diagonal-up-right' // Course moves up and to the right (default SVG style)
  | 'diagonal-up-left'
  | 'vertical-up'
  | 'horizontal-right'
  | 'diagonal-down-right'
  | 'diagonal-down-left';

/**
 * Depth effect descriptors
 */
export type DepthEffect =
  | 'receding' // Course appears to go into the distance (Z increases forward)
  | 'rising' // Course appears to rise up (Z increases upward)
  | 'falling' // Course appears to fall away (Z decreases)
  | 'flat' // No depth effect (Z constant)
  | 'undulating'; // Varying depth based on terrain

/**
 * Zone depth configuration
 * Defines how different zones (rough, fairway, approach, green) have different Z values
 */
export interface ZoneDepthConfig {
  rough: number;
  fairway: number;
  approach: number;
  green: number;
}

/**
 * Transformation descriptor
 * High-level description of how to transform a golf course view
 */
export interface TransformationDescriptor {
  // View type
  viewType: 'isometric' | 'trimetric' | 'bird-eye' | 'side-view' | 'custom';
  
  // Orientation
  orientation: ViewOrientation;
  
  // Depth effect
  depthEffect: DepthEffect;
  
  // Zone-specific depths
  zoneDepths?: ZoneDepthConfig;
  
  // Custom configuration (if viewType is 'custom')
  customConfig?: Partial<PerspectiveConfig>;
  
  // Description for documentation
  description?: string;
}

/**
 * Default transformation: matches the SVG diagram style
 */
export const DEFAULT_TRANSFORMATION: TransformationDescriptor = {
  viewType: 'isometric',
  orientation: 'diagonal-up-right',
  depthEffect: 'receding',
  zoneDepths: {
    rough: 0,
    fairway: 20,
    approach: 40,
    green: 60,
  },
  description: 'Standard isometric view with course receding into distance',
};

/**
 * Convert a transformation descriptor to a PerspectiveConfig
 */
export function descriptorToConfig(
  descriptor: TransformationDescriptor
): PerspectiveConfig {
  let config: PerspectiveConfig;
  
  // Start with preset based on viewType
  if (descriptor.viewType === 'custom') {
    // For custom viewType, use isometric as base and merge customConfig if provided
    config = {
      ...createPerspectivePreset('isometric'),
      ...(descriptor.customConfig || {}),
    };
  } else {
    // For other viewTypes, use the preset directly
    config = createPerspectivePreset(descriptor.viewType);
  }
  
  // Adjust for orientation
  config = applyOrientation(config, descriptor.orientation);
  
  return config;
}

/**
 * Apply orientation to a perspective config
 */
function applyOrientation(
  config: PerspectiveConfig,
  orientation: ViewOrientation
): PerspectiveConfig {
  const newConfig = { ...config };
  
  switch (orientation) {
    case 'diagonal-up-right':
      // Default - already set in isometric preset
      newConfig.zAngle = -45;
      break;
    case 'diagonal-up-left':
      newConfig.zAngle = 45;
      break;
    case 'vertical-up':
      newConfig.zAngle = 0;
      newConfig.yAngle = 0;
      break;
    case 'horizontal-right':
      newConfig.xAngle = 0;
      newConfig.zAngle = -90;
      break;
    case 'diagonal-down-right':
      newConfig.zAngle = -135;
      break;
    case 'diagonal-down-left':
      newConfig.zAngle = 135;
      break;
  }
  
  return newConfig;
}

/**
 * Create depth progression function based on depth effect
 */
export function createDepthFunction(
  descriptor: TransformationDescriptor,
  startProgress: number = 0,
  endProgress: number = 1
): (t: number) => number {
  const { depthEffect, zoneDepths } = descriptor;
  
  if (depthEffect === 'flat') {
    return () => 0;
  }
  
  if (depthEffect === 'undulating' && zoneDepths) {
    // Create step function based on zones
    return (t: number) => {
      if (t < 0.2) return zoneDepths.rough;
      if (t < 0.5) return zoneDepths.fairway;
      if (t < 0.8) return zoneDepths.approach;
      return zoneDepths.green;
    };
  }
  
  // Receding: Z increases (course goes into distance)
  // Rising: Z increases (course rises up)
  // Falling: Z decreases (course falls away)
  let startZ = 0;
  let endZ = 100;
  let curve: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' = 'ease-out';
  
  switch (depthEffect) {
    case 'receding':
      startZ = 0;
      endZ = zoneDepths?.green || 100;
      curve = 'ease-out'; // Faster at start, slower at end
      break;
    case 'rising':
      startZ = -50;
      endZ = zoneDepths?.green || 50;
      curve = 'ease-in-out';
      break;
    case 'falling':
      startZ = 100;
      endZ = 0;
      curve = 'ease-in';
      break;
  }
  
  return createDepthProgression(startZ, endZ, curve);
}

/**
 * Transformation language vocabulary
 * Provides named transformations for common use cases
 */
export const TRANSFORMATION_VOCABULARY = {
  /**
   * Standard development perspective (matches SVG)
   */
  standard: (): TransformationDescriptor => ({
    ...DEFAULT_TRANSFORMATION,
    description: 'Standard isometric view with receding depth',
  }),
  
  /**
   * Dogleg hole perspective (curved course with turn)
   */
  dogleg: (): TransformationDescriptor => ({
    viewType: 'trimetric',
    orientation: 'diagonal-up-right',
    depthEffect: 'receding',
    zoneDepths: {
      rough: 0,
      fairway: 15,
      approach: 35,
      green: 55,
    },
    description: 'Trimetric view for dogleg holes with moderate depth',
  }),
  
  /**
   * Bird's eye view
   */
  birdEye: (): TransformationDescriptor => ({
    viewType: 'bird-eye',
    orientation: 'diagonal-up-right',
    depthEffect: 'receding',
    description: 'Bird-eye perspective looking down on the course',
  }),
  
  /**
   * Flat top-down view (no perspective)
   */
  flat: (): TransformationDescriptor => ({
    viewType: 'isometric',
    orientation: 'vertical-up',
    depthEffect: 'flat',
    description: 'Flat top-down view with no perspective transformation',
  }),
  
  /**
   * Dramatic perspective for creative holes
   */
  dramatic: (): TransformationDescriptor => ({
    viewType: 'trimetric',
    orientation: 'diagonal-up-right',
    depthEffect: 'rising',
    zoneDepths: {
      rough: -30,
      fairway: 10,
      approach: 50,
      green: 80,
    },
    description: 'Dramatic perspective with course rising into view',
  }),
} as const;

/**
 * Get transformation by name
 */
export function getTransformation(name: keyof typeof TRANSFORMATION_VOCABULARY): TransformationDescriptor {
  return TRANSFORMATION_VOCABULARY[name]();
}

/**
 * Describe a transformation in human-readable terms
 */
export function describeTransformation(descriptor: TransformationDescriptor): string {
  const parts: string[] = [];
  
  parts.push(`${descriptor.viewType} view`);
  parts.push(`oriented ${descriptor.orientation.replace('-', ' ')}`);
  parts.push(`with ${descriptor.depthEffect} depth effect`);
  
  if (descriptor.zoneDepths) {
    parts.push(
      `(rough: ${descriptor.zoneDepths.rough}, fairway: ${descriptor.zoneDepths.fairway}, approach: ${descriptor.zoneDepths.approach}, green: ${descriptor.zoneDepths.green})`
    );
  }
  
  return parts.join(', ');
}

