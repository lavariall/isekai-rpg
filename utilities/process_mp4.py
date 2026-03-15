import cv2
import os

def extract_frames(video_path, output_folder, frame_interval=10):
    """
    Extracts frames from an MP4 video and saves them as a sequence of PNG files.
    
    Args:
        video_path (str): Path to the source .mp4 video.
        output_folder (str): Directory where extracted frames will be saved.
        frame_interval (int): Only save every n-th frame.
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
    saved_count = 0

    print(f"Starting extraction from: {video_path} (Interval: {frame_interval})")
    
    while True:
        # Read a single frame
        success, frame = cap.read()
        
        if not success:
            break

        # Save frame as PNG if it matches the interval
        if frame_count % frame_interval == 0:
            # Requested naming convention: frame_000.png
            filename = os.path.join(output_folder, f"frame_{saved_count:03d}.png")
            cv2.imwrite(filename, frame)
            saved_count += 1
        
        if frame_count % 20 == 0:
            print(f"Processed {frame_count} source frames, saved {saved_count}...")
            
        frame_count += 1

    cap.release()
    print(f"Finished! {saved_count} frames saved to '{output_folder}'.")

if __name__ == "__main__":
    # Default paths per user request
    input_video = r".concept\mp4\Hero_looks_down_runs_left_1280x720px.mp4"
    output_dir = r"public\assets\hero\Hero_looks_down_runs_left_animation"
    
    extract_frames(input_video, output_dir)
