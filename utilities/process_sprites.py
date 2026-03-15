import os
from rembg import remove
from PIL import Image

# Define target sizes for various entities
# Hero layers
target_sizes = {
    "Hero_00_Boots.png": (64, 64),
    "Hero_01_Waist.png": (64, 64),
    "Hero_02_Lower_Body.png": (64, 64),
    "Hero_03_Upper_Body.png": (64, 64),
    "Hero_04_Neck.png": (64, 64),
    "Hero_05_Lower_Head.png": (112, 112),
    "Hero_05_Upper_Head.png": (112, 112),
    "Sword.png": (64, 64),
    "Slime_00.png": (48, 48), # Slime base layer
}

def process_sprites(input_folder, base_output_folder):
    print(f"Starting sprite processing from {input_folder}")

    for filename in os.listdir(input_folder):
        if filename.endswith(".png") or filename.endswith(".jpg"):
            if "concept_art" in filename:
                continue
                
            # Determine subfolder based on prefix
            subfolder = "other"
            if filename.startswith("Hero"):
                subfolder = os.path.join("entities", "hero")
            elif filename.startswith("Slime"):
                subfolder = os.path.join("entities", "slime")
            elif filename == "Sword.png":
                subfolder = os.path.join("entities", "hero")
                
            output_folder = os.path.join(base_output_folder, subfolder)
            if not os.path.exists(output_folder):
                os.makedirs(output_folder, exist_ok=True)
                
            print(f"Processing: {filename} -> {output_folder}...")
            
            # 1. Load image
            input_path = os.path.join(input_folder, filename)
            try:
                img = Image.open(input_path)
                
                # 2. Remove background
                print(f"  Removing background for {filename}...")
                output_img = remove(img)

                # 3. Resize to target size (default to 64x64 if not specified)
                size = target_sizes.get(filename, (64, 64))
                print(f"  Resizing to {size}...")
                output_img = output_img.resize(size, Image.Resampling.LANCZOS)

                # 4. Save
                save_path = os.path.join(output_folder, filename.replace(".jpg", ".png"))
                output_img.save(save_path)
                print(f"  Saved to: {save_path}")
            except Exception as e:
                print(f"  Error processing {filename}: {e}")

if __name__ == "__main__":
    # Adjust paths relative to project root
    input_dir = os.path.abspath(".concept")
    output_base_dir = os.path.abspath("public/assets")
    
    process_sprites(input_dir, output_base_dir)
