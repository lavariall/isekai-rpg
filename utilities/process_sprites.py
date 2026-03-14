import os
from rembg import remove
from PIL import Image

# Define target sizes for hero layers
# Using consistent 64x64 for base layers and 112x112 for head layers for a stylized look
target_sizes = {
    "Hero_00_Boots.png": (64, 64),
    "Hero_01_Waist.png": (64, 64),
    "Hero_02_Lower_Body.png": (64, 64),
    "Hero_03_Upper_Body.png": (64, 64),
    "Hero_04_Neck.png": (64, 64),
    "Hero_05_Lower_Head.png": (112, 112),
    "Hero_05_Upper_Head.png": (112, 112),
}

def process_sprites(input_folder, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder, exist_ok=True)

    print(f"Starting sprite processing from {input_folder} to {output_folder}")

    for filename in os.listdir(input_folder):
        if filename.endswith(".png") or filename.endswith(".jpg"):
            if "concept_art" in filename:
                continue
                
            print(f"Processing: {filename}...")
            
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
    output_dir = os.path.abspath("public/assets/hero")
    
    process_sprites(input_dir, output_dir)
