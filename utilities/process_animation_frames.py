import os
from rembg import remove
from PIL import Image

def process_animation_frames(source_base_dir, target_base_dir, target_size=(256, 256)):
    """
    Iterates through subdirectories in source_base_dir, processes PNG frames,
    and saves them to target_base_dir.
    """
    print(f"Starting animation frame processing...")
    print(f"Source: {source_base_dir}")
    print(f"Target: {target_base_dir}")

    # Iterate through subdirectories in .concept/mp4/
    for folder_name in os.listdir(source_base_dir):
        source_folder = os.path.join(source_base_dir, folder_name)
        
        # Only process directories (frames from movies)
        if not os.path.isdir(source_folder):
            continue
            
        print(f"\nProcessing folder: {folder_name}")
        
        # Target folder is public/assets/hero/<folder_name>
        # (Assuming hero for now based on user request)
        target_folder = os.path.join(target_base_dir, "hero", folder_name)
        if not os.path.exists(target_folder):
            os.makedirs(target_folder, exist_ok=True)
            print(f"Created target directory: {target_folder}")

        # Process each PNG in the source folder
        for filename in os.listdir(source_folder):
            if not filename.endswith(".png"):
                continue
                
            input_path = os.path.join(source_folder, filename)
            output_path = os.path.join(target_folder, filename)
            
            # Skip if already processed (optional, but good for large sets)
            # if os.path.exists(output_path):
            #     continue

            print(f"  Processing {filename}...")
            
            try:
                # 1. Load image
                img = Image.open(input_path)
                
                # 2. Remove background
                output_img = remove(img)
                
                # 3. Resize
                output_img = output_img.resize(target_size, Image.Resampling.LANCZOS)
                
                # 4. Save
                output_img.save(output_path)
            except Exception as e:
                print(f"    Error processing {filename}: {e}")

    print("\nFinished processing all animation frames.")

if __name__ == "__main__":
    # Absolute paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    source_dir = os.path.join(base_dir, ".concept", "mp4")
    target_dir = os.path.join(base_dir, "public", "assets")
    
    process_animation_frames(source_dir, target_dir)
