"""
KAALREKHA - Face Detector Microservice API (Flask / FastAPI compatible)
Can be run to verify face presence from Base64 images submitted by web forms.

Usage:
    pip install flask flask-cors opencv-python numpy
    python face_detector_service.py
"""

import base64
import io
import os
import sys

try:
    from flask import Flask, request, jsonify
    from flask_cors import CORS
    import cv2
    import numpy as np
    from PIL import Image
except ImportError:
    print("[NOTE] Install dependencies: pip install flask flask-cors opencv-python numpy pillow")

app = Flask(__name__)
try:
    CORS(app)
except Exception:
    pass

face_cascade = None

def init_cascade():
    global face_cascade
    if face_cascade is None:
        cascade_path = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
        face_cascade = cv2.CascadeClassifier(cascade_path)

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "service": "KAALREKHA Face Detector API"})

@app.route("/api/verify-face", methods=["POST"])
def verify_face():
    init_cascade()
    data = request.get_json(force=True, silent=True)
    if not data or "image" not in data:
        return jsonify({"error": "No image base64 provided in request body"}), 400

    img_data = data["image"]
    if "," in img_data:
        img_data = img_data.split(",", 1)[1]

    try:
        decoded = base64.b64decode(img_data)
        np_arr = np.frombuffer(decoded, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if img is None:
            return jsonify({"error": "Failed to decode image"}), 400

        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(60, 60),
        )

        face_count = len(faces)
        face_list = []
        for (x, y, w, h) in faces:
            face_list.append({"x": int(x), "y": int(y), "width": int(w), "height": int(h)})

        return jsonify({
            "face_detected": face_count > 0,
            "face_count": face_count,
            "faces": face_list,
            "message": "Face verified successfully" if face_count > 0 else "No face detected in photo",
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    init_cascade()
    print("\n[KAALREKHA] Starting Face Verification Server on http://localhost:5000 ...")
    app.run(host="0.0.0.0", port=5000, debug=True)
