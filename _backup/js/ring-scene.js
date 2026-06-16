/**
 * ============================================
 * ring-scene.js — Three.js 3D 戒指场景
 * ============================================
 * 核心功能：
 * 1. 创建 WebGL 渲染器（透明背景，融入页面）
 * 2. 构建 PBR 物理材质的圆环（Torus）几何体
 * 3. 添加水晶镶嵌装饰
 * 4. 配置环境贴图和灯光
 * 5. 根据滚动进度驱动旋转动画
 * 6. 暴露材质切换接口供 ring-controller 调用
 * ============================================
 */

import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

class RingScene {
  /**
   * 构造函数
   * @param {HTMLElement} container - 承载 canvas 的 DOM 容器
   */
  constructor(container) {
    // 保存容器引用
    this.container = container;
    // 当前材质类型：'silver' 或 'roseGold'
    this.currentMaterial = 'silver';
    // 材质过渡动画进度（0~1）
    this._materialTransition = 0;
    this._materialTransitioning = false;
    // 目标材质
    this._targetMaterial = 'silver';
    // 滚动进度
    this.scrollProgress = 0;
    // 是否需要重新渲染
    this._needsRender = true;
    // 动画帧 ID
    this._rafId = null;

    // 初始化场景
    this._initScene();
    this._initCamera();
    this._initRenderer();
    this._initEnvironment();
    this._initLights();
    this._createRing();
    this._createCrystals();
    this._handleResize();
    this._startRenderLoop();
  }

  /* ------------------------------------------
     场景初始化
     ------------------------------------------ */

  /** 创建 Three.js 场景 */
  _initScene() {
    this.scene = new THREE.Scene();
    // 场景不设置背景色，保持透明，与页面渐变融合
  }

  /** 创建透视相机 */
  _initCamera() {
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(
      35,      // 视角（较窄，产品展示推荐）
      aspect,
      0.1,     // 近裁面
      100      // 远裁面
    );
    // 相机位置 — 正前方稍偏上，产品级拍摄角度
    this.camera.position.set(0, 0.3, 5);
    this.camera.lookAt(0, 0, 0);
  }

