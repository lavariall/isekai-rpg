import cv2
import os

def extract_frames(video_path, output_folder):
    """
    Extracts frames from an MP4 video and saves them as a sequence of PNG files.
    
    Args:
        video_path (str): Path to the source .mp4 video.
        output_folder (str): Directory where extracted frames will be saved.
    """
    # Create output directory if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
        print(f"Created directory: {output_folder}")

    # Load video
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"Error: Could not open video file {video_path}")
        return

    frame_count = 0

    print(f"Starting extraction from: {video_path}")
    
    while True:
        # Read a single frame
        success, frame = cap.read()
        
        if not success:
            break

        # Save frame as PNG
        # Requested naming convention: frame_000.png
        filename = os.path.join(output_folder, f"frame_{frame_count:03d}.png")
        cv2.imwrite(filename, frame)
        
        if frame_count % 10 == 0:
            print(f"Processed {frame_count} frames...")
            
        frame_count += 1

    cap.release()
    print(f"Finished! {frame_count} frames saved to '{output_folder}'.")

if __name__ == "__main__":
    # Default paths per user request
    input_video = r".concept\mp4\Hero_looks_down_runs_left_1280x720px.mp4"
    output_dir = r"public\assets\hero\Hero_looks_down_runs_left_animation"
    
    extract_frames(input_video, output_dir)
