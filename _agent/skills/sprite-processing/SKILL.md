---
name: sprite-processing
description: Workflow for processing raw concept art (.png) into transparent, scaled, and organized game assets using rembg and Python.
---

# Sprite Processing Skill

This skill documents the automated workflow for converting raw concept art (often with baked-in backgrounds) into high-quality, game-ready assets.

## Workflow Overview

1.  **Stage Raw Assets**: Place new `.png` files into the `.concept/` directory.
2.  **Configure Processing**: Update `utilities/process_sprites.py` with:
    -   **Target Sizes**: Define the pixel dimensions in the `target_sizes` dictionary.
    -   **Classification**: Ensure the logic correctly assigns a subfolder (e.g., `hero`, `slime`).
3.  **Execute Utility**: Run the script using the established virtual environment:
    ```powershell
    .venv\Scripts\python.exe utilities\process_sprites.py
    ```
4.  **Verification**: Confirm assets are created in `public/assets/<entity>/` with transparent backgrounds.

## Implementation Details

### Target Size Mapping
Always map raw filenames to their desired in-game resolution to ensure visual consistency.
```python
target_sizes = {
    "Hero_00_Boots.png": (64, 64),
    "Slime_00.png": (48, 48),
}
```

### Automatic Background Removal
The utility uses `rembg` with the `u2net` model. This is particularly effective for removing high-contrast backgrounds like the "baked-in checkerboard" found in concept exports.

## Examples

### Hero (Multi-Layer)
- **Input**: 7 high-res PNGs in `.concept/`
- **Output**: 7 transparent 64x64/112x112 PNGs in `public/assets/hero/`
- **Phaser Integration**: Loaded sequentially as `hero_layer_0` to `hero_layer_6`.

### Slime (Single-Layer Placeholder)
- **Input**: `Slime_00.png`
- **Output**: Transparent 48x48 PNG in `public/assets/slime/`
- **Phaser Integration**: Replace procedural Canvas textures with static file loading.
