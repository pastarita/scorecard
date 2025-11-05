# Favicon Implementation

This document explains how the favicon is implemented in the Hyperdimensional Vector Space Golf Scorecard application.

## Files

1. **`app/icon.svg`** - Primary icon file (Next.js 16 App Router convention)
   - Next.js automatically uses this file to generate various icon formats
   - It will create favicon.ico, apple-icon.png, etc. automatically at build time
   - This is the recommended approach for Next.js 16+

2. **`public/favicon.svg`** - Fallback/legacy favicon
   - Available at `/favicon.svg` for direct browser access
   - Uses unique gradient IDs to avoid conflicts with app/icon.svg

3. **`app/favicon.ico`** - Traditional favicon (existing file)
   - Legacy support for browsers that require .ico format
   - Can coexist with icon.svg

## How It Works

### Next.js 16 App Router

Next.js 16 App Router automatically handles `app/icon.svg`:
- During development, it serves the SVG directly
- During build, it generates multiple formats:
  - `favicon.ico` (16x16, 32x32)
  - `apple-icon.png` (180x180)
  - `icon.png` (various sizes)

### Design

The favicon features:
- **Green gradient background** - Represents the golf course
- **White golf ball** - The core metaphor
- **Dimples** - Golf ball details
- **Vector space grid lines** - Subtle reference to ℝⁿ

## Verification

To verify the favicon is working:

1. **Development**: Start the dev server and check the browser tab
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` and check the browser tab icon

2. **Production**: Build and check the generated files
   ```bash
   npm run build
   ```
   Check `.next/` directory for generated icon files

3. **Browser DevTools**: 
   - Open DevTools → Network tab
   - Reload page
   - Look for `favicon.ico` or `icon.svg` requests
   - Check the `<head>` section for `<link rel="icon">` tags

## Troubleshooting

If the favicon doesn't appear:

1. **Clear browser cache** - Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
2. **Restart dev server** - Next.js may need to regenerate icons
3. **Check file exists** - Verify `app/icon.svg` is present
4. **Check file format** - Ensure it's valid SVG
5. **Check browser console** - Look for 404 errors for icon files

## Notes

- The `app/icon.svg` takes precedence over `app/favicon.ico`
- Both files use unique gradient IDs to avoid conflicts if both are loaded
- The metadata in `app/layout.tsx` doesn't need explicit icon configuration when using `app/icon.svg`