  /** 创建 WebGL 渲染器 */
  _initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,          // 抗锯齿
      alpha: true,              // 透明背景
      powerPreference: 'high-performance',
    });
    // 像素比限制为 2，平衡画质和性能
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    // 色调映射 — ACESFilmic 提供电影级色彩
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    // 将 canvas 添加到容器
    this.container.appendChild(this.renderer.domElement);
  }

  /** 创建环境贴图 — 模拟温暖的摄影棚反射 */
  _initEnvironment() {
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();
    // 使用 RoomEnvironment 生成室内环境（柔和反射）
    const roomEnv = new RoomEnvironment(this.renderer);
    this.envMap = pmremGenerator.fromScene(roomEnv).texture;
    this.scene.environment = this.envMap;
    // 清理
    pmremGenerator.dispose();
    roomEnv.dispose();
  }

  /** 配置灯光系统 */
  _initLights() {
    // 暖色环境光 — 基底照明
    this.ambientLight = new THREE.AmbientLight(0xFFF5E6, 0.5);
    this.scene.add(this.ambientLight);

    // 主光源 — 右上方
    this.keyLight = new THREE.DirectionalLight(0xFFFFFF, 1.5);
    this.keyLight.position.set(3, 4, 5);
    this.scene.add(this.keyLight);

    // 补光 — 左下方，暖色调
    this.fillLight = new THREE.DirectionalLight(0xFFE4C9, 0.6);
    this.fillLight.position.set(-3, -2, 3);
    this.scene.add(this.fillLight);

    // 背光 — 轮廓高光
    this.rimLight = new THREE.DirectionalLight(0xF0E6D8, 0.4);
    this.rimLight.position.set(0, 0, -5);
    this.scene.add(this.rimLight);
  }

  /* ------------------------------------------
     戒指几何体与材质
     ------------------------------------------ */

  /** 创建戒指主体 — TorusGeometry + MeshPhysicalMaterial */
  _createRing() {
    // 圆环几何体参数：主半径、管半径、径向分段、管分段
    const geometry = new THREE.TorusGeometry(1.2, 0.18, 64, 128);

    // 预定义两种材质参数
    this.materialParams = {
      silver: {
        color: new THREE.Color(0xC0C0C0),
        metalness: 0.95,
        roughness: 0.12,
        clearcoat: 0.8,
        clearcoatRoughness: 0.05,
        reflectivity: 1.0,
        envMapIntensity: 1.5,
      },
      roseGold: {
        color: new THREE.Color(0xB76E79),
        metalness: 0.9,
        roughness: 0.18,
        clearcoat: 0.6,
        clearcoatRoughness: 0.08,
        reflectivity: 0.9,
        envMapIntensity: 1.3,
      },
    };

    // 创建 PBR 物理材质（初始为银色）
    this.ringMaterial = new THREE.MeshPhysicalMaterial({
      ...this.materialParams.silver,
      envMap: this.envMap,
    });

    // 创建网格并添加到场景
    this.ring = new THREE.Mesh(geometry, this.ringMaterial);
    // 初始轻微倾斜，展示立体感
    this.ring.rotation.x = Math.PI * 0.15;
    this.scene.add(this.ring);
  }

  /** 创建水晶镶嵌装饰 — 分布在戒指表面 */
  _createCrystals() {
    // 水晶几何体 — 小型二十面体
    const crystalGeo = new THREE.IcosahedronGeometry(0.035, 1);
    // 水晶材质 — 高透射率模拟钻石折射
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      metalness: 0,
      roughness: 0.02,
      transmission: 0.92,       // 透射率（透明度）
      ior: 2.42,                // 折射率（钻石约 2.42）
      thickness: 0.5,
      clearcoat: 1.0,
      envMap: this.envMap,
      envMapIntensity: 2.0,
    });

    // 水晶组 — 便于统一管理
    this.crystalGroup = new THREE.Group();
    // 在圆环顶部均匀放置水晶
    const crystalCount = 12;
    for (let i = 0; i < crystalCount; i++) {
      const angle = (i / crystalCount) * Math.PI * 2;
      const crystal = new THREE.Mesh(crystalGeo, crystalMat);
      // 计算圆环表面位置
      const x = 1.2 * Math.cos(angle);
      const z = 1.2 * Math.sin(angle);
      const y = 0.18; // 管半径高度，放在顶部
      crystal.position.set(x, y, z);
      // 水晶微微朝外旋转
      crystal.lookAt(x * 2, y * 2, z * 2);
      this.crystalGroup.add(crystal);
    }
    // 水晶组跟随戒指旋转
    this.ring.add(this.crystalGroup);
  }

  /* ------------------------------------------
     滚动驱动的动画更新
     ------------------------------------------ */

  /**
   * 更新滚动进度 — 驱动戒指旋转
   * @param {number} progress - 全局滚动进度 0~1
   */
  updateScroll(progress) {
    this.scrollProgress = progress;
    this._needsRender = true;
  }

  /**
   * 切换材质
   * @param {string} materialName - 'silver' 或 'roseGold'
   */
  switchMaterial(materialName) {
    if (materialName === this.currentMaterial) return;
    this._targetMaterial = materialName;
    this._materialTransitioning = true;
    this._materialTransition = 0;
    this._needsRender = true;
  }

  /**
   * 更新章节灯光氛围
   * @param {number} sectionIndex - 当前章节索引 0~5
   */
  updateSectionLighting(sectionIndex) {
    // 各章节的环境光色温和强度
    const lightingPresets = [
      { ambient: 0xFFE8D0, intensity: 0.5, exposure: 1.3 },  // 07:00 晨光暖色
      { ambient: 0xFFF8F0, intensity: 0.6, exposure: 1.2 },  // 10:00 明亮白光
      { ambient: 0xF0EBE5, intensity: 0.5, exposure: 1.1 },  // 15:00 中性光
      { ambient: 0xFFE0B0, intensity: 0.7, exposure: 1.4 },  // 18:00 金色活力
      { ambient: 0xFFD8A8, intensity: 0.6, exposure: 1.3 },  // 20:00 室内暖灯
      { ambient: 0xE8E0F0, intensity: 0.4, exposure: 1.0 },  // 23:00 静谧冷调
    ];

    const preset = lightingPresets[sectionIndex];
    if (!preset) return;

    // 平滑过渡环境光颜色
    this.ambientLight.color.set(preset.ambient);
    this.ambientLight.intensity = preset.intensity;
    this.renderer.toneMappingExposure = preset.exposure;
    this._needsRender = true;
  }

  /* ------------------------------------------
     渲染循环
     ------------------------------------------ */

  /** 启动渲染循环 — 仅在需要时渲染（省电） */
  _startRenderLoop() {
    const animate = () => {
      this._rafId = requestAnimationFrame(animate);

      // 处理材质过渡动画
      if (this._materialTransitioning) {
        this._materialTransition += 0.02; // 约 600ms 完成
        if (this._materialTransition >= 1) {
          this._materialTransition = 1;
          this._materialTransitioning = false;
          this.currentMaterial = this._targetMaterial;
        }
        this._lerpMaterial(this._materialTransition);
        this._needsRender = true;
      }

      // 如果不需要渲染，跳过（省电）
      if (!this._needsRender) return;

      // 根据滚动进度旋转戒指
      if (this.ring) {
        // Y 轴主旋转 — 随滚动转动
        this.ring.rotation.y = this.scrollProgress * Math.PI * 3;
        // X 轴轻微摆动 — 增加灵动感
        this.ring.rotation.x = Math.PI * 0.15 + Math.sin(this.scrollProgress * Math.PI * 2) * 0.1;
        // 微妙缩放呼吸
        const breathe = 1 + Math.sin(this.scrollProgress * Math.PI * 4) * 0.02;
        this.ring.scale.setScalar(breathe);
      }

      // 执行渲染
      this.renderer.render(this.scene, this.camera);
      this._needsRender = false;
    };

    animate();
  }

  /**
   * 材质线性插值 — 在银色和玫瑰金之间平滑过渡
   * @param {number} t - 插值进度 0~1
   */
  _lerpMaterial(t) {
    const from = this.currentMaterial === 'silver'
      ? this.materialParams.silver
      : this.materialParams.roseGold;
    const to = this._targetMaterial === 'silver'
      ? this.materialParams.silver
      : this.materialParams.roseGold;

    // 使用 easeInOutCubic 缓动
    const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // 插值各材质属性
    this.ringMaterial.color.lerpColors(from.color, to.color, ease);
    this.ringMaterial.metalness = THREE.MathUtils.lerp(from.metalness, to.metalness, ease);
    this.ringMaterial.roughness = THREE.MathUtils.lerp(from.roughness, to.roughness, ease);
    this.ringMaterial.clearcoat = THREE.MathUtils.lerp(from.clearcoat, to.clearcoat, ease);
    this.ringMaterial.envMapIntensity = THREE.MathUtils.lerp(from.envMapIntensity, to.envMapIntensity, ease);
  }

  /** 处理窗口大小变化 */
  _handleResize() {
    window.addEventListener('resize', () => {
      const w = this.container.clientWidth;
      const h = this.container.clientHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
      this._needsRender = true;
    });
  }

  /** 销毁场景 — 释放 GPU 资源 */
  destroy() {
    if (this._rafId) cancelAnimationFrame(this._rafId);
    this.ring.geometry.dispose();
    this.ringMaterial.dispose();
    this.crystalGroup.children.forEach(c => {
      c.geometry.dispose();
      c.material.dispose();
    });
    this.renderer.dispose();
    if (this.envMap) this.envMap.dispose();
    this.container.removeChild(this.renderer.domElement);
  }
}

// 导出
window.RingScene = RingScene;
export default RingScene;
