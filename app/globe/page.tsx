"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/ui/Footer";
import { countryHistories, CountryHistory } from "@/data/globeCountries";
import {
  Search,
  MapPin,
  Compass,
  X,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function GlobePage() {
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryHistory>(countryHistories[0]); // Default India
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);

  const { language, t } = useLanguage();

  // References for Three.js control
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const earthGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Convert lat/lng to 3D Sphere Vector
  const latLngToVector3 = (lat: number, lng: number, radius = 2): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return new THREE.Vector3(x, y, z);
  };

  // Focus Earth on country
  const focusOnCountry = (country: CountryHistory) => {
    setSelectedCountry(country);
    setDrawerOpen(true);
    setAutoRotate(false);

    // Target rotation based on country coordinates
    const targetY = -(country.coordinates.lng * Math.PI) / 180 - Math.PI / 2;
    const targetX = (country.coordinates.lat * Math.PI) / 180;

    targetRotationRef.current = { x: targetX, y: targetY };
  };

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5.2);
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
    scene.add(earthGroup);

    // 3. Photorealistic Google Earth-Style Satellite Texture & Geometry
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

    // 4. Soft Daylight Atmosphere Ring
    const atmosGeo = new THREE.SphereGeometry(earthRadius * 1.02, 64, 64);
    const atmosMat = new THREE.MeshStandardMaterial({
      color: 0xB7C7C8,
      transparent: true,
      opacity: 0.2,
      roughness: 0.8,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    earthGroup.add(atmosMesh);

    // 5. Place 3D Country Pins on the Sphere
    const pinsGroup = new THREE.Group();
    earthGroup.add(pinsGroup);

    const pinGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xA9854A,
      emissive: 0x8B3F32,
      emissiveIntensity: 0.5,
      roughness: 0.3,
    });

    countryHistories.forEach((country) => {
      const pos = latLngToVector3(country.coordinates.lat, country.coordinates.lng, earthRadius * 1.015);
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.copy(pos);
      pin.userData = { country };
      pinsGroup.add(pin);
    });

    // 6. Daylight Illumination
    const sunLight = new THREE.DirectionalLight(0xFFF7E8, 3.2);
    sunLight.position.set(4, 5, 4);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0xE9DDC8, 1.2);
    scene.add(ambientLight);

    // 7. Interactive Orbit / Drag / Click Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setAutoRotate(false);
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      earthGroup.rotation.y += deltaX * 0.005;
      earthGroup.rotation.x += deltaY * 0.005;

      earthGroup.rotation.x = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, earthGroup.rotation.x));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Raycaster for Clicking Pins
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onCanvasClick = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(pinsGroup.children);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData && hit.userData.country) {
          focusOnCountry(hit.userData.country);
        }
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.0025;
      camera.position.z = Math.max(3.2, Math.min(8.0, camera.position.z));
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

    // 8. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotate) {
        earthGroup.rotation.y += 0.0018;
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
      pinGeo.dispose();
      pinMat.dispose();
      earthTexture.dispose();
    };
  }, [autoRotate]);

  const searchResults = searchQuery
    ? countryHistories.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.ancientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.continent.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : countryHistories;

  return (
    <div className="relative min-h-screen w-full bg-museum-ivory text-museum-charcoal overflow-hidden flex flex-col justify-between selection:bg-museum-terracotta selection:text-white">
      <Navbar />

      {/* Main 3D Geological Earth Canvas Viewport */}
      <div className="relative w-full h-[100vh] pt-20 flex items-center justify-center overflow-hidden bg-museum-parchment/30">
        {/* Three.js Canvas Container */}
        <div
          ref={canvasContainerRef}
          className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
        />

        {/* Top Control & Search Bar */}
        <div className="absolute top-24 left-4 sm:left-8 z-20 w-full max-w-sm">
          <div className="bg-museum-ivory/95 backdrop-blur-md border border-museum-stone rounded-2xl p-3.5 shadow-md space-y-2.5">
            <div className="flex items-center gap-2 px-1 text-[10px] uppercase font-mono tracking-wider text-museum-terracotta font-bold">
              <Compass className="w-3.5 h-3.5" />
              <span>{language === "or" ? "୩ଡି ଗୁଗଲ୍ ଆର୍ଥ୍ · ଦେଶ ଖୋଜନ୍ତୁ" : "3D GOOGLE EARTH · SEARCH COUNTRY"}</span>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-museum-terracotta absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.globe.searchPlaceholder}
                className="w-full pl-9 pr-3 py-2 bg-museum-parchment border border-museum-stone rounded-xl text-xs text-museum-charcoal font-sans placeholder:text-museum-charcoalLight focus:border-museum-terracotta focus:outline-none"
              />
            </div>

            {/* Quick Country Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {searchResults.slice(0, 5).map((c) => (
                <button
                  key={c.id}
                  onClick={() => focusOnCountry(c)}
                  className={`px-3 py-1 text-[10px] font-sans uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    selectedCountry.id === c.id
                      ? "bg-museum-terracotta text-white font-bold shadow-sm"
                      : "bg-museum-parchment border border-museum-stone text-museum-charcoal hover:border-museum-terracotta font-medium"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Floating View Controls (Auto-Rotate, Zoom) */}
        <div className="absolute bottom-8 left-4 sm:left-8 z-20 flex items-center gap-2 bg-museum-ivory/95 backdrop-blur-md border border-museum-stone p-2 rounded-xl font-sans text-xs text-museum-charcoal shadow-sm">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors font-semibold cursor-pointer ${
              autoRotate ? "bg-museum-terracotta/10 text-museum-terracotta" : "hover:text-museum-terracotta"
            }`}
          >
            <RotateCcw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin-slow" : ""}`} />
            <span>{autoRotate ? (language === "or" ? "ଘୂର୍ଣ୍ଣନ ଚାଲୁ" : "ROTATING") : (language === "or" ? "ବିରତି" : "ORBIT PAUSED")}</span>
          </button>
          <span className="text-museum-stone">|</span>
          <span className="text-[10px] font-mono text-museum-charcoalLight hidden sm:inline">
            {t.hero.dragToOrbit}
          </span>
        </div>

        {/* Sliding Historical Dossier Side Drawer */}
        {drawerOpen && selectedCountry && (
          <div
            className="absolute top-20 right-0 bottom-0 z-30 w-full sm:w-[480px] bg-museum-ivory/95 backdrop-blur-xl border-l border-museum-stone flex flex-col justify-between p-6 md:p-8 shadow-2xl overflow-y-auto animate-fade-in"
            role="dialog"
            aria-label={`Historical Dossier for ${selectedCountry.name}`}
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between border-b border-museum-stone pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-museum-terracotta font-bold">
                    <MapPin className="w-3.5 h-3.5 text-museum-terracotta" />
                    <span>{selectedCountry.continent} · {selectedCountry.coordinates.lat}°N, {selectedCountry.coordinates.lng}°E</span>
                  </div>
                  <h2 className="font-serif text-4xl text-museum-charcoal font-bold mt-1">
                    {selectedCountry.name}
                  </h2>
                  <span className="font-serif text-sm italic text-museum-antiqueGold block">
                    {selectedCountry.ancientName}
                  </span>
                  <span className="text-xs font-sans text-museum-charcoalLight mt-0.5 block">
                    {language === "or" ? "ଐତିହାସିକ ରାଜଧାନୀ:" : "Historical Capital:"}{" "}
                    <strong className="text-museum-charcoal font-semibold">{selectedCountry.capital}</strong>
                  </span>
                </div>

                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 text-museum-charcoalLight hover:text-museum-terracotta rounded-lg hover:bg-museum-parchment cursor-pointer"
                  aria-label="Close dossier"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Overview & Global Significance */}
              <div className="space-y-4 mb-6">
                <p className="font-sans text-sm text-museum-charcoal leading-relaxed">
                  {selectedCountry.overview}
                </p>
                <div className="p-3.5 bg-museum-parchment border border-museum-stone rounded-xl text-xs font-sans text-museum-charcoal">
                  <span className="text-museum-terracotta font-mono uppercase tracking-wider block text-[10px] mb-1 font-bold">
                    {t.globe.historicalSignificance}
                  </span>
                  {selectedCountry.significance}
                </div>
              </div>

              {/* Chronological Era Stratigraphy */}
              <div className="space-y-4 mb-8">
                <span className="text-[10px] font-mono uppercase tracking-wider text-museum-antiqueGold block font-bold">
                  {language === "or" ? "କାଳକ୍ରମିକ ଐତିହାସିକ ସ୍ତର" : "HISTORICAL STRATIGRAPHY & CHRONOLOGY"}
                </span>

                {/* Ancient Era */}
                <div className="p-4 bg-museum-parchment/60 border border-museum-stone rounded-xl space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-museum-terracotta">
                    {t.globe.ancientEra}
                  </span>
                  <p className="font-sans text-xs text-museum-charcoal leading-relaxed">
                    {selectedCountry.eraHighlights.ancient}
                  </p>
                </div>

                {/* Medieval Era */}
                <div className="p-4 bg-museum-parchment/60 border border-museum-stone rounded-xl space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-museum-terracotta">
                    {t.globe.medievalEra}
                  </span>
                  <p className="font-sans text-xs text-museum-charcoal leading-relaxed">
                    {selectedCountry.eraHighlights.medieval}
                  </p>
                </div>

                {/* Modern Era */}
                <div className="p-4 bg-museum-parchment/60 border border-museum-stone rounded-xl space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-museum-terracotta">
                    {t.globe.modernEra}
                  </span>
                  <p className="font-sans text-xs text-museum-charcoal leading-relaxed">
                    {selectedCountry.eraHighlights.modern}
                  </p>
                </div>
              </div>

              {/* Notable Rulers & Dynasties */}
              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-museum-antiqueGold block mb-2 font-bold">
                  {t.globe.majorRulers}
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedCountry.keyRulers.map((r, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-museum-parchment border border-museum-stone text-[11px] font-sans text-museum-charcoal rounded-lg font-medium"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Preserved Artifacts */}
              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-museum-antiqueGold block mb-2 font-bold">
                  {t.globe.artifactsMonuments}
                </span>
                <ul className="space-y-1.5 text-xs font-sans text-museum-charcoal">
                  {selectedCountry.historicalArtifacts.map((art, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-museum-terracotta" />
                      <span>{art}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* If India, special link to dedicated Odia page */}
            {selectedCountry.id === "india" && (
              <div className="pt-4 border-t border-museum-stone">
                <a
                  href="/india"
                  className="w-full py-3.5 bg-museum-terracotta text-white hover:bg-museum-mutedRed text-xs font-sans font-bold uppercase tracking-wider transition-all rounded-xl shadow-md flex items-center justify-center gap-2"
                >
                  <span>{language === "or" ? "ପୂର୍ଣ୍ଣ ଭାରତ ଇତିହାସ ଓ ୩୬୦° ଭ୍ୟୁ" : "FULL INDIA HISTORY & 360° VIEW"} &rarr;</span>
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
