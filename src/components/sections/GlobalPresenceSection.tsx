"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Building2, Ship, TrendingUp, Users, Factory, MapPin, ArrowUpRight } from "lucide-react";
import { globalBusinessStats, globalOffices } from "@/data/content";

// ─── Tab Config ─────────────────────────────────────────────
type TabId = "overview" | "regions" | "partners" | "offices";

interface TabConfig {
  id: TabId;
  label: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const tabs: TabConfig[] = [
  {
    id: "overview",
    label: "Overview",
    icon: Globe,
    title: "Global Footprint at a Glance",
    description: "From Singapore HQ to 38+ countries — Freshening's network spans the globe.",
  },
  {
    id: "regions",
    label: "Export Regions",
    icon: Ship,
    title: "Export Distribution",
    description: "Southeast Asia leads at 32%, followed by Europe (21%) and the Middle East (16%).",
  },
  {
    id: "partners",
    label: "Partners",
    icon: TrendingUp,
    title: "Partner Ecosystem",
    description: "F&B dominates at 36%, with Healthcare (24%) and Hospitality (16%) as key sectors.",
  },
  {
    id: "offices",
    label: "Offices",
    icon: MapPin,
    title: "Strategic Locations",
    description: "5 owned offices across Asia with distribution reaching 6 continents.",
  },
];

// ─── Animated Counter ───────────────────────────────────────
function AnimatedCountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    let start = 0;
    const increment = Math.ceil(end / (2 * 60));
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        ref.current!.textContent = end.toLocaleString();
        clearInterval(timer);
      } else {
        ref.current!.textContent = start.toLocaleString();
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <span ref={ref} className="font-display font-bold text-4xl md:text-5xl text-white">
      0
    </span>
  );
}

