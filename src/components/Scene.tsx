import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/*
 * Medallion flow: records drift left → right through three glass panes.
 * Each pane re-tints the particles that pass it: raw → bronze → silver → gold.
 * Everything is one Points draw call driven by a small shader.
 */

const PANES = [-2.4, 0, 2.4];
const SPAN = 10;
const RAW = new THREE.Color("#6f7a8f");
const BRONZE = new THREE.Color("#c8875a");
const SILVER = new THREE.Color("#c3cad6");
const GOLD = new THREE.Color("#e2bd6a");

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec3 uPanes;
  uniform vec3 uRaw; uniform vec3 uBronze; uniform vec3 uSilver; uniform vec3 uGold;
  attribute vec4 aSeed; // x start, y, z, speed
  varying vec3 vColor;
  varying float vFlash;
  const float SPAN = ${SPAN.toFixed(1)};
  void main() {
    float x = mod(aSeed.x + uTime * aSeed.w + SPAN * 0.5, SPAN) - SPAN * 0.5;
    float y = aSeed.y + sin(uTime * 0.35 + aSeed.x * 3.1) * 0.12;
    float z = aSeed.z + cos(uTime * 0.27 + aSeed.y * 2.3) * 0.1;
    float w = 0.08;
    vec3 c = uRaw;
    c = mix(c, uBronze, smoothstep(uPanes.x - w, uPanes.x + w, x));
    c = mix(c, uSilver, smoothstep(uPanes.y - w, uPanes.y + w, x));
    c = mix(c, uGold,   smoothstep(uPanes.z - w, uPanes.z + w, x));
    float d = min(min(abs(x - uPanes.x), abs(x - uPanes.y)), abs(x - uPanes.z));
    vFlash = 1.0 - smoothstep(0.0, 0.35, d);
    // fade at the ends of the stream
    float edge = smoothstep(SPAN * 0.5, SPAN * 0.5 - 1.2, abs(x));
    vColor = c * (0.55 + 0.45 * edge);
    vec4 mv = modelViewMatrix * vec4(x, y, z, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (3.0 + vFlash * 3.5) * uPixelRatio * (6.0 / -mv.z) * edge;
  }
`;

const fragment = /* glsl */ `
  varying vec3 vColor;
  varying float vFlash;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, r);
    gl_FragColor = vec4(vColor + vFlash * 0.35, a * (0.75 + vFlash * 0.25));
  }
`;

function Particles({ count, reduced }: { count: number; reduced: boolean }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { gl } = useThree();
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const seed = new Float32Array(count * 4);
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      seed[i * 4] = (Math.random() - 0.5) * SPAN;
      // denser near the middle, like rows funnelled through a pipeline
      const r = Math.pow(Math.random(), 1.6) * 1.35;
      const t = Math.random() * Math.PI * 2;
      seed[i * 4 + 1] = Math.sin(t) * r;
      seed[i * 4 + 2] = Math.cos(t) * r;
      seed[i * 4 + 3] = 0.22 + Math.random() * 0.35;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 4));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 8);
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: reduced ? 6 : 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uPanes: { value: new THREE.Vector3(...PANES) },
      uRaw: { value: RAW },
      uBronze: { value: BRONZE },
      uSilver: { value: SILVER },
      uGold: { value: GOLD },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((_, dt) => {
    if (!reduced && mat.current) mat.current.uniforms.uTime.value += Math.min(dt, 0.05);
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Pane({ x, color, label }: { x: number; color: THREE.Color; label: string }) {
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.PlaneGeometry(3.2, 3.2)), []);
  return (
    <group position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]} name={label}>
      <mesh>
        <planeGeometry args={[3.2, 3.2]} />
        <meshBasicMaterial color={color} transparent opacity={0.035} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={color} transparent opacity={0.26} />
      </lineSegments>
    </group>
  );
}

function Cubes({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.34, 0.34, 0.34)), []);
  const spots: [number, number, number, THREE.Color][] = [
    [-3.6, 1.35, -0.9, RAW],
    [1.2, -1.45, 1.1, SILVER],
    [3.7, 1.15, -0.6, GOLD],
  ];
  useFrame((state) => {
    if (reduced || !group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((c, i) => {
      c.rotation.x = t * 0.18 + i;
      c.rotation.y = t * 0.24 + i * 2;
      c.position.y = spots[i][1] + Math.sin(t * 0.5 + i * 1.7) * 0.12;
    });
  });
  return (
    <group ref={group}>
      {spots.map(([x, y, z, c], i) => (
        <lineSegments key={i} geometry={edges} position={[x, y, z]}>
          <lineBasicMaterial color={c} transparent opacity={0.55} />
        </lineSegments>
      ))}
    </group>
  );
}

function Rig({ pointer, scroll, reduced, mobile }: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  scroll: React.MutableRefObject<number>;
  reduced: boolean;
  mobile: boolean;
}) {
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera }) => {
    const base = mobile ? 9.5 : 7.4;
    const px = reduced ? 0 : pointer.current.x * 0.7;
    const py = reduced ? 0 : pointer.current.y * 0.4;
    const s = reduced ? 0 : scroll.current;
    target.set(px, 0.5 + py - s * 0.6, base - s * 2.4);
    camera.position.lerp(target, 0.05);
    camera.lookAt(0, -s * 0.4, 0);
  });
  return null;
}

export default function Scene({ mobile, reduced }: { mobile: boolean; reduced: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const wrap = useRef<HTMLDivElement>(null);
  const visible = useRef(true);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => {
      scroll.current = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={mobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 0.5, mobile ? 9.5 : 7.4], fov: 42 }}
        gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : "always"}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <PauseWhenHidden visible={visible} />
        <group rotation={[0.12, -0.62, 0]} position={[mobile ? 0 : 0.6, mobile ? 1.2 : 0, 0]}>
          <Particles count={mobile ? 600 : 2200} reduced={reduced} />
          <Pane x={PANES[0]} color={BRONZE} label="bronze" />
          <Pane x={PANES[1]} color={SILVER} label="silver" />
          <Pane x={PANES[2]} color={GOLD} label="gold" />
          <Cubes reduced={reduced} />
          <gridHelper args={[16, 32, "#1c2433", "#121722"]} position={[0, -2.1, 0]} />
        </group>
        <Rig pointer={pointer} scroll={scroll} reduced={reduced} mobile={mobile} />
      </Canvas>
    </div>
  );
}

/** Stops rendering while the hero is scrolled out of view. */
function PauseWhenHidden({ visible }: { visible: React.MutableRefObject<boolean> }) {
  const { setFrameloop, frameloop } = useThree((s) => ({ setFrameloop: s.setFrameloop, frameloop: s.frameloop }));
  useEffect(() => {
    if (frameloop === "demand") return;
    const id = window.setInterval(() => {
      const want = visible.current ? "always" : "never";
      setFrameloop(want);
    }, 400);
    return () => window.clearInterval(id);
  }, [frameloop, setFrameloop, visible]);
  return null;
}
