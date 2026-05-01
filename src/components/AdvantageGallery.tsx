import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';
import './AdvantageGallery.css';

function debounce(func: Function, wait: number) {
  let timeout: any;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t;
}

function createCardTexture(gl: any, title: string, description: string, textColor: string) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return { texture: new Texture(gl), width: 0, height: 0 };
  
  const width = 800;
  const height = 500;
  canvas.width = width;
  canvas.height = height;
  context.clearRect(0, 0, width, height);
  context.fillStyle = 'rgba(255, 255, 255, 0.05)';
  context.fillRect(0, 0, width, height);
  context.font = 'bold 50px Figtree';
  context.fillStyle = textColor;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(title.toUpperCase(), width / 2, height * 0.4);
  context.font = '30px Figtree';
  context.fillStyle = textColor + 'BB';
  const words = description.split(' ');
  const lineMaxWidth = 650;
  let line = '';
  let y = height * 0.6;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = context.measureText(testLine);
    if (metrics.width > lineMaxWidth && n > 0) {
      context.fillText(line, width / 2, y);
      line = words[n] + ' ';
      y += 45;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, width / 2, y);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width, height };
}

class Media {
  geometry: any;
  gl: any;
  image: string;
  index: number;
  length: number;
  renderer: any;
  scene: any;
  screen: any;
  titleText: string;
  descText: string;
  viewport: any;
  bend: number;
  textColor: string;
  borderRadius: number;
  program: any;
  plane: any;
  textMesh: any;
  extra: number = 0;
  x: number = 0;
  width: number = 0;
  widthTotal: number = 0;
  isBefore: boolean = false;
  isAfter: boolean = false;
  padding: number = 0;
  baseWidth: number = 0;
  baseHeight: number = 0;

  constructor(params: any) {
    this.geometry = params.geometry;
    this.gl = params.gl;
    this.image = params.image;
    this.index = params.index;
    this.length = params.length;
    this.renderer = params.renderer;
    this.scene = params.scene;
    this.screen = params.screen;
    this.titleText = params.title;
    this.descText = params.description;
    this.viewport = params.viewport;
    this.bend = params.bend;
    this.textColor = params.textColor;
    this.borderRadius = params.borderRadius || 0.05;
    
    this.createShader();
    this.createMesh();
    this.createTextLabel();
    this.onResize();
  }

