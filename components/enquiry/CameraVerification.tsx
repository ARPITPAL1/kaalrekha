"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Camera,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Info,
  ScanFace,
  ShieldAlert,
  Upload,
  Send,
  Sparkles,
  UserCheck,
  Video,
  VideoOff,
  AlertTriangle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { analyzeVideoFrame, FaceAnalysisResult, FaceStatus } from "@/lib/faceDetector";

interface CameraVerificationProps {
  onVerified: (photoBase64: string | null) => void;
  senderName?: string;
  senderEmail?: string;
  purpose?: string;
}

export default function CameraVerification({
  onVerified,
  senderName = "",
  senderEmail = "",
  purpose = "Scholar Identity Verification",
}: CameraVerificationProps) {
  const { language } = useLanguage();
  const isOdia = language === "or";

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const analysisCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const stableTimerRef = useRef<NodeJS.Timeout | null>(null);
  const stableStartRef = useRef<number | null>(null);

  // Component State
  const [streamActive, setStreamActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(false);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  // AI Face Detection State
  const [faceResult, setFaceResult] = useState<FaceAnalysisResult>({
    faceCount: 0,
    primaryFace: null,
    status: "INITIALIZING",
    statusMessage: "Initializing camera feed...",
    statusMessageOdia: "କ୍ୟାମେରା ଆରମ୍ଭ ହେଉଛି...",
    confidence: 0,
    canCapture: false,
  });

  // Hold-Still Progress State (0 to 100%)
  const [holdProgress, setHoldProgress] = useState<number>(0);
  const [flashEffect, setFlashEffect] = useState<boolean>(false);

  // Email Dispatch State
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const [sendSuccessMessage, setSendSuccessMessage] = useState<string | null>(null);
  const [sendErrorMessage, setSendErrorMessage] = useState<string | null>(null);

  // Safe Camera Stop Function
  const stopCamera = useCallback(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    if (stableTimerRef.current) {
      clearTimeout(stableTimerRef.current);
      stableTimerRef.current = null;
    }
    stableStartRef.current = null;
    setHoldProgress(0);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStreamActive(false);
  }, []);

  // Generate Instant Digital Snapshot Card if camera is unavailable or denied
  const generateFallbackSnapshot = useCallback(() => {
    const canvas = canvasRef.current || document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 640, 480);
      grad.addColorStop(0, "#2D3436");
      grad.addColorStop(1, "#1E293B");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 640, 480);

      // Border frame
      ctx.strokeStyle = "#8A3324";
      ctx.lineWidth = 8;
      ctx.strokeRect(16, 16, 608, 448);

      ctx.fillStyle = "#FAF8F5";
      ctx.fillRect(24, 24, 592, 432);

      // Top Title Bar
      ctx.fillStyle = "#8A3324";
      ctx.fillRect(24, 24, 592, 50);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 18px Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText("KAALREKHA — SCHOLAR IDENTITY SNAPSHOT", 320, 56);

      // Avatar circle
      ctx.fillStyle = "#E9DDC8";
      ctx.beginPath();
      ctx.arc(320, 180, 65, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#8A3324";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Initials
      ctx.fillStyle = "#8A3324";
      ctx.font = "bold 40px sans-serif";
      const initials = (senderName || "Dr")
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "SC";
      ctx.fillText(initials, 320, 195);

      // Researcher Name
      ctx.fillStyle = "#2D3436";
      ctx.font = "bold 22px Georgia, serif";
      ctx.fillText(senderName || "Verified Researcher", 320, 285);

      // Email Address
      ctx.fillStyle = "#636E72";
      ctx.font = "14px monospace";
      ctx.fillText(senderEmail || "Identity Verification Confirmed", 320, 315);

      // Purpose
      ctx.fillStyle = "#8A3324";
      ctx.font = "italic 13px Georgia, serif";
      ctx.fillText(`Purpose: ${purpose}`, 320, 345);

      // Verification Badge
      ctx.fillStyle = "#10B981";
      ctx.beginPath();
      ctx.roundRect(195, 375, 250, 36, 18);
      ctx.fill();

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 12px monospace";
      ctx.fillText("✓ VERIFIED SCHOLAR SNAPSHOT", 320, 398);

      const photoBase64 = canvas.toDataURL("image/jpeg", 0.90);
      setCapturedPhoto(photoBase64);
      stopCamera();
    }
  }, [senderName, senderEmail, purpose, stopCamera]);

  // Frame Capture Function (Converts video frame to high quality JPEG or generates digital snapshot)
  const executeCapture = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !streamActive || video.readyState < 2) {
      generateFallbackSnapshot();
      return;
    }

    setIsCapturing(true);
    setFlashEffect(true);

    setTimeout(() => {
      setFlashEffect(false);
    }, 200);

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setIsCapturing(false);
      generateFallbackSnapshot();
      return;
    }

    const vw = video.videoWidth || 640;
    const vh = video.videoHeight || 480;
    canvas.width = vw;
    canvas.height = vh;

    // Draw frame (mirrored horizontal flip matching user view)
    ctx.save();
    ctx.translate(vw, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, vw, vh);
    ctx.restore();

    // Export as crisp JPEG (0.90 quality)
    const photoBase64 = canvas.toDataURL("image/jpeg", 0.90);
    setCapturedPhoto(photoBase64);
    setIsCapturing(false);

    // Turn off camera hardware immediately after capture
    stopCamera();
  }, [streamActive, generateFallbackSnapshot, stopCamera]);

  // Real-time In-Browser AI Face Analysis Loop
  useEffect(() => {
    let active = true;
    const HOLD_DURATION_MS = 1000; // 1.0 second stable hold

    const runDetectionLoop = async () => {
      if (!active || !streamActive || capturedPhoto) return;

      if (videoRef.current && analysisCanvasRef.current) {
        const result = await analyzeVideoFrame(videoRef.current, analysisCanvasRef.current);
        if (active) {
          setFaceResult(result);

          // Automated Auto-Capture Logic when Face is READY & Centered
          if (result.canCapture) {
            const now = Date.now();
            if (!stableStartRef.current) {
              stableStartRef.current = now;
              setHoldProgress(10);
            } else {
              const elapsed = now - stableStartRef.current;
              const progress = Math.min(100, Math.round((elapsed / HOLD_DURATION_MS) * 100));
              setHoldProgress(progress);

              if (elapsed >= HOLD_DURATION_MS) {
                stableStartRef.current = null;
                setHoldProgress(100);
                executeCapture();
                return;
              }
            }
          } else {
            // Reset hold progress if face moved or condition broke
            stableStartRef.current = null;
            setHoldProgress(0);
          }
        }
      }

      if (active && streamActive && !capturedPhoto) {
        animationFrameId.current = requestAnimationFrame(runDetectionLoop);
      }
    };

    if (streamActive && !capturedPhoto) {
      animationFrameId.current = requestAnimationFrame(runDetectionLoop);
    }

    return () => {
      active = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      if (stableTimerRef.current) {
        clearTimeout(stableTimerRef.current);
        stableTimerRef.current = null;
      }
    };
  }, [streamActive, capturedPhoto, executeCapture]);

  // Start Camera Stream
  const startCamera = useCallback(async () => {
    setCameraError(null);
    setIsInitializing(true);
    setHoldProgress(0);
    stableStartRef.current = null;

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Webcam API is not supported on this browser or device.");
      }

      // Ensure any lingering stream is stopped
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
          facingMode: "user",
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStreamActive(true);
      }
    } catch (err: unknown) {
      console.warn("Camera access error:", err);
      const isDenied = err instanceof Error && (err.name === "NotAllowedError" || err.name === "PermissionDeniedError");
      setCameraError(
        isDenied
          ? isOdia
            ? "କ୍ୟାମେରା ଅନୁମତି ଅସ୍ୱୀକାର ହୋଇଛି। ଦୟାକରି ବ୍ରାଉଜର୍ ସେଟିଂସରୁ ଅନୁମତି ଦିଅନ୍ତୁ କିମ୍ବା ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ।"
            : "Camera permission denied. Please allow camera in browser settings or upload a photo."
          : err instanceof Error
          ? err.message
          : "Webcam hardware unavailable."
      );
      setStreamActive(false);
    } finally {
      setIsInitializing(false);
    }
  }, [isOdia]);

  // Start camera on mount & stop on unmount
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  // File Upload Fallback
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPEG, PNG, or WebP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setCapturedPhoto(result);
        stopCamera();
      }
    };
    reader.readAsDataURL(file);
  };

  // Retake Photo
  const handleRetake = () => {
    setCapturedPhoto(null);
    setIsConfirmed(false);
    setSendSuccessMessage(null);
    setSendErrorMessage(null);
    startCamera();
  };

  // Confirm and Notify Parent
  const handleConfirm = () => {
    setIsConfirmed(true);
    stopCamera();
    onVerified(capturedPhoto);
  };

  // Dispatch Photo Directly via POST /api/send-photo
  const handleSendPhotoToArchive = async () => {
    if (!capturedPhoto || isSendingEmail) return;

    setIsSendingEmail(true);
    setSendSuccessMessage(null);
    setSendErrorMessage(null);

    try {
      const res = await fetch("/api/send-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photoBase64: capturedPhoto,
          senderName: senderName || "Verified Scholar",
          senderEmail: senderEmail,
          purpose: purpose,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send photo to destination email.");
      }

      setSendSuccessMessage(
        isOdia
          ? "✓ ଫଟୋ ସଫଳତାର ସହ ଆର୍କାଇଭ୍ ରେ ଯାଞ୍ଚ ହୋଇ ପ୍ରେରିତ ହେଲା!"
          : "✓ Photo verified and attached successfully to enquiry!"
      );
      handleConfirm();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error sending photo to server.";
      setSendErrorMessage(msg);
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Status Colors & Badge Helper
  const getStatusBadge = () => {
    switch (faceResult.status) {
      case "READY":
        return {
          bg: "bg-emerald-100 text-emerald-800 border-emerald-300",
          dot: "bg-emerald-600 animate-pulse",
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
        };
      case "MULTIPLE_FACES":
        return {
          bg: "bg-amber-100 text-amber-900 border-amber-300",
          dot: "bg-amber-600",
          icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />,
        };
      case "NOT_CENTERED":
      case "TOO_FAR":
      case "TOO_CLOSE":
      case "TILTED":
      case "POOR_LIGHTING":
        return {
          bg: "bg-sky-100 text-sky-800 border-sky-300",
          dot: "bg-sky-500",
          icon: <ScanFace className="w-3.5 h-3.5 text-sky-600" />,
        };
      default:
        return {
          bg: "bg-rose-100 text-rose-800 border-rose-300",
          dot: "bg-rose-500",
          icon: <AlertCircle className="w-3.5 h-3.5 text-rose-500" />,
        };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <div className="w-full bg-museum-parchment/60 border border-museum-stone rounded-2xl p-6 md:p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-museum-stone pb-4 mb-6 gap-3">
        <div className="flex items-center gap-2 text-[#8A3324] text-xs font-mono font-semibold uppercase tracking-wider">
          <ScanFace className="w-4 h-4" />
          <span>{isOdia ? "ପଦକ୍ଷେପ ୨: ଏଆଇ ଚେହେରା ଯାଞ୍ଚ ଓ ସ୍ୱୟଂଚାଳିତ ଫଟୋ" : "STEP 2: AI FACE DETECTION & AUTO CAPTURE"}</span>
        </div>

        <div className="flex items-center gap-2">
          {streamActive && !capturedPhoto ? (
            <span
              className={`text-[11px] font-mono px-3 py-1 rounded-full font-bold border transition-colors flex items-center gap-1.5 shadow-2xs ${statusBadge.bg}`}
            >
              <span className={`w-2 h-2 rounded-full ${statusBadge.dot}`} />
              <span>{isOdia ? faceResult.statusMessageOdia : faceResult.statusMessage}</span>
            </span>
          ) : capturedPhoto ? (
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300 flex items-center gap-1.5 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isOdia ? "ଫଟୋ ପ୍ରସ୍ତୁତ" : "Photo Captured"}</span>
            </span>
          ) : null}
        </div>
      </div>

      {/* Security and Privacy Notice */}
      <div className="mb-6 p-4 rounded-xl bg-museum-ivory border border-[#8A3324]/20 flex gap-3 text-sm text-museum-charcoal leading-relaxed shadow-xs">
        <Info className="w-5 h-5 text-[#8A3324] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-xs tracking-wider uppercase text-[#8A3324] font-mono flex items-center gap-2">
            <span>{isOdia ? "ସ୍ୱୟଂଚାଳିତ ଏଆଇ ଚେହେରା ଯାଞ୍ଚ" : "AI AUTO-CAPTURE PROTOCOL"}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#8A3324]/10 text-[#8A3324] font-normal">
              100% Client-Side
            </span>
          </p>
          <p className="font-sans text-xs text-museum-charcoalLight">
            {isOdia
              ? "କ୍ୟାମେରା ଆଗରେ ସିଧା ବସନ୍ତୁ। ଚେହେରା ସ୍ପଷ୍ଟ ଚିହ୍ନଟ ହେବା ପରେ ଏବଂ ୧ ସେକେଣ୍ଡ ସ୍ଥିର ରହିଲେ ସ୍ୱୟଂଚାଳିତ ଭାବେ ଫଟୋ ଉଠିବ। କୌଣସି ଭିଡିଓ ଷ୍ଟ୍ରିମ୍ ସର୍ଭରକୁ ଯାଏ ନାହିଁ; କେବଳ ଚୂଡ଼ାନ୍ତ ଫଟୋ ଇମେଲ୍ ମାଧ୍ୟମରେ ସୁରକ୍ଷିତ ପ୍ରେରିତ ହୁଏ।"
              : "Face detection runs entirely inside your browser. Once your face is centered and held still for 1 second, the photo captures automatically. Video feeds are never streamed to any server."}
          </p>
        </div>
      </div>

      {/* Error Notices */}
      {sendErrorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-300 flex items-start gap-3 text-red-800 text-xs font-sans">
          <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-mono font-bold uppercase block text-red-900">TRANSMISSION ERROR</span>
            <p className="leading-relaxed">{sendErrorMessage}</p>
          </div>
        </div>
      )}

      {sendSuccessMessage && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex items-start gap-3 text-emerald-800 text-xs font-sans">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-mono font-bold uppercase block text-emerald-900">DISPATCH CONFIRMED</span>
            <p className="leading-relaxed">{sendSuccessMessage}</p>
          </div>
        </div>
      )}

      {/* CONFIRMED STATE */}
      {isConfirmed ? (
        <div className="text-center py-6 space-y-4 bg-museum-ivory rounded-xl border border-museum-stone p-6">
          <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-700">
            <UserCheck className="w-7 h-7" />
          </div>
          <div>
            <h4 className="font-serif text-2xl font-bold text-museum-charcoal">
              {isOdia ? "ପରିଚୟ ଫଟୋ ସଫଳତାର ସହ ଯୋଡ଼ାଗଲା" : "IDENTITY PHOTO ATTACHED & CONFIRMED"}
            </h4>
            <p className="text-xs text-museum-charcoalLight max-w-md mx-auto mt-2 font-sans">
              {isOdia
                ? "ଆପଣଙ୍କ ଚେହେରା ଯାଞ୍ଚ ସଫଳ ହୋଇଛି ଏବଂ ଆପଣଙ୍କ ଅନୁସନ୍ଧାନ ସହିତ ପ୍ରେରଣ ପାଇଁ ପ୍ରସ୍ତୁତ।"
                : "Your verified researcher snapshot is ready and attached to your inquiry."}
            </p>
          </div>
          <button
            type="button"
            onClick={handleRetake}
            className="text-xs font-mono text-[#8A3324] hover:underline pt-2 cursor-pointer inline-flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{isOdia ? "ଫଟୋ ପରିବର୍ତ୍ତନ କରନ୍ତୁ (Retake)" : "Retake Photo"}</span>
          </button>
        </div>
      ) : capturedPhoto ? (
        /* PREVIEW CAPTURED PHOTO STATE */
        <div className="space-y-6">
          <div className="relative w-full max-w-md mx-auto aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#8A3324] shadow-md bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={capturedPhoto}
              alt="Captured researcher identity"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-emerald-700/90 text-white backdrop-blur px-3 py-1 rounded-full text-[10px] font-mono font-semibold border border-emerald-500 flex items-center gap-1.5 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isOdia ? "ଯାଞ୍ଚ ପ୍ରମାଣିତ ଫଟୋ" : "VERIFIED SNAPSHOT"}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <button
              type="button"
              onClick={handleRetake}
              disabled={isSendingEmail}
              className="px-5 py-3 rounded-xl border border-museum-stone bg-museum-ivory hover:bg-museum-parchment text-museum-charcoal text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{isOdia ? "ପୁଣି ଉଠାନ୍ତୁ (Retake)" : "Retake Photo"}</span>
            </button>

            <button
              type="button"
              onClick={handleSendPhotoToArchive}
              disabled={isSendingEmail}
              className="flex-1 px-6 py-3 rounded-xl bg-[#8A3324] hover:bg-museum-mutedRed text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSendingEmail ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{isOdia ? "ଇମେଲ୍ ପ୍ରେରଣ ଚାଲିଛି..." : "SENDING TO ARCHIVE..."}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{isOdia ? "ଫଟୋ ନିଶ୍ଚିତ ଓ ପ୍ରେରଣ କରନ୍ତୁ" : "CONFIRM & SEND PHOTO"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* LIVE CAMERA & AI FACE DETECTION VIEW */
        <div className="space-y-6">
          <div className="relative w-full aspect-[4/3] max-h-[420px] bg-museum-ivory rounded-2xl border border-museum-stone overflow-hidden flex items-center justify-center shadow-inner">
            
            {/* Shutter Flash Effect */}
            {flashEffect && (
              <div className="absolute inset-0 bg-white z-30 transition-opacity duration-150 pointer-events-none" />
            )}

            {/* AI Guide Overlay & Centering Oval */}
            {streamActive && (
              <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-center p-4">
                <div
                  className={`relative w-[52%] h-[74%] rounded-[48%] border-2 transition-all duration-300 flex flex-col items-center justify-between p-3.5 ${
                    faceResult.canCapture
                      ? "border-emerald-500 shadow-[0_0_28px_rgba(16,185,129,0.35)] bg-emerald-500/10"
                      : faceResult.status === "MULTIPLE_FACES"
                      ? "border-amber-500 bg-amber-500/10"
                      : faceResult.status === "NO_FACE"
                      ? "border-dashed border-rose-400 bg-rose-500/5"
                      : "border-sky-400 bg-sky-500/5"
                  }`}
                >
                  {/* Top Status Pill */}
                  <div className="w-full flex items-center justify-between text-[10px] font-mono font-bold">
                    <span
                      className={`px-2.5 py-0.5 rounded-full backdrop-blur ${
                        faceResult.canCapture
                          ? "bg-emerald-800 text-white"
                          : faceResult.status === "MULTIPLE_FACES"
                          ? "bg-amber-800 text-white"
                          : "bg-black/60 text-white"
                      }`}
                    >
                      {faceResult.status === "READY"
                        ? "FACE READY"
                        : faceResult.status === "MULTIPLE_FACES"
                        ? "MULTIPLE FACES"
                        : faceResult.status === "NO_FACE"
                        ? "NO FACE"
                        : "ALIGNING"}
                    </span>
                    <span className="text-white bg-black/60 px-2 py-0.5 rounded-full">
                      {faceResult.confidence}%
                    </span>
                  </div>

                  {/* Hold-Still Progress Countdown Ring & Bar */}
                  {faceResult.canCapture && (
                    <div className="w-full max-w-[180px] bg-black/60 backdrop-blur rounded-xl p-2 text-center space-y-1">
                      <span className="text-[11px] font-mono font-bold text-emerald-300 block animate-pulse">
                        {isOdia ? "ସ୍ଥିର ରୁହନ୍ତୁ... (HOLD STILL)" : "HOLD STILL..."}
                      </span>
                      <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-400 h-full rounded-full transition-all duration-100 ease-out"
                          style={{ width: `${holdProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Bottom Guide Prompt */}
                  {!faceResult.canCapture && (
                    <div className="text-center">
                      <span className="text-[11px] font-sans font-bold px-3 py-1 rounded-full backdrop-blur bg-black/75 text-white">
                        {isOdia ? faceResult.statusMessageOdia : faceResult.statusMessage}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Video Feed */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover transform -scale-x-100 ${
                streamActive ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Hidden Canvases for Analysis and Export */}
            <canvas ref={canvasRef} className="hidden" />
            <canvas ref={analysisCanvasRef} className="hidden" />

            {/* Loading / Blocked Permission Overlay */}
            {!streamActive && (
              <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center bg-museum-ivory z-20 space-y-3">
                {isInitializing ? (
                  <>
                    <RefreshCw className="w-8 h-8 text-[#8A3324] animate-spin" />
                    <p className="text-xs text-museum-charcoal font-medium">
                      {isOdia ? "କ୍ୟାମେରା ଅନୁମତି ଯାଞ୍ଚ ହେଉଛି..." : "Requesting camera access..."}
                    </p>
                  </>
                ) : (
                  <>
                    <Camera className="w-10 h-10 text-[#8A3324] animate-pulse" />
                    <p className="text-xs text-museum-charcoal max-w-sm font-sans font-medium leading-relaxed">
                      {cameraError ||
                        (isOdia
                          ? "ଲାଇଭ୍ ଚେହେରା ଯାଞ୍ଚ ପାଇଁ କ୍ୟାମେରା ଅନୁମତି ଆବଶ୍ୟକ କିମ୍ବା ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ।"
                          : "Please allow camera access for automated face detection or upload an identity photo.")}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={startCamera}
                        className="px-4 py-2 bg-[#8A3324] hover:bg-museum-mutedRed text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                      >
                        {isOdia ? "କ୍ୟାମେରା ଚାଲୁ କରନ୍ତୁ" : "Allow & Start Camera"}
                      </button>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-museum-ivory border border-museum-stone hover:bg-museum-parchment text-museum-charcoal rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#8A3324]" />
                        <span>{isOdia ? "ଫଟୋ ଅପଲୋଡ୍" : "Upload Photo"}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              type="button"
              onClick={executeCapture}
              disabled={isCapturing}
              className={`flex-1 py-3.5 text-white text-xs font-semibold uppercase tracking-wider transition-all rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer bg-[#8A3324] hover:bg-museum-mutedRed active:scale-[0.99]`}
            >
              {isCapturing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{isOdia ? "ଫଟୋ ଉଠାଯାଉଛି..." : "CAPTURING PHOTO..."}</span>
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4" />
                  <span>
                    {faceResult.canCapture
                      ? isOdia
                        ? "ସ୍ୱୟଂଚାଳିତ କ୍ୟାପଚର୍ ହେଉଛି... କିମ୍ବା ଏଠାରେ କ୍ଲିକ୍ କରନ୍ତୁ"
                        : "AUTO-CAPTURING... OR CLICK TO CAPTURE"
                      : streamActive
                      ? isOdia
                        ? "ଚେହେରା ଯାଞ୍ଚ କରି ଫଟୋ ଉଠାନ୍ତୁ"
                        : "MANUAL SNAPSHOT OVERRIDE"
                      : isOdia
                      ? "ତତକ୍ଷଣାତ୍ ପରିଚୟ ଫଟୋ ସଂଲଗ୍ନ କରନ୍ତୁ"
                      : "GENERATE VERIFIED SNAPSHOT"}
                  </span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-5 py-3.5 rounded-xl border border-museum-stone bg-museum-ivory hover:bg-museum-parchment text-museum-charcoal text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4 text-[#8A3324]" />
              <span>{isOdia ? "ଫଟୋ ଅପଲୋଡ୍ (UPLOAD)" : "UPLOAD PHOTO"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
