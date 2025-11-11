#!/usr/bin/env python3
"""
Segment the shot selection reference image to extract motif geometry and colors.

This script uses a lightweight k-means clustering over the LAB color space to
identify background, accent chord, and text clusters for each club card. It
outputs a JSON manifest that the React prototype consumes to rebuild the UI
from image-derived parameters.
"""

from __future__ import annotations

import json
from dataclasses import dataclass, asdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List, Tuple

import numpy as np
from PIL import Image
from skimage.color import rgb2lab

WORKSPACE_ROOT = Path(__file__).resolve().parents[1]
REFERENCE_IMAGE = WORKSPACE_ROOT.parent / "scorecard_dev_screenshots" / "club-selection.png"
OUTPUT_PATH = WORKSPACE_ROOT / "lib" / "shotSelectionManifest.json"


@dataclass
class Bounds:
  x0: int
  y0: int
  x1: int
  y1: int


@dataclass
class AccentGeometry:
  center_x: float
  center_y: float
  radius: float
  start_angle_deg: float
  end_angle_deg: float
  stroke_width: float


@dataclass
class ClubSegment:
  id: str
  name: str
  bounds: Bounds
  background_color: str
  accent_color: str
  text_color: str
  accent: AccentGeometry


def to_hex(color: np.ndarray) -> str:
  clipped = np.clip(color, 0, 255).astype(int)
  return "#" + "".join(f"{value:02x}" for value in clipped)


def simple_kmeans(data: np.ndarray, k: int = 4, iterations: int = 20) -> Tuple[np.ndarray, np.ndarray]:
  rng = np.random.default_rng(42)
  initial_idx = rng.choice(len(data), k, replace=False)
  centroids = data[initial_idx]

  for _ in range(iterations):
    distances = np.linalg.norm(data[:, None, :] - centroids[None, :, :], axis=2)
    labels = np.argmin(distances, axis=1)

    new_centroids: List[np.ndarray] = []
    for idx in range(k):
      members = data[labels == idx]
      if len(members) == 0:
        new_centroids.append(centroids[idx])
      else:
        new_centroids.append(members.mean(axis=0))
    centroids = np.stack(new_centroids, axis=0)
  return centroids, labels


def fit_circle(xs: np.ndarray, ys: np.ndarray) -> Tuple[float, float, float]:
  A = np.column_stack((2 * xs, 2 * ys, np.ones_like(xs)))
  b = xs**2 + ys**2
  solution, *_ = np.linalg.lstsq(A, b, rcond=None)
  cx, cy, c = solution
  radius_sq = max(cx**2 + cy**2 + c, 0.0)
  return float(cx), float(cy), float(np.sqrt(radius_sq))


def compute_arc_angles(xs: np.ndarray, ys: np.ndarray, cx: float, cy: float) -> Tuple[float, float]:
  theta = np.arctan2(ys - cy, xs - cx)
  theta_sorted = np.sort(theta)
  wrapped = np.concatenate([theta_sorted, theta_sorted[:1] + 2 * np.pi])
  gaps = np.diff(wrapped)
  largest_gap_idx = np.argmax(gaps)
  start_angle = theta_sorted[(largest_gap_idx + 1) % len(theta_sorted)]
  sweep = 2 * np.pi - gaps[largest_gap_idx]
  return float(np.degrees(start_angle)), float(np.degrees(start_angle + sweep))


def extract_club_segments() -> Dict[str, ClubSegment]:
  if not REFERENCE_IMAGE.exists():
    raise FileNotFoundError(f"Reference image missing: {REFERENCE_IMAGE}")

  rgb_image = np.array(Image.open(REFERENCE_IMAGE).convert("RGB"))
  cards: Dict[str, Tuple[str, Bounds]] = {
    "driver": (
      "Driver",
      Bounds(x0=320, y0=160, x1=660, y1=390),
    ),
    "iron": (
      "4 Iron",
      Bounds(x0=660, y0=160, x1=1000, y1=390),
    ),
    "wedge": (
      "Sand Wedge",
      Bounds(x0=320, y0=440, x1=660, y1=770),
    ),
    "putter": (
      "Putter",
      Bounds(x0=660, y0=440, x1=1000, y1=770),
    ),
  }

  manifest: Dict[str, ClubSegment] = {}

  for club_id, (name, bounds) in cards.items():
    patch = rgb_image[bounds.y0 : bounds.y1, bounds.x0 : bounds.x1]
    height, width = patch.shape[:2]

    lab_pixels = rgb2lab(patch.reshape(-1, 3))
    centers, labels = simple_kmeans(lab_pixels, k=4, iterations=30)

    clusters: List[Dict] = []
    for center_idx in range(4):
      indices = np.where(labels == center_idx)[0]
      if len(indices) == 0:
        continue

      coords = np.column_stack(np.unravel_index(indices, (height, width)))  # (y, x)
      cluster_rgb = patch.reshape(-1, 3)[indices]
      cluster_lab = lab_pixels[indices]
      mean_lab = cluster_lab.mean(axis=0)
      chroma = float(np.linalg.norm(mean_lab[1:]))

      clusters.append(
        {
          "id": center_idx,
          "count": int(len(indices)),
          "mean_rgb": cluster_rgb.mean(axis=0),
          "mean_lab": mean_lab,
          "chroma": chroma,
          "coords": coords,
        }
      )

    if len(clusters) < 3:
      raise RuntimeError(f"Unexpected segmentation result for {club_id}, found {len(clusters)} clusters")

    background_cluster = max(clusters, key=lambda c: c["mean_lab"][0])
    accent_candidates = [cluster for cluster in clusters if cluster["id"] != background_cluster["id"]]
    accent_cluster = max(accent_candidates, key=lambda c: c["chroma"])
    text_cluster = min(clusters, key=lambda c: c["mean_lab"][0])

    coords = accent_cluster["coords"].astype(float)
    ys = coords[:, 0] + bounds.y0
    xs = coords[:, 1] + bounds.x0

    cx, cy, radius = fit_circle(xs, ys)
    start_deg, end_deg = compute_arc_angles(xs, ys, cx, cy)
    radii = np.sqrt((xs - cx) ** 2 + (ys - cy) ** 2)
    stroke_width = float(np.clip(radii.std() * 2.5, 6, 26))

    manifest[club_id] = ClubSegment(
      id=club_id,
      name=name,
      bounds=bounds,
      background_color=to_hex(background_cluster["mean_rgb"]),
      accent_color=to_hex(accent_cluster["mean_rgb"]),
      text_color=to_hex(text_cluster["mean_rgb"]),
      accent=AccentGeometry(
        center_x=cx,
        center_y=cy,
        radius=radius,
        start_angle_deg=start_deg,
        end_angle_deg=end_deg,
        stroke_width=stroke_width,
      ),
    )

  return manifest


def write_manifest(clubs: Dict[str, ClubSegment]) -> None:
  try:
    relative_source = REFERENCE_IMAGE.relative_to(WORKSPACE_ROOT)
  except ValueError:
    relative_source = REFERENCE_IMAGE.relative_to(WORKSPACE_ROOT.parent)

  payload = {
    "generatedAt": datetime.now(timezone.utc).isoformat(),
    "sourceImage": str(relative_source),
    "clubs": [asdict(segment) for segment in clubs.values()],
  }
  OUTPUT_PATH.write_text(json.dumps(payload, indent=2))
  print(f"Wrote manifest to {OUTPUT_PATH}")


def main() -> None:
  clubs = extract_club_segments()
  write_manifest(clubs)


if __name__ == "__main__":
  main()


