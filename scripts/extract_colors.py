#!/usr/bin/env python3
"""
Extract color palette from SC_Overview.jpg using PIL/Pillow
Extracts dominant colors and creates a color card mapping for the scorecard design system.
"""

from PIL import Image
import json
from collections import Counter
from typing import Dict, List, Tuple
import sys
import os

def rgb_to_hex(r: int, g: int, b: int) -> str:
    """Convert RGB tuple to hex color string."""
    return f"#{r:02x}{g:02x}{b:02x}".upper()

def get_dominant_colors(image_path: str, num_colors: int = 20) -> List[Tuple[str, int, int, int]]:
    """
    Extract dominant colors from image.
    Returns list of (hex_color, r, g, b, count) tuples sorted by frequency.
    """
    try:
        img = Image.open(image_path)
        # Convert to RGB if necessary
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Get all pixels
        pixels = list(img.getdata())
        
        # Count color frequencies
        color_counts = Counter(pixels)
        
        # Get most common colors
        most_common = color_counts.most_common(num_colors)
        
        # Convert to hex and return
        result = []
        for (r, g, b), count in most_common:
            hex_color = rgb_to_hex(r, g, b)
            result.append((hex_color, r, g, b, count))
        
        return result
    except Exception as e:
        print(f"Error processing image: {e}", file=sys.stderr)
        return []

