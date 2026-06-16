/**
 * ============================================
 * ring-controller.js — 戒指状态控制器
 * ============================================
 * 负责连接 ScrollEngine 和 RingScene，
 * 处理材质切换 UI、章节灯光联动、光晕效果。
 * ============================================
 */

class RingController {
  /**
   * 构造函数
   * @param {RingScene} ringScene - Three.js 戒指场景实例
   */
  constructor(ringScene) {
    this.ringScene = ringScene;
    // 当前选中的材质名称
    this.activeMaterial = 'silver';

    this._setupToggle();
    this._setupScrollListeners();
    this._updateGlow('silver');
  }

  /**
   * 设置材质切换按钮事件
   * 监听胶囊按钮的点击，切换银色/玫瑰金
   */
  _setupToggle() {
    const toggleBtns = document.querySelectorAll('.material-toggle__option');
    const toggle = document.querySelector('.material-toggle');

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const material = btn.dataset.material; // 'silver' 或 'roseGold'
        if (material === this.activeMaterial) return;

        // 更新 UI 状态
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // 切换 3D 材质
        this.activeMaterial = material;
        this.ringScene.switchMaterial(material);

        // 更新光晕颜色
        this._updateGlow(material);

        // 触发追踪事件
        document.dispatchEvent(new CustomEvent('tracking:event', {
          detail: {
            type: 'material_toggle',
            value: material,
          },
        }));
      });
    });

    // 延迟显示切换按钮（页面加载动画完成后）
    setTimeout(() => {
      if (toggle) toggle.classList.add('visible');
    }, 1500);
  }

  /**
   * 监听滚动引擎的自定义事件
   * 将滚动进度传递给 RingScene
   */
  _setupScrollListeners() {
    // 滚动进度 → 驱动戒指旋转
    document.addEventListener('section:progress', (e) => {
      const { progress } = e.detail;
      this.ringScene.updateScroll(progress);
    });

    // 章节切换 → 更新灯光氛围
    document.addEventListener('section:enter', (e) => {
      const { index } = e.detail;
      this.ringScene.updateSectionLighting(index);
    });
  }

  /**
   * 更新戒指光晕效果
   * @param {string} material - 'silver' 或 'roseGold'
   */
  _updateGlow(material) {
    const glow = document.querySelector('.ring-glow');
    if (!glow) return;

    // 移除所有光晕类
    glow.classList.remove('ring-glow--silver', 'ring-glow--rose-gold');

    // 添加对应材质的光晕
    if (material === 'silver') {
      glow.classList.add('ring-glow--silver');
    } else {
      glow.classList.add('ring-glow--rose-gold');
    }
  }
}

// 导出
window.RingController = RingController;
