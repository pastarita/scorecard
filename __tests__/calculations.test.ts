/**
 * Example test file for calculations module
 * 
 * To run tests, install vitest:
 * npm install -D vitest @testing-library/react @testing-library/jest-dom
 * 
 * Add to package.json scripts:
 * "test": "vitest"
 * "test:ui": "vitest --ui"
 */

import { describe, it, expect } from 'vitest';
import {
  calculateHandicap,
  calculateEfficiency,
  calculateAverageConfidence,
  calculateShotTypeDistribution,
  calculateVarianceCone,
  predictPar,
  suggestShotType,
} from '../lib/calculations';
import type { Hole, ScorecardArchetype } from '../types/scorecard';

describe('Calculations', () => {
  describe('calculateHandicap', () => {
    it('should return 0 for no completed holes', () => {
      const holes: Hole[] = [];
      expect(calculateHandicap(holes)).toBe(0);
    });

    it('should calculate correct handicap for completed holes', () => {
      const holes: Hole[] = [
        {
          number: 1,
          name: 'Test',
          archetype: 'Convergent',
          par: 4,
          actual: 3,
          status: 'complete',
          shots: [],
        },
        {
          number: 2,
          name: 'Test 2',
          archetype: 'Precision',
          par: 3,
          actual: 5,
          status: 'complete',
          shots: [],
        },
      ];
      // (-1 + 2) / 2 = 0.5
      expect(calculateHandicap(holes)).toBe(0.5);
    });

    it('should ignore incomplete holes', () => {
      const holes: Hole[] = [
        {
          number: 1,
          name: 'Complete',
          archetype: 'Convergent',
          par: 4,
          actual: 3,
          status: 'complete',
          shots: [],
        },
        {
          number: 2,
          name: 'Incomplete',
          archetype: 'Precision',
          par: 3,
          actual: 0,
          status: 'not_started',
          shots: [],
        },
      ];
      // Only count hole 1: -1 / 1 = -1
      expect(calculateHandicap(holes)).toBe(-1);
    });
  });

  describe('calculateEfficiency', () => {
    it('should return 0 for no completed holes', () => {
      expect(calculateEfficiency([])).toBe(0);
    });

    it('should calculate 100% for under-par performance', () => {
      const holes: Hole[] = [
        {
          number: 1,
          name: 'Test',
          archetype: 'Convergent',
          par: 4,
          actual: 3,
          status: 'complete',
          shots: [],
        },
      ];
      // (4 / 3) * 100 = 133%, capped at 100%
      expect(calculateEfficiency(holes)).toBe(100);
    });

    it('should calculate correct efficiency for over-par', () => {
      const holes: Hole[] = [
        {
          number: 1,
          name: 'Test',
          archetype: 'Convergent',
          par: 4,
          actual: 5,
          status: 'complete',
          shots: [],
        },
      ];
      // (4 / 5) * 100 = 80%
      expect(calculateEfficiency(holes)).toBe(80);
    });
  });

  describe('calculateAverageConfidence', () => {
    it('should return 0 for holes with no shots', () => {
      const holes: Hole[] = [
        {
          number: 1,
          name: 'Test',
          archetype: 'Convergent',
          par: 4,
          actual: 0,
          status: 'not_started',
          shots: [],
        },
      ];
      expect(calculateAverageConfidence(holes)).toBe(0);
    });

    it('should calculate correct average confidence', () => {
      const holes: Hole[] = [
        {
          number: 1,
          name: 'Test',
          archetype: 'Convergent',
          par: 4,
          actual: 3,
          status: 'complete',
          shots: [
            { number: 1, type: 'driver', confidence: 0.4 },
            { number: 2, type: 'iron', confidence: 0.7 },
            { number: 3, type: 'putter', confidence: 0.95 },
          ],
        },
      ];
      // (0.4 + 0.7 + 0.95) / 3 = 0.683...
      const result = calculateAverageConfidence(holes);
      expect(result).toBeCloseTo(0.683, 3);
    });
  });

  describe('calculateShotTypeDistribution', () => {
    it('should return all zeros for no holes', () => {
      const distribution = calculateShotTypeDistribution([]);
      expect(distribution).toEqual({
        driver: 0,
        iron: 0,
        wedge: 0,
        putter: 0,
        recovery: 0,
      });
    });

    it('should count shot types correctly', () => {
      const holes: Hole[] = [
        {
          number: 1,
          name: 'Test',
          archetype: 'Convergent',
          par: 4,
          actual: 4,
          status: 'complete',
          shots: [
            { number: 1, type: 'driver', confidence: 0.4 },
            { number: 2, type: 'iron', confidence: 0.7 },
            { number: 3, type: 'recovery', confidence: 0.5 },
            { number: 4, type: 'putter', confidence: 0.95 },
          ],
        },
      ];
      expect(calculateShotTypeDistribution(holes)).toEqual({
        driver: 1,
        iron: 1,
        wedge: 0,
        putter: 1,
        recovery: 1,
      });
    });
  });

  describe('calculateVarianceCone', () => {
    it('should return wide cone for low confidence', () => {
      expect(calculateVarianceCone(0)).toBe(40);
    });

    it('should return narrow cone for high confidence', () => {
      expect(calculateVarianceCone(1)).toBe(8);
    });

    it('should scale linearly', () => {
      expect(calculateVarianceCone(0.5)).toBe(24);
    });
  });

  describe('predictPar', () => {
    it('should return correct par for each archetype', () => {
      expect(predictPar('Precision')).toBe(3);
      expect(predictPar('Convergent')).toBe(4);
      expect(predictPar('Explorer')).toBe(5);
      expect(predictPar('Creative')).toBe(6);
    });
  });

  describe('suggestShotType', () => {
    it('should suggest driver for low confidence', () => {
      expect(suggestShotType(0.3)).toBe('driver');
    });

    it('should suggest iron for medium confidence', () => {
      expect(suggestShotType(0.7)).toBe('iron');
    });

    it('should suggest wedge for high confidence', () => {
      expect(suggestShotType(0.9)).toBe('wedge');
    });

    it('should suggest putter for very high confidence', () => {
      expect(suggestShotType(0.99)).toBe('putter');
    });
  });
});

