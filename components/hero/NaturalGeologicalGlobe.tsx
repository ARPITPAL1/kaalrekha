"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  Plus,
  Minus,
  MapPin,
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PinnedCity {
  id: string;
  name: { or: string; en: string };
  subhead: { or: string; en: string };
  period: { or: string; en: string };
  coordinates: { lat: number; lng: number };
  description: { or: string; en: string };
  image: string;
  researchTopic: { or: string; en: string };
  publicationLink: string;
}

const pinnedCities: PinnedCity[] = [
  {
    id: "rome",
    name: { or: "ରୋମ୍ (ROME)", en: "ROME" },
    subhead: { or: "ରୋମାନ୍ ସାମ୍ରାଜ୍ୟର ରାଜଧାନୀ", en: "CAPITAL OF AN EMPIRE" },
    period: { or: "ଖ୍ରୀ.ପୂ. ୨୭ – ଖ୍ରୀଷ୍ଟାବ୍ଦ ୪୭୬", en: "27 BCE – 476 CE" },
    coordinates: { lat: 41.9, lng: 12.5 },
    description: {
      or: "ସାମ୍ରାଜ୍ୟ ପ୍ରଶାସନ, ଆଇନ, କଲୋସିୟମ୍ ଓ ଭୂମଧ୍ୟସାଗରୀୟ ଶସ୍ୟ ଯୋଗାଣ କେନ୍ଦ୍ର।",
      en: "Imperial governance, classical jurisprudence, and the Mediterranean annona supply hub.",
    },
    image: "/images/rome_colosseum.jpg",
    researchTopic: { or: "ସାମ୍ରାଜ୍ୟିକ ଶକ୍ତି ଓ ଅର୍ଥନୀତି", en: "Imperial Power & Annona" },
    publicationLink: "/publications/the-making-of-an-empire",
  },
  {
    id: "athens",
    name: { or: "ଏଥେନ୍ସ (ATHENS)", en: "ATHENS" },
    subhead: { or: "ଦର୍ଶନ ଓ ଗଣତନ୍ତ୍ରର ଜନ୍ମସ୍ଥଳୀ", en: "CRADLE OF PHILOSOPHY" },
    period: { or: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୫ମ – ୪ର୍ଥ ଶତାବ୍ଦୀ", en: "5th – 4th Century BCE" },
    coordinates: { lat: 37.98, lng: 23.72 },
    description: {
      or: "ପ୍ରାଚୀନ ଗ୍ରୀକ୍ ଗଣତାନ୍ତ୍ରିକ ସଭା, ପାର୍ଥେନନ୍ ମନ୍ଦିର ଓ ଦାର୍ଶନିକ ବିତର୍କ।",
      en: "Classical democracy, epigraphic civic decrees, and the Parthenon acropolis.",
    },
    image: "/images/athens_parthenon.jpg",
    researchTopic: { or: "ନାଗରିକ ସ୍ଥାପତ୍ୟ କଳା", en: "Civic Monuments & Assembly" },
    publicationLink: "/publications",
  },
  {
    id: "alexandria",
    name: { or: "ଆଲେକଜାଣ୍ଡ୍ରିଆ (ALEXANDRIA)", en: "ALEXANDRIA" },
    subhead: { or: "ଭୂମଧ୍ୟସାଗରୀୟ ବନ୍ଦର ନଗରୀ", en: "MEDITERRANEAN HARBOR" },
    period: { or: "ଖ୍ରୀ.ପୂ. ୩ୟ ଶତାବ୍ଦୀ – ଖ୍ରୀଷ୍ଟାବ୍ଦ ୬୪୧", en: "3rd Century BCE – 641 CE" },
    coordinates: { lat: 31.2, lng: 29.9 },
    description: {
      or: "ବିଶ୍ୱବିଖ୍ୟାତ ପ୍ରାଚୀନ ପାଠାଗାର, ଶସ୍ୟ ଜାହାଜ ବନ୍ଦର ଓ ତାଳପତ୍ର ଚୁକ୍ତିପତ୍ର।",
      en: "The Great Ancient Library, royal grain terminals, and papyrological trade networks.",
    },
    image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=600&q=80",
    researchTopic: { or: "ସାମୁଦ୍ରିକ ବାଣିଜ୍ୟ ପଥ", en: "Maritime Shipping Corridors" },
    publicationLink: "/publications/the-making-of-an-empire",
  },
  {
    id: "india",
    name: { or: "ଭାରତ (ପାଟଳିପୁତ୍ର ଓ କଳିଙ୍ଗ)", en: "INDIA (PATALIPUTRA & KALINGA)" },
    subhead: { or: "ମୌର୍ଯ୍ୟ ଓ ମହାମେଘବାହନ ଆସନ", en: "MAURYAN & KALINGA SEAT" },
    period: { or: "ଖ୍ରୀ.ପୂ. ୩୨୨ – ଖ୍ରୀଷ୍ଟାବ୍ଦ ୫୫୦", en: "322 BCE – 550 CE" },
    coordinates: { lat: 20.2, lng: 85.8 },
    description: {
      or: "ଅଶୋକଙ୍କ ଶିଳାଲେଖ, ଖାରବେଳଙ୍କ ହାତୀଗୁମ୍ଫା ଲିପି ଓ ପ୍ରାଚୀନ ନୌବାଣିଜ୍ୟ।",
      en: "Ashokan rock edicts, Kharavela's Hathigumpha inscription, and Indian Ocean trade.",
    },
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80",
    researchTopic: { or: "କଳିଙ୍ଗ ଓ ଭାରତ ଇତିହାସ", en: "Indian Ocean Epigraphy" },
    publicationLink: "/india",
  },
];

export default function NaturalGeologicalGlobe() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedCity, setSelectedCity] = useState<PinnedCity | null>(pinnedCities[0]);
  const [activeLayer, setActiveLayer] = useState<string>("historical");
  const [autoRotate, setAutoRotate] = useState(true);

  const earthGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const { language, t } = useLanguage();

  const latLngToVec = (lat: number, lng: number, r = 2.02): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -(r * Math.sin(phi) * Math.cos(theta));
    const z = r * Math.sin(phi) * Math.sin(theta);
    const y = r * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5.0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // 2. Earth Group
    const earthGroup = new THREE.Group();
    earthGroupRef.current = earthGroup;
    earthGroup.rotation.y = -Math.PI * 0.45;
    earthGroup.rotation.x = Math.PI * 0.12;
    scene.add(earthGroup);

    // 3. Photorealistic Natural Satellite Earth Geometry & Texture (Like Google Earth)
    const earthRadius = 2.0;
    const earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64);

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      "/images/earth_satellite_natural_equirect.jpg",
      () => {
        renderer.render(scene, camera);
      }
    );
    earthTexture.wrapS = THREE.RepeatWrapping;
    earthTexture.wrapT = THREE.ClampToEdgeWrapping;

    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.65,
      metalness: 0.1,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earthMesh);

    // 4. Natural Daylight Cloud / Atmosphere Layer
    const atmosGeo = new THREE.SphereGeometry(earthRadius * 1.018, 64, 64);
    const atmosMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xB7C7C8),
      transparent: true,
      opacity: 0.2,
      roughness: 0.8,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    earthGroup.add(atmosMesh);

    // 5. Curved Terracotta Historical Trade Corridors
    const routeCoords = [
      { lat: 41.9, lng: 12.5 },   // Rome
      { lat: 31.2, lng: 29.9 },   // Alexandria
      { lat: 36.2, lng: 36.1 },   // Antioch
      { lat: 33.3, lng: 44.3 },   // Mesopotamia
      { lat: 25.3, lng: 68.3 },   // Indus Basin
      { lat: 20.2, lng: 85.8 },   // Kalinga / Odisha
    ];

    const routePoints: THREE.Vector3[] = [];
    for (let i = 0; i < routeCoords.length - 1; i++) {
      const p1 = latLngToVec(routeCoords[i].lat, routeCoords[i].lng, earthRadius * 1.012);
      const p2 = latLngToVec(routeCoords[i + 1].lat, routeCoords[i + 1].lng, earthRadius * 1.012);

      for (let t = 0; t <= 1; t += 0.1) {
        const p = new THREE.Vector3().lerpVectors(p1, p2, t);
        p.normalize().multiplyScalar(earthRadius * 1.015 + Math.sin(t * Math.PI) * 0.035);
        routePoints.push(p);
      }
    }

    const routeGeo = new THREE.BufferGeometry().setFromPoints(routePoints);
    const routeMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(0x8B3F32), // Terracotta
      linewidth: 2,
    });
    const routeLine = new THREE.Line(routeGeo, routeMat);
    earthGroup.add(routeLine);

    // 6. City Pins (Terracotta & Gold)
    const pinGroup = new THREE.Group();
    earthGroup.add(pinGroup);

    pinnedCities.forEach((city) => {
      const pos = latLngToVec(city.coordinates.lat, city.coordinates.lng, earthRadius * 1.018);

      const markerGeo = new THREE.SphereGeometry(0.045, 16, 16);
      const markerMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xA9854A),
        emissive: new THREE.Color(0x8B3F32),
        emissiveIntensity: 0.6,
        roughness: 0.25,
      });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.copy(pos);
      marker.userData = { city };
      pinGroup.add(marker);
    });

    // 7. Natural Daylight Illumination
    const sunLight = new THREE.DirectionalLight(0xFFF7E8, 3.4);
    sunLight.position.set(4, 5, 4);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0xE8DEC8, 1.3);
    scene.add(ambientLight);

    // 8. Interactive Drag & Zoom Controls
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setAutoRotate(false);
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        earthGroup.rotation.y += dx * 0.005;
        earthGroup.rotation.x += dy * 0.005;
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onCanvasClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(pinGroup.children, true);

      if (intersects.length > 0) {
        const hitCity = intersects[0].object.userData.city as PinnedCity;
        if (hitCity) {
          setSelectedCity(hitCity);
        }
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = THREE.MathUtils.clamp(camera.position.z + e.deltaY * 0.002, 3.4, 7.5);
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("click", onCanvasClick);
    container.addEventListener("wheel", onWheel, { passive: false });

    // Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotate && !isDragging) {
        earthGroup.rotation.y += 0.0012;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("click", onCanvasClick);
      container.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      earthGeo.dispose();
      earthMat.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      routeGeo.dispose();
      routeMat.dispose();
      earthTexture.dispose();
    };
  }, [autoRotate]);

  const zoomIn = () => {
    if (cameraRef.current) {
      cameraRef.current.position.z = Math.max(3.4, cameraRef.current.position.z - 0.4);
    }
  };

  const zoomOut = () => {
    if (cameraRef.current) {
      cameraRef.current.position.z = Math.min(7.5, cameraRef.current.position.z + 0.4);
    }
  };

  return (
    <div className="relative w-full h-[620px] lg:h-[680px] flex items-center justify-center select-none bg-museum-parchment/30">
      {/* 1. Left Vertical Historical Layers Control Panel */}
      <div className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5 p-2.5 rounded-2xl bg-museum-ivory/95 backdrop-blur-md border border-museum-stone shadow-sm max-w-[170px] text-xs font-sans">
        <button
          onClick={() => setActiveLayer("historical")}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all ${
            activeLayer === "historical"
              ? "bg-museum-parchment font-bold text-museum-charcoal shadow-xs"
              : "text-museum-charcoalLight hover:text-museum-charcoal font-medium"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-museum-terracotta" />
          <span>{t.globe.historicalView}</span>
        </button>

        <button
          onClick={() => setActiveLayer("modern")}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all ${
            activeLayer === "modern"
              ? "bg-museum-parchment font-bold text-museum-charcoal shadow-xs"
              : "text-museum-charcoalLight hover:text-museum-charcoal font-medium"
          }`}
        >
          <span className="w-2 h-2 rounded-full border border-museum-charcoalLight" />
          <span>{t.globe.modernView}</span>
        </button>

        <button
          onClick={() => setActiveLayer("trade")}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all ${
            activeLayer === "trade"
              ? "bg-museum-parchment font-bold text-museum-charcoal shadow-xs"
              : "text-museum-charcoalLight hover:text-museum-charcoal font-medium"
          }`}
        >
          <span className="w-2 h-[2px] bg-museum-terracotta" />
          <span>{t.globe.tradeRoutes}</span>
        </button>

        <button
          onClick={() => setActiveLayer("empires")}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all ${
            activeLayer === "empires"
              ? "bg-museum-parchment font-bold text-museum-charcoal shadow-xs"
              : "text-museum-charcoalLight hover:text-museum-charcoal font-medium"
          }`}
        >
          <span className="w-2 h-2 rounded-sm bg-museum-antiqueGold" />
          <span>{t.globe.empires}</span>
        </button>

        <button
          onClick={() => setActiveLayer("archaeology")}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all ${
            activeLayer === "archaeology"
              ? "bg-museum-parchment font-bold text-museum-charcoal shadow-xs"
              : "text-museum-charcoalLight hover:text-museum-charcoal font-medium"
          }`}
        >
          <span className="w-2 h-2 rotate-45 border border-museum-terracotta" />
          <span>{t.globe.archaeology}</span>
        </button>

        <button
          onClick={() => setActiveLayer("geology")}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all ${
            activeLayer === "geology"
              ? "bg-museum-parchment font-bold text-museum-charcoal shadow-xs"
              : "text-museum-charcoalLight hover:text-museum-charcoal font-medium"
          }`}
        >
          <span className="w-2 h-2 rounded-full border border-museum-olive" />
          <span>{t.globe.geology}</span>
        </button>
      </div>

      {/* 2. Interactive Three.js Google Earth Photorealistic Viewport */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
      />

      {/* 3. Popover Card (Bilingual Rome/City Feature) */}
      {selectedCity && (
        <div className="absolute right-4 md:right-24 top-6 md:top-10 z-30 w-72 md:w-80 bg-museum-ivory/95 backdrop-blur-md border border-museum-stone rounded-2xl p-4 shadow-lg animate-fade-in text-left">
          <div className="relative w-full h-32 rounded-xl overflow-hidden border border-museum-stone mb-3 shadow-xs">
            <Image
              src={selectedCity.image}
              alt={selectedCity.name[language]}
              fill
              className="object-cover filter contrast-[1.05]"
            />
            <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-museum-ivory/90 backdrop-blur-sm rounded-lg text-[10px] font-mono uppercase tracking-wider text-museum-terracotta font-bold border border-museum-stone">
              {selectedCity.period[language]}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-museum-antiqueGold font-bold block">
              {selectedCity.subhead[language]}
            </span>
            <h4 className="font-serif text-2xl text-museum-charcoal font-bold">
              {selectedCity.name[language]}
            </h4>
            <p className="font-sans text-xs text-museum-charcoalLight leading-relaxed pt-1">
              {selectedCity.description[language]}
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-museum-stone flex items-center justify-between">
            <span className="text-[11px] font-sans text-museum-charcoalLight truncate pr-2">
              <strong className="text-museum-charcoal font-semibold">{selectedCity.researchTopic[language]}</strong>
            </span>
            <Link
              href={selectedCity.publicationLink}
              className="inline-flex items-center gap-1 text-xs font-sans text-museum-terracotta hover:underline font-bold flex-shrink-0"
            >
              <span>{t.hero.exploreArchive}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* 4. Right Controls: Roosevelt Museum Quote, Compass Rose & Zoom */}
      <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-5 hidden sm:flex">
        {/* Quote */}
        <div className="max-w-[150px] text-right font-serif text-xs italic text-museum-charcoalLight leading-relaxed">
          &ldquo;{t.hero.quoteParchment}&rdquo;
          <span className="block not-italic font-sans text-[9px] uppercase tracking-wider text-museum-antiqueGold mt-1 font-bold">
            — THEODORE ROOSEVELT
          </span>
        </div>

        {/* Compass Rose */}
        <div className="relative w-14 h-14 flex items-center justify-center select-none">
          <div className="w-12 h-12 rounded-full border border-museum-stone flex items-center justify-center bg-museum-ivory/80 shadow-xs">
            <Compass className="w-7 h-7 text-museum-antiqueGold stroke-1" />
          </div>
          <span className="absolute -top-1 text-[9px] font-mono text-museum-terracotta font-bold">N</span>
          <span className="absolute -bottom-1 text-[9px] font-mono text-museum-charcoalLight font-bold">S</span>
          <span className="absolute -left-1 text-[9px] font-mono text-museum-charcoalLight font-bold">W</span>
          <span className="absolute -right-1 text-[9px] font-mono text-museum-charcoalLight font-bold">E</span>
        </div>

        {/* Zoom Controls */}
        <div className="flex flex-col border border-museum-stone rounded-xl bg-museum-ivory/95 backdrop-blur-sm shadow-xs overflow-hidden">
          <button
            onClick={zoomIn}
            className="p-2.5 hover:bg-museum-parchment text-museum-charcoal transition-colors cursor-pointer"
            title="Zoom In"
            aria-label="Zoom in"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <div className="w-full h-[1px] bg-museum-stone" />
          <button
            onClick={zoomOut}
            className="p-2.5 hover:bg-museum-parchment text-museum-charcoal transition-colors cursor-pointer"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Drag to explore prompt */}
        <span className="text-[9px] uppercase tracking-widest font-mono text-museum-charcoalLight">
          {t.hero.dragToOrbit}
        </span>
      </div>
    </div>
  );
}
