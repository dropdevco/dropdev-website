/*
 * Adapted from ReactBits — Galaxy (https://reactbits.dev/backgrounds/galaxy)
 * research/components/reactbits/galaxy-background.jsx
 *
 * Changes for the Drop Dev scrollytelling site:
 *  - `controlsRef` prop: a mutable ref { flight, warp, hue } written by the
 *    scroll system each frame. `flight` (0→1 page scroll) advances the star
 *    layers so scrolling literally flies the camera through the galaxy;
 *    `warp` (scroll velocity) multiplies overall speed for a warp-streak feel;
 *    `hue` drifts star color as you travel deeper.
 *  - Mount-once effect (uniforms driven imperatively — no re-init on render).
 *  - Density auto-reduced and mouse interaction disabled on small screens.
 */
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;
uniform bool uTransparent;

varying vec2 vUv;

#define NUM_LAYER 4.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float tri(float x) {
  return abs(fract(x) * 2.0 - 1.0);
}

float tris(float x) {
  float t = fract(x);
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
}

float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);

  vec2 gv = fract(uv) - 0.5;
  vec2 id = floor(uv);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + vec2(float(x), float(y));
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;

      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed;
      vec3 base = vec3(red, grn, blu);

      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));

      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;

      float star = Star(gv - offset - pad, flareSize);
      vec3 color = base;

      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;

      col += star * size * color;
    }
  }

  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

  vec2 mouseNorm = uMouse - vec2(0.5);

  if (uAutoCenterRepulsion > 0.0) {
    vec2 centerUV = vec2(0.0, 0.0);
    float centerDist = length(uv - centerUV);
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
    uv += repulsion * 0.05;
  } else if (uMouseRepulsion) {
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
    float mouseDist = length(uv - mousePosUV);
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
    uv += repulsion * 0.05 * uMouseActiveFactor;
  } else {
    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;
    uv += mouseOffset;
  }

  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;

  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

  vec3 col = vec3(0.0);

  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }

  if (uTransparent) {
    float alpha = length(col);
    alpha = smoothstep(0.0, 0.3, alpha);
    alpha = min(alpha, 1.0);
    gl_FragColor = vec4(col, alpha);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }
}
`;

export default function Galaxy({
    controlsRef,
    focal = [0.5, 0.5],
    rotation = [1.0, 0.0],
    starSpeed = 0.5,
    density = 1,
    hueShift = 140,
    speed = 1.0,
    mouseInteraction = true,
    glowIntensity = 0.25,
    saturation = 0.4,
    mouseRepulsion = true,
    repulsionStrength = 1.2,
    twinkleIntensity = 0.3,
    rotationSpeed = 0.02,
    autoCenterRepulsion = 0,
    transparent = true,
    quality = 'high', // 'low' → fewer stars + lower-res canvas (set by the FPS probe)
    ...rest
}) {
    const ctnDom = useRef(null);
    const propsRef = useRef(null);
    propsRef.current = {
        focal, rotation, starSpeed, density, hueShift, speed, mouseInteraction,
        glowIntensity, saturation, mouseRepulsion, repulsionStrength,
        twinkleIntensity, rotationSpeed, autoCenterRepulsion, transparent, quality,
    };
    const targetMousePos = useRef({ x: 0.5, y: 0.5 });
    const smoothMousePos = useRef({ x: 0.5, y: 0.5 });
    const targetMouseActive = useRef(0.0);
    const smoothMouseActive = useRef(0.0);

    useEffect(() => {
        if (!ctnDom.current) return;
        const ctn = ctnDom.current;
        const p = propsRef.current;

        // Degrade gracefully on small screens / low-FPS devices: fewer stars,
        // lower-res canvas, no cursor tracking.
        const isSmall = window.innerWidth < 768;
        const isLow = p.quality === 'low';
        const effDensity = p.density * (isSmall ? 0.6 : 1) * (isLow ? 0.65 : 1);
        const effMouse = isSmall ? false : p.mouseInteraction;
        const resScale = isLow ? 0.75 : 1; // render fewer pixels, CSS-stretch to full

        let renderer;
        try {
            renderer = new Renderer({ alpha: p.transparent, premultipliedAlpha: false });
        } catch {
            return; // no WebGL — the CSS space background stays as the fallback
        }
        const gl = renderer.gl;

        if (p.transparent) {
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.clearColor(0, 0, 0, 0);
        } else {
            gl.clearColor(0, 0, 0, 1);
        }

        let program;

        function resize() {
            renderer.setSize(ctn.offsetWidth * resScale, ctn.offsetHeight * resScale);
            gl.canvas.style.width = '100%';
            gl.canvas.style.height = '100%';
            if (program) {
                program.uniforms.uResolution.value = new Color(
                    gl.canvas.width,
                    gl.canvas.height,
                    gl.canvas.width / gl.canvas.height
                );
            }
        }
        window.addEventListener('resize', resize, false);
        resize();

        const geometry = new Triangle(gl);
        program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uResolution: {
                    value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height),
                },
                uFocal: { value: new Float32Array(p.focal) },
                uRotation: { value: new Float32Array(p.rotation) },
                uStarSpeed: { value: p.starSpeed },
                uDensity: { value: effDensity },
                uHueShift: { value: p.hueShift },
                uSpeed: { value: p.speed },
                uMouse: { value: new Float32Array([0.5, 0.5]) },
                uGlowIntensity: { value: p.glowIntensity },
                uSaturation: { value: p.saturation },
                uMouseRepulsion: { value: p.mouseRepulsion },
                uTwinkleIntensity: { value: p.twinkleIntensity },
                uRotationSpeed: { value: p.rotationSpeed },
                uRepulsionStrength: { value: p.repulsionStrength },
                uMouseActiveFactor: { value: 0.0 },
                uAutoCenterRepulsion: { value: p.autoCenterRepulsion },
                uTransparent: { value: p.transparent },
            },
        });

        const mesh = new Mesh(gl, { geometry, program });
        let animateId;
        // Internal eased follower of scroll progress. A plain lerp never
        // overshoots, so the starfield advance is strictly monotonic — it can
        // glide forward and settle, but never slides backward when you stop.
        let flightCurrent = 0;

        function update(t) {
            animateId = requestAnimationFrame(update);
            const controls = controlsRef?.current;

            const targetFlight = controls ? controls.flight : 0; // 0→1 scroll progress
            flightCurrent += (targetFlight - flightCurrent) * 0.06;

            program.uniforms.uTime.value = t * 0.001;
            // Very slow constant ambient drift + gentle scroll-proportional
            // advance. uSpeed stays CONSTANT: scroll velocity must never
            // modulate star position (that caused the backward "settle").
            program.uniforms.uStarSpeed.value =
                (t * 0.001 * p.starSpeed) / 40.0 + flightCurrent * 0.6;
            program.uniforms.uSpeed.value = p.speed;
            if (controls && typeof controls.hue === 'number') {
                program.uniforms.uHueShift.value = controls.hue;
            }

            const lerpFactor = 0.05;
            smoothMousePos.current.x += (targetMousePos.current.x - smoothMousePos.current.x) * lerpFactor;
            smoothMousePos.current.y += (targetMousePos.current.y - smoothMousePos.current.y) * lerpFactor;
            smoothMouseActive.current += (targetMouseActive.current - smoothMouseActive.current) * lerpFactor;

            program.uniforms.uMouse.value[0] = smoothMousePos.current.x;
            program.uniforms.uMouse.value[1] = smoothMousePos.current.y;
            program.uniforms.uMouseActiveFactor.value = smoothMouseActive.current;

            renderer.render({ scene: mesh });
        }
        animateId = requestAnimationFrame(update);
        ctn.appendChild(gl.canvas);

        // Stop rendering entirely while the tab is hidden — no point burning
        // GPU on an invisible canvas.
        function handleVisibility() {
            if (document.hidden) {
                cancelAnimationFrame(animateId);
            } else {
                animateId = requestAnimationFrame(update);
            }
        }
        document.addEventListener('visibilitychange', handleVisibility);

        function handleMouseMove(e) {
            const rect = ctn.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1.0 - (e.clientY - rect.top) / rect.height;
            targetMousePos.current = { x, y };
            targetMouseActive.current = 1.0;
        }

        function handleMouseLeave() {
            targetMouseActive.current = 0.0;
        }

        if (effMouse) {
            ctn.addEventListener('mousemove', handleMouseMove);
            ctn.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            cancelAnimationFrame(animateId);
            window.removeEventListener('resize', resize);
            document.removeEventListener('visibilitychange', handleVisibility);
            if (effMouse) {
                ctn.removeEventListener('mousemove', handleMouseMove);
                ctn.removeEventListener('mouseleave', handleMouseLeave);
            }
            if (gl.canvas.parentNode === ctn) ctn.removeChild(gl.canvas);
            gl.getExtension('WEBGL_lose_context')?.loseContext();
        };
        // Mount once — dynamic values flow through controlsRef, not props.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div ref={ctnDom} className="galaxy-container" aria-hidden="true" {...rest} />;
}
