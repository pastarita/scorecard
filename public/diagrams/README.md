# SVG Diagrams

This directory contains all SVG diagrams for the Hyperdimensional Vector Space Golf Scorecard application.

## Structure

- Root level: Core diagrams from `files/` directory
- `devolopment-as-golf_dev/files/`: Development-as-golf framework diagrams
- `devolopment-as-golf_dev/shot-visualizations/`: Shot type visualizations

## Files

All 25 SVG diagrams are indexed in `/lib/svg-manifest.json` with descriptions and metadata.

These files are served statically by Next.js from the `public` directory, accessible at `/diagrams/[filename].svg`.

## Adding New Diagrams

1. Add the SVG file to the appropriate subdirectory
2. Update `/lib/svg-manifest.json` with the new diagram entry
3. The path in the manifest should be relative to the public directory (e.g., `/diagrams/new-diagram.svg`)

