import os
import argparse
import re
import shutil
from rembg import remove
from PIL import Image

# Default target size if not specified in filename or mapping
DEFAULT_SIZE = (256, 256)

# Manual overrides for specific files if needed
TARGET_SIZES = {
}

def parse_size_from_filename(filename):
    """
    Parses size suffix like _512x512 from filename.
    Returns (width, height) or None.
    """
    match = re.search(r'_(\d+)x(\d+)', filename)
    if match:
        return (int(match.group(1)), int(match.group(2)))
    return None

def get_target_path(input_root, input_file, output_root):
    """
    Determines the output path by mirroring folder structure.
    Removes 'mp4' from path if present.
    """
    relative_path = os.path.relpath(os.path.dirname(input_file), input_root)
    
    # Special handling: remove 'mp4' from the path
    parts = relative_path.split(os.sep)
    filtered_parts = [p for p in parts if p.lower() != 'mp4' and p != '.']
    
    filename = os.path.basename(input_file)
    # Remove size suffix from output filename for clean game usage
    clean_filename = re.sub(r'_(\d+)x(\d+)', '', filename)
    
    return os.path.join(output_root, *filtered_parts, clean_filename)

def process_file(input_path, output_path):
    """
    Removes background, resizes, and saves the image.
    """
    filename = os.path.basename(input_path)
    print(f"Processing: {filename}")
    
    try:
        img = Image.open(input_path)
        
        # 1. Remove background
        print(f"  Removing background...")
        output_img = remove(img)

        # 2. Determine target size
        size = parse_size_from_filename(filename)
        if not size:
            size = TARGET_SIZES.get(filename, DEFAULT_SIZE)
        
        print(f"  Resizing to {size}...")
        output_img = output_img.resize(size, Image.Resampling.LANCZOS)

        # 3. Save
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        output_img.save(output_path)
        print(f"  Saved to: {output_path}")
        return True
    except Exception as e:
        print(f"  Error processing {filename}: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description="Process sprites with background removal and resizing.")
    parser.add_argument("--input", default=".concept", help="Input directory (default: .concept)")
    parser.add_argument("--output", default="public/assets", help="Output directory (default: public/assets)")
    parser.add_argument("--files", nargs="*", help="Specific files to process (relative to input dir)")
    
    args = parser.parse_args()
    
    input_root = os.path.abspath(args.input)
    output_root = os.path.abspath(args.output)
    
    files_to_process = []
    
    if args.files:
        for f in args.files:
            files_to_process.append(os.path.join(input_root, f))
    else:
        for root, _, files in os.walk(input_root):
            for file in files:
                if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                    files_to_process.append(os.path.join(root, file))

    print(f"Found {len(files_to_process)} files to process.")
    
    success_count = 0
    for input_path in files_to_process:
        output_path = get_target_path(input_root, input_path, output_root)
        
        # Skip processing for backgrounds - just copy
        if "backgrounds" in input_path.lower():
            print(f"Copying background: {os.path.basename(input_path)}")
            try:
                os.makedirs(os.path.dirname(output_path), exist_ok=True)
                shutil.copy2(input_path, output_path)
                print(f"  Copied to: {output_path}")
                success_count += 1
            except Exception as e:
                print(f"  Error copying {input_path}: {e}")
        elif process_file(input_path, output_path):
            success_count += 1
            
    print(f"\nProcessing complete: {success_count}/{len(files_to_process)} files succeeded.")

if __name__ == "__main__":
    main()
