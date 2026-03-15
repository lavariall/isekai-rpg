---
name: sprite-processing
description: Workflow for processing raw concept art (.png) into transparent, scaled, and organized game assets using rembg and Python.
---

# Sprite Processing Skill

This skill documents the automated workflow for converting raw concept art (often with baked-in backgrounds) into high-quality, game-ready assets with correct folder mirroring and dynamic sizing.

## Workflow Overview

1.  **Stage Raw Assets**: Place new `.png` files into the `.concept/` directory, mirroring the desired `public/assets/` structure.
2.  **Dynamic Sizing**: If a specific size is needed, suffix the filename with `_WxH` (e.g., `Tree_128x128.png`). Use `House_512x512.png` for larger structures.
3.  **Execute Utility**: Run the script using the established virtual environment:
    ```powershell
    # Process everything in .concept
    .venv\Scripts\python.exe utilities\process_sprites.py
    
    # Process a specific subfolder
    .venv\Scripts\python.exe utilities\process_sprites.py --input .concept\entities --output public\assets\entities
    ```
4.  **Verification**: Confirm assets are created in `public/assets/` mirroring the input structure (with `mp4` removed from paths) and having transparent backgrounds.

## Implementation Details

### Mirroring Logic
The utility automatically mirrors the folder structure from the input directory to the output directory. It specifically removes `mp4` from any path segments to maintain clean game asset paths (e.g., `.concept/mp4/Hero_idle_animation` -> `public/assets/entities/hero/Hero_idle_animation`).

### Dynamic Sizing via Filename
Filenames can include a target size suffix which the utility will parse and apply:
- `Rock_64x64.png` -> Processed to 64x64.
- `Building_512x512.png` -> Processed to 512x512.
- The suffix is **removed** from the output filename (e.g., `Building.png`).

### Automatic Background Removal
The utility uses `rembg` with the `u2net` model to strip backgrounds, including "baked-in checkerboards" often found in concept art exports.

## Examples

### Hero Animations
- **Input**: `.concept/mp4/Hero_idle_animation/frame_000.png`
- **Output**: `public/assets/entities/hero/Hero_idle_animation/frame_000.png` (Transparent)

### World Objects
- **Input**: `.concept/world/winter/Tree_128x128.png`
- **Output**: `public/assets/world/winter/Tree.png` (128x128, Transparent)
