/*
 * Adapted from ReactBits — Orb (https://reactbits.dev/backgrounds/orb)
 * research/components/reactbits/orb-background.jsx
 *
 * Changes for the Drop Dev scrollytelling site:
 *  - IntersectionObserver pauses the RAF loop while the orb is off-screen
 *    (multiple planets on one page must not all burn GPU at once).
 *  - `paused` prop renders a single static frame (prefers-reduced-motion).
 *  - Mount-once effect; `className` passthrough; canvas is aria-hidden.
 */
import { Mesh, Program, Renderer, Triangle, Vec3 } from 'ogl';
import { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

const vert = /* glsl */ `
  precision highp float;
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const frag = /* glsl */ `
  precision highp float;

  uniform float iTime;
  uniform vec3 iResolution;
  uniform float hue;
  uniform float hover;
  uniform float rot;
  uniform float hoverIntensity;
  uniform vec3 backgroundColor;
  varying vec2 vUv;

  vec3 rgb2yiq(vec3 c) {
    float y = dot(c, vec3(0.299, 0.587, 0.114));
    float i = dot(c, vec3(0.596, -0.274, -0.322));
    float q = dot(c, vec3(0.211, -0.523, 0.312));
    return vec3(y, i, q);
  }

  vec3 yiq2rgb(vec3 c) {
    float r = c.x + 0.956 * c.y + 0.621 * c.z;
    float g = c.x - 0.272 * c.y - 0.647 * c.z;
    float b = c.x - 1.106 * c.y + 1.703 * c.z;
    return vec3(r, g, b);
  }

  vec3 adjustHue(vec3 color, float hueDeg) {
    float hueRad = hueDeg * 3.14159265 / 180.0;
    vec3 yiq = rgb2yiq(color);
    float cosA = cos(hueRad);
    float sinA = sin(hueRad);
    float i = yiq.y * cosA - yiq.z * sinA;
    float q = yiq.y * sinA + yiq.z * cosA;
    yiq.y = i;
    yiq.z = q;
    return yiq2rgb(yiq);
  }

  vec3 hash33(vec3 p3) {
    p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
    p3 += dot(p3, p3.yxz + 19.19);
    return -1.0 + 2.0 * fract(vec3(
      p3.x + p3.y,
      p3.x + p3.z,
      p3.y + p3.z
    ) * p3.zyx);
  }

  float snoise3(vec3 p) {
    const float K1 = 0.333333333;
    const float K2 = 0.166666667;
    vec3 i = floor(p + (p.x + p.y + p.z) * K1);
    vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
    vec3 e = step(vec3(0.0), d0 - d0.yzx);
    vec3 i1 = e * (1.0 - e.zxy);
    vec3 i2 = 1.0 - e.zxy * (1.0 - e);
    vec3 d1 = d0 - (i1 - K2);
    vec3 d2 = d0 - (i2 - K1);
    vec3 d3 = d0 - 0.5;
    vec4 h = max(0.6 - vec4(
      dot(d0, d0),
      dot(d1, d1),
      dot(d2, d2),
      dot(d3, d3)
    ), 0.0);
    vec4 n = h * h * h * h * vec4(
      dot(d0, hash33(i)),
      dot(d1, hash33(i + i1)),
      dot(d2, hash33(i + i2)),
      dot(d3, hash33(i + 1.0))
    );
    return dot(vec4(31.316), n);
  }

  vec4 extractAlpha(vec3 colorIn) {
    float a = max(max(colorIn.r, colorIn.g), colorIn.b);
    return vec4(colorIn.rgb / (a + 1e-5), a);
  }

  const vec3 baseColor1 = vec3(0.611765, 0.262745, 0.996078);
  const vec3 baseColor2 = vec3(0.298039, 0.760784, 0.913725);
  const vec3 baseColor3 = vec3(0.062745, 0.078431, 0.600000);
  const float innerRadius = 0.6;
  const float noiseScale = 0.65;

  float light1(float intensity, float attenuation, float dist) {
    return intensity / (1.0 + dist * attenuation);
  }
  float light2(float intensity, float attenuation, float dist) {
    return intensity / (1.0 + dist * dist * attenuation);
  }

  vec4 draw(vec2 uv) {
    vec3 color1 = adjustHue(baseColor1, hue);
    vec3 color2 = adjustHue(baseColor2, hue);
    vec3 color3 = adjustHue(baseColor3, hue);

    float ang = atan(uv.y, uv.x);
    float len = length(uv);
    float invLen = len > 0.0 ? 1.0 / len : 0.0;

    float bgLuminance = dot(backgroundColor, vec3(0.299, 0.587, 0.114));

    float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.5)) * 0.5 + 0.5;
    float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);
    float d0 = distance(uv, (r0 * invLen) * uv);
    float v0 = light1(1.0, 10.0, d0);

    v0 *= smoothstep(r0 * 1.05, r0, len);
    float innerFade = smoothstep(r0 * 0.8, r0 * 0.95, len);
    v0 *= mix(innerFade, 1.0, bgLuminance * 0.7);
    float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;

    float a = iTime * -1.0;
    vec2 pos = vec2(cos(a), sin(a)) * r0;
    float d = distance(uv, pos);
    float v1 = light2(1.5, 5.0, d);
    v1 *= light1(1.0, 50.0, d0);

    float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);
    float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);

    vec3 colBase = mix(color1, color2, cl);
    float fadeAmount = mix(1.0, 0.1, bgLuminance);

    vec3 darkCol = mix(color3, colBase, v0);
    darkCol = (darkCol + v1) * v2 * v3;
    darkCol = clamp(darkCol, 0.0, 1.0);

    vec3 lightCol = (colBase + v1) * mix(1.0, v2 * v3, fadeAmount);
    lightCol = mix(backgroundColor, lightCol, v0);
    lightCol = clamp(lightCol, 0.0, 1.0);

    vec3 finalCol = mix(darkCol, lightCol, bgLuminance);

    return extractAlpha(finalCol);
  }

  vec4 mainImage(vec2 fragCoord) {
    vec2 center = iResolution.xy * 0.5;
    float size = min(iResolution.x, iResolution.y);
    vec2 uv = (fragCoord - center) / size * 2.0;

    float angle = rot;
    float s = sin(angle);
    float c = cos(angle);
    uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);

    uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);
    uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);

    return draw(uv);
  }

  void main() {
    vec2 fragCoord = vUv * iResolution.xy;
    vec4 col = mainImage(fragCoord);
    gl_FragColor = vec4(col.rgb * col.a, col.a);
  }
