import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { resolve, normalize } from "path";
import { existsSync } from "fs";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filePath = searchParams.get("path");

  if (!filePath) {
    return NextResponse.json({ error: "Path parameter is required" }, { status: 400 });
  }

  try {
    // Get the repository root (one level up from scorecard)
    // process.cwd() in Next.js is the project root (scorecard directory)
    // The repo root is one level up from scorecard
    const scorecardDir = process.cwd();
    const repoRoot = resolve(scorecardDir, "..");
    
    // Normalize the file path to prevent directory traversal
    // Remove all leading ../ sequences
    const normalizedFilePath = filePath.replace(/^(\.\.(\/|\\|$))+/, "").replace(/\\/g, "/");
    const fullPath = resolve(repoRoot, normalizedFilePath);
    const normalizedRepoRoot = resolve(repoRoot);

    // Security: Ensure the path is within the repo root
    // Use resolve to normalize both paths for comparison
    if (!fullPath.startsWith(normalizedRepoRoot)) {
      return NextResponse.json(
        { 
          error: "Invalid path - path traversal detected",
          debug: {
            requestedPath: filePath,
            normalizedPath: normalizedFilePath,
            fullPath,
            repoRoot: normalizedRepoRoot
          }
        },
        { status: 403 }
      );
    }

    // Check if file exists
    if (!existsSync(fullPath)) {
      return NextResponse.json(
        { 
          error: "File not found",
          debug: {
            requestedPath: filePath,
            normalizedPath: normalizedFilePath,
            fullPath,
            repoRoot: normalizedRepoRoot,
            exists: existsSync(fullPath)
          }
        },
        { status: 404 }
      );
    }

    // Check if it's an SVG file
    if (!fullPath.toLowerCase().endsWith(".svg")) {
      return NextResponse.json({ error: "Only SVG files are allowed" }, { status: 400 });
    }

    // Read the SVG file
    const fileContent = await readFile(fullPath, "utf-8");

    // Return as SVG with proper content type
    return new NextResponse(fileContent, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error serving SVG:", error);
    return NextResponse.json(
      { error: "File not found or could not be read" },
      { status: 404 }
    );
  }
}

