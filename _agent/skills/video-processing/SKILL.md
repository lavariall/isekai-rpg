---
name: video-processing
description: Workflow for extracting image sequences from .mp4 videos using OpenCV and Python.
---

# Video Processing Skill

This skill documents the workflow for converting video footage into sequential image assets (e.g., for animations).

## Workflow Overview

1.  **Stage Raw Video**: Place `.mp4` files into the `.concept/mp4/` directory.
2.  **Configure extraction**: Update `utilities/process_mp4.py` with:
    -   **Input Path**: Path to the source video.
    -   **Output Directory**: By default, frames are saved in a sub-folder with the same name as the video file (e.g., `.concept/mp4/<filename>/`).
    -   **Frame Interval**: The `frame_interval` parameter (default 10) determines how many frames to skip.
3.  **Execute Utility**: Run the script using `uv`:
    ```powershell
    uv run python utilities\process_mp4.py
    ```
4.  **Verification**: Check the target directory in `public/assets/` for the extracted `.png` sequence.

## Implementation Details

### Frame Skipping
To reduce memory usage and asset count, the utility supports a `frame_interval`.
- `frame_interval=1`: Extract every frame.
- `frame_interval=10`: Extract every 10th frame (standard for high-FPS source material).

### Naming Convention
Extracted frames are saved as `frame_000.png`, `frame_001.png`, etc., regardless of the interval used, ensuring compatible loading sequence in game engines like Phaser.

## Processing Animation Frames
After extraction, use the animation processing utility to remove backgrounds and resize frames for the game engine.

1.  **Stage Extract**: Ensure frames are in `.concept/mp4/<folder_name>/`.
2.  **Execute Utility**: Run `process_animation_frames.py` using `uv`:
    ```powershell
    uv run python utilities\process_animation_frames.py
    ```
3.  **Verification**: Confirm processed frames are in `public/assets/hero/<folder_name>/`.

## Dependencies
Requires `opencv-python`. Ensure it is installed in the project environment:
```powershell
uv pip install opencv-python
```