`;

export default function Orb({
    hue = 0,
    hoverIntensity = 0.25,
    rotateOnHover = true,
    forceHoverState = false,
    paused = false,
    className,
}) {
    const ctnDom = useRef(null);
    const propsRef = useRef(null);
    propsRef.current = { hue, hoverIntensity, rotateOnHover, forceHoverState, paused };

    useEffect(() => {
        const container = ctnDom.current;
        if (!container) return;
        const p = propsRef.current;

        let renderer;
        try {
            renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
        } catch {
            return; // no WebGL — section still reads fine without the orb
        }
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        container.appendChild(gl.canvas);

        const geometry = new Triangle(gl);
        const program = new Program(gl, {
            vertex: vert,
            fragment: frag,
            uniforms: {
                iTime: { value: 0 },
                iResolution: {
                    value: new Vec3(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height),
                },
                hue: { value: p.hue },
                hover: { value: 0 },
                rot: { value: 0 },
                hoverIntensity: { value: p.hoverIntensity },
                backgroundColor: { value: new Vec3(0.016, 0.016, 0.04) }, // --color-space
            },
        });

        const mesh = new Mesh(gl, { geometry, program });

        function resize() {
            if (!container) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            const width = container.clientWidth;
            const height = container.clientHeight;
            renderer.setSize(width * dpr, height * dpr);
            gl.canvas.style.width = width + 'px';
            gl.canvas.style.height = height + 'px';
            program.uniforms.iResolution.value.set(
                gl.canvas.width,
                gl.canvas.height,
                gl.canvas.width / gl.canvas.height
            );
        }
        window.addEventListener('resize', resize);
        resize();

        let targetHover = 0;
        let lastTime = 0;

        // Grab-to-spin: drag rotates the planet directly; on release the spin
        // carries momentum (inertia) that decays; a slow idle auto-spin keeps
        // the planet alive when untouched.
        let currentRot = 0;
        let grabbing = false;
        let lastX = 0;
        let vel = 0;
        const IDLE_SPIN = 0.05;

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const size = Math.min(rect.width, rect.height);
            const uvX = ((x - rect.width / 2) / size) * 2.0;
            const uvY = ((y - rect.height / 2) / size) * 2.0;
            targetHover = Math.sqrt(uvX * uvX + uvY * uvY) < 0.8 ? 1 : 0;
        };
        const handleMouseLeave = () => {
            targetHover = 0;
        };
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        const onPointerDown = (e) => {
            grabbing = true;
            lastX = e.clientX;
            vel = 0;
            container.style.cursor = 'grabbing';
            try {
                container.setPointerCapture(e.pointerId);
            } catch {
                /* capture unsupported — drag still works via move events */
            }
        };
        const onPointerMove = (e) => {
            if (!grabbing) return;
            const dx = e.clientX - lastX;
            lastX = e.clientX;
            const d = dx * 0.005;
            currentRot += d;
            vel = vel * 0.7 + d * 0.3; // smoothed release velocity
        };
        const onPointerUp = () => {
            grabbing = false;
            container.style.cursor = 'grab';
        };

        if (!p.paused) {
            container.style.cursor = 'grab';
            container.style.touchAction = 'pan-y'; // horizontal drag spins; vertical still scrolls
            container.addEventListener('pointerdown', onPointerDown);
            container.addEventListener('pointermove', onPointerMove);
            container.addEventListener('pointerup', onPointerUp);
            container.addEventListener('pointercancel', onPointerUp);
        }

        let rafId = null;
        let visible = true;

        const update = (t) => {
            rafId = requestAnimationFrame(update);
            const dt = (t - lastTime) * 0.001;
            lastTime = t;
            program.uniforms.iTime.value = t * 0.001;

            const effectiveHover = p.forceHoverState ? 1 : targetHover;
            program.uniforms.hover.value += (effectiveHover - program.uniforms.hover.value) * 0.1;

            if (!grabbing) {
                currentRot += dt * IDLE_SPIN; // idle life
                currentRot += vel; // released momentum…
                vel *= 0.94; // …decaying to rest
            }
            program.uniforms.rot.value = currentRot;

            renderer.render({ scene: mesh });
        };

        const start = () => {
            if (rafId === null) rafId = requestAnimationFrame(update);
        };
        const stop = () => {
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        };

        if (p.paused) {
            // Reduced motion: draw one calm frame, no animation loop
            program.uniforms.iTime.value = 4.2;
            renderer.render({ scene: mesh });
        } else {
            // Only animate while on screen
            const io = new IntersectionObserver(
                ([entry]) => {
                    visible = entry.isIntersecting;
                    if (visible) start();
                    else stop();
                },
                { rootMargin: '20%' }
            );
            io.observe(container);
            var cleanupIO = () => io.disconnect();
        }

        return () => {
            stop();
            if (typeof cleanupIO === 'function') cleanupIO();
            window.removeEventListener('resize', resize);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            if (!p.paused) {
                container.removeEventListener('pointerdown', onPointerDown);
                container.removeEventListener('pointermove', onPointerMove);
                container.removeEventListener('pointerup', onPointerUp);
                container.removeEventListener('pointercancel', onPointerUp);
            }
            if (gl.canvas.parentNode === container) container.removeChild(gl.canvas);
            gl.getExtension('WEBGL_lose_context')?.loseContext();
        };
        // Mount once — props are static per planet instance.
         
    }, []);

    return <div ref={ctnDom} className={cn('orb-container', className)} aria-hidden="true" />;
}