  createShader() {
    if (!this.gl) return;
    const texture = new Texture(this.gl, { generateMipmaps: true });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 2.0 + uTime) * 0.5 + cos(p.y * 1.5 + uTime) * 0.5) * (0.05 + abs(uSpeed) * 0.2);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        uniform float uOpacity;
        varying vec2 vUv;
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
	  return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        void main() {
          vec4 color = texture2D(tMap, vUv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float alpha = 1.0 - smoothstep(-0.002, 0.002, d);
          float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
          vec3 finalColor = mix(vec3(gray), color.rgb, uOpacity);
          gl_FragColor = vec4(finalColor, alpha * uOpacity);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
        uOpacity: { value: 1.0 }
      },
      transparent: true
    });
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => { if (texture) texture.image = img; };
  }

  createMesh() {
    if (!this.gl || !this.geometry || !this.program) return;
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    if (this.scene) this.plane.setParent(this.scene);
  }

  createTextLabel() {
    if (!this.gl) return;
    const { texture } = createCardTexture(this.gl, this.titleText, this.descText, '#FFFFFF');
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        uniform float uOpacity;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = vec4(color.rgb, color.a * uOpacity);
        }
      `,
      uniforms: { tMap: { value: texture }, uOpacity: { value: 1.0 } },
      transparent: true
    });
    this.textMesh = new Mesh(this.gl, { geometry, program });
    this.textMesh.position.z = 0.01;
    if (this.plane) this.textMesh.setParent(this.plane);
  }

  update(scroll: any, direction: string) {
    if (!this.plane) return;
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const H = this.viewport.width / 2;
    const distFromCenter = Math.abs(x) / (this.viewport.width * 0.4);
    const normalizedDist = Math.min(distFromCenter, 1.0);
    const focus = Math.max(0, 1.0 - normalizedDist * 1.5);
    
    if (this.program?.uniforms?.uOpacity) {
      this.program.uniforms.uOpacity.value = 0.3 + focus * 0.7;
    }
    if (this.textMesh?.program?.uniforms?.uOpacity) {
      this.textMesh.program.uniforms.uOpacity.value = 0.1 + focus * 0.9;
    }

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
      this.plane.scale.set(this.baseWidth * (0.8 + focus * 0.2), this.baseHeight * (0.8 + focus * 0.2), 1);
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      this.plane.position.y = this.bend > 0 ? -arc : arc;
      this.plane.rotation.z = Math.sign(x) * (this.bend > 0 ? -1 : 1) * Math.asin(effectiveX / R);
      const s = 1.0 + focus * 0.3;
      this.plane.scale.set(this.baseWidth * s, this.baseHeight * s, 1);
    }

    if (this.program?.uniforms?.uTime) this.program.uniforms.uTime.value += 0.04;
    if (this.program?.uniforms?.uSpeed) this.program.uniforms.uSpeed.value = scroll.current - scroll.last;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset * 2;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset * 2;
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({ screen, viewport }: any = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;
    if (!this.screen || !this.viewport || !this.plane) return;
    
    const hScale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (700 * hScale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (1000 * hScale)) / this.screen.width;
    this.baseWidth = this.plane.scale.x;
    this.baseHeight = this.plane.scale.y;
    if (this.program?.uniforms?.uPlaneSizes) {
      this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    }
    this.padding = 1.5;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class App {
  container: HTMLElement;
  scrollSpeed: number;
  autoScrollSpeed: number = 0.5;
  scroll: any;
  onCheckDebounce: any;
  renderer: any = null;
  gl: any = null;
  camera: any = null;
  scene: any = null;
  screen: any;
  viewport: any;
  planeGeometry: any = null;
  medias: Media[] = [];
  isDown: boolean = false;
  start: number = 0;
  raf: number = 0;
  destroyed: boolean = false;

  constructor(container: HTMLElement, params: any) {
    this.container = container;
    this.scrollSpeed = params.scrollSpeed || 2;
    this.scroll = { ease: params.scrollEase || 0.05, current: 0, target: 0, last: 0 };
    
    // Bind all methods to ensure correct 'this' context
    this.update = this.update.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.onTouchDown = this.onTouchDown.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchUp = this.onTouchUp.bind(this);
    this.onCheck = this.onCheck.bind(this);
    
    this.onCheckDebounce = debounce(this.onCheck, 200);

    this.init(params);
  }

  init(params: any) {
    this.createRenderer();
    if (!this.gl) return;
    
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(params.items, params.bend || 1);
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    try {
      this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
      if (this.renderer) {
        this.gl = this.renderer.gl;
        this.gl.clearColor(0, 0, 0, 0);
        this.container.appendChild(this.gl.canvas);
      }
    } catch (e) {
      console.error("Renderer creation failed:", e);
    }
  }

  createCamera() {
    if (!this.gl) return;
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    if (!this.gl) return;
    this.planeGeometry = new Plane(this.gl, { heightSegments: 20, widthSegments: 20 });
  }

  createMedias(items: any[], bend: number) {
    if (!items) return;
    const galleryItems = items.concat(items).concat(items);
    this.medias = galleryItems.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: galleryItems.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        title: data.text,
        description: data.desc,
        viewport: this.viewport,
        bend,
        textColor: '#FFFFFF',
      });
    });
  }

  onTouchDown(e: any) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = e.touches ? e.touches[0].clientX : e.clientX;
  }

  onTouchMove(e: any) {
    if (!this.isDown) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.02);
    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }

  onWheel(e: any) {
    this.scroll.target += e.deltaY * 0.01 * this.scrollSpeed;
    this.onCheckDebounce();
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(this.scroll.target / width);
    this.scroll.target = width * itemIndex;
  }

  onResize() {
    if (!this.container || !this.renderer) return;
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight };
    this.renderer.setSize(this.screen.width, this.screen.height);
    if (this.camera) {
      this.camera.perspective({ aspect: this.screen.width / this.screen.height });
      const fov = (this.camera.fov * Math.PI) / 180;
      const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
      const width = height * this.camera.aspect;
      this.viewport = { width, height };
    }
    this.medias?.forEach(m => m.onResize({ screen: this.screen, viewport: this.viewport }));
  }

  update() {
    if (this.destroyed) return;
    
    if (!this.isDown) {
      this.scroll.target += this.autoScrollSpeed * 0.01;
    }
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    this.medias?.forEach(m => m.update(this.scroll, direction));
    
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render({ scene: this.scene, camera: this.camera });
    }
    
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update);
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('wheel', this.onWheel);
    window.addEventListener('mousedown', this.onTouchDown);
    window.addEventListener('mousemove', this.onTouchMove);
    window.addEventListener('mouseup', this.onTouchUp);
    window.addEventListener('touchstart', this.onTouchDown);
    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('touchend', this.onTouchUp);
  }

  destroy() {
    this.destroyed = true;
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('mousedown', this.onTouchDown);
    window.removeEventListener('mousemove', this.onTouchMove);
    window.removeEventListener('mouseup', this.onTouchUp);
    window.removeEventListener('touchstart', this.onTouchDown);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchUp);
    if (this.renderer?.gl?.canvas?.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

export default function AdvantageGallery({ items }: { items: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const app = new App(containerRef.current, { 
      items, 
      bend: 2, 
      scrollSpeed: 2, 
      scrollEase: 0.05 
    });
    return () => app.destroy();
  }, [items]);
  return <div className="advantage-gallery" ref={containerRef} />;
}