// ─── WebGL Globe ────────────────────────────────────────────
function GlobeVisualization() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<{
    scene: any;
    camera: any;
    renderer: any;
    pivotGroup: any;
    globeGroup: any;
    lineData: any[];
    beacon: any;
    clock: any;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    const initGlobe = async () => {
      const THREE = await import("three");

      const container = canvasRef.current;
      if (!container) return;

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x050510, 0.008);

      const camera = new THREE.PerspectiveCamera(25, container.clientWidth / container.clientHeight, 0.1, 1000);
      // Position camera closer for a more prominent, zoomed-in globe
      camera.position.set(7.2, 1.8, 10.8);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setClearColor(0x050510, 0);
      container.appendChild(renderer.domElement);

      const GLOBE_RADIUS = 7;

      function latLngToVector3(lat: number, lng: number, radius: number) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        return new THREE.Vector3(
          -(radius * Math.sin(phi) * Math.sin(theta)),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.cos(theta)
        );
      }

      const sgLat = 1.3521;
      const sgLng = 103.8198;
      const sgVector = latLngToVector3(sgLat, sgLng, GLOBE_RADIUS);

      // ── Pivot Group: parent that rotates around the Singapore beacon ──
      const pivotGroup = new THREE.Group();
      scene.add(pivotGroup);

      const globeGroup = new THREE.Group();
      // Offset so the Singapore beacon sits at origin of pivotGroup → beacon becomes the pivot
      globeGroup.position.set(-sgVector.x, -sgVector.y, -sgVector.z);
      pivotGroup.add(globeGroup);

      // ── Dotted Sphere ──
      const dotCount = 6000;
      const dotGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(dotCount * 3);
      for (let i = 0; i < dotCount; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        positions[i * 3] = GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = GLOBE_RADIUS * Math.cos(phi);
      }
      dotGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const dotMaterial = new THREE.PointsMaterial({
        color: 0x60a5fa,
        size: 0.1,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });
      const dottedSphere = new THREE.Points(dotGeometry, dotMaterial);
      globeGroup.add(dottedSphere);

      // ── Glow Ring ──
      const ringGeo = new THREE.RingGeometry(GLOBE_RADIUS - 0.15, GLOBE_RADIUS + 0.15, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00b4d8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.08,
        depthWrite: false,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      globeGroup.add(ring);

      // ── Singapore Beacon (red origin) ──
      const beaconGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const beaconMat = new THREE.MeshBasicMaterial({ color: 0xff3344 });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.copy(sgVector);
      globeGroup.add(beacon);

      // ── Office Markers ──
      globalOffices.forEach((office) => {
        const pos = latLngToVector3(office.lat, office.lng, GLOBE_RADIUS);
        const markerGeo = new THREE.SphereGeometry(0.08, 8, 8);
        const markerMat = new THREE.MeshBasicMaterial({ color: 0x00b4d8 });
        const marker = new THREE.Mesh(markerGeo, markerMat);
        marker.position.copy(pos);
        globeGroup.add(marker);

        const haloGeo = new THREE.SphereGeometry(0.15, 8, 8);
        const haloMat = new THREE.MeshBasicMaterial({
          color: 0x00b4d8,
          transparent: true,
          opacity: 0.12,
          depthWrite: false,
        });
        const halo = new THREE.Mesh(haloGeo, haloMat);
        halo.position.copy(pos);
        globeGroup.add(halo);
      });

      // ── Arc Lines ──
      const totalLines = 38;
      const lineData: any[] = [];

      function createArc(startVec: any, endVec: any) {
        const midVec = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
        const distance = startVec.distanceTo(endVec);
        midVec.normalize().multiplyScalar(GLOBE_RADIUS + distance * 0.2);
        return new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
      }

      for (let i = 0; i < totalLines; i++) {
        const targetLat = (Math.random() - 0.5) * 140;
        const targetLng = (Math.random() - 0.5) * 360;
        const targetVector = latLngToVector3(targetLat, targetLng, GLOBE_RADIUS);

        const arcCurve = createArc(sgVector, targetVector);
        const points = arcCurve.getPoints(50);
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x1e293b,
          transparent: true,
          opacity: 0.2,
        });
        const traceLine = new THREE.Line(lineGeometry, lineMaterial);
        globeGroup.add(traceLine);

        const particleGeo = new THREE.SphereGeometry(0.05, 8, 8);
        const particleMat = new THREE.MeshBasicMaterial({
          color: 0x00ffcc,
          blending: THREE.AdditiveBlending,
        });
        const pulseParticle = new THREE.Mesh(particleGeo, particleMat);
        globeGroup.add(pulseParticle);

        lineData.push({
          curve: arcCurve,
          particle: pulseParticle,
          progress: Math.random(),
        });
      }

      // ── Animation ──
      const clock = new THREE.Clock();

      function animate() {
        const delta = clock.getDelta();
        const elapsed = clock.getElapsedTime();

        // Near-zero drift — barely perceptible, keeps HQ dot pinned
        pivotGroup.rotation.y += 0.0001 * delta;
        pivotGroup.rotation.x = 0.08;

        // Subtle breathing pulse: slow scale in/out
        const breathe = 1 + Math.sin(elapsed * 0.5) * 0.01;
        pivotGroup.scale.setScalar(breathe);

        // Beacon heartbeat pulse (independent of globe breathing)
        const scalePulse = 1 + Math.sin(elapsed * 4) * 0.3;
        beacon.scale.set(scalePulse, scalePulse, scalePulse);

        // Camera locked on beacon's world position (pivot origin)
        camera.lookAt(pivotGroup.position);

        lineData.forEach((item: any) => {
          item.progress += 0.2 * delta;
          if (item.progress > 1) item.progress = 0;
          const currentPos = item.curve.getPointAt(item.progress);
          item.particle.position.copy(currentPos);
        });

        renderer.render(scene, camera);
        globeRef.current!.animationId = requestAnimationFrame(animate);
      }

      globeRef.current = {
        scene,
        camera,
        renderer,
        pivotGroup,
        globeGroup,
        lineData,
        beacon,
        clock,
        animationId: requestAnimationFrame(animate),
      };
    };

    initGlobe();

    return () => {
      if (globeRef.current) {
        cancelAnimationFrame(globeRef.current.animationId);
        globeRef.current.renderer.dispose();
        if (canvasRef.current?.contains(globeRef.current.renderer.domElement)) {
          canvasRef.current.removeChild(globeRef.current.renderer.domElement);
        }
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (!globeRef.current || !canvasRef.current) return;
      const { camera, renderer } = globeRef.current;
      const w = canvasRef.current.clientWidth;
      const h = canvasRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <div ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

// ─── Glass Card ─────────────────────────────────────────────
function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-lg shadow-black/20 ${className}`}>
      {children}
    </div>
  );
}

// ─── Tab Content Panels ─────────────────────────────────────
function OverviewPanel() {
  const stats = [
    { icon: Globe, label: "Countries", value: globalBusinessStats.countriesServed, suffix: "+" },
    { icon: Users, label: "Partners", value: globalBusinessStats.activePartners, suffix: "+" },
    { icon: Factory, label: "Plants", value: globalBusinessStats.manufacturingPlants, suffix: "" },
    { icon: Building2, label: "Offices", value: globalBusinessStats.globalOffices, suffix: "" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat) => (
        <GlassCard key={stat.label} className="p-5 text-center group hover:bg-white/10 transition-all duration-300">
          <div className="w-9 h-9 rounded-lg bg-brand-teal/20 flex items-center justify-center mx-auto mb-2">
            <stat.icon size={18} className="text-brand-teal" />
          </div>
          <div className="flex items-baseline justify-center gap-0.5">
            <AnimatedCountUp end={stat.value} />
            <span className="font-display font-bold text-xl text-white">{stat.suffix}</span>
          </div>
          <span className="text-white/50 text-xs mt-0.5 block">{stat.label}</span>
        </GlassCard>
      ))}
    </div>
  );
}

function RegionsPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-3">
      {globalBusinessStats.exportRegions.map((region) => (
        <div key={region.region} className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-white/80">{region.region}</span>
            <span className="text-xs font-mono text-white/50">{region.percentage}% · {region.countries} countries</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${region.percentage}%` } : { width: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ backgroundColor: region.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function PartnersPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-3">
      {globalBusinessStats.partnerBreakdown.map((sector) => (
        <div key={sector.sector} className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-white/80">{sector.sector}</span>
            <span className="text-xs font-mono text-white/50">{sector.percentage}% · {(sector.count / 1000).toFixed(1)}K</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${sector.percentage}%` } : { width: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ backgroundColor: sector.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function OfficesPanel() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {globalBusinessStats.keyMarkets.map((market) => (
        <div
          key={market.country}
          className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
        >
          <span className="text-lg">{market.flag}</span>
          <div className="min-w-0">
            <span className="text-xs font-semibold text-white block leading-tight truncate">
              {market.country}
            </span>
            <span className="text-[10px] text-white/40 block truncate">{market.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Section ───────────────────────────────────────────
export default function GlobalPresenceSection() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const sectionRef = useRef<HTMLElement>(null);

  const renderPanel = () => {
    switch (activeTab) {
      case "overview": return <OverviewPanel />;
      case "regions": return <RegionsPanel />;
      case "partners": return <PartnersPanel />;
      case "offices": return <OfficesPanel />;
    }
  };

  const currentTab = tabs.find((t) => t.id === activeTab)!;

  return (
    <section
      id="global-presence"
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 overflow-hidden"
      style={{ background: "#050510" }}
    >
      {/* ── Layered Layout: Globe as Absolute Background, Content Overlay Floated Right ── */}
      <div className="relative w-full overflow-hidden">

        {/* ── GLOBE: Absolute Background (60% width, anchored left with -10% bleed) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="absolute top-0 bottom-0 left-[-10%] w-[60%] z-0 pointer-events-none"
        >
          {/* Globe canvas */}
          <GlobeVisualization />

          {/* Fade globe into background at right edge — smooth transition to content zone */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#050510]/70 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/20 via-transparent to-[#050510]/60 pointer-events-none" />

          {/* Singapore label overlay */}
          <div className="absolute bottom-5 left-5 z-10 pointer-events-auto">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-mono text-white/60 tracking-wider">SINGAPORE · HQ</span>
            </div>
            <p className="text-[10px] text-white/30 mt-1 font-mono">38 outward vectors active</p>
          </div>
        </motion.div>

        {/* ── CONTENT OVERLAY: Centered with flex column ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex justify-end px-6">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:w-[40%] transition-all duration-300"
          >
            {/* Header */}
            <div className="mb-8 text-center">
              <span className="text-brand-teal font-mono text-xs tracking-widest uppercase mb-3 block">
                Global Reach
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
                Global Business Network
              </h2>
              <p className="text-white/60 mt-3 max-w-md text-sm">
                From Singapore to 38+ countries — explore Freshening's worldwide footprint
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-1.5 mb-6 justify-center">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-brand-teal/20 text-brand-teal border border-brand-teal/30"
                        : "text-white/50 hover:text-white/80 bg-white/5 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <Icon size={14} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Active Panel */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="w-full min-h-[520px]"
            >
              <GlassCard className="p-6">
                <div className="mb-5 pb-4 border-b border-white/10">
                  <h3 className="font-display font-bold text-lg text-white">{currentTab.title}</h3>
                  <p className="text-white/50 text-sm mt-1">{currentTab.description}</p>
                </div>
                {renderPanel()}
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
