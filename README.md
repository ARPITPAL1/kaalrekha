# 🏛️ KAALREKHA (କାଳରେଖା)
### Historical & Archival Research Portal — Dr. Anjan Kumar Pal
*Past Inspires Tomorrow • ଇତିହାସ ପ୍ରେରଣା ଦିଏ*

---

## 📖 Overview

**KAALREKHA** is a museum-grade historical & archival digital portal showcasing historical research, ancient inscriptions, dynastic chronologies, and cultural heritage, with specialized depth in **Odisha History & Heritage (107 Comprehensive Chapters)** and **Indian History**.

---

## 🌟 Key Features

### 🏛️ 1. Odisha History & Heritage (107 Chapters)
* **Comprehensive Chronology**: From Prehistoric Odisha, Paleolithic/Mesolithic/Neolithic ages to the Kalinga War, Kharavela's Chedi Empire, Bhauma-Karas, Somavamshis, Imperial Gangas, Gajapati Empire, Paika Rebellion (1817), 1936 Odisha Province, Princely States, and Modern Odisha.
* **Archival Documentation**: In-depth research chapters with Primary Epigraphical Evidence (Hathigumpha, Dhauli Edicts, copper plates), Notable Rulers, and Monuments.
* **Bilingual Support**: Seamless instant switching between **ଓଡ଼ିଆ (Odia)** and **English**.

### 🌍 2. Interactive 3D Natural Geological Earth & 360° Panoramas
* Real-time 3D Earth Globe built with Three.js & WebGL displaying historical research hubs, coordinates, and geopolitical eras.
* 360° Street View interactive panorama explorer for global and Indian monuments (Konark, Dhauli, Lingaraj, Harappa, Rome, Athens).

### 🔒 3. Google OAuth 2.0 & OpenID Connect Authentication
* Exclusive single sign-on with **Google Account**.
* Backend cryptographic verification using Google's official `google-auth-library`.
* Account linkage and profile provisioning keyed by Google's unique `sub` identifier.
* Secure HttpOnly SameSite session cookies with zero email scraping or OTP reading.

### 📷 4. AI Face Verification & Photo Dispatch
* Browser-based AI face detection powered by TensorFlow.js (`@tensorflow-models/face-detection`).
* Auto-capture upon steady face centering with live feedback and instant dispatch.

---

## 🛠️ Tech Stack

* **Framework**: Next.js 16 (App Router), React 19, TypeScript
* **Styling**: Tailwind CSS, CSS Glassmorphism, Luxury Museum Aesthetic
* **3D Graphics**: Three.js, WebGL
* **Computer Vision**: TensorFlow.js WebGL backend
* **Authentication**: Google OAuth 2.0 / OpenID Connect (`google-auth-library`)
* **Icons & Animation**: Lucide React, Framer Motion

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/ARPITPAL1/kaalrekha.git
cd kaalrekha
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file based on `.env.example`:
```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License
Academic & Research Archive — Dr. Anjan Kumar Pal. All rights reserved.