def extract_color_regions(image_path: str) -> Dict[str, List[Tuple[str, int, int, int]]]:
    """
    Extract colors from specific regions of the scorecard:
    - Background/paper
    - Header/par row
    - Tee color sections (Gold, Blue, White, Red)
    - Text colors
    - Border colors
    - Water hazard colors
    """
    try:
        img = Image.open(image_path)
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        width, height = img.size
        
        # Define regions based on typical scorecard layout
        # These are approximate regions - adjust based on actual image
        regions = {
            'background': (0, 0, width, height),  # Full image average
            'header_par_row': (0, 0, width, height // 10),  # Top ~10%
            'tee_gold': (width // 4, height // 3, width // 2, height // 3 + 50),  # Gold section
            'tee_blue': (width // 4, height // 3 + 60, width // 2, height // 3 + 110),  # Blue section
            'tee_white': (width // 4, height // 3 + 120, width // 2, height // 3 + 170),  # White section
            'tee_red': (width // 4, height // 3 + 180, width // 2, height // 3 + 230),  # Red section
            'water_hazard': None,  # Will search for blue areas
            'border': None,  # Will search for dark lines
            'text_primary': None,  # Will search for dark text
        }
        
        color_regions = {}
        
        for region_name, coords in regions.items():
            if coords is None:
                # Use full image for these
                pixels = list(img.getdata())
            else:
                x1, y1, x2, y2 = coords
                # Extract region
                region = img.crop((x1, y1, x2, y2))
                pixels = list(region.getdata())
            
            # Get dominant colors from region
            color_counts = Counter(pixels)
            most_common = color_counts.most_common(5)
            
            region_colors = []
            for (r, g, b), count in most_common:
                hex_color = rgb_to_hex(r, g, b)
                region_colors.append({
                    'hex': hex_color,
                    'rgb': [r, g, b],
                    'frequency': count
                })
            
            color_regions[region_name] = region_colors
        
        return color_regions
    except Exception as e:
        print(f"Error extracting regions: {e}", file=sys.stderr)
        return {}

def create_color_card(color_data: Dict) -> Dict[str, any]:
    """
    Create a structured color card mapping for the design system.
    Maps colors to their semantic roles in the scorecard.
    """
    # Extract primary colors from regions
    background_colors = color_data.get('background', [])
    header_colors = color_data.get('header_par_row', [])
    gold_colors = color_data.get('tee_gold', [])
    blue_colors = color_data.get('tee_blue', [])
    white_colors = color_data.get('tee_white', [])
    red_colors = color_data.get('tee_red', [])
    
    # Map colors to semantic roles
    color_card = {
        'metadata': {
            'source': 'SC_Overview.jpg',
            'extraction_method': 'PIL/Pillow dominant color analysis',
            'version': '1.0.0'
        },
        'palette': {
            'background': {
                'primary': background_colors[0]['hex'] if background_colors else '#FFFFFF',
                'secondary': background_colors[1]['hex'] if len(background_colors) > 1 else '#FAFAFA',
                'all': [c['hex'] for c in background_colors[:3]]
            },
            'header': {
                'primary': header_colors[0]['hex'] if header_colors else '#C8E0C8',
                'secondary': header_colors[1]['hex'] if len(header_colors) > 1 else '#D4E8D4',
                'all': [c['hex'] for c in header_colors[:3]]
            },
            'tee_colors': {
                'gold': {
                    'primary': gold_colors[0]['hex'] if gold_colors else '#FFD700',
                    'all': [c['hex'] for c in gold_colors[:3]]
                },
                'blue': {
                    'primary': blue_colors[0]['hex'] if blue_colors else '#87CEEB',
                    'all': [c['hex'] for c in blue_colors[:3]]
                },
                'white': {
                    'primary': white_colors[0]['hex'] if white_colors else '#FFFFFF',
                    'all': [c['hex'] for c in white_colors[:3]]
                },
                'red': {
                    'primary': red_colors[0]['hex'] if red_colors else '#FF6B6B',
                    'all': [c['hex'] for c in red_colors[:3]]
                }
            },
            'text': {
                'primary': '#000000',  # Will be updated from analysis
                'secondary': '#333333',
                'muted': '#666666'
            },
            'border': {
                'primary': '#8B956D',
                'secondary': '#D4D4C4'
            },
            'water_hazard': {
                'primary': '#87CEEB',
                'secondary': '#5F9EA0'
            },
            'terrain': {
                'fairway': '#6B9D5B',
                'green': '#4A7C2C',
                'rough': '#8B956D',
                'tee': '#F0F8F0'
            }
        },
        'raw_colors': color_data
    }
    
    return color_card

def main():
    """Main execution function."""
    # Get image path
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.dirname(os.path.dirname(script_dir))
    image_path = os.path.join(repo_root, 'inspiration_refs', 'SC_Overview.jpg')
    
    if not os.path.exists(image_path):
        print(f"Error: Image not found at {image_path}", file=sys.stderr)
        sys.exit(1)
    
    print(f"Extracting colors from: {image_path}")
    
    # Extract dominant colors
    dominant_colors = get_dominant_colors(image_path, num_colors=30)
    print(f"\nFound {len(dominant_colors)} dominant colors")
    
    # Extract color regions
    color_regions = extract_color_regions(image_path)
    print(f"\nExtracted colors from {len(color_regions)} regions")
    
    # Create color card
    color_card = create_color_card(color_regions)
    
    # Add dominant colors to card
    color_card['dominant_colors'] = [
        {'hex': hex_color, 'rgb': [r, g, b], 'frequency': count}
        for hex_color, r, g, b, count in dominant_colors
    ]
    
    # Output JSON
    output_path = os.path.join(script_dir, '..', 'lib', 'sc-overview-colors.json')
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, 'w') as f:
        json.dump(color_card, f, indent=2)
    
    print(f"\nColor card saved to: {output_path}")
    
    # Print summary
    print("\n=== Color Palette Summary ===")
    print(f"Background: {color_card['palette']['background']['primary']}")
    print(f"Header: {color_card['palette']['header']['primary']}")
    print(f"Gold Tee: {color_card['palette']['tee_colors']['gold']['primary']}")
    print(f"Blue Tee: {color_card['palette']['tee_colors']['blue']['primary']}")
    print(f"White Tee: {color_card['palette']['tee_colors']['white']['primary']}")
    print(f"Red Tee: {color_card['palette']['tee_colors']['red']['primary']}")

if __name__ == '__main__':
    main()




