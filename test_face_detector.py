"""
KAALREKHA - Face Detection Verification Test Script
Uses OpenCV Haar Cascade Classifier to detect human faces in real-time from webcam or static image files.

Requirements:
    pip install opencv-python numpy

Usage:
    # 1. Test live webcam face detection:
    python test_face_detector.py --mode webcam

    # 2. Test static image face detection:
    python test_face_detector.py --mode image --path sample_photo.jpg
"""

import sys
import argparse
import os

try:
    import cv2
    import numpy as np
except ImportError:
    print("[ERROR] OpenCV not found. Please install via: pip install opencv-python numpy")
    sys.exit(1)


def load_cascade():
    """Loads the pre-trained Haar Cascade Face Classifier from OpenCV."""
    cascade_path = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
    if not os.path.exists(cascade_path):
        print(f"[ERROR] Cascade file not found at: {cascade_path}")
        sys.exit(1)

    face_cascade = cv2.CascadeClassifier(cascade_path)
    return face_cascade


def detect_face_in_image(image_path: str):
    """Detects faces in an image file and displays/saves the annotated output."""
    if not os.path.exists(image_path):
        print(f"[ERROR] File does not exist: {image_path}")
        return False

    face_cascade = load_cascade()
    img = cv2.imread(image_path)
    if img is None:
        print(f"[ERROR] Could not read image: {image_path}")
        return False

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(60, 60),
        flags=cv2.CASCADE_SCALE_IMAGE,
    )

    print(f"\n==========================================")
    print(f" KAALREKHA FACE DETECTION TEST RESULT")
    print(f" Image: {image_path}")
    print(f" Faces Detected: {len(faces)}")
    print(f"==========================================")

    if len(faces) == 0:
        print("[RESULT] ❌ NO FACE DETECTED! Photo verification failed.")
        return False

    for idx, (x, y, w, h) in enumerate(faces):
        print(f" -> Face #{idx + 1}: x={x}, y={y}, width={w}, height={h}")
        # Draw bounding box
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 128), 3)
        cv2.putText(
            img,
            f"Verified Face #{idx + 1}",
            (x, max(20, y - 10)),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 128),
            2,
        )

    output_path = "face_detection_result.jpg"
    cv2.imwrite(output_path, img)
    print(f"[SUCCESS] ✅ Annotated result saved to: {output_path}")
    return True


def run_webcam_detection():
    """Starts live webcam feed and performs real-time face detection with visual feedback."""
    face_cascade = load_cascade()
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("[ERROR] Could not open webcam device 0.")
        return

    print("\n[INFO] Starting live webcam face detection...")
    print("[INFO] Press 'q' or 'ESC' to quit.")

    while True:
        ret, frame = cap.read()
        if not ret:
            print("[WARN] Failed to grab webcam frame.")
            break

        # Flip horizontally for natural mirror feel
        frame = cv2.flip(frame, 1)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.2,
            minNeighbors=5,
            minSize=(80, 80),
        )

        h, w, _ = frame.shape
        status_color = (0, 255, 100) if len(faces) > 0 else (0, 0, 255)
        status_text = f"FACE DETECTED ({len(faces)})" if len(faces) > 0 else "NO FACE DETECTED"

        # Draw header banner
        cv2.rectangle(frame, (0, 0), (w, 45), (30, 30, 30), -1)
        cv2.putText(
            frame,
            f"KAALREKHA LIVE VERIFICATION: {status_text}",
            (20, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.75,
            status_color,
            2,
        )

        # Draw bounding boxes on detected faces
        for (x, y, fw, fh) in faces:
            cv2.rectangle(frame, (x, y), (x + fw, y + fh), (0, 255, 100), 2)
            cv2.putText(
                frame,
                "Verified Scholar",
                (x, max(25, y - 8)),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.6,
                (0, 255, 100),
                2,
            )

        cv2.imshow("KAALREKHA - Real-Time Face Detection", frame)

        key = cv2.waitKey(1) & 0xFF
        if key == ord("q") or key == 27:
            break

    cap.release()
    cv2.destroyAllWindows()
    print("[INFO] Camera stream ended.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="KAALREKHA Face Detection Verification Script")
    parser.add_argument(
        "--mode",
        choices=["webcam", "image"],
        default="webcam",
        help="Mode of operation: 'webcam' for live camera or 'image' for file verification",
    )
    parser.add_argument("--path", type=str, help="Path to image file (required if --mode image)")

    args = parser.parse_args()

    if args.mode == "image":
        if not args.path:
            print("[ERROR] Please specify image path using --path <filename>")
            sys.exit(1)
        detect_face_in_image(args.path)
    else:
        run_webcam_detection()
